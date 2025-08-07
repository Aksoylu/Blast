using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.SystemManagement
{
    public class GetSystemSettingsResult
    {
        public required List<SystemSettingItem> Items { get; set; }

  
        public SystemSettingItem? Get(string key)
        {
            return this.Items.Where(item => item.Key == key).FirstOrDefault();
        }

        public List<SystemSettingItem> ToList()
        {
            return this.Items;
        }
        public void Remove (string key)
        {
            SystemSettingItem? item =  this.Items.Where(item => item.Key == key).FirstOrDefault();
            if (item != null)
            {
                this.Items.Remove(item);
            }
        }

        public void Set<T>(string key, T value)
        {
            bool isExist = this.Items.Where(item => item.Key == key).Any();
            if(isExist)
            {
                this.Remove(key);
            }

            this.Items.Add(new SystemSettingItem
            {
                Key = key,
                Value = value
            });
        }

        public T? GetValue<T>(string key)
        {
            SystemSettingItem? setting = this.Items.Where(item => item.Key == key).ToList().FirstOrDefault();

            if (setting?.Value is T typedValue)
            {
                return typedValue;
            }

            return default;
        }
    }
}
