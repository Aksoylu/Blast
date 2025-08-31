
using BlastServer.Domain.Interfaces.Abstractions;

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
    public IEnumerable<string> GetKeys(string pattern) => _strategy.GetKeys(pattern);
}
