namespace JwtAuthApi.Models;

/// <summary>
/// Sample domain model to demonstrate role-based access on protected endpoints.
/// </summary>
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
}
