/*
 * Program.cs
 * ──────────────────────────────────────────────────────────────────────────────
 * Entry point for the JwtAuthApi application.
 * Responsibilities:
 *   1. Bind configuration (JwtSettings).
 *   2. Register application services via DI.
 *   3. Configure JWT Bearer authentication middleware.
 *   4. Configure Swagger with Bearer token support.
 *   5. Build and run the HTTP pipeline.
 * ──────────────────────────────────────────────────────────────────────────────
 */

using System.Text;
using JwtAuthApi.Configuration;
using JwtAuthApi.Interfaces;
using JwtAuthApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ── 1. Bind JwtSettings from appsettings.json ─────────────────────────────────
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = builder.Configuration
    .GetSection("JwtSettings")
    .Get<JwtSettings>()!;

// ── 2. Register application services (Dependency Injection) ───────────────────
builder.Services.AddScoped<IJwtService,  JwtService>();
builder.Services.AddScoped<IUserService, UserService>();

// ── 3. Configure JWT Bearer Authentication ────────────────────────────────────
builder.Services
    .AddAuthentication(options =>
    {
        // Make JWT Bearer the default scheme for both authentication and challenge.
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidIssuer              = jwtSettings.Issuer,

            ValidateAudience         = true,
            ValidAudience            = jwtSettings.Audience,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey         = new SymmetricSecurityKey(
                                           Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),

            ValidateLifetime         = true,
            ClockSkew                = TimeSpan.Zero   // reject tokens the instant they expire
        };

        // Return 401 JSON body instead of an empty response.
        options.Events = new JwtBearerEvents
        {
            OnChallenge = async context =>
            {
                context.HandleResponse();
                context.Response.StatusCode  = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(
                    """{"success":false,"message":"Unauthorized. Please provide a valid JWT token."}""");
            },
            OnForbidden = async context =>
            {
                context.Response.StatusCode  = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(
                    """{"success":false,"message":"Forbidden. You do not have permission to access this resource."}""");
            }
        };
    });

builder.Services.AddAuthorization();

// ── 4. Controllers & Swagger ──────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title       = "JWT Auth API — Cognizant Digital Nurture Week 6",
        Version     = "v1",
        Description = "Demonstrates JWT Authentication & Role-based Authorization in ASP.NET Core 8."
    });

    // Add the "Authorize" button to Swagger UI so testers can paste a Bearer token.
    var securityScheme = new OpenApiSecurityScheme
    {
        Name         = "Authorization",
        Description  = "Enter: Bearer {your JWT token}",
        In           = ParameterLocation.Header,
        Type         = SecuritySchemeType.ApiKey,
        Scheme       = "Bearer",
        BearerFormat = "JWT",
        Reference    = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id   = JwtBearerDefaults.AuthenticationScheme
        }
    };

    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, Array.Empty<string>() }
    });
});

// ── 5. Build & configure the HTTP pipeline ────────────────────────────────────
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "JWT Auth API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();

// ORDER MATTERS: Authentication must come before Authorization.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
