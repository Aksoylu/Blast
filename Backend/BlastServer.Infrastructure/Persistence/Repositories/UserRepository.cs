using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;

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

    public async Task<object?> Create(EUser user)
    {
        user._id = ObjectId.GenerateNewId().ToString();
        await this.userCollection.InsertOneAsync(user);

        return user._id;
    }

    public async Task<EUser> GetByMail(string mail)
    {
        return await this.userCollection.Find(u => u.Mail == mail).FirstOrDefaultAsync();
    }

    public async Task<bool> DeleteByUsername(string username)
    {
        DeleteResult result = await this.userCollection.DeleteOneAsync(u => u.Username == username);
        return (result.DeletedCount > 0);
    }

    public async Task<List<EUser>> ListByPagination(int page, int pageSize)
    {
        int skip = (page - 1) * pageSize;

        var users = await this.userCollection
            .Find(_ => true)
            .Skip(skip)
            .Limit(pageSize)
            .ToListAsync();

        return users;
    }

    public async Task<bool> UpdateUser(EUser user)
    {
        var filter = Builders<EUser>.Filter.Eq(u => u.Username, user.Username);

        var updateCommand = Builders<EUser>.Update
            .Set(updated => updated.Organization, user.Organization)
            .Set(updated => updated.Mail, user.Mail)
            .Set(updated => updated.NameSurname, user.NameSurname)
            .Set(updated => updated.PasswordUnderSHA256, user.PasswordUnderSHA256)
            .Set(updated => updated.AccountStatus, user.AccountStatus)
            .Set(updated => updated.Role, user.Role);

        UpdateResult result = await this.userCollection.UpdateOneAsync(filter, updateCommand);

        return (result.ModifiedCount > 0);
    }

}
