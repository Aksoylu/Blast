namespace BlastBackend.Core.Interfaces
{
    public interface ICryptService
    {
        string HashPassword(string password);
    }
}
