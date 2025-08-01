namespace BlastServer.API.Middleware
{
    public class RunSafely
    {
        private readonly RequestDelegate _next;

        public RunSafely(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";

                var response = new { Error = ex.Message, StackTrace = ex.StackTrace };

                await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(response));
            }
        }
    }
}
