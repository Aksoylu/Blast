using BlastBackend.Models.Entity;

namespace BlastBackend.Interfaces.Repository
{
    public interface IUserRepository
    {
        Task<EUser> GetByUsername(string username);
        Task AddUser(EUser user);
    }
}
