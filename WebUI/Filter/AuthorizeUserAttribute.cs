using Inv.WebUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;

namespace Inv.WebUI.Filter
{

    public class AuthorizeUserAttribute : AuthorizeAttribute
    {
       
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {    //mahroos
            //var User= HttpContext.Current.Session["Me"];
            //var SessionRecord = SessionManager.SessionRecord;
            //if (User != null&& SessionRecord!=null)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //}
            return true;

        }



        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectToRouteResult(
                        new RouteValueDictionary(
                            new
                            {
                                controller = "Login",
                                action = "LoginIndex"
                            })
                        );
        }


    }
}