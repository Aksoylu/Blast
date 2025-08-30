using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.TeamManagement
{
    public class TeamManagementInput
    {
        public required string Username { get; set; }
        public required string Organization { get; set; }
        public required string TeamName { get; set; }
    }
}
