namespace BlastServer.Domain.CacheItems;

public class AuthSession
{
    public string? AuthToken { get; set; }
    public string? UserName { get; set; }
    public string? Role { get; set; }
    public DateTime Expiration { get; set; }
}
