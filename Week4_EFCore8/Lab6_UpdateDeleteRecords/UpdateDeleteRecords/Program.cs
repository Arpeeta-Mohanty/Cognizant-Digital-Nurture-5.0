using Microsoft.EntityFrameworkCore;
using UpdateDeleteRecords.Data;
using UpdateDeleteRecords.Models;

// Lab 6: Updating and Deleting Records
// Prerequisite: RetailInventoryDb must exist with Products seeded (run Lab 3 first).

using var context = new AppDbContext();

// --- Step 1: Update a Product ---
Console.WriteLine("=== Lab 6: Update a Product ===");

var product = await context.Products.FirstOrDefaultAsync(p => p.Name == "Laptop");
if (product != null)
{
    product.Price = 70000;
    await context.SaveChangesAsync();
    Console.WriteLine($"Updated '{product.Name}' price to {product.Price}");
}
else
{
    Console.WriteLine("Product 'Laptop' not found. Seeding it for demo...");
    var category = await context.Categories.FirstOrDefaultAsync()
        ?? new Category { Name = "Electronics" };

    if (category.Id == 0)
        context.Categories.Add(category);

    context.Products.Add(new Product { Name = "Laptop", Price = 50000, Category = category });
    await context.SaveChangesAsync();

    var seeded = await context.Products.FirstOrDefaultAsync(p => p.Name == "Laptop");
    if (seeded != null)
    {
        seeded.Price = 70000;
        await context.SaveChangesAsync();
        Console.WriteLine($"Seeded and updated '{seeded.Name}' price to {seeded.Price}");
    }
}

// --- Step 2: Delete a Product ---
Console.WriteLine("\n=== Lab 6: Delete a Product ===");

var toDelete = await context.Products.FirstOrDefaultAsync(p => p.Name == "Rice Bag");
if (toDelete != null)
{
    context.Products.Remove(toDelete);
    await context.SaveChangesAsync();
    Console.WriteLine($"Deleted product: '{toDelete.Name}'");
}
else
{
    Console.WriteLine("Product 'Rice Bag' not found. Seeding it for demo...");
    var category = await context.Categories.FirstOrDefaultAsync()
        ?? new Category { Name = "Groceries" };

    if (category.Id == 0)
        context.Categories.Add(category);

    context.Products.Add(new Product { Name = "Rice Bag", Price = 500, Category = category });
    await context.SaveChangesAsync();

    var seeded = await context.Products.FirstOrDefaultAsync(p => p.Name == "Rice Bag");
    if (seeded != null)
    {
        context.Products.Remove(seeded);
        await context.SaveChangesAsync();
        Console.WriteLine($"Seeded and deleted product: '{seeded.Name}'");
    }
}

Console.WriteLine("\nLab 6 complete.");
