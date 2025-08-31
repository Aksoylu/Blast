using BlastServer.Domain.CacheItems;

namespace BlastServer.Domain.Interfaces.Abstractions
{
    public interface ITeamMembershipCacheProvider
    {
        void RemoveTeamMembership(string organization, string teamName, string memberUsername);
        void SetTeamMembership(TeamMembershipInfo teamMembershipInfo);
        List<TeamMembershipInfo> GetTeamMembershipListForUser(string organization, string memberUsername);
    }
}
