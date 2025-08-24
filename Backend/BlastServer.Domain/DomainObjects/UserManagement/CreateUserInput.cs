using BlastServer.Domain.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.UserManagement
{
    public class CreateUserInput
    {
        public required string Username { get; set; }
        public required string Organization { get; set; }
        public required string Mail { get; set; }
        public required string NameSurname { get; set; }
        public required string Password { get; set; }
        public required AccountStatusEnum AccountStatus { get; set; }
        public required UserRoleEnum? Role { get; set; }
    }
}
