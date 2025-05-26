using Microsoft.Extensions.Options;
using MongoDB.Driver;

using BlastBackend.Core.Models;
using BlastBackend.Core.Interfaces;

namespace BlastBackend.Core
{

    public class MongoDbService : IMongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IOptions<MongoDbSettings> mongoOptions, IMongoClient mongoClient)
        {
            var settings = mongoOptions.Value;
            _database = mongoClient.GetDatabase(settings.DatabaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }
    }

}
