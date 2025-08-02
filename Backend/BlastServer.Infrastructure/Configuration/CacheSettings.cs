using BlastServer.Infrastructure.Configuration.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Configuration
{
    public class CacheSettings
    {
        public string Type { get; set; } = CacheType.IN_MEMORY;
        public int DefaultExpirationMinutes { get; set; } = 5;
        public RedisSettings Redis { get; set; } = new();
    }
}
