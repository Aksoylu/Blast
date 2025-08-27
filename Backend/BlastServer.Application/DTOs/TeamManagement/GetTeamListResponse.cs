using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamManagement
{
    public class GetTeamListResponse: ResponseDTO
    {
        public required List<ETeam> Items { get; set; }
    }
}
