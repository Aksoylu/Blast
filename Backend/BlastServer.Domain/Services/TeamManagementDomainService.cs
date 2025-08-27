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

        
        public async Task<List<ETeam>> GetTeamList(string username, string organization)
        {
           
        }


        public async Task<bool> CreateNewTeam()
        {

        }
        public async Task<bool> DeleteTeam()
        {

        }

        public async Task<bool> TransferTeamOwnership()
        {

        }

        public async Task<bool> InviteNewUserToTeam()
        {

        }
        public async Task<List<UserInfo>> GetReceivedTeamInviteList()
        {

        }


        public async Task<List<UserInfo>> GetSentTeamInviteList()
        {

        }

        public async Task<List<UserInfo>> QuitTeam()
        {

        }
    }
}
