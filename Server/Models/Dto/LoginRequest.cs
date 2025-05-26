using BlastBackend.Models.Entity;
using FluentValidation;

namespace BlastBackend.Models.Dto
{
    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username can not be null")
                .MinimumLength(3).WithMessage("Username should be at least 3 characters.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Email boş olamaz.")
                .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.");
        }
    }
}
