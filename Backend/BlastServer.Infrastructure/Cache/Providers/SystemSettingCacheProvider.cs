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
        ICacheService<SystemSettingCacheItem> cacheService;
        public SystemSettingCacheProvider(ICacheService<SystemSettingCacheItem> _cacheService)
        {
            this.cacheService = _cacheService;
        }

        public List<SystemSettingCacheItem> GetAll()
        {
            List< SystemSettingCacheItem> systemSettingCacheItemList = new List<SystemSettingCacheItem> ();
            foreach(string eachKey in SystemSetting.ALL)
            {
                SystemSettingCacheItem? item = this.cacheService.Get($"systemsetting->{eachKey}");
                if(item != null )
                {
                    systemSettingCacheItemList.Add(item);
                }
            }

            return systemSettingCacheItemList;
        }

        public void CleanAll()
        {
            List<SystemSettingCacheItem> systemSettingCacheItemList = new List<SystemSettingCacheItem>();
            foreach (string eachKey in SystemSetting.ALL)
            {
                this.cacheService.Delete($"systemsetting->{eachKey}");
            }
        }

        public void SetAll(List<SystemSettingCacheItem> cacheItems)
        {
            foreach (SystemSettingCacheItem eachItem in cacheItems)
            {
                this.cacheService.Set($"systemsetting->{eachItem.Key}", eachItem);
            }
        }
    }
}
