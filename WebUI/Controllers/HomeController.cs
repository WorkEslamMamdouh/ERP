using Inv.WebUI.Filter;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{

    [AuthorizeUserAttribute()]
    public class HomeController : Controller
    {



        //    GET: Home
        public ActionResult HomeIndex()
        {

            //Session["ErrorUrl"] = "";//Url.Action("LoginIndex", "Login");
            //SessionManager.SessionRecord.CompanyNameAr = "";

            //Session["SystemProperties"] = SessionManager.SessionRecord;

            return View("HomeIndex");
        }

        public ActionResult Admin()
        {
            return View();
        }

        public ActionResult AdminHome()
        {
            return View();
        }
        public JsonResult AdminHome_()
        {

            var obj = new
            {
                url = Url.Action("AdminHome", "Home")

            };
            var result = Shared.JsonObject(obj);
            return result;
        }
        public ActionResult HomeIndexPackage()
        {


            return View("HomeIndex");
        }

        //public JsonResult GetSystemProperties()
        //{
        //    SessionRecord jsonObject = (SessionRecord)Session["SystemProperties"];
        //    string data = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObject, Newtonsoft.Json.Formatting.Indented);
        //    return Shared.JsonObject(data);
        //}

        public ActionResult Logout()
        {

            //SessionManager.Me = null;
            //SessionManager.ModelCount = 0;
            //SessionManager.PageIndex = 0;
            //SessionManager.SessionRecord = null;

            return RedirectToAction("Loginindex", "Login");
        }

        public ViewResult Help()
        {

            return View();
        }


        public ActionResult OpenView(string ModuleCode)
        {


            if (ModuleCode == "ImagPopUp")
            {
                return PartialView("~/Views/Shared/ImagePopup.cshtml");

            }
            if (ModuleCode == "Messages_screen")
            {
                return PartialView("~/Views/Shared/Messages_screen.cshtml");
            }
            if (ModuleCode == "ImagePopupiupload")
            {
                return PartialView("~/Views/Shared/ImagePopupiupload.cshtml");
            }

            return PartialView("");

        }

        #region Open Pages 



        public ActionResult USERSIndex()
        {
            return View("~/Views/Tools/USERS/USERSIndex.cshtml");
        }
        public ActionResult AdminBarIndex()
        {
            return View("~/Views/AdminSetting/AdminBarIndex.cshtml");
        }
        public ActionResult ClientaccstatIndex()
        {
            return View("~/Views/CollectionReports/ClientaccstatIndex.cshtml");
        }

        public ActionResult AdminCompIndex()
        {
            return View("~/Views/AdminSetting/AdminCompIndex.cshtml");
        }






        public ActionResult SlsTrSalesIndex()
        {
            return View("~/Views/Sales/SlsTrSalesIndex.cshtml");
        }
        public ActionResult SlsTrReturnIndex()
        {
            return View("~/Views/Sales/SlsTrReturnIndex.cshtml");
        }
        public ActionResult SlsTrSalesManagerIndex()
        {
            return View("~/Views/Sale/SlsTrSalesManagerIndex.cshtml");
        }
        public ActionResult PurchasesIndex()
        {
            return View("~/Views/Purchases/PurchasesIndex.cshtml");
        }

        public ActionResult CategoriesIndex()
        {
            return View("~/Views/Stock/CategoriesIndex.cshtml");
        }


        public ActionResult ItemsIndex()
        {
            return View("~/Views/Stock/ItemsIndex.cshtml");
        }
        public ActionResult familly_CatIndex()
        {

            return View("~/Views/Stock/familly_Cat.cshtml");
        }
        public ActionResult SupplierIndex()
        {
            return View("~/Views/Generalsetting/SupplierIndex.cshtml");
        }
        public ActionResult CUSTOMERSIndex()
        {
            return View("~/Views/Generalsetting/CUSTOMERSIndex.cshtml");
        }
        public ActionResult Catch_ReceiptIndex()
        {
            return View("~/Views/Generalsetting/Catch_ReceiptIndex.cshtml");
        } 
        public ActionResult SalesinventoryIndex()
        {

            return View("~/Views/Report/Salesinventory.cshtml");
        }
        public ActionResult Income_expensesIndex()
        {

            return View("~/Views/Report/Income_expenses.cshtml");
        }




        #endregion  Open Pages 

    }
}