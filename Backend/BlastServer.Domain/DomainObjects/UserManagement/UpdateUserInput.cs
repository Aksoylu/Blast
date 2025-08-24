using BlastServer.Domain.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.UserManagement
{
    public class UpdateUserInput
    {
        public required string Username { get; set; }
        public string? Organization { get; set; }
        public string? Mail { get; set; }
        public string? NameSurname { get; set; }
        public string? Password { get; set; }
        public AccountStatusEnum AccountStatus { get; set; }
        public UserRoleEnum? Role { get; set; }
    }
}
