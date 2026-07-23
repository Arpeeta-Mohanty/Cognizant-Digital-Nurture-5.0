using JwtAuthApi.Models;

namespace JwtAuthApi.Interfaces;

/// <summary>
/// Contract for user retrieval operations.
/// Replace the in-memory implementation with a database-backed one in production.
/// </summary>
public interface IUserService
{
    /// <summary>Returns the user if credentials are valid; otherwise null.</summary>
    User? Authenticate(string username, string password);

    /// <summary>Returns all registered users (Admin-only endpoint demo).</summary>
    IEnumerable<User> GetAllUsers();
}
