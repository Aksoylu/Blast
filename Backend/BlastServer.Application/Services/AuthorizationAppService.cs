using AutoMapper;
using BlastServer.Application.DTOs.Authorization;
using BlastServer.Application.Extensions;
using BlastServer.Application.Interfaces;
using BlastServer.Domain.DomainObjects.Authorization;
using BlastServer.Domain.Interfaces.DomainService;


namespace BlastServer.Application.Services
{
    public class AuthorizationAppService : IAuthorizationAppService
    {
        private readonly IAuthorizationDomainService authorizationDomainService;
        private readonly IMapper mapper;
        
        public AuthorizationAppService(IAuthorizationDomainService _authorizationDomainService, IMapper _mapper)
        {
            this.authorizationDomainService = _authorizationDomainService;
            this.mapper = _mapper;
        }

        public async Task<LoginResponse> Login(LoginRequest request)
        {
            LoginResult result = await this.authorizationDomainService.Login(request.Username, request.Password);

            return new LoginResponse
            {
                Username = result.Username,
                AuthToken = result.AuthToken
            };
        }

        public LogoutResponse Logout (LogoutRequest request)
        {
            LogoutResult result = this.authorizationDomainService.Logout(request.RequestContext.GetToken());
            
            return new LogoutResponse
            {
                IsSuccess = result.IsSuccess
            };
        }

        public async Task<RegisterResponse> Register (RegisterRequest request)
        {
            RegisterInput input = this.mapper.Map<RegisterInput>(request);
            RegisterResult result = await this.authorizationDomainService.Register(input);

            return this.mapper.Map<RegisterResponse>(result);
        }
    }
}
