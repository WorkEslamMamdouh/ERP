using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomModel
{
    public partial class CompanyLoginStatus
    {
        public int CompCode { get; set; }
        public Nullable<bool> AddAble { get; set; }
        public Nullable<bool> Editable { get; set; }
        public int CompStatus { get; set; }
        public string LoginMsg { get; set; }

        public int FIN_YEAR { get; set; }
        public Nullable<short> ACC_STATUS { get; set; }
        public Nullable<short> INV_STATUS { get; set; }
        public Nullable<System.DateTime> FirstDate { get; set; }
        public Nullable<System.DateTime> LastDate { get; set; }
        public string ProfitAcc_Code { get; set; }
        public Nullable<int> OpenAccVoucheNo { get; set; }
        public Nullable<int> OpenInvAdjNo { get; set; }
    }
}