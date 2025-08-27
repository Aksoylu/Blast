using BlastServer.Domain.Common.Enums;
using BlastServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Domain.Common.Constants
{
    public class SystemSetting
    {
        public static readonly string ORGANIZATION = "ORGANIZATION";
        public static readonly string REGISTER_USER_ACCOUNT_STATUS = "REGISTER_USER_ACCOUNT_STATUS";
        public static readonly string REGISTER_USER_ROLE = "REGISTER_USER_ROLE";
        public static readonly string TEAM_GENERATION_ALLOWED_USER_ROLES = "TEAM_GENERATION_ALLOWED_USER_ROLES";

        public static readonly string[] ALL =
        {
            SystemSetting.ORGANIZATION,
            SystemSetting.REGISTER_USER_ACCOUNT_STATUS,
            SystemSetting.REGISTER_USER_ROLE,
            SystemSetting.TEAM_GENERATION_ALLOWED_USER_ROLES
        };

        public static readonly List<ESystemSetting> DEFAULTS = new List<ESystemSetting>
        {
            new ESystemSetting
            {
                Key = SystemSetting.ORGANIZATION,
                Value = "Blast Mainnet"
            },
            new ESystemSetting
            {
                Key = SystemSetting.REGISTER_USER_ACCOUNT_STATUS,
                Value = AccountStatusEnum.WaitingActivation
            },
            new ESystemSetting
            {
                Key = SystemSetting.REGISTER_USER_ROLE,
                Value = UserRoleEnum.User
            },
            new ESystemSetting
            {
                Key = SystemSetting.TEAM_GENERATION_ALLOWED_USER_ROLES,
                Value = new UserRoleEnum[] { UserRoleEnum.User, UserRoleEnum.Admin }
            }
        };
    }
}
