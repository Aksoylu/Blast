using Microsoft.Extensions.Caching.Memory;
using BlastServer.Infrastructure.Services;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Interfaces.Abstractions;

namespace BlastServer.Infrastructure.Cache;
public class AuthSessionCacheService : CacheService<AuthSession>, IAuthSessionCacheService
{
    public AuthSessionCacheService(IMemoryCache cache) : base(cache)
    {
    }

    public AuthSession? GetAuthInfoWithToken(string authToken)
    {
        return Get($"token->auth_info:{authToken}");
    }

    public AuthSession? GetAuthInfoWithUsername(string username)
    {
        return Get($"username->auth_info:{username}");
    }

    public void SetAuthInfo(string authToken, AuthSession authInfo)
    {
        Set($"token->auth_info:{authToken}", authInfo);
        Set($"username->auth_info:{authInfo.UserName}", authInfo);
    }

    public void RemoveAuthInfo(string authToken)
    {
        AuthSession? currentAuthInfo = GetAuthInfoWithToken(authToken);
        if (currentAuthInfo != null)
        {
            Delete($"username->auth_info:{currentAuthInfo.UserName}");
        }

        Delete($"token->auth_info:{authToken}");
    }
}
