using JwtAuthApi.Interfaces;
using JwtAuthApi.Models;

namespace JwtAuthApi.Services;

/// <summary>
/// In-memory implementation of <see cref="IUserService"/>.
/// Seeded with two demo accounts:
///   admin / Admin@123  → Role: Admin
///   john  / User@123   → Role: User
///
/// Replace with a database-backed implementation (e.g., EF Core + ASP.NET Identity)
/// for production use.
/// </summary>
public class UserService : IUserService
{
    // Static seed data — simulates a user table.
    private static readonly List<User> _users =
    [
        new User { Id = 1, Username = "admin", Password = "Admin@123",
                   Email = "admin@jwtdemo.com",  Role = "Admin" },
        new User { Id = 2, Username = "john",  Password = "User@123",
                   Email = "john@jwtdemo.com",   Role = "User"  }
    ];

    /// <inheritdoc/>
    public User? Authenticate(string username, string password) =>
        _users.FirstOrDefault(u =>
            u.Username.Equals(username, StringComparison.OrdinalIgnoreCase) &&
            u.Password == password);   // In production: use BCrypt / PBKDF2 hash comparison.

    /// <inheritdoc/>
    public IEnumerable<User> GetAllUsers() => _users;
}
