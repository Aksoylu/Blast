using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Common.Constants;
using BlastServer.Domain.Common.Enums;
using BlastServer.Domain.DomainObjects.Authorization;
using BlastServer.Domain.DomainObjects.SystemManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainService;
using BlastServer.Domain.Interfaces.DomainServices;
using BlastServer.Domain.Interfaces.Repositories;

namespace BlastServer.Domain.Services
{
    public class AuthorizationDomainService : IAuthorizationDomainService
    {
        private readonly IUserRepository userRepository;
        private readonly ICryptService cryptService;
        private readonly IJwtService jwtService;
        private readonly IAuthSessionCacheProvider authSessionCacheProvider;
        private readonly ISystemManagementDomainService systemManagementDomainService;

        public AuthorizationDomainService(
            IUserRepository _userRepository, 
            ICryptService _cryptService,
            IJwtService _jwtService, 
            IAuthSessionCacheProvider _authSessionCacheProvider,
            SystemManagementDomainService _systemManagementDomainService
        )
        {
            this.userRepository = _userRepository;
            this.cryptService = _cryptService;
            this.jwtService = _jwtService;
            this.authSessionCacheProvider = _authSessionCacheProvider;
            this.systemManagementDomainService = _systemManagementDomainService;
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

        public LogoutResult Logout(string? authToken)
        {
            if (string.IsNullOrEmpty(authToken))
            {
                throw new Exception("Auth token is required");
            }

            AuthSession? authSession = this.authSessionCacheProvider.GetAuthInfoWithToken(authToken);
            if (authSession == null)
            {
                throw new Exception("Invalid session");
            }

            this.authSessionCacheProvider.RemoveAuthInfo(authToken);
            return new LogoutResult { IsSuccess = true };
        }

        public async Task<RegisterResult> Register(RegisterInput input)
        {
            bool isUserExistWithSameUsername = (await this.userRepository.GetByUsername(input.Username)) != null;
            if (isUserExistWithSameUsername)
            {
                throw new Exception("User name is already taken");
            }

            bool isUserExistWithSameMail = (await this.userRepository.GetByMail(input.Mail)) != null;
            if (isUserExistWithSameMail)
            {
                throw new Exception($"Mail address '{input.Mail}' is already used by another user");
            }

            GetSystemSettingsResult systemSettings = await this.systemManagementDomainService.GetSystemSettings();

            string? organization = systemSettings.GetValue<string>(SystemSetting.ORGANIZATION);
            UserRoleEnum registerUserRole = systemSettings.GetValue<UserRoleEnum>(SystemSetting.ORGANIZATION);
            AccountStatusEnum registerUserAccountStatus = systemSettings.GetValue<AccountStatusEnum>(SystemSetting.REGISTER_USER_ACCOUNT_STATUS);

            EUser user = new EUser
            {
                Username = input.Username,
                PasswordUnderSHA256 = this.cryptService.HashPassword(input.Password),
                Mail = input.Mail,
                NameSurname = input.NameSurname,
                Organization = organization,
                Role = registerUserRole,
                AccountStatus = registerUserAccountStatus,
            };

            string token = this.jwtService.GenerateToken(user.Username);

            this.authSessionCacheProvider.SetAuthInfo(token, new AuthSession
            {
                UserName = user.Username,
                AuthToken = token,
                Role = user.Role
            });

            return new RegisterResult
            {
                Username = user.Username,
                AuthToken = token
            };
        }

    }
}
