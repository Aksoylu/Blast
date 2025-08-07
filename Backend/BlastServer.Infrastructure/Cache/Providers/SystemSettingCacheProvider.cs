using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Common.Constants;
using BlastServer.Domain.Interfaces.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Cache.Providers
{
    public class SystemSettingCacheProvider : ISystemSettingCacheProvider
    {
        ICacheService<SystemSettingItem> cacheService;
        public SystemSettingCacheProvider(ICacheService<SystemSettingItem> _cacheService)
        {
            this.cacheService = _cacheService;
        }

        public List<SystemSettingItem> GetAll()
        {
            List< SystemSettingItem> systemSettingCacheItemList = new List<SystemSettingItem> ();
            foreach(string eachKey in SystemSetting.ALL)
            {
                SystemSettingItem? item = this.cacheService.Get($"systemsetting->{eachKey}");
                if(item != null )
                {
                    systemSettingCacheItemList.Add(item);
                }
            }

            return systemSettingCacheItemList;
        }

        public void CleanAll()
        {
            List<SystemSettingItem> systemSettingCacheItemList = new List<SystemSettingItem>();
            foreach (string eachKey in SystemSetting.ALL)
            {
                this.cacheService.Delete($"systemsetting->{eachKey}");
            }
        }

        public void SetAll(List<SystemSettingItem> cacheItems)
        {
            foreach (SystemSettingItem eachItem in cacheItems)
            {
                this.cacheService.Set($"systemsetting->{eachItem.Key}", eachItem);
            }
        }
    }
}
