using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.Authorization
{
    public class RegisterInput
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Mail { get; set; }
        public string NameSurname { get; set; }
    }
}
