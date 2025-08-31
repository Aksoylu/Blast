using BlastServer.Domain.Common.Enums;
using BlastServer.Domain.DomainObjects.TeamInviteManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Components.Forms;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Persistence.Repositories
{
    public class TeamInviteRepository: ITeamInviteRepository
    {
        private readonly IMongoCollection<ETeamInvite> teamInviteCollection;

        public TeamInviteRepository(IMongoDbService _mongoDbService)
        {
            this.teamInviteCollection = _mongoDbService.GetCollection<ETeamInvite>("TeamInvites");
        }

        public async Task<ETeamInvite> Create(ETeamInvite teamInvite)
        {
            teamInvite._id = ObjectId.GenerateNewId().ToString();
            await this.teamInviteCollection.InsertOneAsync(teamInvite);

            return teamInvite;
        }

        public async Task<List<ETeamInvite>> ListByFilter(TeamInviteFilter inputFilter)
        {
            FilterDefinition<ETeamInvite> filter = this.buildFilter(inputFilter);

            var result = await this.teamInviteCollection.Find(filter).ToListAsync();
            return result;
        }

        public async Task<bool> UpdateStatusByFilter(TeamInviteFilter inputFilter, TeamInviteStatusEnum newStatus)
        {
            FilterDefinition<ETeamInvite> filter = this.buildFilter(inputFilter);

            var updateBuilder = Builders<ETeamInvite>.Update;
         
            var updateCommand = updateBuilder.Set(updated => updated.Status, newStatus);
            UpdateResult result = await this.teamInviteCollection.UpdateOneAsync(filter, updateCommand);

            return (result.ModifiedCount > 0);
        }

        public async Task<bool> DeleteByFilter(TeamInviteFilter inputFilter)
        {
            FilterDefinition<ETeamInvite> filter = this.buildFilter(inputFilter);

            DeleteResult result = await this.teamInviteCollection.DeleteOneAsync(filter);
            return (result.DeletedCount > 0);
        }

        private FilterDefinition<ETeamInvite> buildFilter(TeamInviteFilter inputFilter)
        {
            FilterDefinitionBuilder<ETeamInvite> filterBuilder = Builders<ETeamInvite>.Filter;
            List<FilterDefinition<ETeamInvite>> filters = new List<FilterDefinition<ETeamInvite>> { };

            if(inputFilter.Id != null)
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite._id, inputFilter.Id));
            }

            if (!string.IsNullOrEmpty(inputFilter.Organization))
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.Organization, inputFilter.Organization));
            }

            if (!string.IsNullOrEmpty(inputFilter.TeamName))
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.TeamName, inputFilter.TeamName));
            }

            if (inputFilter.Status.HasValue)
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.Status, inputFilter.Status.Value));
            }

            if (!string.IsNullOrEmpty(inputFilter.SenderUserName))
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.SenderUserName, inputFilter.SenderUserName));
            }

            if (!string.IsNullOrEmpty(inputFilter.ReceiverUserName))
            {
                filters.Add(filterBuilder.Eq(teamInvite => teamInvite.ReceiverUserName, inputFilter.ReceiverUserName));
            }

            FilterDefinition<ETeamInvite> filter = filterBuilder.And(filters);

            return filter;
        }

    }
}
