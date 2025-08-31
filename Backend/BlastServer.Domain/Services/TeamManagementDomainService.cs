using AutoMapper;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Common.Enums;
using BlastServer.Domain.DomainObjects.TeamManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainServices;
using BlastServer.Domain.Interfaces.Repositories;

namespace BlastServer.Domain.Services
{
    public class TeamManagementDomainService: ITeamManagementDomainService
    {
        private readonly ITeamRepository teamRepository;
        private readonly ITeamInfoCacheProvider teamInfoCacheProvider;
        private readonly ITeamMembershipCacheProvider teamMembershipCacheProvider;
        private readonly IMapper mapper;

        public TeamManagementDomainService(
            ITeamRepository _teamRepository,
            ITeamInfoCacheProvider _teamInfoCacheProvider,
            ITeamMembershipCacheProvider _teamMembershipCacheProvider,
            IMapper _mapper
        )
        {
            this.teamRepository = _teamRepository;
            this.teamInfoCacheProvider = _teamInfoCacheProvider;
            this.teamMembershipCacheProvider = _teamMembershipCacheProvider;
            this.mapper = _mapper;
        }

        public async Task<bool> CreateNewTeam(TeamManagementInput input, string description)
        {
            // Check team existence
            ETeam? existingTeam = await this.getTeam(input.Organization, input.TeamName);
            if(existingTeam != null)
            {
                throw new Exception($"Team {input.TeamName} is already exist in organization: {input.Organization}");
            }

            // Create new team on DB & Cache
            ETeam newTeam = await this.teamRepository.Create(new ETeam
            {
                TeamName = input.TeamName,
                Organization = input.Organization,
                AdminUsername = input.Username,
                Description = description,
                MemberUsernameList = new List<string> { input.Username },
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            });

            if(newTeam._id == null)
            {
                throw new Exception("Failed to create new team");
            }

            TeamInfo cacheItem = this.mapper.Map<TeamInfo>(newTeam);

            this.teamInfoCacheProvider.SetTeamInfo(cacheItem);

            // Set membership cache
            this.teamMembershipCacheProvider.SetTeamMembership(new TeamMembershipInfo
            {
                Organization = input.Organization,
                TeamName = input.TeamName,
                Username = input.Username,
                Role = TeamMembershipRoleEnum.Admin
            });

            return true;
        }

        public async Task<bool> DeleteTeam(TeamManagementInput input)
        {
            // Check team existence
            ETeam? existingTeam = await this.getTeam(input.Organization, input.TeamName);
            if (existingTeam == null)
            {
                throw new Exception($"Team {input.TeamName} is already not exist in organization: {input.Organization}");
            }

            // Deleting team info on DB & Cache
            bool result = await this.teamRepository.DeleteByFilter(new TeamFilter
            {
                Organization = input.Organization,
                TeamName = input.TeamName
            });

            if(result)
            {
                this.teamInfoCacheProvider.RemoveTeamInfo(input.Organization, input.TeamName);
            }

            // Clean memberships
            if(existingTeam.MemberUsernameList.Count > 0)
            {   
                foreach(string memberUsername in existingTeam.MemberUsernameList)
                {
                    this.teamMembershipCacheProvider.RemoveTeamMembership(input.Organization, input.TeamName, memberUsername);
                }
            }

            return result;
        }
        public async Task<bool> TransferTeamOwnership(TeamManagementInput input, string newOwner)
        {
            // Check team existence
            ETeam? existingTeam = await this.getTeam(input.Organization, input.TeamName);
            if (existingTeam == null)
            {
                throw new Exception($"Team {input.TeamName} is already exist in organization: {input.Organization}");
            }

            // Update team owner on DB & Cache
            existingTeam.AdminUsername = newOwner;
            bool result = await this.teamRepository.UpdateTeam(existingTeam);
            if(!result)
            {
                throw new Exception("Failed on db transaction");
            }

            // Update team info on cache
            TeamInfo cacheItem = this.mapper.Map<TeamInfo>(existingTeam);
            this.teamInfoCacheProvider.SetTeamInfo(cacheItem);

            // Update new membership cache role
            this.teamMembershipCacheProvider.SetTeamMembership(new TeamMembershipInfo
            {
                Organization = input.Organization,
                TeamName = input.TeamName,
                Username = newOwner,
                Role = TeamMembershipRoleEnum.Admin
            });

            // Update current users membership cache role
            this.teamMembershipCacheProvider.SetTeamMembership(new TeamMembershipInfo
            {
                Organization = input.Organization,
                TeamName = input.TeamName,
                Username = input.Username,
                Role = TeamMembershipRoleEnum.Admin
            });

            return true;
        }

