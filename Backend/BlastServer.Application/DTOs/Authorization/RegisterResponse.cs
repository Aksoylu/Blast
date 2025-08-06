using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.Authorization
{
    public class RegisterResponse
    {
        public string? Id { get; set; }
        public string? Username { get; set; }
        public string? AuthToken { get; set; }
    }
}
