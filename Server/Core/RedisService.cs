using StackExchange.Redis;

using BlastBackend.Core.Interfaces;

namespace BlastBackend.Core
{
    public class RedisService : IRedisService
    {
        private readonly IConnectionMultiplexer _connectionMultiplexer;

        public RedisService(IConnectionMultiplexer connectionMultiplexer)
        {
            _connectionMultiplexer = connectionMultiplexer;
        }

        public IDatabase GetDatabase() => _connectionMultiplexer.GetDatabase();
    }
}
