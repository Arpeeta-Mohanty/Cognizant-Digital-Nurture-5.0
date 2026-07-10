using Microsoft.EntityFrameworkCore;
using LINQQueries.Data;
using LINQQueries.Models;

// Lab 7: Writing Queries with LINQ
// Prerequisite: RetailInventoryDb must exist with Products seeded (run Lab 3 first).

using var context = new AppDbContext();

// Seed sample data if the table is empty
if (!await context.Products.AnyAsync())
{
    var electronics = new Category { Name = "Electronics" };
    var groceries = new Category { Name = "Groceries" };
    context.Categories.AddRange(electronics, groceries);
    context.Products.AddRange(
        new Product { Name = "Laptop",     Price = 70000, Category = electronics },
        new Product { Name = "Phone",      Price = 30000, Category = electronics },
        new Product { Name = "Headphones", Price = 1500,  Category = electronics },
        new Product { Name = "Rice Bag",   Price = 500,   Category = groceries   },
        new Product { Name = "Pen",        Price = 10,    Category = groceries   }
    );
    await context.SaveChangesAsync();
    Console.WriteLine("Sample data seeded.\n");
}

// --- Step 1: Filter and Sort ---
Console.WriteLine("=== Lab 7: Products with Price > 1000 (Descending) ===");

var filtered = await context.Products
    .Where(p => p.Price > 1000)
    .OrderByDescending(p => p.Price)
    .ToListAsync();

foreach (var p in filtered)
    Console.WriteLine($"  {p.Name} - {p.Price:C}");

// --- Step 2: Project into DTO (anonymous type) ---
Console.WriteLine("\n=== Lab 7: Product Name & Price Projection ===");

var productDTOs = await context.Products
    .Select(p => new { p.Name, p.Price })
    .ToListAsync();

foreach (var dto in productDTOs)
    Console.WriteLine($"  {dto.Name}: {dto.Price:C}");

Console.WriteLine("\nLab 7 complete.");
