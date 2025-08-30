using AutoMapper;
using BlastServer.Application.DTOs.TeamManagement;
using BlastServer.Application.Extensions;
using BlastServer.Application.Interfaces;
using BlastServer.Domain.DomainObjects.TeamManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.DomainServices;


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
            TeamManagementInput input = new TeamManagementInput
            {
                Username = request.RequestContext.GetUsername(),
                Organization = request.RequestContext.GetOrganization(),
                TeamName = string.Empty
            };

            List<ETeam> getTeamList = await this.teamManagementDomainService.GetTeamList(input);

            return new GetTeamListResponse { Items = getTeamList };
        }

        public async Task<CreateNewTeamResponse> CreateNewTeam(CreateNewTeamRequest request)
        {
            TeamManagementInput input = new TeamManagementInput
            {
                Username = request.RequestContext.GetUsername(),
                Organization = request.RequestContext.GetOrganization(),
                TeamName = request.TeamName
            };

            bool result = await this.teamManagementDomainService.CreateNewTeam(input, request.Description);

            return new CreateNewTeamResponse { IsSuccess = result };
        }

        public async Task<DeleteTeamResponse> DeleteTeam(DeleteTeamRequest request)
        {
            TeamManagementInput input = new TeamManagementInput
            {
                Username = request.RequestContext.GetUsername(),
                Organization = request.RequestContext.GetOrganization(),
                TeamName = request.TeamName
            };

            bool result = await this.teamManagementDomainService.DeleteTeam(input);

            return new DeleteTeamResponse { IsSuccess = result };
        }

        public async Task<QuitTeamResponse> QuitTeam(QuitTeamRequest request)
        {
            TeamManagementInput input = new TeamManagementInput
            {
                Username = request.RequestContext.GetUsername(),
                Organization = request.RequestContext.GetOrganization(),
                TeamName = request.TeamName
            };

            bool result = await this.teamManagementDomainService.QuitTeam(input);
            
            return new QuitTeamResponse { IsSuccess = result };
        }

        public async Task<TransferTeamOwnershipResponse> TransferTeamOwnership(TransferTeamOwnershipRequest request)
        {
            TeamManagementInput input = new TeamManagementInput
            {
                Username = request.RequestContext.GetUsername(),
                Organization = request.RequestContext.GetOrganization(),
                TeamName = request.TeamName
            };

            bool result = await this.teamManagementDomainService.TransferTeamOwnership(input, request.NewTeamOwner);
            
            return new TransferTeamOwnershipResponse { IsSuccess = result };
        }

        public async Task<KickUserFromTeamResponse> KickUserFromTeam(KickUserFromTeamRequest request)
        {
            TeamManagementInput input = new TeamManagementInput
            {
                Username = request.RequestContext.GetUsername(),
                Organization = request.RequestContext.GetOrganization(),
                TeamName = request.TeamName
            };

            bool resul = await this.teamManagementDomainService.KickUserFromTeam(input, request.UserToKick);

            return new KickUserFromTeamResponse { IsSuccess = resul };
        }
    }
}
