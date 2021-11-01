using Inv.WebUI.Filter;
using Inv.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class MessageController : Controller
    {
      
        public ActionResult MessageIndex()
        {
             return View();
        }

  




    }
}