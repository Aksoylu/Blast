using BlastServer.Domain.Interfaces.Abstractions;
using System.Security.Cryptography;
using System.Text;


namespace BlastServer.Infrastructure.Services;

public class CryptService: ICryptService
{
    public string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashed = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashed);
    }

}

