using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace BlastServer.Infrastructure.Persistence
{
    public class RedisService : IRedisService
    {
        private readonly IConnectionMultiplexer _connectionMultiplexer;

        public RedisService(IConnectionMultiplexer connectionMultiplexer)
        {
            _connectionMultiplexer = connectionMultiplexer;
        }

        public IDatabase GetDatabase() => _connectionMultiplexer.GetDatabase();

        public IServer GetServer()
        {
            var endpoint = _connectionMultiplexer.GetEndPoints().First();
            return _connectionMultiplexer.GetServer(endpoint);
        }
    }
}
