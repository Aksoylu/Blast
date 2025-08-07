using AutoMapper;
using BlastServer.Application.DTOs.Authorization;
using BlastServer.Application.DTOs.SystemManagement;
using BlastServer.Domain.DomainObjects.SystemManagement;
using BlastServer.Domain.Interfaces.DomainServices;

namespace BlastServer.Application.Services
{
    public class SystemManagementAppService: ISystemManagementAppService
    {
        private readonly ISystemManagementDomainService systemManagementDomainService;
        private readonly IMapper mapper;

        public SystemManagementAppService(ISystemManagementDomainService _systemManagementDomainService, IMapper _mapper)
        {
            this.systemManagementDomainService = _systemManagementDomainService;
            this.mapper = _mapper;
        }

        public async Task<GetSystemSettingsResponse> GetSystemSettings()
        {
            GetSystemSettingsResult result = await this.systemManagementDomainService.GetSystemSettings();

            return new GetSystemSettingsResponse { Items = result.Items };
        }

    }
}
