using Inv.WebUI.App_Start;
using Inv.WebUI.Controllers;
using Inv.WebUI.Tools;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Inv.WebUI
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_Error(object sender,EventArgs e)
        {
            Exception ex = Server.GetLastError();
            Server.ClearError();
            string url = "/Login/LoginIndex";  // HttpContext.Current.Session["ErrorUrl"].ToString();
            // url = url + "?err=" + ex.Message + "      " + ex.InnerException;
            Response.Redirect(url);
        }

        //protected void Session_Start()
        //{
        //    Session["User_Privilege"] = null;
        //    Session["SystemProperties"] = null;
        //    Session["PageProperties"] = null;

        //}

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
           
            if (HttpContext.Current.Request.Cookies["Inv1_systemProperties"] != null && HttpContext.Current.Request.Cookies["Inv1_systemProperties"].Value != "null")
            {
                string systemProperties = HttpContext.Current.Request.Cookies["Inv1_systemProperties"].Value.ToString();

                var Lang = JsonConvert.DeserializeObject<SystemEnvironment>(systemProperties).ScreenLanguage;

                DateTimeFormatInfo usDtfi = new CultureInfo("en-GB", false).DateTimeFormat;
                usDtfi.ShortDatePattern = "dd/MM/yyyy";
                usDtfi.FirstDayOfWeek = DayOfWeek.Sunday;
                if (Lang != null)
                {
                    System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(Lang);
                    System.Threading.Thread.CurrentThread.CurrentCulture.DateTimeFormat = usDtfi;
                    System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(Lang);
                    System.Threading.Thread.CurrentThread.CurrentUICulture.DateTimeFormat = usDtfi;
                 
                }
            }

 
        }


    }
}
