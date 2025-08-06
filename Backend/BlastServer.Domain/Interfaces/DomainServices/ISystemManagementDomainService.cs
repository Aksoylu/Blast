using BlastServer.Domain.DomainObjects.SystemManagement;
using BlastServer.Domain.Entities;


namespace BlastServer.Domain.Interfaces.DomainServices
{
    public interface ISystemManagementDomainService
    {
        Task<GetSystemSettingsResult> GetSystemSettings();
    }
}
