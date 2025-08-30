using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Common.Constants;
using BlastServer.Domain.Interfaces.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Cache.Providers
{
    public class TeamInfoCacheProvider : ITeamInfoCacheProvider
    {
        ICacheService<TeamInfo> cacheService;
        public TeamInfoCacheProvider(ICacheService<TeamInfo> _cacheService)
        {
            this.cacheService = _cacheService;
        }

        public void SetTeamInfo(TeamInfo teamInfo)
        {
            this.cacheService.Set($"teaminfo:{teamInfo.Organization}:{teamInfo.TeamName}", teamInfo);
        }

        public void RemoveTeamInfo(string organization, string teamName)
        {
            this.cacheService.Delete($"teaminfo:{organization}:{teamName}");
        }

        public TeamInfo? GetTeamInfo(string organization, string teamName)
        {
            return this.cacheService.Get($"teaminfo:{organization}:{teamName}");
        }
    }
}
