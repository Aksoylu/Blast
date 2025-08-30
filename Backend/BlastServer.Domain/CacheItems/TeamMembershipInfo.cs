using BlastServer.Domain.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.CacheItems
{
    public class TeamMembershipInfo
    {
        public required string Organization { get; set; }
        public required string TeamName { get; set; }
        public required string Username { get; set; }
        public required TeamMembershipRoleEnum Role { get; set; }
    }
}
