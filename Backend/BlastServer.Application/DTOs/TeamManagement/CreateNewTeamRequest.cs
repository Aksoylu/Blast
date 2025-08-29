using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamManagement
{
    public class CreateNewTeamRequest: RequestDTO
    {
        public required string TeamName { get; set; }
        public required string Description { get; set; }
    }
}
