using BlastServer.API.Middleware;
using BlastServer.Application.DTOs.TeamManagement;
using BlastServer.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BlastServer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamManagementController : ControllerBase
    {
        private readonly ITeamManagementAppService teamManagementAppService;

        public TeamManagementController(ITeamManagementAppService _teamManagementAppService)
        {
            this.teamManagementAppService = _teamManagementAppService;
        }


        [HttpGet("Team")]
        [Secured]
        public async Task<GetTeamListResponse> GetTeamList([FromBody] GetTeamListRequest request)
        {
            return await teamManagementAppService.GetTeamList(request);
        }

        [HttpPost("Team")]
        [Secured]
        public async Task<CreateNewTeamResponse> CreateNewTeam([FromBody] CreateNewTeamRequest request)
        {
            return await teamManagementAppService.CreateNewTeam(request);
        }


        [HttpDelete("Team")]
        [Secured]
        public async Task<DeleteTeamResponse> DeleteTeam([FromBody] DeleteTeamRequest request)
        {
            return await teamManagementAppService.DeleteTeam(request);
        }


        [HttpPost("QuitTeam")]
        [Secured]
        public async Task<QuitTeamResponse> QuitTeam([FromBody] QuitTeamRequest request)
        {
            return await teamManagementAppService.QuitTeam(request);
        }

        [HttpPost("TransferTeamOwnership")]
        [Secured]
        public async Task<TransferTeamOwnershipResponse> TransferTeamOwnership([FromBody] TransferTeamOwnershipRequest request)
        {
            return await teamManagementAppService.TransferTeamOwnership(request);
        }
    }
}
