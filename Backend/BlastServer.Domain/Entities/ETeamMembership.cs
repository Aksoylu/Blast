using BlastServer.Domain.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Entities
{
    public class ETeamMembership
    {
        public object? _id { get; set; }
        public required string Organization { get; set; }
        public required string TeamName { get; set; }
        public required string UserName { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required TeamMembershipRoleEnum Role { get; set; }
    }
}
