using BlastServer.Domain.Entities;

namespace BlastServer.Domain.Interfaces.Repositories;

public interface IUserRepository
{
    Task<EUser> GetByUsername(string username);
    Task<EUser> GetByMail(string mail);
    Task Create(EUser user);
}
