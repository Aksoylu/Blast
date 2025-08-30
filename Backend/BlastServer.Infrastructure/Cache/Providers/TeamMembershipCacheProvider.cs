using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Interfaces.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Cache.Providers
{
    public class TeamMembershipCacheProvider: ITeamMembershipCacheProvider
    {
        ICacheService<TeamMembershipInfo> cacheService;
        public TeamMembershipCacheProvider(ICacheService<TeamMembershipInfo> _cacheService)
        {
            this.cacheService = _cacheService;
        }

        public void RemoveTeamMembership(string organization, string teamName, string memberUsername)
        {
            string cacheKey = this.buildKey(organization, teamName, memberUsername);
            this.cacheService.Delete(cacheKey);
        }

        public void SetTeamMembership(TeamMembershipInfo teamMembershipInfo)
        {
            string cacheKey = this.buildKey(teamMembershipInfo.Organization, teamMembershipInfo.TeamName, teamMembershipInfo.UserName);
            this.cacheService.Set(cacheKey, teamMembershipInfo);
        }

        public List<TeamMembershipInfo> GetTeamMembershipListForUser(string organization, string memberUsername)
        {
            string scanPattern = $"teammembership:{organization}:{memberUsername}:*";
            IEnumerable<string> keys = this.cacheService.GetKeys(scanPattern);

            List<TeamMembershipInfo> memberships = this.cacheService.GetMany(keys)
                .Where(x => x != null)
                .Cast<TeamMembershipInfo>()
                .ToList();

            return memberships;
        }

        private string buildKey(string organization, string teamName, string memberUserName)
        {
            return $"teammembership:{organization}:{memberUserName}:{teamName}";
        }
    }
}
