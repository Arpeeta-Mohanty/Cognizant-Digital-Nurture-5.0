using Microsoft.AspNetCore.Mvc;

namespace Week5_WebAPI.Controllers;

/// <summary>
/// Hands-On 1 – Basic Web API demonstrating REST verbs and HTTP status codes.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ValuesController : ControllerBase
{
    private static readonly List<string> _values = new() { "value1", "value2", "value3" };

    /// <summary>Returns all values. HTTP 200 OK.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    public IActionResult Get() => Ok(_values);

    /// <summary>Returns a single value by index. HTTP 200 or 404.</summary>
    /// <param name="id">Zero-based index.</param>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Get(int id)
    {
        if (id < 0 || id >= _values.Count)
            return NotFound($"No value at index {id}.");
        return Ok(_values[id]);
    }

    /// <summary>Adds a new value. HTTP 201 Created.</summary>
    /// <param name="value">String value to add.</param>
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Post([FromBody] string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return BadRequest("Value cannot be empty.");
        _values.Add(value);
        return CreatedAtAction(nameof(Get), new { id = _values.Count - 1 }, value);
    }

    /// <summary>Updates an existing value by index. HTTP 200 or 400.</summary>
    /// <param name="id">Zero-based index.</param>
    /// <param name="value">New string value.</param>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Put(int id, [FromBody] string value)
    {
        if (id < 0 || id >= _values.Count)
            return BadRequest($"Index {id} is out of range.");
        _values[id] = value;
        return Ok(_values[id]);
    }

    /// <summary>Deletes a value by index. HTTP 204 No Content or 400.</summary>
    /// <param name="id">Zero-based index.</param>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Delete(int id)
    {
        if (id < 0 || id >= _values.Count)
            return BadRequest($"Index {id} is out of range.");
        _values.RemoveAt(id);
        return NoContent();
    }
}
