using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Persistence.Repositories
{
    public class SystemSettingRepository: ISystemSettingRepository
    {
        private readonly IMongoCollection<ESystemSetting> systemSettingCollection;

        public SystemSettingRepository(IMongoDbService _mongoDbService)
        {
            this.systemSettingCollection = _mongoDbService.GetCollection<ESystemSetting>("SystemSettings");
        }

        public async Task<List<ESystemSetting>> ListAll()
        {
            return await systemSettingCollection.Find(FilterDefinition<ESystemSetting>.Empty).ToListAsync();
        }

        public async Task Set(string key, object value)
        {
            var filter = Builders<ESystemSetting>.Filter.Eq(s => s.Key, key);
            var update = Builders<ESystemSetting>.Update.Set(s => s.Value, value);
            var options = new UpdateOptions { IsUpsert = true };

            await systemSettingCollection.UpdateOneAsync(filter, update, options);
        }

        public async Task SetAll(List<ESystemSetting> settings)
        {
            await systemSettingCollection.DeleteManyAsync(FilterDefinition<ESystemSetting>.Empty);

            if (settings != null && settings.Any())
            {
                await systemSettingCollection.InsertManyAsync(settings);
            }
        }
    }
}
