using BlastServer.Domain.CacheItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.Abstractions
{
    public interface IAuthSessionCacheService
    {
        public AuthSession? GetAuthInfoWithToken(string authToken);
        public AuthSession? GetAuthInfoWithUsername(string username);
        public void SetAuthInfo(string authToken, AuthSession authInfo);
        public void RemoveAuthInfo(string authToken);
    }
}
