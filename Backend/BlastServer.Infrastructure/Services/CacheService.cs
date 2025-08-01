
using Microsoft.Extensions.Caching.Memory;
using System;

namespace BlastServer.Infrastructure.Services;

public abstract class CacheService<T>
{
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _defaultExpiration;

    protected CacheService(IMemoryCache cache, TimeSpan? defaultExpiration = null)
    {
        _cache = cache;
        _defaultExpiration = defaultExpiration ?? TimeSpan.FromMinutes(5);
    }

    protected void Set(string key, T value, TimeSpan? expiration = null)
    {
        var options = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = expiration ?? _defaultExpiration
        };

        _cache.Set(key, value, options);
    }

    protected T? Get(string key)
    {
        return _cache.TryGetValue(key, out T? value) ? value : default;
    }

    protected void Delete(string key)
    {
        _cache.Remove(key);
    }
}
