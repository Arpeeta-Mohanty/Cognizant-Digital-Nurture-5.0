namespace JwtAuthApi.Configuration;

/// <summary>
/// Strongly-typed configuration class bound to the "JwtSettings" section
/// in appsettings.json via IOptions&lt;JwtSettings&gt;.
/// </summary>
public class JwtSettings
{
    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpirationMinutes { get; set; } = 60;
}
