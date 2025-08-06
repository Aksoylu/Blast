using FluentValidation;

using BlastServer.API.Validations;


namespace BlastServer.Application.DTOs.Authorization
{
    public class LogoutRequest: RequestDTO
    {
        public string? AuthToken { get; set; }
    }

    public class LogoutRequestValidator : AbstractValidator<LogoutRequest>
    {
        public LogoutRequestValidator()
        {
            RuleFor(x => x.AuthToken)
                .NotEmpty().WithMessage("Authorization token can not be null")
                .Must(JwtValidation.Check).WithMessage("Authorization token is not in a valid JWT format");
        }
    }
}
