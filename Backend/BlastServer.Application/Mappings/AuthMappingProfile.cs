using AutoMapper;
using BlastServer.Application.DTOs.Authorization;
using BlastServer.Domain.DomainObjects.Authorization;

namespace BlastServer.Application.Mappings
{
    public class AuthMappingProfile : Profile
    {
        public AuthMappingProfile()
        {
            CreateMap<RegisterRequest, RegisterInput>().ReverseMap();
            CreateMap<RegisterResponse, RegisterResult>().ReverseMap();
        }
    }
}
