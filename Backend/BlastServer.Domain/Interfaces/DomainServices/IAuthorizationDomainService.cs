using BlastServer.Domain.DomainObjects.Authorization;

namespace BlastServer.Domain.Interfaces.DomainService;

public interface IAuthorizationDomainService
{
    public Task<LoginResult> Login(string username, string password);
    public LogoutResult Logout(string authToken);
    public Task<RegisterResult> Register(RegisterInput input);
}
