using BlastServer.Application.DTOs.TeamInviteManagement;
using BlastServer.Application.DTOs.TeamManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Interfaces
{
    public interface ITeamManagementAppService
    {
        Task<GetTeamListResponse> GetTeamList(GetTeamListRequest request);
        Task<CreateNewTeamResponse> CreateNewTeam(CreateNewTeamRequest request);
        Task<DeleteTeamResponse> DeleteTeam(DeleteTeamRequest request);
        Task<QuitTeamResponse> QuitTeam(QuitTeamRequest request);
        Task<KickUserFromTeamResponse> KickUserFromTeam(KickUserFromTeamRequest request);
        Task<TransferTeamOwnershipResponse> TransferTeamOwnership(TransferTeamOwnershipRequest request);
    }
}
