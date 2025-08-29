using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.DomainServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Services
{
    public class TeamInviteManagementDomainService : ITeamInviteManagementDomainService
    {
        public Task<List<ETeamInvite>> GetReceivedTeamInviteList(string username, string organization)
        {
            throw new NotImplementedException();
        }

        public Task<List<ETeamInvite>> GetSentTeamInviteList(string username, string organization, string teamName)
        {
            throw new NotImplementedException();
        }

        public Task<bool> InviteNewUserToTeam(string username, string organization, string teamName, string? description, string receiverUsername)
        {
            throw new NotImplementedException();
        }
    }
}
