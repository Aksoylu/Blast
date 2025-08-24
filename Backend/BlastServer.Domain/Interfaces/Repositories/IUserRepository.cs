using BlastServer.Domain.Entities;

namespace BlastServer.Domain.Interfaces.Repositories;

public interface IUserRepository
{
    Task<EUser> GetByUsername(string username);
    Task<EUser> GetByMail(string mail);
    Task<object?> Create(EUser user);
    Task<bool> DeleteByUsername(string username);
    Task<List<EUser>> ListByPagination(int page, int pageSize);
    Task<bool> UpdateUser(EUser user);
}
