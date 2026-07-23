namespace JwtAuthApi.DTOs;

/// <summary>
/// Data Transfer Object returned by POST /api/auth/login on success.
/// Contains the JWT token and basic user metadata.
/// </summary>
public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}
