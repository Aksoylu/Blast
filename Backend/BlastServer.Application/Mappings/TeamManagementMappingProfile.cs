using AutoMapper;
using BlastServer.Domain.CacheItems;
using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.Mappings
{
    public class TeamManagementMappingProfile: Profile
    {
        public TeamManagementMappingProfile()
        {

            CreateMap<TeamInfo, ETeam>().ReverseMap();
        }
    }
}
