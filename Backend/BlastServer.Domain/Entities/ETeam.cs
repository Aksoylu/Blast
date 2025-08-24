using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Entities
{
    public class ETeam
    {
        public object? _id { get; set; }
        public string? Organization { get; set; }
        public string? TeamName { get; set; }
        public string? AdminUsername { get; set; }
        public List<string>? MemberUsernameList { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
