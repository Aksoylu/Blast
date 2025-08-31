using BlastServer.Domain.DomainObjects.TeamManagement;
using BlastServer.Domain.Entities;

namespace BlastServer.Domain.Interfaces.Repositories
{
    public interface ITeamRepository
    {
        Task<ETeam> Create(ETeam team);
        Task<bool> DeleteByFilter(TeamFilter inputFilter);
        Task<bool> UpdateByFilter(TeamFilter inputFilter, ETeam team);
        Task<ETeam?> GetByFilter(TeamFilter inputFilter);
        Task<List<ETeam>> ListByFilter(TeamFilter inputFilter);
    }
}
