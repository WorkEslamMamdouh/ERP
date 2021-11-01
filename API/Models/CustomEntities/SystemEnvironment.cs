using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Models.CustomEntities
{
    public class SystemEnvironment
    {
        public static string SystemCode
        {
            set
            {
                HttpContext.Current.Session["SystemCode"] = value;
            }
            get
            {
                return HttpContext.Current.Session["SystemCode"] as string;
            }
        }
        public static string SubSystemCode
        {
            set
            {
                HttpContext.Current.Session["SubSystemCode"] = value;
            }
            get
            {
                return HttpContext.Current.Session["SubSystemCode"] as string;
            }
        }
        public string CurrentYear { get; set; }
        public string Modulecode { get; set; }
        public string UserCode { get; set; }
        public string CompCode { get; set; }
        public string BranchCode { get; set; }
        public string Language { get; set; }
        public string ScreenLanguage { get; set; }
        public string SystemName { get; set; }
        public string SubSystemName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyNameAr { get; set; }
        public string BranchName { get; set; }
    }
}