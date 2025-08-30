using BlastServer.Domain.DomainObjects.TeamManagement;
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
        Task<List<ETeam>> GetTeamList(TeamManagementInput input);
        Task<bool> CreateNewTeam(TeamManagementInput input, string description);
        Task<bool> DeleteTeam(TeamManagementInput input);
        Task<bool> TransferTeamOwnership(TeamManagementInput input, string newOwner);
        Task<bool> QuitTeam(TeamManagementInput input);
        Task<bool> KickUserFromTeam(TeamManagementInput input, string userToKick);
    }
}
