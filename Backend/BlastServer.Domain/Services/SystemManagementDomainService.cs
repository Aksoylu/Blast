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
    public class SystemManagementDomainService: ISystemManagementDomainService
    {
        private readonly ISystemSettingRepository systemSettingRepository;
        private readonly ISystemSettingCacheProvider systemSettingCacheProvider;

        public SystemManagementDomainService(
            ISystemSettingRepository _systemSettingRepository,
            ISystemSettingCacheProvider _systemSettingCacheProvider
        )
        {
            this.systemSettingRepository = _systemSettingRepository;
            this.systemSettingCacheProvider = _systemSettingRepositoryCacheProvider;
        }

        public void MigrateDefaults()
        {
            // REGISTER_USER_ROLE = UserRoleEnum.User
            // ORGANIZATION = "Blast Mainnet"
            // REGISTER_USER_ACCOUNT_STATUS = AccountStatusEnum.WaitingActivation
        }

        public async Task<GetSystemSettingsResult> GetSystemSettings()
        {
            List <ESystemSetting>  allSettings = await this.systemSettingRepository.ListAll();

            return new GetSystemSettingsResult { Items = allSettings };
        }

        // @todo: SetSystemSetting
    }
}
