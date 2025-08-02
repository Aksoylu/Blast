
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Infrastructure.Persistence;
using Microsoft.Extensions.Caching.Memory;
using StackExchange.Redis;
using System;
using System.Security.AccessControl;
using System.Text.Json;

namespace BlastServer.Infrastructure.Services;
public class CacheService<T>
{
    private readonly ICacheService<T> _strategy;

    public CacheService(ICacheService<T> strategy)
    {
        _strategy = strategy;
    }

    public void Set(string key, T value, TimeSpan? expiration = null) => _strategy.Set(key, value, expiration);
    public T? Get(string key) => _strategy.Get(key);
    public void Delete(string key) => _strategy.Delete(key);
}
