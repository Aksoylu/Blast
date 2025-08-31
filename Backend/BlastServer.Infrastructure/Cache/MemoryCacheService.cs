using BlastServer.Domain.Interfaces.Abstractions;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure.Cache;

public class MemoryCacheService<T> : ICacheService<T>
{
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _defaultExpiration;

    private static readonly HashSet<string> _keys = new();
    private static readonly object _lock = new();

    public MemoryCacheService(IMemoryCache cache, TimeSpan? defaultExpiration = null)
    {
        _cache = cache;
        _defaultExpiration = defaultExpiration ?? TimeSpan.FromMinutes(5);
    }

    public void Set(string key, T value, TimeSpan? expiration = null)
    {
        var options = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = expiration ?? _defaultExpiration
        };
        _cache.Set(key, value, options);

        lock (_lock)
        {
            _keys.Add(key);
        }
    }

    public T? Get(string key)
    {
        if (_cache.TryGetValue(key, out T? value))
        {
            return value;
        }

        lock (_lock)
        {
            _keys.Remove(key);
        }

        return default;
    }

    public void Delete(string key)
    {
        _cache.Remove(key);

        lock (_lock)
        {
            _keys.Remove(key);
        }
    }

    public IEnumerable<string> GetKeys(string pattern)
    {
        var regex = new Regex("^" + Regex.Escape(pattern).Replace("\\*", ".*") + "$");

        lock (_lock)
        {
            return _keys.Where(k => regex.IsMatch(k)).ToList();
        }
    }

    public IEnumerable<T> GetMany(IEnumerable<string> keyList)
    {
        List<T> items = new List<T>();

        foreach (string key in keyList)
        {
            T? item = Get(key);
            if(item == null)
            {
                lock(_lock)
                {
                    _keys.Remove(key);
                }

                continue;
            }

            items.Add(item);
        }

        return items;
    }
}
