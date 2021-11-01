namespace Inv.WebUI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class G_USERS
    {
           
        public string USER_CODE { get; set; }
        public string USER_PASSWORD { get; set; }
        public bool USER_ACTIVE { get; set; }
        public string USER_NAME { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string REGION_CODE { get; set; }
        public Nullable<int> GRP_CODE { get; set; }
        public string USER_PASSWORD2 { get; set; }
        public string USER_PASSWORD3 { get; set; }
        public Nullable<System.DateTime> CHANGE_PASS_DATE { get; set; }
        public string MANUAL_VC { get; set; }
        public string MASTER_USER_CODE { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string Fax { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string DepartmentName { get; set; }
        public string JobTitle { get; set; }
        public Nullable<byte> USER_TYPE { get; set; }
        public string ManagedBy { get; set; }
        public string Tokenid { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }

    }
}
