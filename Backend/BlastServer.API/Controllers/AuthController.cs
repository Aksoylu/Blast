namespace BlastBackend.Controllers
{
    using BlastServer.API.Middleware;
    using BlastServer.Application.DTOs.Authorization;
    using BlastServer.Application.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    namespace BlastBackend.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class AuthController : ControllerBase
        {
            private readonly IAuthorizationAppService authorizationAppService;

            public AuthController(IAuthorizationAppService _authorizationService)
            {
                this.authorizationAppService = _authorizationService;
            }

            [HttpPost("Login")]
            public async Task<LoginResponse> Login([FromBody] LoginRequest request)
            {
                return await authorizationAppService.Login(request);
            }

            [HttpPost("Logout")]
            [Secured]
            public LogoutResponse Logout([FromBody] LogoutRequest request)
            {
                return  authorizationAppService.Logout(request);
            }

            [HttpPost("Register")]
            public async Task<RegisterResponse> Register([FromBody] RegisterRequest request)
            {
                return await authorizationAppService.Register(request);
            }

        }

    }

}
