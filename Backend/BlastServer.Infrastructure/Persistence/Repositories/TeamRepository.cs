using BlastServer.Domain.DomainObjects.TeamInviteManagement;
using BlastServer.Domain.DomainObjects.TeamManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Components.Forms;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlastServer.Infrastructure.Persistence.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private readonly IMongoCollection<ETeam> teamCollection;

        public TeamRepository(IMongoDbService _mongoDbService)
        {
            this.teamCollection = _mongoDbService.GetCollection<ETeam>("Teams");
        }

        public async Task<ETeam> Create(ETeam team)
        {
            team._id = ObjectId.GenerateNewId().ToString();
            await this.teamCollection.InsertOneAsync(team);

            return team;
        }

        public async Task<bool> DeleteByFilter(TeamFilter inputFilter)
        {
            FilterDefinition<ETeam> filter = this.buildFilter(inputFilter);

            DeleteResult result = await this.teamCollection.DeleteOneAsync(filter);
            return (result.DeletedCount > 0);
        }

        public async Task<bool> UpdateByFilter(TeamFilter inputFilter, ETeam team)
        {
            FilterDefinition<ETeam> filter = this.buildFilter(inputFilter);
            
            var updateBuilder = Builders<ETeam>.Update;
            var updateCommand = updateBuilder
                .Set(updated => updated.AdminUsername, team.AdminUsername)
                .Set(updated => updated.MemberUsernameList, team.MemberUsernameList)
                .Set(updated => updated.Description, team.Description)
                .Set(updated => updated.UpdatedAt, DateTime.Now);

            UpdateResult result = await this.teamCollection.UpdateOneAsync(filter, updateCommand);

            return (result.ModifiedCount > 0);
        }

    
        public async Task<ETeam?> GetByFilter(TeamFilter inputFilter)
        {
            FilterDefinition<ETeam> filter = this.buildFilter(inputFilter);
            ETeam? team = await this.teamCollection
                .Find(filter)
                .FirstOrDefaultAsync();

            return team;
        }

        public async Task<List<ETeam>> ListByFilter(TeamFilter inputFilter)
        {
            FilterDefinition<ETeam> filter = this.buildFilter(inputFilter);
            List<ETeam> teamList = await this.teamCollection
                .Find(filter)
                .ToListAsync();

            return teamList;
        }

        private FilterDefinition<ETeam> buildFilter(TeamFilter inputFilter)
        {
            FilterDefinitionBuilder<ETeam> filterBuilder = Builders<ETeam>.Filter;
            List<FilterDefinition<ETeam>> filters = new List<FilterDefinition<ETeam>> { };

            if (inputFilter.Id != null)
            {
                filters.Add(filterBuilder.Eq(team => team._id, inputFilter.Id));
            }

            if (!string.IsNullOrEmpty(inputFilter.Organization))
            {
                filters.Add(filterBuilder.Eq(team => team.Organization, inputFilter.Organization));
            }

            if (!string.IsNullOrEmpty(inputFilter.TeamName))
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.TeamName, inputFilter.TeamName));
            }

            if (!string.IsNullOrEmpty(inputFilter.AdminUsername))
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.AdminUsername, inputFilter.AdminUsername));
            }

            if (!string.IsNullOrEmpty(inputFilter.Description))
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.Description, inputFilter.Description));
            }

            FilterDefinition<ETeam> filter = filterBuilder.And(filters);

            return filter;
        }

    }
}
