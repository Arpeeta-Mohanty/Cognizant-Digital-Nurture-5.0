using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Week5_WebAPI.Controllers;

/// <summary>Request payload for login.</summary>
public record LoginRequest(string Username, string Password);

/// <summary>
/// Hands-On 5 – JWT Authentication.
/// Issues a signed JWT token valid for 10 minutes.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // Hard-coded demo credentials (replace with DB lookup in production)
    private static readonly Dictionary<string, string> _users = new()
    {
        { "admin", "Admin@123" },
        { "poc",   "Poc@123"   }
    };

    private static readonly Dictionary<string, string> _roles = new()
    {
        { "admin", "Admin" },
        { "poc",   "POC"   }
    };

    private readonly IConfiguration _config;

    /// <summary>Injects IConfiguration for JWT settings.</summary>
    public AuthController(IConfiguration config) => _config = config;

    /// <summary>
    /// Authenticates a user and returns a JWT token.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/Auth/login
    ///     {
    ///         "username": "admin",
    ///         "password": "Admin@123"
    ///     }
    ///
    /// </remarks>
    /// <param name="request">Login credentials.</param>
    /// <returns>JWT bearer token.</returns>
    [HttpPost("login")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var key = request.Username.ToLower();

        if (!_users.TryGetValue(key, out var storedPassword) || storedPassword != request.Password)
            return Unauthorized("Invalid username or password.");

        var token = GenerateToken(request.Username, _roles[key]);
        return Ok(new { token, expiresIn = "10 minutes" });
    }

    // ── Private helpers ────────────────────────────────────────────────────

    private string GenerateToken(string username, string role)
    {
        var jwtSection  = _config.GetSection("Jwt");
        var secretKey   = jwtSection["SecretKey"]!;
        var issuer      = jwtSection["Issuer"]!;
        var audience    = jwtSection["Audience"]!;
        var expiryMins  = int.Parse(jwtSection["ExpiryMinutes"] ?? "10");

        var signingKey  = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("UserId",                  username),
            new Claim(ClaimTypes.Name,           username),
            new Claim(ClaimTypes.Role,           role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer:             issuer,
            audience:           audience,
            claims:             claims,
            expires:            DateTime.UtcNow.AddMinutes(expiryMins),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
