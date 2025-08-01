using FluentValidation;

namespace BlastServer.Application.DTOs.Authorization;

public class RegisterRequest
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Mail { get; set; }
    public string? NameSurname { get; set; }
}

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username can not be null")
            .MinimumLength(3).WithMessage("Username should be at least 3 characters.")
            .MaximumLength(100).WithMessage("Username should can be maximum 100 characters.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password can not be null.")
            .MaximumLength(100).WithMessage("Password should can be maximum 100 characters.");

        RuleFor(x => x.Mail)
            .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.");

    }
}
