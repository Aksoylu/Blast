using BlastServer.Application.DTOs.TeamInviteManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Interfaces
{
    public interface ITeamInviteManagementAppService
    {
        Task<InviteNewUserToTeamResponse> InviteNewUserToTeam(InviteNewUserToTeamRequest request);
        Task<GetTeamInviteListResponse> GetReceivedTeamInviteList(GetTeamInviteListRequest request);
        Task<GetTeamInviteListResponse> GetSentTeamInviteList(GetSentTeamInviteListRequest request);
    }
}
