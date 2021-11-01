using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.WebUI.Models
{
    public class UserPrivilege
    {
        public string MODULE_CODE { get; set; }
        public string MODULE_DESCE { get; set; }
        public string MODULE_DESCA { get; set; }
        public bool? Access { get; set; }
        public bool AddNew { get; set; }
        public bool Edit { get; set; }
        public bool VIEW { get; set; }
        public bool? Remove { get; set; }
        public bool PrintOut { get; set; }
        public bool CUSTOM1 { get; set; }
        public bool CUSTOM2 { get; set; }
        public bool CUSTOM3 { get; set; }
        public bool? CUSTOM4 { get; set; }
        public bool? CUSTOM5 { get; set; }
        public bool? CUSTOM6 { get; set; }
        public bool? CUSTOM7 { get; set; }
        public bool? CUSTOM8 { get; set; }
        public bool? CUSTOM9 { get; set; }
        public bool? ViewImages { get; set; }
        public bool? EditImages { get; set; }
        public bool? AVAILABLE { get; set; }
        public string LangPrifx { get; set; }

    }

}