using MongoDB.Driver;

namespace BlastServer.Domain.Interfaces.Abstractions;
public interface IMongoDbService
{
    IMongoCollection<T> GetCollection<T>(string collectionName);
}
