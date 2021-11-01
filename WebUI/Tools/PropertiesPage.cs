using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.WebUI.Tools
{
    public class PropertiesPageMahroos
    {
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
                if (HttpContext.Current.Session["ModelCount"] == null)
                    return 0;
                else
                    return (int)HttpContext.Current.Session["ModelCount"];
            }
            set
            {
                HttpContext.Current.Session["ModelCount"] = value;
            }
        }



    }
}