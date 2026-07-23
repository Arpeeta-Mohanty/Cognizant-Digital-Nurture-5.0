using JwtAuthApi.Models;

namespace JwtAuthApi.Interfaces;

/// <summary>
/// Contract for JWT token generation and validation.
/// Abstracts the token logic so it can be mocked in unit tests.
/// </summary>
public interface IJwtService
{
    /// <summary>Generates a signed JWT for the given user.</summary>
    string GenerateToken(User user);

    /// <summary>
    /// Validates a JWT string and returns the principal's claims,
    /// or null if the token is invalid / expired.
    /// </summary>
    System.Security.Claims.ClaimsPrincipal? ValidateToken(string token);
}
