using Microsoft.EntityFrameworkCore;
using DatabaseContext.Models;

namespace DatabaseContext.Data;

// Lab 2: AppDbContext bridges C# models and SQL Server tables.
// DbSet<T> properties map to tables; OnConfiguring sets the connection string.
public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=(localdb)\\mssqllocaldb;Database=RetailInventoryDb;Trusted_Connection=True;");
    }
}
