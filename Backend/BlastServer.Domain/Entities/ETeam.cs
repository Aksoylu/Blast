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
        public required string Organization { get; set; }
        public required string TeamName { get; set; }
        public required string AdminUsername { get; set; }
        public required List<string> MemberUsernameList { get; set; }
        public required string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
