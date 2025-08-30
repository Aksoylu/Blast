using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.CacheItems
{
    public class TeamInfo
    {
        public string? Organization { get; set; }
        public string? TeamName { get; set; }
        public string? AdminUsername { get; set; }
        public List<string>? MemberUsernameList { get; set; }
        public string? Description { get; set; }
    }
}
