using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace System.Web.Mvc
{
    public enum HtmlActionCollection
    {
        GetModelCount,
        Next,
        Previous,
        Last,
        First,
        Add,
        Insert,
        Update,
        Delete,
        Find,
        OnSearchSelect,
        Print,
        Undo,

        AddRow,
        EditRow,
        RemoveRow
    }
    public static class GeneralHtmlHelper
    {
        public static MvcHtmlString SystemActions(this HtmlHelper htmlHelper,string controllerName)
        {
            string result = string.Empty;

            result +=
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.GetModelCount).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Next).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Previous).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Last).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.First).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Add).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Insert).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Update).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Delete).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.First).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Undo).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.OnSearchSelect).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.Print).ToHtmlString() +

                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.AddRow).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.EditRow).ToHtmlString() +
                htmlHelper.ActionUrl(controllerName, HtmlActionCollection.RemoveRow).ToHtmlString();

            return new MvcHtmlString(result);
        }

        public static MvcHtmlString ActionUrl(this HtmlHelper htmlHelper,string controllerName,HtmlActionCollection action)
        {
            var urlAction = htmlHelper.ViewContext.HttpContext;

            var urlData = GetActionName(action);
            string url = new UrlHelper(htmlHelper.ViewContext.RequestContext).Action(urlData.Url, controllerName);

            TagBuilder tag = new TagBuilder("input");
            tag.MergeAttribute("type", "hidden");
            tag.MergeAttribute("id", urlData.ID);
            tag.MergeAttribute("value", url);
            tag.MergeAttribute("style", "color:red");

            return new MvcHtmlString(tag.ToString());
        }

        private struct UrlActionData
        {
            public string ID { get; set; }
            public string Url { get; set; }
        }
        private static UrlActionData GetActionName(HtmlActionCollection action)
        {
            string url = string.Empty;
            string id = string.Empty;
            UrlActionData result = new UrlActionData();
            switch (action)
            {
                case HtmlActionCollection.GetModelCount:
                    url = "GetModelCount";
                    break;
                case HtmlActionCollection.Next:
                    url = "Next";
                    break;
                case HtmlActionCollection.Previous:
                    url = "Previous";
                    break;
                case HtmlActionCollection.Last:
                    url = "Last";
                    break;
                case HtmlActionCollection.First:
                    url = "First";
                    break;
                case HtmlActionCollection.Add:
                    url = "Add";
                    break;
                case HtmlActionCollection.Insert:
                    url = "Insert";
                    break;
                case HtmlActionCollection.Update:
                    url = "Update";
                    break;
                case HtmlActionCollection.Delete:
                    url = "Delete";
                    break;
                case HtmlActionCollection.Find:
                    url = "Find";
                    break;
                case HtmlActionCollection.OnSearchSelect:
                    url = "OnSearchSelect";
                    break;
                case HtmlActionCollection.Print:
                    url = "Print";
                    break;
                case HtmlActionCollection.Undo:
                    url = "Undo";
                    break;
                case HtmlActionCollection.AddRow:
                    url = "AddRow";
                    break;
                case HtmlActionCollection.EditRow:
                    url = "EditRow";
                    break;
                case HtmlActionCollection.RemoveRow:
                    url = "RemoveRow";
                    break;
                default:
                    break;
            }

            id = url + "Url";
            result.Url = url;
            result.ID = id;
            return result;
        }

        //public static MvcHtmlString ControlsButtons(this HtmlHelper htmlHelper)
        //{
        //    return htmlHelper.Partial("../Partial/ControlsButtons");
        //}

        //public static MvcHtmlString CustomActionLink(this HtmlHelper htmlHelper,string text,string controllerName,string moduleCode)
        //{
        //    SessionManager.CurrentUserModule = new RS.ServiceConnector.Models.DbEntities().G_USER_MODULE
        //        .Where(f => 
        //        f.MODULE_CODE == moduleCode &&
        //        f.USER_CODE == SessionManager.Me.USER_CODE &&
        //        f.SYSTEM_CODE == SessionManager.SessionRecord.SystemCode &&
        //        f.SUB_SYSTEM_CODE == SessionManager.SessionRecord.SubSystemCode
        //        ).Result().First();

        //    var result = htmlHelper.ActionLink(text, controllerName + "Index", controllerName);
        //    return result;
        //}

        public static MvcHtmlString CustomActionLink(this HtmlHelper htmlHelper, string text, string controllerName, string moduleCode)
        {

            //SessionManager.CurrentUserModule = new RS.ServiceConnector.Models.DbEntities()

            var result = htmlHelper.ActionLink(text, controllerName + "Index", controllerName);
            return result;
        }

    }

    
}