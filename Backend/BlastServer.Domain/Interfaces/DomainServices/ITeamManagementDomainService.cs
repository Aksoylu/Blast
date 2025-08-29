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
        Task<bool> QuitTeam(string username, string organization, string teamName);
        Task<bool> KickUserFromTeam(string username, string organization, string teamName, string userToKick);
    }
}
