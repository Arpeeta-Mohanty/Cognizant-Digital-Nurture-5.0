namespace Week5_WebAPI.Models;

/// <summary>Employee entity.</summary>
public class Employee
{
    /// <summary>Unique employee identifier.</summary>
    public int Id { get; set; }

    /// <summary>Full name of the employee.</summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>Annual salary.</summary>
    public decimal Salary { get; set; }

    /// <summary>Indicates whether the employee is permanent.</summary>
    public bool Permanent { get; set; }

    /// <summary>Department the employee belongs to.</summary>
    public Department? Department { get; set; }

    /// <summary>List of skills the employee possesses.</summary>
    public List<Skill> Skills { get; set; } = new();

    /// <summary>Date of birth.</summary>
    public DateTime DateOfBirth { get; set; }
}
