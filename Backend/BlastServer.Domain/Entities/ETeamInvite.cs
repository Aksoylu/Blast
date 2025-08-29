using BlastServer.Domain.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Entities
{
    public class ETeamInvite
    {
        public object? _id { get; set; }
        public string? Organization { get; set; }
        public string? TeamName { get; set; }
        public string? SenderUserName { get; set; }
        public string? ReceiverUserName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public TeamInviteStatusEnum? Status { get; set; }
    }
}
