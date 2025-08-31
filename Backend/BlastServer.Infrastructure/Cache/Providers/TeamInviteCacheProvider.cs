using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Interfaces.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Cache.Providers
{
    public class TeamInviteCacheProvider: ITeamInviteCacheProvider
    {
        ICacheService<TeamInviteInfo> cacheService;
        public TeamInviteCacheProvider(ICacheService<TeamInviteInfo> _cacheService)
        {
            this.cacheService = _cacheService;
        }

        public void RemoveTeamInvite(string organization, string teamName, string receiverUsername)
        {
            string cacheKey = this.buildKey(organization, teamName, receiverUsername);
            this.cacheService.Delete(cacheKey);
        }

        public void SetTeamInvite(TeamInviteInfo teamInfo)
        {
            string cacheKey = this.buildKey(teamInfo.Organization, teamInfo.TeamName, teamInfo.ReceiverUserName);

            this.cacheService.Set(cacheKey, teamInfo);
        }

        public TeamInviteInfo? GetTeamInvite(string organization, string teamName, string receiverUsername)
        {
            string cacheKey = this.buildKey(organization, teamName, receiverUsername);

            return this.cacheService.Get(cacheKey);
        }

        /// <summary>
        /// Gets all pending invites for a specific team
        /// </summary>
        /// <param name="organization"></param>
        /// <param name="teamName"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<TeamInviteInfo> GetWaitingInvitesForTeam(string organization, string teamName)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets all pending invites for a 'invite receiver user'
        /// </summary>
        /// <param name="receiverUsername"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<TeamInviteInfo> GetWaitingInvitesForUser(string receiverUsername)
        {
            throw new NotImplementedException();
        }

        private string buildKey(string organization, string teamName, string receiverUsername)
        {
            return $"teaminvite:{organization}:{teamName}:{receiverUsername}";
        }
    }
}
