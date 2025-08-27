using BlastServer.Domain.CacheItems;
using BlastServer.Domain.DomainObjects.UserManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Interfaces.DomainServices
{
    public interface IUserManagementDomainService
    {
        public Task<CreateUserResult> CreateUser(CreateUserInput input);
        public Task<UpdateUserResult> UpdateUser(UpdateUserInput input);
        public Task<bool> DeleteUser(string username);
        public Task<List<UserInfo>> GetUserList(int pagination);
    }
}
