namespace JwtAuthApi.Helpers;

/// <summary>
/// Utility class for password operations.
/// Currently uses plain-text comparison for demo purposes.
/// In production, replace with BCrypt.Net or ASP.NET Core Identity password hasher.
/// </summary>
public static class PasswordHelper
{
    /// <summary>
    /// Verifies a plain-text password against a stored value.
    /// Swap the body with BCrypt.Net.BCrypt.Verify(plain, hashed) in production.
    /// </summary>
    public static bool Verify(string plainText, string stored) =>
        plainText == stored;

    /// <summary>
    /// Hashes a plain-text password.
    /// Swap with BCrypt.Net.BCrypt.HashPassword(plain) in production.
    /// </summary>
    public static string Hash(string plainText) => plainText;
}
