using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using static System.Net.Mime.MediaTypeNames;
using Inv.WebUI.Resources;
using System.Resources;
using System.Globalization;
using Inv.WebUI.Filter;

namespace Kids.WebUI.Controllers
{

    public class ClientToolsController : Controller
    {
  
        private struct ColumnObjectStruct
        {
            public string headerText { get; set; }
            public bool hidden { get; set; }
            public string key { get; set; }
            public string dataType { get; set; }
            public string width { get; set; }
            public bool filterable { get; set; }
        }



        #region For Search

        //public JsonResult Find(string moduleCode, string Condition, string controlName)
        //{
        //    SystemTools sys = new SystemTools();

        //    var obj = sys.SearchProperties(moduleCode, controlName);
        //    if (obj.Settings.DataSourceName == null)
        //    {
        //        return Shared.JsonObject(null);
        //    }
        //    string cols = string.Empty;

        //    List<ColumnObjectStruct> columnsObject = new List<ColumnObjectStruct>();
        //    columnsObject.Add(new ColumnObjectStruct()
        //    {
        //        dataType = "number",
        //        headerText = "",
        //        hidden = true,
        //        key = "RowIndex",
        //        width = "0"
        //    });
        //    foreach (G_SearchFormSetting column in obj.Columns)
        //    {
        //        if ((column.Language == 0) ||
        //            (SessionManager.SessionRecord.ScreenLanguage == "en" && column.Language == 2) ||
        //            (SessionManager.SessionRecord.ScreenLanguage == "ar" && column.Language == 1))
        //        {
        //            cols += "," + column.DataMember;
        //            ColumnObjectStruct colObj = new Controllers.ClientToolsController.ColumnObjectStruct();
        //            colObj.dataType = column.Datatype == 0 ? "string" : "number";

        //            if (SessionManager.SessionRecord.ScreenLanguage == "en")
        //                colObj.headerText = column.FieldTitle;
        //            else
        //                colObj.headerText = column.FieldTitleA;

        //            colObj.hidden = !column.IsReadOnly;
        //            colObj.filterable = false;
        //            colObj.key = column.DataMember;
        //            colObj.width = column.FieldWidth == 0 ? "100px" : (column.FieldWidth.ToString() + "px");

        //            columnsObject.Add(colObj);
        //        }
        //    }

        //    string tableName = obj.Settings.DataSourceName;
        //    string condition = "";

        //    if (Condition == null || Condition == "")
        //        condition = "";
        //    else
        //        condition = " Where " + Condition;

        //    string columns = cols.Substring(1);
        //    string orderBy = obj.Settings.ReturnDataPropertyName;

        //    var result = sys.Find(tableName, condition, columns, orderBy);

        //    var resultObject = new
        //    {
        //        TableName = tableName,
        //        Condition = condition,
        //        DataResult = result,
        //        Settings = obj.Settings,
        //        Columns = columnsObject

        //    };
        //    var jsonResult = Shared.JsonObject(resultObject);
        //    return jsonResult;
        //}


        //public JsonResult GetByIndex(string tableName, string Condition, int index, bool ChangePageIndex)
        //{
        //    SystemTools sys = new SystemTools();
        //    var result = sys.GetByIndex(tableName, Condition, index);
        //    var jsonResult = Shared.JsonObject(result);
        //    if (ChangePageIndex == true)
        //        SessionManager.PageIndex = index;
        //    return jsonResult;
        //}

        //public JsonResult GetIndexByUseId(string idValue, string BaseTableName, string idFieldName)
        //{
        //    SystemTools sys = new SystemTools();
        //    string _Result = sys.GetIndexByUseId(int.Parse(idValue), BaseTableName, idFieldName);
        //    return Shared.JsonObject(_Result);
        //}
        //public JsonResult GetIndexByUseCode(string idValue, string BaseTableName, string idFieldName,string condition)
        //{
        //    SystemTools sys = new SystemTools();
        //    string _Result = sys.GetIndexByUseCode(idValue, BaseTableName, idFieldName, condition);
        //    return Shared.JsonObject(_Result);
        //}

        #endregion




        //public JsonResult Refilter(string moduleCode, string Condition, string controllerName)
        //{
        //    var result = this.Find(moduleCode, Condition.Replace("Where", ""), controllerName);
        //    return result;
        //}
        //public JsonResult GetActionUrl(string actionName, string controllerName)
        //{
        //    string result = Url.Action(actionName, controllerName);
        //    return Shared.JsonObject(result);
        //}
        //public void SetValueToSession(string key, object value)
        //{
        //    Session[key] = value;
        //}
        public JsonResult GetResourceByName(string key)
        {
            SystemResource.ResourceManager.IgnoreCase = true;
            string result = SystemResource.ResourceManager.GetString(key);
            return Shared.JsonObject(result);
        }
        public JsonResult GetResourceNames(string _prefix)
        {
            Dictionary<string, string> dicResources = new Dictionary<string, string>();
            ResourceManager MyResourceClass = new ResourceManager(typeof(SystemResource));

            ResourceSet resourceSet = MyResourceClass.GetResourceSet(CultureInfo.CurrentUICulture, true, true);
            foreach (DictionaryEntry entry in resourceSet)
            {
                if (entry.Key.ToString().Contains(_prefix))
                {
                    string resourceKey = entry.Key.ToString();
                    string resourceValue = entry.Value.ToString();

                    dicResources.Add(resourceKey, resourceValue);
                }
            }
            return Shared.JsonObject(dicResources);
        }
        public JsonResult LogOut()
        {
            //Session.Clear();
            var obj = Shared.JsonObject(Url.Action("LoginIndex", "Login"));
            return obj;
        }
        //public JsonResult GetSession()
        //{
        //    var obj = new
        //    {
        //        SessionRecord = SessionManager.SessionRecord,
        //        Me = SessionManager.Me,
        //        PageIndex = SessionManager.PageIndex,
        //        ModelCount = SessionManager.ModelCount
        //    };
        //    return Shared.JsonObject(obj);
        //}
        //public void SetScreenLang(string lang)
        //{
        //    Session["ScreenLanguage"] = lang;
        //}
        //public JsonResult GetValueFromSession(string key)
        //{
        //    return Shared.JsonObject(Session[key]);
        //}

    }
}

