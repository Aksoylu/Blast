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
        public List<ESystemSetting> Items { get; set; }

        public ESystemSetting? Get(string key)
        {
            return this.Items.Where(item => item.Key == key).FirstOrDefault();
        }

        public T? GetValue<T>(string key)
        {
            ESystemSetting? setting = this.Items.Where(item => item.Key == key).ToList().FirstOrDefault();

            if (setting?.Value is T typedValue)
            {
                return typedValue;
            }

            return default;
        }
    }
}
