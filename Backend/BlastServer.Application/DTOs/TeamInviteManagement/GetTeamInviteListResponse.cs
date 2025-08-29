using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamInviteManagement
{
    public class GetTeamInviteListResponse: ResponseDTO
    {
        public List<ETeamInvite> Items { get; set; }
    }
}
