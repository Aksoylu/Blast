using BlastServer.Application.DTOs.TeamManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Services
{
    public interface ITeamManagementAppService
    {
        Task<GetTeamListResponse> GetTeamList(GetTeamListRequest request);
        Task<CreateNewTeamResponse> CreateNewTeam(CreateNewTeamRequest request);
        Task<DeleteTeamResponse> DeleteTeam(DeleteTeamRequest request);
        Task<TransferTeamOwnershipResponse> TransferTeamOwnership(TransferTeamOwnershipRequest request);
        Task<InviteNewUserToTeamResponse> InviteNewUserToTeam(InviteNewUserToTeamRequest request);
        Task<GetTeamInviteListResponse> GetReceivedTeamInviteList(GetTeamInviteListRequest request);
        Task<GetTeamInviteListResponse> GetSentTeamInviteList(GetSentTeamInviteListRequest request);
        Task<QuitTeamResponse> QuitTeam(QuitTeamRequest request);
    }
}
