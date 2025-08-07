using BlastServer.Domain.DomainObjects.SystemManagement;
using BlastServer.Domain.Entities;


namespace BlastServer.Domain.Interfaces.DomainServices
{
    public interface ISystemManagementDomainService
    {
        public Task<GetSystemSettingsResult> GetSystemSettings();
        public Task SetSystemSettings(List<ESystemSetting> settings);
        public Task RestoreDefaults();
    }
}
