using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.Authorization
{
    public class LoginResult
    {
        public string? Username { get; set; }
        public string? AuthToken { get; set; }
    }
}
