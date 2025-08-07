using BlastServer.Domain.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs
{
    public abstract class RequestDTO
    {
        public RequestContext? RequestContext {  get; set; }
    }

    public class RequestContext
    {
        public string? Token { get; set; }
        public string? UserName { get; set; }
        public UserRoleEnum? Role { get; set; }
    }
}
