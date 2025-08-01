namespace BlastServer.Application.DTOs.Authorization;

public class LoginResponse
{
    public string? Id { get; set; }
    public string? Username { get; set; }
    public string? AuthToken { get; set; }
}

