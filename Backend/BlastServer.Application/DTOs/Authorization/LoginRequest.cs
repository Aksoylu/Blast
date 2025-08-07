using FluentValidation;

namespace BlastServer.Application.DTOs.Authorization
{
    public class LoginRequest: RequestDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username can not be null")
                .MinimumLength(3).WithMessage("Username should be at least 3 characters.")
                .MaximumLength(100).WithMessage("Username should be at least 100 characters.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password can not be null")
                .MinimumLength(5).WithMessage("Password should be at least 3 characters.")
                .MaximumLength(100).WithMessage("Password should be at least 100 characters.");
        }
    }
}
