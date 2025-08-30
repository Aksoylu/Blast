using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Persistence
{
    public interface IRedisService
    {
        IDatabase GetDatabase();
        IServer GetServer();
    }
}
