using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Configuration.Enums
{
    public static class CacheType
    {
        public const string IN_MEMORY = "InMemory";
        public const string REDIS = "Redis";
    }
}
