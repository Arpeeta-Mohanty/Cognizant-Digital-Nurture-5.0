using System.ComponentModel.DataAnnotations;

namespace JwtAuthApi.DTOs;

/// <summary>
/// Data Transfer Object for the POST /api/auth/login request body.
/// </summary>
public class LoginRequest
{
    [Required(ErrorMessage = "Username is required.")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; } = string.Empty;
}
