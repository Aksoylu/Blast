using BlastServer.Application.DTOs.Authorization;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;
using System.Data;


namespace BlastServer.Application.Services
{
    public class AuthorizationAppService : IAuthorizationAppService
    {
        private readonly IUserRepository userRepository;
        private readonly ICryptService cryptService;
        private readonly IJwtService jwtService;
        private readonly IAuthSessionCacheService authInfoCacheService;

        public AuthorizationAppService(IUserRepository _userRepository, ICryptService _cryptService, IJwtService _jwtService, IAuthSessionCacheService _authInfoCacheService)
        {
            this.userRepository = _userRepository;
            this.cryptService = _cryptService;
            this.jwtService = _jwtService;
            this.authInfoCacheService = _authInfoCacheService;
        }

        public async Task<LoginResponse> Login(LoginRequest request)
        {
            var user = await userRepository.GetByUsername(request.Username!);
            if (user == null)
                throw new Exception("User not exists");

            Console.WriteLine(cryptService.HashPassword(request.Password));
            if (!user.IsPasswordValid(request.Password!, cryptService))
                throw new Exception("Invalid password");

            string token = jwtService.GenerateToken(user.Username);

            var authInfo = new AuthSession { UserName = user.Username, AuthToken = token, Role = user.Role};
            authInfoCacheService.SetAuthInfo(token, authInfo);

            return new LoginResponse
            {
                Username = user.Username,
                AuthToken = token
            };
        }
    }
}
