using BlastServer.Domain.CacheItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.SystemManagement
{
    public class GetSystemSettingsResponse
    {
        public required List<SystemSettingItem> Items { get; set; }
    }
}
