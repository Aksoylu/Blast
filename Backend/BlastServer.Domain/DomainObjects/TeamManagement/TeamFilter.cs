using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.DomainObjects.TeamManagement
{
    public class TeamFilter
    {
        public object? Id { get; set; }
        public string? Organization { get; set; }
        public string? TeamName { get; set; }
        public string? AdminUsername { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
