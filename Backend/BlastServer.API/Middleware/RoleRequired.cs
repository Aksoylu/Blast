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
        public RoleRequired(UserRoleEnum[] requiredRoleArray) : base(typeof(RoleRequiredImplementation)) {
            Arguments = new object[] { requiredRoleArray };
        }

        private class RoleRequiredImplementation : IAsyncActionFilter
        {
            UserRoleEnum[] requiredRoleArray;

            public RoleRequiredImplementation(UserRoleEnum[] _requiredRoleArray)
            {
                this.requiredRoleArray = _requiredRoleArray;
            }

            public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
            {
                var httpContext = context.HttpContext;
                
                string? username = httpContext.Items["username"] as string;
                if(String.IsNullOrEmpty(username))
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }

                UserRoleEnum userRole = (UserRoleEnum) (httpContext.Items["role"] ?? UserRoleEnum.None);
                if(!this.requiredRoleArray.Contains(userRole))
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
               
                await next();
            }
        }
    }
}
