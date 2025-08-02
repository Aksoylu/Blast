using BlastServer.Application.DTOs.Authorization;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainService;
using BlastServer.Domain.Interfaces.Repositories;
using BlastServer.Domain.Services;
using BlastServer.Domain.ValueObjects;
using System.Data;


namespace BlastServer.Application.Services
{
    public class AuthorizationAppService : IAuthorizationAppService
    {
        private readonly IAuthorizationDomainService authorizationDomainService;
        
        public AuthorizationAppService(IAuthorizationDomainService _authorizationDomainService)
        {
            this.authorizationDomainService = _authorizationDomainService;
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
    }
}
