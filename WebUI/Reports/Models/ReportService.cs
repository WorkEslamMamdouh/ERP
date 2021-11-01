 using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using Inv.WebUI.Reports.Models;

namespace RS.WebUI.Reports.Models
{
    public class ReportService
    {
        public ReportService()
        {
            this._parameters.Clear();
        }

        private Dictionary<string, object> _parameters = new Dictionary<string, object>();

        public void AddParameter<T>(string Key, T Value)
        {
            Type typeOfValue = Value.GetType();
            if (typeOfValue == typeof(ReportParameters))
            {
                _parameters[Key] = Value;
            }
            else
            {
                this._parameters[Key] = Value;
            }
        }

        public string GetReportUrl(string ReportName)
        {
            string pars = string.Empty;
            //foreach (string key in _parameters.Keys)
            //{
            //    pars += """ + key + '"' +':'+'"' + _parameters[key]+'"';
            //}
            //pars = "{" + pars + "}" ;
            pars = Json.Encode(_parameters);
            
            string EnPar = Models.UserTools.Encrypt(pars, "Business-Systems"); // mahroos 
            EnPar = EnPar.Replace("+", "*");

            string uri = "http://" + HttpContext.Current.Request.Url.Host + ":" + HttpContext.Current.Request.Url.Port + "/" + HttpContext.Current.Request.ApplicationPath;

            string url = uri + "/Reports/Forms/ReportsForm.aspx?" + "rpt=" + ReportName + "&par="+EnPar;

            return url;
        }

    }

    public static class Extensions
    {
        public static string ToJsonString(this object obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            var result = JsonConvert.SerializeObject(obj, Formatting.Indented, settings);
            return result;
        }

        public static T ToJsonObject<T>(this string obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            settings.NullValueHandling = NullValueHandling.Ignore;
            var result = JsonConvert.DeserializeObject<T>(obj);
            return result;
        }



    }
}
