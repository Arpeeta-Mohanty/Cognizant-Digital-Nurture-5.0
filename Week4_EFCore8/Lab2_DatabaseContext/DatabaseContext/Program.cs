using DatabaseContext.Data;
using DatabaseContext.Models;

// Lab 2: Demonstrates DbContext connecting to SQL Server and performing basic operations.
using var context = new AppDbContext();
context.Database.EnsureCreated();

if (!context.Categories.Any())
{
    var electronics = new Category { Name = "Electronics" };
    context.Categories.Add(electronics);
    context.Products.Add(new Product { Name = "Laptop", Price = 75000, Category = electronics });
    context.SaveChanges();
    Console.WriteLine("Database created and seeded via AppDbContext.");
}

Console.WriteLine("\nCategories in DB:");
foreach (var c in context.Categories)
    Console.WriteLine($"  [{c.Id}] {c.Name}");

Console.WriteLine("\nProducts in DB:");
foreach (var p in context.Products)
    Console.WriteLine($"  [{p.Id}] {p.Name} - Rs.{p.Price}");
