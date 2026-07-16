using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Week5_WebAPI.Filters;

/// <summary>
/// Global exception filter. Logs unhandled exceptions to Logs/error.txt
/// and returns HTTP 500 with a safe error message.
/// </summary>
public class CustomExceptionFilter : IExceptionFilter
{
    private static readonly string LogDirectory = Path.Combine(AppContext.BaseDirectory, "Logs");
    private static readonly string LogFile       = Path.Combine(LogDirectory, "error.txt");

    /// <inheritdoc/>
    public void OnException(ExceptionContext context)
    {
        Directory.CreateDirectory(LogDirectory);

        var entry = $"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}] {context.Exception.GetType().Name}: " +
                    $"{context.Exception.Message}{Environment.NewLine}{context.Exception.StackTrace}" +
                    $"{Environment.NewLine}---{Environment.NewLine}";

        File.AppendAllText(LogFile, entry);

        context.Result = new ObjectResult(new { error = "An internal server error occurred." })
        {
            StatusCode = StatusCodes.Status500InternalServerError
        };

        context.ExceptionHandled = true;
    }
}
