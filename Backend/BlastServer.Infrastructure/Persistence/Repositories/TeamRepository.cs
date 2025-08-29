using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BlastServer.Infrastructure.Persistence.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private readonly IMongoCollection<ETeam> teamCollection;

        public TeamRepository(IMongoDbService _mongoDbService)
        {
            this.teamCollection = _mongoDbService.GetCollection<ETeam>("Teams");
        }

        public async Task<object?> Create(ETeam team)
        {
            team._id = ObjectId.GenerateNewId().ToString();
            await this.teamCollection.InsertOneAsync(team);

            return team._id;
        }

        public async Task<bool> DeleteById(object? objectId)
        {
            DeleteResult result = await this.teamCollection.DeleteOneAsync(t => t._id == objectId);
            return (result.DeletedCount > 0);
        }

        public async Task<object?> GetById(object? objectId)
        {
            return await this.teamCollection.Find(t => t._id == objectId).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateTeam(ETeam team)
        {
            var filterBuilder = Builders<ETeam>.Filter;
            var updateBuilder = Builders<ETeam>.Update;

            var filter = filterBuilder.And(
                    filterBuilder.Eq(t => t.Organization, team.Organization),
                    filterBuilder.Eq(t => t.TeamName, team.TeamName)
            );

            var updateCommand = updateBuilder
                .Set(updated => updated.AdminUsername, team.AdminUsername)
                .Set(updated => updated.MemberUsernameList, team.MemberUsernameList)
                .Set(updated => updated.Description, team.Description)
                .Set(updated => updated.UpdatedAt, DateTime.Now);

            UpdateResult result = await this.teamCollection.UpdateOneAsync(filter, updateCommand);

            return (result.ModifiedCount > 0);
        }

        public async Task<ETeam> GetByOrganizationAndTeamName(string organizationName, string teamName)
        {
            ETeam? foundTeam =  await this.teamCollection
                .Find(t => t.Organization == organizationName && t.TeamName == teamName)
                .FirstOrDefaultAsync();

            return foundTeam;
        }
        public async Task<List<ETeam>> ListByOrganizationWithPagination(string organizationName, int page, int pageSize)
        {
            var filterBuilder = Builders<ETeam>.Filter;
            var filter = filterBuilder.Eq(t => t.Organization, organizationName);

            int skip = (page - 1) * pageSize;

            List<ETeam> teamList = await this.teamCollection
                .Find(filter)
                .Skip(skip)
                .Limit(pageSize)
                .ToListAsync();
                
            return teamList;
        }

        public async Task<List<ETeam>> ListByOrganizationAndAdminUsername(string organizationName, string adminUsername)
        {
            var filterBuilder = Builders<ETeam>.Filter;
            var filter = filterBuilder.And(
                filterBuilder.Eq(t => t.Organization , organizationName),
                filterBuilder.Eq(t => t.AdminUsername, adminUsername)
            );

            List<ETeam> teamList = await this.teamCollection
                .Find(filter)
                .ToListAsync();

            return teamList;
        }
    }
}
