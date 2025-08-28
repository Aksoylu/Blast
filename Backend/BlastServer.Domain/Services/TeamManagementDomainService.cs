using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.DomainServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Services
{
    public class TeamManagementDomainService: ITeamManagementDomainService
    {
        public TeamManagementDomainService() { }

        public Task<bool> CreateNewTeam(string? username, string? organization, string teamName, string description)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTeam(string username, string organization, string teamName)
        {
            throw new NotImplementedException();
        }

        public Task<List<ETeamInvite>> GetReceivedTeamInviteList(string username, string organization)
        {
            throw new NotImplementedException();
        }

        public Task<List<ETeamInvite>> GetSentTeamInviteList(string username, string organization, string teamName)
        {
            throw new NotImplementedException();
        }

        public Task<List<ETeam>> GetTeamList(string username, string organization)
        {
            throw new NotImplementedException();
        }

        public Task<bool> InviteNewUserToTeam(string username, string organization, string teamName, string description, string receiverUsername)
        {
            throw new NotImplementedException();
        }

        public Task<bool> QuitTeam(string username, string organization, string teamName)
        {
            throw new NotImplementedException();
        }

        public Task<bool> TransferTeamOwnership(string username, string organization, string teamName, string newOwner)
        {
            throw new NotImplementedException();
        }
    }
}
