using BlastServer.API.Validations;
using BlastServer.Application.DTOs.Authorization;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs.SystemManagement
{
    public class GetSystemSettingsRequest: RequestDTO
    {
    }

    public class GetSystemSettingsRequestValidator : AbstractValidator<GetSystemSettingsRequest>
    {
        public GetSystemSettingsRequestValidator()
        {
            RuleFor(x => x.RequestContext.Token)
                .NotEmpty().WithMessage("Authorization token can not be null")
                .Must(JwtValidation.Check).WithMessage("Authorization token is not in a valid JWT format");
        }
    }
}
