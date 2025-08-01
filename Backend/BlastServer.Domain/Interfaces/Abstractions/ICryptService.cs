namespace BlastServer.Domain.Interfaces.Abstractions;
public interface ICryptService
{
    string HashPassword(string password);
}
