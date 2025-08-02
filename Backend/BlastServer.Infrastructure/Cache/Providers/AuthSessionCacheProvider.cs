using Microsoft.Extensions.Caching.Memory;
using BlastServer.Infrastructure.Services;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Interfaces.Abstractions;

namespace BlastServer.Infrastructure.Cache.Providers;

public class AuthSessionCacheProvider: IAuthSessionCacheProvider
{
    ICacheService<AuthSession> cacheService;
    public AuthSessionCacheProvider(ICacheService<AuthSession> _cacheService)
    {
        this.cacheService = _cacheService;
    }

    public AuthSession? GetAuthInfoWithToken(string authToken)
    {
        return this.cacheService.Get($"token->auth_info:{authToken}");
    }

    public AuthSession? GetAuthInfoWithUsername(string username)
    {
        return this.cacheService.Get($"username->auth_info:{username}");
    }

    public void SetAuthInfo(string authToken, AuthSession authInfo)
    {
        this.cacheService.Set($"token->auth_info:{authToken}", authInfo);
        this.cacheService.Set($"username->auth_info:{authInfo.UserName}", authInfo);
    }

    public void RemoveAuthInfo(string authToken)
    {
        AuthSession? currentAuthInfo = GetAuthInfoWithToken(authToken);
        if (currentAuthInfo != null)
        {
            this.cacheService.Delete($"username->auth_info:{currentAuthInfo.UserName}");
        }

        this.cacheService.Delete($"token->auth_info:{authToken}");
    }
}
