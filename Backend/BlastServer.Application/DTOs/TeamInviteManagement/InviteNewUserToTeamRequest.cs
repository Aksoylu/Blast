using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamInviteManagement
{
    public class InviteNewUserToTeamRequest: RequestDTO
    {
        public required string TeamName { get; set; }
        public required string ReceiverUsername { get; set; }
        public string? InviteDescription { get; set; }

    }
}
