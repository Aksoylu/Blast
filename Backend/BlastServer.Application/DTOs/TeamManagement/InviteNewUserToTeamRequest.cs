using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamManagement
{
    public class InviteNewUserToTeamRequest: RequestDTO
    {
        public string? TeamName { get; set; }
        public string? TeamDescription { get; set; }
        public string? ReceiverUsername { get; set; }
    }
}
