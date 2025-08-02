using BlastServer.Domain.ValueObjects;

namespace BlastServer.Domain.Interfaces.DomainService;

public interface IAuthorizationDomainService
{
    public Task<LoginResult> Login(string username, string password);
}
