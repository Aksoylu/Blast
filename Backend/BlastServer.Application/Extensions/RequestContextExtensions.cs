using BlastServer.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Extensions
{
    public static class RequestContextExtensions
    {
        public static string GetUsername(this RequestContext? requestContext)
        {
            if (requestContext is null)
                throw new ArgumentNullException("");

            if(String.IsNullOrEmpty(requestContext.UserName))
            {
                throw new ArgumentNullException(nameof(requestContext.UserName), "Username in RequestContext is null or empty.");
            }

            return requestContext.UserName;
        }

        public static string GetOrganization(this RequestContext? requestContext)
        {
            if (requestContext is null)
                throw new ArgumentNullException("");

            if (String.IsNullOrEmpty(requestContext.Organization))
            {
                throw new ArgumentNullException(nameof(requestContext.UserName), "Organization in RequestContext is null or empty.");
            }

            return requestContext.Organization;
        }

        public static string GetToken(this RequestContext? requestContext)
        {
            if (requestContext is null)
                throw new ArgumentNullException("");

            if (String.IsNullOrEmpty(requestContext.Token))
            {
                throw new ArgumentNullException(nameof(requestContext.UserName), "Token in RequestContext is null or empty.");
            }

            return requestContext.Token;
        }
    }
}
