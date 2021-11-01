
namespace Inv.WebUI.Models
{
    using System;
    using System.Collections.Generic;

    public partial class I_Control
    {
        public int CompCode { get; set; }
        public Nullable<int> DefSlsVatType { get; set; }
        public Nullable<int> DefPurVatType { get; set; }
        public Nullable<bool> IsVat { get; set; }
        public string VatNo { get; set; }
        public Nullable<int> MobileLength { get; set; }
        public Nullable<int> IDLength { get; set; }
        public Nullable<bool> SendSMS { get; set; }
        public Nullable<bool> SendPublicSMS { get; set; }
        public Nullable<int> NotePeriodinSec { get; set; }
        public Nullable<int> DashBoardPeriodinSec { get; set; }
        public Nullable<int> MaxYearlyMSGs { get; set; }
        public Nullable<int> UsedMSGs { get; set; }
        public Nullable<int> UserTimeZoneUTCDiff { get; set; }
        public Nullable<int> ServerTimeZoneUTCDiff { get; set; }
        public Nullable<int> SaudiNationID { get; set; }
        public Nullable<bool> WebCustomerWebsite { get; set; }
        public Nullable<System.DateTime> MembeshiptStartDate { get; set; }
        public Nullable<System.DateTime> MembeshipEndDate { get; set; }
        public Nullable<int> MembershipAllanceDays { get; set; }
        public Nullable<int> MembershipreadOnlyDays { get; set; }
        public string ExceedMinPricePassword { get; set; }
    }
}
