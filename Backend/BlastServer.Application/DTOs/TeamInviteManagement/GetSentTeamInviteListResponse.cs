using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.TeamInviteManagement
{
    public class GetSentTeamInviteListResponse: ResponseDTO
    {
        public List<ETeamInvite> Items {  get; set; }
    }
}
