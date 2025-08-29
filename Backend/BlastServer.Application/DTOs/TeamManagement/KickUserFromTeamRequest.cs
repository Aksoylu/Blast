using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamManagement
{
    public class KickUserFromTeamRequest: RequestDTO
    {
        public required string TeamName { get; set; }
        public required string UserToKick { get; set; }
    }
}
