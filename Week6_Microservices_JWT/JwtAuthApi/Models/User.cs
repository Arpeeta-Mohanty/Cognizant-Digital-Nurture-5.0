namespace JwtAuthApi.Models;

/// <summary>
/// Represents an application user stored in the in-memory user store.
/// In production, replace with a database-backed identity store.
/// </summary>
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;

    /// <summary>Hashed password. Plain-text used here for demo only.</summary>
    public string Password { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    /// <summary>Role assigned to the user: "Admin" or "User".</summary>
    public string Role { get; set; } = string.Empty;
}
