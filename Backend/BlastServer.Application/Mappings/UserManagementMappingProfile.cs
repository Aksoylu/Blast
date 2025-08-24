using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using BlastServer.Domain.DomainObjects.UserManagement;
using BlastServer.Domain.Entities;

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
