using BlastServer.Application.DTOs.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Services
{
    public interface IAuthorizationAppService
    {
        public Task<LoginResponse> Login(LoginRequest request);
    }
}
