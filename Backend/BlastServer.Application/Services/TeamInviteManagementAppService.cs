using AutoMapper;
using BlastServer.Application.DTOs.TeamInviteManagement;
using BlastServer.Application.Extensions;
using BlastServer.Application.Interfaces;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.DomainServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Services
{
    internal class TeamInviteManagementAppService
    {
        private readonly ITeamInviteManagementDomainService teamInviteManagementDomainService;

        public TeamInviteManagementAppService(ITeamInviteManagementDomainService _teamInviteManagementDomainService)
        {
            this.teamInviteManagementDomainService = _teamInviteManagementDomainService;
        }

        public async Task<GetTeamInviteListResponse> GetReceivedTeamInviteList(GetTeamInviteListRequest request)
        {
            List<ETeamInvite> receivedTeamInviteList = await this.teamInviteManagementDomainService.GetReceivedTeamInviteList(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization()
            );

            return new GetTeamInviteListResponse { Items = receivedTeamInviteList };
        }

        public async Task<GetTeamInviteListResponse> GetSentTeamInviteList(GetSentTeamInviteListRequest request)
        {
            List<ETeamInvite> receivedTeamInviteList = await this.teamInviteManagementDomainService.GetSentTeamInviteList(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization(),
                request.TeamName
            );

            return new GetTeamInviteListResponse { Items = receivedTeamInviteList };
        }
        public async Task<InviteNewUserToTeamResponse> InviteNewUserToTeam(InviteNewUserToTeamRequest request)
        {
            bool result = await this.teamInviteManagementDomainService.InviteNewUserToTeam(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization(),
                request.TeamName,
                request.InviteDescription,
                request.ReceiverUsername
            );

            return new InviteNewUserToTeamResponse { IsSuccess = result };
        }

    }
}
