namespace BlastBackend.Controllers
{
    using BlastServer.Application.DTOs.Authorization;
    using BlastServer.Application.Services;
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
            public async Task<LoginResponse> Logout([FromBody] LoginRequest request)
            {
                return await authorizationAppService.Login(request);
            }

            /*
            [HttpPost("Register")]
            public async Task<LoginResponse> Register([FromBody] RegisterRequest request)
            {
                return await _userService.Register(request);
            }
            */
        }

    }

}
