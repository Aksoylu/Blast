using BlastServer.API.Middleware;
using BlastServer.Application.DTOs.TeamInviteManagement;
using BlastServer.Application.DTOs.TeamManagement;
using BlastServer.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BlastServer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamInviteManagementController: ControllerBase
    {
        private readonly ITeamInviteManagementAppService teamInviteManagementAppService;

        public TeamInviteManagementController(ITeamInviteManagementAppService _teamInviteManagementAppService)
        {
            this.teamInviteManagementAppService = _teamInviteManagementAppService;
        }

        [HttpPost("InviteNewUser")]
        [Secured]
        public async Task<InviteNewUserToTeamResponse> InviteNewUserToTeam([FromBody] InviteNewUserToTeamRequest request)
        {
            return await teamInviteManagementAppService.InviteNewUserToTeam(request);
        }

        [HttpGet("ReceivedTeamInviteList")]
        [Secured]
        public async Task<GetTeamInviteListResponse> GetReceivedTeamInviteList([FromBody] GetTeamInviteListRequest request)
        {
            return await teamInviteManagementAppService.GetReceivedTeamInviteList(request);
        }

        [HttpGet("GetSentTeamInviteList")]
        [Secured]
        public async Task<GetTeamInviteListResponse> GetReceivedTeamInviteList([FromBody] GetSentTeamInviteListRequest request)
        {
            return await teamInviteManagementAppService.GetSentTeamInviteList(request);
        }
    }
}
