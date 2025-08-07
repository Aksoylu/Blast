using AutoMapper;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Entities;

namespace BlastServer.Application.Mappings
{
    public class SystemSettingMappingProfile : Profile
    {
        public SystemSettingMappingProfile()
        {
            CreateMap<ESystemSetting, SystemSettingItem>().ReverseMap();
        }
    }
}