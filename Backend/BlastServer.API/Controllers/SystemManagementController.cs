using BlastServer.API.Middleware;
using BlastServer.Application.DTOs.Authorization;
using BlastServer.Application.DTOs.SystemManagement;
using BlastServer.Application.Services;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<GetSystemSettingsResponse> SystemSettings()
        {
            return await systemManagementAppService.GetSystemSettings();
        }
    }
}
