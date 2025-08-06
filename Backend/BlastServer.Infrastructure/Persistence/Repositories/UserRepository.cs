using MongoDB.Driver;

using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;


namespace BlastServer.Infrastructure.Persistence.Repository;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<EUser> userCollection;

    public UserRepository(IMongoDbService _mongoDbService)
    {
        this.userCollection = _mongoDbService.GetCollection<EUser>("Users");
    }

    public async Task<EUser> GetByUsername(string username)
    {
        return await this.userCollection.Find(u => u.Username == username).FirstOrDefaultAsync();
    }

    public async Task Create(EUser user)
    {
        await this.userCollection.InsertOneAsync(user);
    }

    public async Task<EUser> GetByMail(string mail)
    {
        return await this.userCollection.Find(u => u.Mail == mail).FirstOrDefaultAsync();
    }
}
