using BlastServer.Application.DTOs.SystemManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Services
{
    public interface ISystemManagementAppService
    {
        public Task<GetSystemSettingsResponse> GetSystemSettings();
        public Task<SetSystemSettingsResponse> SetSystemSettings(SetSystemSettingsRequest request);

    }
}
