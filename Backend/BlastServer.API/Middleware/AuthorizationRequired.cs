using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Interfaces.Abstractions;

namespace BlastServer.API.Middleware
{
    public class Secured : TypeFilterAttribute
    {
        public Secured() : base(typeof(SecuredImplementation)) { }

        private class SecuredImplementation : IAsyncActionFilter
        {
            private readonly IAuthSessionCacheProvider authSessionCacheProvider;

            public SecuredImplementation(IAuthSessionCacheProvider _authSessionCacheProvider)
            {
                this.authSessionCacheProvider = _authSessionCacheProvider;
            }

            public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
            {
                var httpContext = context.HttpContext;
                var authHeader = httpContext.Request.Headers["Authorization"].FirstOrDefault();

                if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }

                string? token = authHeader.Substring("Bearer ".Length).Trim();
                if (String.IsNullOrEmpty(token))
                {
                    throw new AccessViolationException("Bearer token is not provided");
                }

                AuthSession? sessionInfo = this.authSessionCacheProvider.GetAuthInfoWithToken(token);
                if (sessionInfo == null || String.IsNullOrEmpty(sessionInfo.UserName))
                {
                    throw new AccessViolationException("Invalid authorization token");
                }

                httpContext.Items["username"] = sessionInfo.UserName;
                httpContext.Items["role"] = sessionInfo.Role;

                await next();
            }
        }
    }
}
