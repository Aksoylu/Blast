using BlastBackend.Core.Interfaces;
using BlastBackend.Interfaces.Repository;
using BlastBackend.Models.Entity;
using MongoDB.Driver;

namespace BlastBackend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<EUser> _userCollection;

        public UserRepository(IMongoDbService mongoDbService)
        {
            _userCollection = mongoDbService.GetCollection<EUser>("Users");
        }

        public async Task<EUser> GetByUsername(string username)
        {
            return await _userCollection.Find(u => u.Username == username).FirstOrDefaultAsync();
        }

        public async Task AddUser(EUser user)
        {
            await _userCollection.InsertOneAsync(user);
        }
    }

}
