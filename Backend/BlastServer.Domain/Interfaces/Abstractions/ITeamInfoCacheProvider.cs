using BlastServer.Domain.CacheItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.Abstractions
{
    public interface ITeamInfoCacheProvider
    {
        void SetTeamInfo(TeamInfo teamInfo);
        void RemoveTeamInfo(string organization, string teamName);
        TeamInfo? GetTeamInfo(string organization, string teamName);
    }
}
