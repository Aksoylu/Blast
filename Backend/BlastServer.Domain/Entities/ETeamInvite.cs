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
        public required string Organization { get; set; }
        public required string TeamName { get; set; }
        public required string SenderUserName { get; set; }
        public required string ReceiverUserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public TeamInviteStatusEnum Status { get; set; }
    }
}
