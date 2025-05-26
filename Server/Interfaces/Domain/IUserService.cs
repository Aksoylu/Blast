using BlastBackend.Models.Dto;

namespace BlastBackend.Interfaces.Domain
{
    public interface IUserService
    {
        Task<LoginResponse> Login(LoginRequest request);
    }

}
