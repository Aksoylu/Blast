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
        private readonly IAuthSessionCacheProvider authSessionCacheProvider;

        public AuthorizationAppService(IUserRepository _userRepository, ICryptService _cryptService, IJwtService _jwtService, IAuthSessionCacheProvider _authSessionCacheProvider)
        {
            this.userRepository = _userRepository;
            this.cryptService = _cryptService;
            this.jwtService = _jwtService;
            this.authSessionCacheProvider = _authSessionCacheProvider;
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

            this.authSessionCacheProvider.SetAuthInfo(token, new AuthSession {
                UserName = user.Username, 
                AuthToken = token, 
                Role = user.Role 
            });

            return new LoginResponse
            {
                Username = user.Username,
                AuthToken = token
            };
        }
    }
}
