using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.Abstractions
{
    public interface ICacheService<T>
    {
        void Set(string key, T value, TimeSpan? expiration = null);
        T? Get(string key);
        void Delete(string key);
        IEnumerable<string> GetKeys(string pattern);
        IEnumerable<T?> GetMany(IEnumerable<string> keys);
    }
}