        public async Task<bool> QuitTeam(TeamManagementInput input)
        {
            // Check team existence
            ETeam? existingTeam = await this.getTeam(input.Organization, input.TeamName);
            if (existingTeam == null)
            {
                throw new Exception($"Team {input.TeamName} is not exist in organization: {input.Organization}");
            }

            if(existingTeam.AdminUsername == input.Username)
            {
                throw new Exception("Team admin cannot quit the team, please transfer the ownership first");
            }

            // Remove user from team member list
            existingTeam.MemberUsernameList.Remove(input.Username);
            bool result = await this.teamRepository.UpdateTeam(existingTeam);
            if (!result)
            {
                throw new Exception("Failed on db transaction");
            }

            // Update team info on cache
            TeamInfo cacheItem = this.mapper.Map<TeamInfo>(existingTeam);
            this.teamInfoCacheProvider.SetTeamInfo(cacheItem);

            // Remove membership cache
            this.teamMembershipCacheProvider.RemoveTeamMembership(input.Organization, input.TeamName, input.Username);

            return true;
        }

        public async Task<List<TeamInfo>> GetTeamList(TeamManagementInput input)
        {
            List<TeamMembershipInfo> membershipList =  this.teamMembershipCacheProvider.GetTeamMembershipListForUser(input.Organization, input.Username);
            
            List<TeamInfo> teamInfoList = new List<TeamInfo>();
            foreach(TeamMembershipInfo membership in membershipList)
            {
                ETeam? teamEntity = await this.getTeam(input.Organization, input.TeamName);
                if(teamEntity == null)
                {
                    // Clean up invalid cache
                    this.teamMembershipCacheProvider.RemoveTeamMembership(input.Organization, membership.TeamName, input.Username);
                    continue;
                }

                TeamInfo teamInfo = this.mapper.Map<TeamInfo>(teamEntity);
                teamInfoList.Add(teamInfo);
            }

            return teamInfoList;
        }

        public async Task<bool> KickUserFromTeam(TeamManagementInput input, string userToKick)
        {
            // Check team existence
            ETeam? existingTeam = await this.getTeam(input.Organization, input.TeamName);
            if (existingTeam == null)
            {
                throw new Exception($"Team {input.TeamName} is not exist in organization: {input.Organization}");
            }

            if (existingTeam.AdminUsername != input.Username)
            {
                throw new Exception("Only team admin can kick user from team");
            }

            // Remove user from team member list
            existingTeam.MemberUsernameList.Remove(input.Username);
            bool result = await this.teamRepository.UpdateTeam(existingTeam);
            if (!result)
            {
                throw new Exception("Failed on db transaction");
            }

            // Update team info on cache
            TeamInfo cacheItem = this.mapper.Map<TeamInfo>(existingTeam);
            this.teamInfoCacheProvider.SetTeamInfo(cacheItem);

            // Remove membership cache
            this.teamMembershipCacheProvider.RemoveTeamMembership(input.Organization, input.TeamName, input.Username);

            return true;
        }

        private async Task<ETeam?> getTeam(string organization, string teamName)
        {
            // Try to get from cache first
            TeamInfo? teamInfo = this.teamInfoCacheProvider.GetTeamInfo(organization, teamName);
            if(teamInfo != null)
            {
                return this.mapper.Map<ETeam>(teamInfo);
            }

            // Fallback to DB
            ETeam? dbTeamEntity = await this.teamRepository.GetByOrganizationAndTeamName(organization, teamName);
            
            TeamInfo cacheItem = this.mapper.Map<TeamInfo>(dbTeamEntity);
            this.teamInfoCacheProvider.SetTeamInfo(cacheItem);

            return dbTeamEntity;
        }

    }
}
