using Inv.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace System.Web.Mvc
{
    public class Shared : Controller
    {
        static StaticTools tool = new StaticTools();
        public static JsonResult JsonObject(object obj)
        {
            var result = tool.JsonObject(obj);
            return result; 
        }


        //public static string AppSettings(string key)
        //{
        //    RestClient rc = new RestClient();
        //    string result = rc.Get<string>("SystemTools", "GetAppSettings", "Key=" + key);
        //    return result;
        //}

        public static void changeDateFormate()
        {
            System.Globalization.CultureInfo customCulture = new System.Globalization.CultureInfo("en-GB", true);

            customCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";

            System.Threading.Thread.CurrentThread.CurrentCulture = customCulture;
            System.Threading.Thread.CurrentThread.CurrentUICulture = customCulture;
        }

        public static DateTime GetCurrentDate(int DiffHours)
        {
            DateTime utc = DateTime.UtcNow;
            DateTime res = utc.AddHours(DiffHours);
            return res;
        }

    


    }
}