using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inv.WebUI.Tools
{
    public class StaticTools:Controller
    {
        public JsonResult JsonObject(object obj)
        {
            var result = Json(new { result = obj }, JsonRequestBehavior.AllowGet);
            return result;
        }
    }
}