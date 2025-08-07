using BlastServer.Application.DTOs;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Common.Enums;
using BlastServer.Domain.Interfaces.Abstractions;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BlastServer.API.Middleware
{
    public class RoleRequired : TypeFilterAttribute
    {
        public RoleRequired() : base(typeof(RoleRequiredImplementation)) { }

        private class RoleRequiredImplementation : IAsyncActionFilter
        {
            private readonly IAuthSessionCacheProvider authSessionCacheProvider;

            public RoleRequiredImplementation(IAuthSessionCacheProvider _authSessionCacheProvider)
            {
                this.authSessionCacheProvider = _authSessionCacheProvider;
            }

            public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
            {
                var httpContext = context.HttpContext;
                UserRoleEnum userRole = (UserRoleEnum) (httpContext.Items["role"] ?? UserRoleEnum.None);
                if(userRole == UserRoleEnum.None)
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
               
                await next();
            }
        }
    }
}
