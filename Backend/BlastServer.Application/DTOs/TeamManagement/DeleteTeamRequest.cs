using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamManagement
{
    public class DeleteTeamRequest: RequestDTO
    {
        public required string TeamName { get; set; }
    }
}
