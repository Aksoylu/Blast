using Microsoft.Extensions.Options;
using MongoDB.Driver;

using BlastServer.Infrastructure.Configuration;
using BlastServer.Domain.Interfaces.Abstractions;

namespace BlastServer.Infrastructure.Persistence;

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

