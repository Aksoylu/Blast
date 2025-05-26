using StackExchange.Redis;

namespace BlastBackend.Core.Interfaces
{
    public interface IRedisService
    {
        IDatabase GetDatabase();
    }

}
