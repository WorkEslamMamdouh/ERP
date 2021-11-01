//using Inv.WebUI.Models.CustomModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.WebUI.Models
{
    public class SessionRecord
    {
        public string SystemCode { get; set; }
        public string SubSystemCode { get; set; }
        public string Modulecode { get; set; }
        public string UserCode { get; set; }
        public string CompCode { get; set; }
        public string BranchCode { get; set; }
        public string CurrentYear { get; set; }
        public string ScreenLanguage { get; set; }
        public string SystemName { get; set; }
        public string SubSystemName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyNameAr { get; set; }
        public string BranchName { get; set; }
        public string Token { get; set; }
        
    }
}