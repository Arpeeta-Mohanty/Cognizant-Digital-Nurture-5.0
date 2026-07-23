using JwtAuthApi.DTOs;
using JwtAuthApi.Interfaces;
using JwtAuthApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthApi.Controllers;

/// <summary>
/// Manages user-related operations.
/// Route: /api/users
/// All endpoints require Admin role except where noted.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]   // Default policy for the entire controller.
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService) => _userService = userService;

    // -------------------------------------------------------------------------
    // GET /api/users  — ADMIN ONLY
    // -------------------------------------------------------------------------
    /// <summary>Returns all registered users. Admin role required.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<User>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public IActionResult GetAll()
    {
        var users = _userService.GetAllUsers()
            .Select(u => new { u.Id, u.Username, u.Email, u.Role }); // exclude password
        return Ok(ApiResponse<object>.Ok(users, "Users retrieved."));
    }
}
