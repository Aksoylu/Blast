namespace BlastBackend.Controllers
{
    using global::BlastBackend.Interfaces.Domain;
    using global::BlastBackend.Models.Dto;
    using Microsoft.AspNetCore.Mvc;

    namespace BlastBackend.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class AuthController : ControllerBase
        {
            private readonly IUserService _userService;

            public AuthController(IUserService userService)
            {
                _userService = userService;
            }

            [HttpPost("Login")]
            public async Task<LoginResponse> Login([FromBody] LoginRequest request)
            {
                return await _userService.Login(request);
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
