using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtAuthApi.Configuration;
using JwtAuthApi.Interfaces;
using JwtAuthApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace JwtAuthApi.Services;

/// <summary>
/// Implements <see cref="IJwtService"/> using System.IdentityModel.Tokens.Jwt.
/// Registered as a scoped service in Program.cs.
/// </summary>
public class JwtService : IJwtService
{
    private readonly JwtSettings _settings;
    private readonly SymmetricSecurityKey _signingKey;

    public JwtService(IOptions<JwtSettings> options)
    {
        _settings = options.Value;
        // Build the signing key once; reused for every token operation.
        _signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.SecretKey));
    }

    /// <inheritdoc/>
    public string GenerateToken(User user)
    {
        // --- Claims embedded inside the JWT payload ---
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role,               user.Role),
            new Claim(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()) // unique token id
        };

        var credentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer:             _settings.Issuer,
            audience:           _settings.Audience,
            claims:             claims,
            notBefore:          DateTime.UtcNow,
            expires:            DateTime.UtcNow.AddMinutes(_settings.ExpirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    /// <inheritdoc/>
    public ClaimsPrincipal? ValidateToken(string token)
    {
        var validationParams = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidIssuer              = _settings.Issuer,
            ValidateAudience         = true,
            ValidAudience            = _settings.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey         = _signingKey,
            ValidateLifetime         = true,
            ClockSkew                = TimeSpan.Zero   // no tolerance for expiry
        };

        try
        {
            return new JwtSecurityTokenHandler()
                .ValidateToken(token, validationParams, out _);
        }
        catch
        {
            // Token is invalid or expired — return null so callers can handle gracefully.
            return null;
        }
    }
}
