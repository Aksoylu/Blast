using AutoMapper;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Common.Constants;
using BlastServer.Domain.DomainObjects.SystemManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainServices;
using BlastServer.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Services
{
    public class SystemManagementDomainService : ISystemManagementDomainService
    {
        private readonly ISystemSettingRepository systemSettingRepository;
        private readonly ISystemSettingCacheProvider systemSettingCacheProvider;
        private readonly IMapper mapper;

        public SystemManagementDomainService(
            ISystemSettingRepository _systemSettingRepository,
            ISystemSettingCacheProvider _systemSettingCacheProvider,
            IMapper _mapper
        )
        {
            this.systemSettingRepository = _systemSettingRepository;
            this.systemSettingCacheProvider = _systemSettingCacheProvider;
            this.mapper = _mapper;
        }

        public async Task RestoreDefaults()
        {
            await this.systemSettingRepository.SetAll(SystemSetting.DEFAULTS);
        }

        public async Task<GetSystemSettingsResult> GetSystemSettings()
        {
            List <SystemSettingItem> cachedSystemSettings =  this.systemSettingCacheProvider.GetAll();
            if(cachedSystemSettings.Count > 0)
            {
                return new GetSystemSettingsResult{ Items = cachedSystemSettings};
            }

            List<ESystemSetting> dbStoredSettings = await this.systemSettingRepository.ListAll();
            
            cachedSystemSettings = this.mapper.Map<List<SystemSettingItem>>(dbStoredSettings);
            this.systemSettingCacheProvider.SetAll(cachedSystemSettings);

            return new GetSystemSettingsResult { Items = cachedSystemSettings };
        }

        public async Task SetSystemSettings(List<ESystemSetting> settings)
        {
            await this.systemSettingRepository.SetAll(settings);
        }
    }
}
