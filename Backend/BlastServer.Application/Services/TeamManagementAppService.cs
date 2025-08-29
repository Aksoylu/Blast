using AutoMapper;
using BlastServer.Application.DTOs.SystemManagement;
using BlastServer.Application.DTOs.TeamInviteManagement;
using BlastServer.Application.DTOs.TeamManagement;
using BlastServer.Application.Extensions;
using BlastServer.Application.Interfaces;
using BlastServer.Domain.DomainObjects.SystemManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.DomainServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Services
{
    public class TeamManagementAppService : ITeamManagementAppService
    {
        private readonly ITeamManagementDomainService teamManagementDomainService;
        private readonly IMapper mapper;

        public TeamManagementAppService(ITeamManagementDomainService _teamManagementDomainService, IMapper _mapper)
        {
            this.teamManagementDomainService = _teamManagementDomainService;
            this.mapper = _mapper;
        }

        public async Task<GetTeamListResponse> GetTeamList(GetTeamListRequest request)
        {
            List<ETeam> getTeamList = await this.teamManagementDomainService.GetTeamList(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization()
            );

            return new GetTeamListResponse { Items = getTeamList };
        }

        public async Task<CreateNewTeamResponse> CreateNewTeam(CreateNewTeamRequest request)
        {
            bool result = await this.teamManagementDomainService.CreateNewTeam(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization(),
                request.TeamName,
                request.Description
            );

            return new CreateNewTeamResponse { IsSuccess = result };
        }

        public async Task<DeleteTeamResponse> DeleteTeam(DeleteTeamRequest request)
        {
            bool result = await this.teamManagementDomainService.DeleteTeam(
                 request.RequestContext.GetUsername(),
                 request.RequestContext.GetOrganization(),
                 request.TeamName
             );

            return new DeleteTeamResponse { IsSuccess = result };
        }

        public async Task<QuitTeamResponse> QuitTeam(QuitTeamRequest request)
        {
            bool result = await this.teamManagementDomainService.QuitTeam(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization(),
                request.TeamName
            );
            
            return new QuitTeamResponse { IsSuccess = result };
        }

        public async Task<TransferTeamOwnershipResponse> TransferTeamOwnership(TransferTeamOwnershipRequest request)
        {
            bool result = await this.teamManagementDomainService.TransferTeamOwnership(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization(),
                request.TeamName,
                request.NewTeamOwner
            );
            
            return new TransferTeamOwnershipResponse { IsSuccess = result };
        }

        public async Task<KickUserFromTeamResponse> KickUserFromTeam(KickUserFromTeamRequest request)
        {
            bool resul = await this.teamManagementDomainService.KickUserFromTeam(
                request.RequestContext.GetUsername(),
                request.RequestContext.GetOrganization(),
                request.TeamName,
                request.UserToKick
            );

            return new KickUserFromTeamResponse { IsSuccess = resul };
            }
    }
}
