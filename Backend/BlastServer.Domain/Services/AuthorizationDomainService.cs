using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainService;
using BlastServer.Domain.Interfaces.Repositories;
using BlastServer.Domain.ValueObjects;

namespace BlastServer.Domain.Services
{
    public class AuthorizationDomainService: IAuthorizationDomainService
    {
        private readonly IUserRepository userRepository;
        private readonly ICryptService cryptService;
        private readonly IJwtService jwtService;
        private readonly IAuthSessionCacheProvider authSessionCacheProvider;

        public AuthorizationDomainService(IUserRepository _userRepository, ICryptService _cryptService, IJwtService _jwtService, IAuthSessionCacheProvider _authSessionCacheProvider)
        {
            this.userRepository = _userRepository;
            this.cryptService = _cryptService;
            this.jwtService = _jwtService;
            this.authSessionCacheProvider = _authSessionCacheProvider;
        }
        public async Task<LoginResult> Login(string username, string password)
        {
            EUser user = await this.userRepository.GetByUsername(username);
            if (user == null)
            {
                throw new Exception("User not exists");
            }

            if (!user.IsPasswordValid(password, this.cryptService))
            {
                throw new Exception("Invalid password");
            }

            string token = this.jwtService.GenerateToken(user.Username);

            this.authSessionCacheProvider.SetAuthInfo(token, new AuthSession
            {
                UserName = user.Username,
                AuthToken = token,
                Role = user.Role
            });

            return new LoginResult
            {
                Username = user.Username,
                AuthToken = token
            };
        }

    }
}
