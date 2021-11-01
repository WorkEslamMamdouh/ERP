using Inv.WebUI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
//using Inv.WebUI.Models.CustomModels;

namespace Inv.WebUI.Controllers
{
    public class SessionController : Controller
    {
        
        public void SetSessionRecord(string value)
        {
            SessionManager.SessionRecord = JsonConvert.DeserializeObject<SessionRecord>(value);
        }
        public JsonResult GetSessionRecord()
        {
            return Shared.JsonObject(SessionManager.SessionRecord);
        }
       
        
        public void SetSessionRecordValue(string propertyName,string value)
        {
            if (propertyName == null)
                return;
            PropertyInfo property = typeof(SessionRecord).GetProperty(propertyName);
            property.SetValue(SessionManager.SessionRecord, value);
        }
        public JsonResult GetSessionRecordValue(string propertyName)
        {
            if (propertyName == null)
                return Shared.JsonObject("");
            PropertyInfo property = typeof(SessionRecord).GetProperty(propertyName);
            var value = property.GetValue(SessionManager.SessionRecord);
            return Shared.JsonObject(value);
        }

    }
}