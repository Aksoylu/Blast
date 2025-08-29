using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.DomainServices
{
    public interface ITeamInviteManagementDomainService
    {
        Task<bool> InviteNewUserToTeam(string username, string organization, string teamName, string? description, string receiverUsername);
        Task<List<ETeamInvite>> GetReceivedTeamInviteList(string username, string organization);
        Task<List<ETeamInvite>> GetSentTeamInviteList(string username, string organization, string teamName);
    }
}
