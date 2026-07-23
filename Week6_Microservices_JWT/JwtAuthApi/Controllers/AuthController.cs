using JwtAuthApi.DTOs;
using JwtAuthApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthApi.Controllers;

/// <summary>
/// Handles authentication: login and token introspection.
/// Route: /api/auth
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtService  _jwtService;

    public AuthController(IUserService userService, IJwtService jwtService)
    {
        _userService = userService;
        _jwtService  = jwtService;
    }

    // -------------------------------------------------------------------------
    // POST /api/auth/login
    // Public endpoint — no [Authorize] attribute.
    // -------------------------------------------------------------------------
    /// <summary>
    /// Authenticates a user and returns a signed JWT on success.
    /// </summary>
    /// <param name="request">Username and password.</param>
    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>),        StatusCodes.Status401Unauthorized)]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = _userService.Authenticate(request.Username, request.Password);

        if (user is null)
            return Unauthorized(ApiResponse<object>.Fail("Invalid username or password."));

        var token     = _jwtService.GenerateToken(user);
        var expiresAt = DateTime.UtcNow.AddMinutes(60);

        var response = new LoginResponse
        {
            Token     = token,
            Username  = user.Username,
            Email     = user.Email,
            Role      = user.Role,
            ExpiresAt = expiresAt
        };

        return Ok(ApiResponse<LoginResponse>.Ok(response, "Login successful."));
    }

    // -------------------------------------------------------------------------
    // GET /api/auth/me
    // Protected endpoint — any authenticated user can call this.
    // -------------------------------------------------------------------------
    /// <summary>
    /// Returns the claims embedded in the caller's JWT (token introspection).
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult Me()
    {
        // HttpContext.User is populated by the JWT middleware automatically.
        var claims = User.Claims.Select(c => new { c.Type, c.Value });
        return Ok(ApiResponse<object>.Ok(claims, "Token claims retrieved."));
    }
}
