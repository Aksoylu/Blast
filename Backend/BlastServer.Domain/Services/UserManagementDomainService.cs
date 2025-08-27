using AutoMapper;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.DomainObjects.UserManagement;
using BlastServer.Domain.Entities;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainServices;
using BlastServer.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Services
{
    public class UserManagementDomainService : IUserManagementDomainService
    {
        private readonly IUserRepository userRepository;
        private readonly ICryptService cryptService;
        private readonly IMapper mapper;

        public UserManagementDomainService(
          IUserRepository _userRepository,
          ICryptService _cryptService,
          IMapper _mapper
        )
        {
            this.userRepository = _userRepository;
            this.cryptService = _cryptService;
            this.mapper = _mapper;
        }

        public async Task<CreateUserResult> CreateUser(CreateUserInput input)
        {
            bool isUserExistWithSameUsername = (await this.userRepository.GetByUsername(input.Username)) != null;
            if (isUserExistWithSameUsername)
            {
                throw new Exception("User name is already taken");
            }

            bool isUserExistWithSameMail = (await this.userRepository.GetByMail(input.Mail)) != null;
            if (isUserExistWithSameMail)
            {
                throw new Exception($"Mail address '{input.Mail}' is already used by another user");
            }

            EUser user = new EUser
            {
                Username = input.Username,
                PasswordUnderSHA256 = this.cryptService.HashPassword(input.Password),
                Mail = input.Mail,
                NameSurname = input.NameSurname,
                Organization = input.Organization,
                Role = input.Role,
                AccountStatus = input.AccountStatus,
            };

            object? createdUserId = await this.userRepository.Create(user);

            UserInfo createdUser = this.mapper.Map<UserInfo>(user);

            return new CreateUserResult
            {
                Success = true,
                UserInfo = createdUser
            };
        }

        public async Task<bool> DeleteUser(string username)
        {
            bool result = await this.userRepository.DeleteByUsername(username);

            return result;
        }

        public  async Task<List<UserInfo>> GetUserList(int pagination)
        {
            List<EUser> usersEntity = await this.userRepository.ListByPagination(pagination, 100);
            List<UserInfo> users = this.mapper.Map<List<UserInfo>>(usersEntity);

            return users;
        }

        public async Task<UpdateUserResult> UpdateUser(UpdateUserInput input)
        {
            try
            {
                EUser currentUserInfo = await this.userRepository.GetByUsername(input.Username);
                if (currentUserInfo == null)
                {
                    throw new Exception("User not found");
                }

                bool result = await this.userRepository.UpdateUser(new EUser
                {
                    Username = currentUserInfo.Username,
                    NameSurname = input.NameSurname,
                    Mail = input.Mail,
                    Organization = input.Organization,
                    Role = input.Role,
                    AccountStatus = input.AccountStatus,
                });

                UserInfo updatedUser = this.mapper.Map<UserInfo>(input);

                return new UpdateUserResult { Success = result, UserInfo = updatedUser };
            }
            catch (Exception ex)
            {
                return new UpdateUserResult
                {
                    Success = false,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}
