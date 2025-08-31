using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Infrastructure.Persistence;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using StackExchange.Redis;
using System.Text.Json;

namespace BlastServer.Infrastructure.Cache;

public class RedisCacheService<T> : ICacheService<T>
{
    private readonly IDatabase _database;
    private readonly IServer _server;
    private readonly TimeSpan _defaultExpiration;

    public RedisCacheService(IRedisService redisService, TimeSpan? defaultExpiration = null)
    {
        _database = redisService.GetDatabase();
        _server = redisService.GetServer();
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

    public IEnumerable<string> GetKeys(string pattern)
    {
        IEnumerable<string> keys = _server.Keys(pattern: pattern)
            .Select(redisKey => redisKey.ToString())
            .Where(eachKey => !string.IsNullOrEmpty(eachKey));

        return keys;
    }

    public IEnumerable<T> GetMany(IEnumerable<string> keys)
    {
        RedisKey[] redisKeys = keys.Select(redisKey => (RedisKey) redisKey).ToArray();
        if (redisKeys.Length == 0)
        {
            return Enumerable.Empty<T>();
        }

        RedisValue[] redisValues = _database.StringGet(redisKeys);

        List<T> items = new List<T>();
        foreach (RedisValue val in redisValues)
        {
            if (val.IsNullOrEmpty)
            {
                continue;
            }

            T? realValue = JsonSerializer.Deserialize<T>(val!);
            if(realValue != null)
            {
                items.Add(realValue);
            }
        }

        return items;
    }
}
