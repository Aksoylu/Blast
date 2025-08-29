using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.Repositories
{
    public interface ITeamRepository
    {
        Task<object?> Create(ETeam team);
        Task<bool> DeleteById(object? objectId);
        Task<object?> GetById(object? objectId);
        Task<bool> UpdateTeam(ETeam team);
        Task<ETeam> GetByOrganizationAndTeamName(string organizationName, string teamName);
        Task<List<ETeam>> ListByOrganizationWithPagination(string organizationName, int page, int pageSize);
        Task<List<ETeam>> ListByOrganizationAndAdminUsername(string organizationName, string adminUsername);
    }
}
