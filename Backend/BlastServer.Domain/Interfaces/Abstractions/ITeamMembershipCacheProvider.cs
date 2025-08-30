using BlastServer.Domain.CacheItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.Abstractions
{
    public interface ITeamMembershipCacheProvider
    {
        void RemoveTeamMembership(string organization, string teamName, string memberUsername);
        void SetTeamMembership(TeamMembershipInfo teamMembershipInfo);
        List<TeamMembershipInfo> GetTeamMembershipListForUser(string organization, string memberUsername);
    }
}
