namespace Week5_WebAPI.Models;

/// <summary>Department reference data.</summary>
public class Department
{
    /// <summary>Unique department identifier.</summary>
    public int Id { get; set; }

    /// <summary>Department name.</summary>
    public string Name { get; set; } = string.Empty;
}
