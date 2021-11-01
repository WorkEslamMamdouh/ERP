using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inv.API.Tools
{
    public static class Extensions
    {
        public static string ToPascalCase(this string value)
        {
            string result = string.Empty;
            try
            {
                List<string> words = value.Split(' ').ToList();
                foreach (string item in words)
                {
                    string temp = item.Substring(1);
                    char c = item[0];
                    result += c.ToString().ToUpper() + temp + " ";
                }
            }
            catch (Exception)
            {
                result = value;
            }

            return result;
        }


        public static string ToJsonString(this object obj)
        {
            Newtonsoft.Json.JsonSerializerSettings settings = new Newtonsoft.Json.JsonSerializerSettings();
            settings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            string result = Newtonsoft.Json.JsonConvert.SerializeObject(obj, Newtonsoft.Json.Formatting.Indented, settings);
            return result;
        }

        public static T ToJsonObject<T>(this string value)
        {
            Newtonsoft.Json.JsonSerializerSettings settings = new Newtonsoft.Json.JsonSerializerSettings();
            settings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            T result = Newtonsoft.Json.JsonConvert.DeserializeObject<T>(value,settings);
            return result;
        }
    }
}