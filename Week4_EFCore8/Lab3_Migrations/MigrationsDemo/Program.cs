using Microsoft.EntityFrameworkCore;
using MigrationsDemo.Data;

// Lab 3: EF Core Migrations
// CLI commands to run once from the project directory:
//   dotnet tool install --global dotnet-ef
//   dotnet ef migrations add InitialCreate
//   dotnet ef database update
//
// The program below applies any pending migrations programmatically at startup.

using var context = new AppDbContext();

Console.WriteLine("Applying migrations...");
context.Database.Migrate();
Console.WriteLine("Database is up to date.");

Console.WriteLine("\nTables 'Products' and 'Categories' are ready.");
Console.WriteLine("Verify in SSMS or Azure Data Studio by connecting to (localdb)\\mssqllocaldb.");
