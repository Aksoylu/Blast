using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamManagement
{
    public class TransferTeamOwnershipRequest: RequestDTO
    {
        public string? TeamName { get; set; }
        public string? NewTeamOwner { get; set; }
    }
}
