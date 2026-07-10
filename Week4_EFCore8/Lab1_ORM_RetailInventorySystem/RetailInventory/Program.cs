using RetailInventory.Data;
using RetailInventory.Models;

// Lab 1: ORM maps C# classes (Product, Category) to SQL Server tables.
// EF Core 8 generates SQL from LINQ — no raw SQL needed.

using var context = new AppDbContext();
context.Database.EnsureCreated();

if (!context.Categories.Any())
{
    var electronics = new Category { Name = "Electronics" };
    var clothing = new Category { Name = "Clothing" };

    context.Categories.AddRange(electronics, clothing);

    context.Products.AddRange(
        new Product { Name = "Laptop",    Price = 75000, Category = electronics },
        new Product { Name = "T-Shirt",   Price = 499,   Category = clothing },
        new Product { Name = "Headphones",Price = 2999,  Category = electronics }
    );

    context.SaveChanges();
    Console.WriteLine("Seed data inserted.");
}

foreach (var p in context.Products)
    Console.WriteLine($"[{p.Id}] {p.Name} - Rs.{p.Price}");
