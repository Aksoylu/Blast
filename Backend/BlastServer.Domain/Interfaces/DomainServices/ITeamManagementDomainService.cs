using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.DomainServices
{
    public interface ITeamManagementDomainService
    {
        Task<List<ETeam>> GetTeamList(string username, string organization);
        Task<bool> CreateNewTeam(string username, string organization, string teamName, string description);
        Task<bool> DeleteTeam(string username, string organization, string teamName);
        Task<bool> TransferTeamOwnership(string username, string organization, string teamName, string newOwner);
        Task<bool> InviteNewUserToTeam(string username, string organization, string teamName, string description, string receiverUsername);
        Task<List<ETeamInvite>> GetReceivedTeamInviteList(string username, string organization);
        Task<List<ETeamInvite>> GetSentTeamInviteList(string username, string organization, string teamName);
        Task<QuitTeamResponse> QuitTeam(QuitTeamRequest request);
    }
}
