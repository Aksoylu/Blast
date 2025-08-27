using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlastServer.Domain.Entities;
using BlastServer.Domain.CacheItems;

namespace BlastServer.Application.Mappings
{
    public class UserManagementMappingProfile : Profile
    {
        public UserManagementMappingProfile()
        {
            CreateMap<UserInfo, EUser>().ReverseMap();
        }
    }
}
