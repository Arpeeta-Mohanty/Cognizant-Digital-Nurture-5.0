namespace Week5_WebAPI.Models;

/// <summary>Skill possessed by an employee.</summary>
public class Skill
{
    /// <summary>Unique skill identifier.</summary>
    public int Id { get; set; }

    /// <summary>Skill name (e.g. C#, Azure).</summary>
    public string Name { get; set; } = string.Empty;
}
