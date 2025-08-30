using AutoMapper;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.DomainObjects.TeamManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainServices;
using BlastServer.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Services
{
    public class TeamManagementDomainService: ITeamManagementDomainService
    {
        private readonly ITeamRepository teamRepository;
        private readonly ITeamInfoCacheProvider teamInfoCacheProvider;
        private readonly IMapper mapper;

        public TeamManagementDomainService(
            ITeamRepository _teamRepository,
            ITeamInfoCacheProvider _teamInfoCacheProvider,
            IMapper _mapper
        )
        {
            this.teamRepository = _teamRepository;
            this.teamInfoCacheProvider = _teamInfoCacheProvider;
            this.mapper = _mapper;
        }

        public async Task<bool> CreateNewTeam(TeamManagementInput input, string description)
        {
            ETeam? existingTeam = await this.teamRepository.GetByOrganizationAndTeamName(input.Organization, input.TeamName);
            if(existingTeam == null)
            {
                throw new Exception($"Team {input.TeamName} is already exist in namespacee: {input.Organization}");
            }

            ETeam newTeam = new ETeam
            {
                TeamName = input.TeamName,
                Organization = input.Organization,
                AdminUsername = input.Username,
                Description = description,
                MemberUsernameList = new List<string> { input.Username },
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            object? objectId = await this.teamRepository.Create(newTeam);
            if(objectId == null)
            {
                throw new Exception("Failed to create new team");
            }

            TeamInfo cacheItem = this.mapper.Map<TeamInfo>(newTeam);

            this.teamInfoCacheProvider.SetTeamInfo(cacheItem);

            return true;
        }

        public Task<bool> DeleteTeam(TeamManagementInput input)
        {
            throw new NotImplementedException();
        }

        public Task<List<ETeam>> GetTeamList(TeamManagementInput input)
        {
            throw new NotImplementedException();
        }

        public Task<bool> KickUserFromTeam(TeamManagementInput input, string userToKick)
        {
            throw new NotImplementedException();
        }

        public Task<bool> QuitTeam(TeamManagementInput input)
        {
            throw new NotImplementedException();
        }

        public Task<bool> TransferTeamOwnership(TeamManagementInput input, string newOwner)
        {
            throw new NotImplementedException();
        }
    }
}
