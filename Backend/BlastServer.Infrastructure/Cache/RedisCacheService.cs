using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Infrastructure.Persistence;
using StackExchange.Redis;
using System.Text.Json;

namespace BlastServer.Infrastructure.Cache;

public class RedisCacheService<T> : ICacheService<T>
{
    private readonly IDatabase _database;
    private readonly TimeSpan _defaultExpiration;

    public RedisCacheService(IRedisService redisService, TimeSpan? defaultExpiration = null)
    {
        _database = redisService.GetDatabase();
        _defaultExpiration = defaultExpiration ?? TimeSpan.FromMinutes(5);
    }

    public void Set(string key, T value, TimeSpan? expiration = null)
    {
        var serialized = JsonSerializer.Serialize(value);
        _database.StringSet(key, serialized, expiration ?? _defaultExpiration);
    }

    public T? Get(string key)
    {
        var value = _database.StringGet(key);
        if (!value.HasValue) return default;
        return JsonSerializer.Deserialize<T>(value!);
    }

    public void Delete(string key)
    {
        _database.KeyDelete(key);
    }
}
