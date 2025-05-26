using BlastBackend.Core;
using BlastBackend.Core.Interfaces;
using BlastBackend.Interfaces.Domain;
using BlastBackend.Interfaces.Repository;
using BlastBackend.Models.Dto;
using BlastBackend.Models.Entity;
using Microsoft.AspNetCore.Components.Forms;
using System.Security.Cryptography;
using System.Text;

public class UserService : IUserService
{
    private readonly IUserRepository userRepository;
    private readonly ICryptService cryptService;

    public UserService(IUserRepository _userRepository, ICryptService _cryptService)
    {
        userRepository = _userRepository;
        cryptService = _cryptService;
    }

    public async Task Register(LoginRequest request)
    {
        var existing = await this.userRepository.GetByUsername(request.Username!);
        if (existing != null)
        {
            throw new Exception($"User '{request.Username}' already exists");
        } 

        var user = new EUser
        {
            Username = request.Username!,
            PasswordHash = this.cryptService.HashPassword(request.Password!)
        };

        await this.userRepository.AddUser(user);
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        EUser existingUser = await this.userRepository.GetByUsername(request.Username!);
        if (existingUser == null)
        {
            throw new Exception("User not exists");
        }
        if(this.cryptService.HashPassword(request.Password!) != existingUser.PasswordHash)
        {
            throw new Exception("Invalid password");
        }

        return new LoginResponse { Username = request.Username! };
    }
}
