using BlastServer.Domain.Common.Enums;
using BlastServer.Domain.DomainObjects.TeamInviteManagement;
using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.Repositories
{
    public interface ITeamInviteRepository
    {
        Task<ETeamInvite> Create(ETeamInvite teamInvite);
        Task<List<ETeamInvite>> ListByFilter(TeamInviteFilter inputFilter);
        Task<bool> UpdateStatusByFilter(TeamInviteFilter inputFilter, TeamInviteStatusEnum newStatus);
        Task<bool> DeleteByFilter(TeamInviteFilter inputFilter);
    }
}
