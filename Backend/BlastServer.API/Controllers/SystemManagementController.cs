using BlastServer.API.Middleware;
using BlastServer.Application.DTOs.Authorization;
using BlastServer.Application.DTOs.SystemManagement;
using BlastServer.Application.Services;
using Microsoft.AspNetCore.Mvc;
using BlastServer.Domain.Common.Enums;

namespace BlastServer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SystemManagementController : ControllerBase
    {

        private readonly ISystemManagementAppService systemManagementAppService;

        public SystemManagementController(ISystemManagementAppService _systemManagementAppService)
        {
            this.systemManagementAppService = _systemManagementAppService;
        }

        [HttpGet("SystemSettings")]
        [Secured]
        [RoleRequired([UserRoleEnum.Admin])]
        public async Task<GetSystemSettingsResponse> GetSystemSettings()
        {
            return await systemManagementAppService.GetSystemSettings();
        }

        [HttpPost("SystemSettings")]
        [Secured]
        [RoleRequired([UserRoleEnum.Admin])]
        public async Task<GetSystemSettingsResponse> SetSystemSettings()
        {
            return await systemManagementAppService.GetSystemSettings();
        }
    }
}
