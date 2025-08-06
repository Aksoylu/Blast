using BlastServer.Domain.Common.Enums;

namespace BlastServer.Domain.CacheItems;

public class AuthSession
{
    public string? AuthToken { get; set; }
    public string? UserName { get; set; }
    public UserRoleEnum? Role { get; set; }
    public DateTime Expiration { get; set; }
}
