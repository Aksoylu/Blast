using BlastServer.Domain.CacheItems;
using BlastServer.Domain.DomainObjects.SystemManagement;
using BlastServer.Domain.Entities;


namespace BlastServer.Domain.Interfaces.DomainServices
{
    public interface ISystemManagementDomainService
    {
        public Task<GetSystemSettingsResult> GetSystemSettings();
        public Task<bool> SetSystemSettings(List<SystemSettingItem> settings);
        public Task RestoreDefaults();
    }
}
