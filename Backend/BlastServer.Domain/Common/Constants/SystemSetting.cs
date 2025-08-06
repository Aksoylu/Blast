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

        public static readonly string[] ALL =
        {
            SystemSetting.ORGANIZATION,
            SystemSetting.REGISTER_USER_ACCOUNT_STATUS,
            SystemSetting.REGISTER_USER_ROLE,
        };
    }
}
