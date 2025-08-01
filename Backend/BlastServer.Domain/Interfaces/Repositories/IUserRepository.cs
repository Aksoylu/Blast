using BlastServer.Domain.Entities;

namespace BlastServer.Domain.Interfaces.Repositories;

public interface IUserRepository
{
    Task<EUser> GetByUsername(string username);
    Task AddUser(EUser user);
}
