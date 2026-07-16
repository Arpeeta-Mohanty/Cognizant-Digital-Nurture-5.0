using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Week5_WebAPI.Filters;

/// <summary>
/// Action filter that validates the Authorization header contains a Bearer token.
/// Returns HTTP 400 if the header is missing or malformed.
/// </summary>
public class CustomAuthFilter : IActionFilter
{
    /// <inheritdoc/>
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue("Authorization", out var authHeader))
        {
            context.Result = new BadRequestObjectResult("Authorization header is missing.");
            return;
        }

        if (!authHeader.ToString().StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            context.Result = new BadRequestObjectResult("Authorization header must start with 'Bearer'.");
        }
    }

    /// <inheritdoc/>
    public void OnActionExecuted(ActionExecutedContext context) { }
}
