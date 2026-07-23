using JwtAuthApi.DTOs;
using JwtAuthApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthApi.Controllers;

/// <summary>
/// Demonstrates three authorization levels:
///   GET  /api/products          → Public (no token required)
///   GET  /api/products/{id}     → Any authenticated user (Admin or User role)
///   POST /api/products          → Admin role only
///   DELETE /api/products/{id}   → Admin role only
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    // In-memory product store — replace with a repository / EF Core in production.
    private static readonly List<Product> _products =
    [
        new Product { Id = 1, Name = "Laptop",     Description = "High-performance laptop", Price = 75000, Category = "Electronics" },
        new Product { Id = 2, Name = "Smartphone", Description = "Latest model smartphone", Price = 45000, Category = "Electronics" },
        new Product { Id = 3, Name = "Headphones", Description = "Noise-cancelling headphones", Price = 8000, Category = "Accessories" }
    ];

    // -------------------------------------------------------------------------
    // GET /api/products  — PUBLIC
    // -------------------------------------------------------------------------
    /// <summary>Returns all products. No authentication required.</summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<Product>>), StatusCodes.Status200OK)]
    public IActionResult GetAll() =>
        Ok(ApiResponse<IEnumerable<Product>>.Ok(_products, "Products retrieved."));

    // -------------------------------------------------------------------------
    // GET /api/products/{id}  — AUTHENTICATED (Admin or User)
    // -------------------------------------------------------------------------
    /// <summary>Returns a single product by ID. Requires a valid JWT.</summary>
    [HttpGet("{id:int}")]
    [Authorize]
    [ProducesResponseType(typeof(ApiResponse<Product>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetById(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        return product is null
            ? NotFound(ApiResponse<Product>.Fail($"Product with ID {id} not found."))
            : Ok(ApiResponse<Product>.Ok(product));
    }

    // -------------------------------------------------------------------------
    // POST /api/products  — ADMIN ONLY
    // -------------------------------------------------------------------------
    /// <summary>Creates a new product. Requires Admin role.</summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<Product>), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public IActionResult Create([FromBody] Product product)
    {
        product.Id = _products.Count + 1;
        _products.Add(product);
        return CreatedAtAction(nameof(GetById),
            new { id = product.Id },
            ApiResponse<Product>.Ok(product, "Product created successfully."));
    }

    // -------------------------------------------------------------------------
    // DELETE /api/products/{id}  — ADMIN ONLY
    // -------------------------------------------------------------------------
    /// <summary>Deletes a product by ID. Requires Admin role.</summary>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product is null)
            return NotFound(ApiResponse<object>.Fail($"Product with ID {id} not found."));

        _products.Remove(product);
        return Ok(ApiResponse<string>.Ok($"Product {id} deleted successfully."));
    }
}
