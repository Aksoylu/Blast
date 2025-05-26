using MongoDB.Driver;

namespace BlastBackend.Core.Interfaces
{
    public interface IMongoDbService
    {
        IMongoCollection<T> GetCollection<T>(string collectionName);
    }
}
