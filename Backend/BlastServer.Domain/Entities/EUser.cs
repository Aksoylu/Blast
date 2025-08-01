
using BlastServer.Domain.Interfaces.Abstractions;

namespace BlastServer.Domain.Entities;

public class EUser
{
    public object? _id { get; set; }

    public string? Username { get; set; }
    public string? Organization { get; set; }

    public string? Role { get; set; }

    public string? PasswordUnderSHA256 { get; set; }

    public bool IsPasswordValid(string inputPassword, ICryptService cryptService)
    {
        string hashedInput = cryptService.HashPassword(inputPassword);
        return hashedInput == this.PasswordUnderSHA256;
    }
}
