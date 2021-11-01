using CloudBeuty.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using CloudBeuty.ServiceConnector.Models;

namespace CloudBeuty.WebUI.Tools
{
    public class SessionManager
    {
        public static G_USERS Me
        {
            set
            {
                HttpContext.Current.Session["Me"] = value;
            }
            get
            {
                return HttpContext.Current.Session["Me"] as G_USERS;
            }
        }
        public static int PageIndex
        {
            get
            {
                int result = HttpContext.Current.Session["PageIndex"] == null ? 0 :
                    (int)HttpContext.Current.Session["PageIndex"];
                return result;
            }
            set
            {
                HttpContext.Current.Session["PageIndex"] = value;
            }
        }
        public static int ModelCount
        {
            get
            {
                return (int)HttpContext.Current.Session["ModelCount"];
            }
            set
            {
                HttpContext.Current.Session["ModelCount"] = value;
            }
        }

        //public static SessionRecord SessionRecord
        //{
        //    set
        //    {
        //        HttpContext.Current.Session["SessionRecord"] = value;
        //    }
        //    get
        //    {
        //        return HttpContext.Current.Session["SessionRecord"] as SessionRecord;
        //    }
        //}
    }
}