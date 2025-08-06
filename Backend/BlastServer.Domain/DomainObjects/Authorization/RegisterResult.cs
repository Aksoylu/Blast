using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.Authorization
{
    public class RegisterResult
    {
        public string? Id { get; set; }
        public string? Username { get; set; }
        public string? AuthToken { get; set; }
    }
}
