using BlastServer.Application.DTOs.Authorization;
using BlastServer.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlastServer.API.Controllers
{
    public class SystemManagementController : ControllerBase
    {

        private readonly IAuthorizationAppService authorizationAppService;

        public SystemManagementController(IAuthorizationAppService _authorizationService)
        {
            this.authorizationAppService = _authorizationService;
        }

        [HttpGet]
        public async Task<LoginResponse> SystemSettings([FromBody] LoginRequest request)
        {
            return await authorizationAppService.Login(request);
        }
    }
}
