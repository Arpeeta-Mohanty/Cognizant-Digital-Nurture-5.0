using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Week5_WebAPI.Filters;
using Week5_WebAPI.Models;

namespace Week5_WebAPI.Controllers;

/// <summary>
/// Hands-On 2-5 – Employee CRUD API.
/// Route changed from api/[controller] to api/Emp (Hands-On 2).
/// Protected by JWT [Authorize] (Hands-On 5).
/// </summary>
[ApiController]
[Route("api/Emp")]
[Authorize]                     // Hands-On 5: require valid JWT
public class EmployeeController : ControllerBase
{
    // ── In-memory data store (Hands-On 4) ─────────────────────────────────
    private static readonly List<Employee> _employees = new()
    {
        new Employee
        {
            Id          = 1,
            Name        = "Alice Johnson",
            Salary      = 75000,
            Permanent   = true,
            DateOfBirth = new DateTime(1990, 5, 15),
            Department  = new Department { Id = 1, Name = "Engineering" },
            Skills      = new List<Skill>
            {
                new Skill { Id = 1, Name = "C#" },
                new Skill { Id = 2, Name = "Azure" }
            }
        },
        new Employee
        {
            Id          = 2,
            Name        = "Bob Smith",
            Salary      = 65000,
            Permanent   = false,
            DateOfBirth = new DateTime(1985, 8, 22),
            Department  = new Department { Id = 2, Name = "HR" },
            Skills      = new List<Skill>
            {
                new Skill { Id = 3, Name = "Recruitment" }
            }
        }
    };

    // ── GET api/Emp ────────────────────────────────────────────────────────

    /// <summary>Returns all employees.</summary>
    [HttpGet]
    [AllowAnonymous]            // public endpoint – no token needed
    [ProducesResponseType(typeof(IEnumerable<Employee>), StatusCodes.Status200OK)]
    public IActionResult GetAll() => Ok(_employees);

    // ── GET api/Emp/{id} ───────────────────────────────────────────────────

    /// <summary>Returns a single employee by ID.</summary>
    /// <param name="id">Employee ID (must be &gt; 0).</param>
    [HttpGet("{id:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult GetById(int id)
    {
        if (id <= 0) return BadRequest("Id must be greater than 0.");
        var emp = _employees.FirstOrDefault(e => e.Id == id);
        return emp is null ? BadRequest($"Employee with Id {id} not found.") : Ok(emp);
    }

    // ── POST api/Emp ───────────────────────────────────────────────────────

    /// <summary>Creates a new employee. Requires Admin role.</summary>
    /// <param name="employee">Employee payload.</param>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ServiceFilter(typeof(CustomAuthFilter))]   // Hands-On 3: custom auth filter demo
    [ProducesResponseType(typeof(Employee), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Create([FromBody] Employee employee)
    {
        if (employee.Id <= 0)
            return BadRequest("Employee Id must be greater than 0.");
        if (_employees.Any(e => e.Id == employee.Id))
            return BadRequest($"Employee with Id {employee.Id} already exists.");

        _employees.Add(employee);
        return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
    }

    // ── PUT api/Emp/{id} ───────────────────────────────────────────────────

    /// <summary>Updates an existing employee. Requires Admin role.</summary>
    /// <param name="id">Employee ID to update.</param>
    /// <param name="updated">Updated employee data.</param>
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Update(int id, [FromBody] Employee updated)
    {
        if (id <= 0) return BadRequest("Id must be greater than 0.");
        var index = _employees.FindIndex(e => e.Id == id);
        if (index == -1) return BadRequest($"Employee with Id {id} not found.");

        updated.Id = id;
        _employees[index] = updated;
        return Ok(updated);
    }

    // ── DELETE api/Emp/{id} ────────────────────────────────────────────────

    /// <summary>Deletes an employee by ID. Requires Admin role.</summary>
    /// <param name="id">Employee ID to delete.</param>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Delete(int id)
    {
        if (id <= 0) return BadRequest("Id must be greater than 0.");
        var emp = _employees.FirstOrDefault(e => e.Id == id);
        if (emp is null) return BadRequest($"Employee with Id {id} not found.");

        _employees.Remove(emp);
        return NoContent();
    }
}
