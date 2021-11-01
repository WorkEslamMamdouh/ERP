//using Inv.API.Models.CustomEntities;
using Inv.WebUI.Reports.Models;
using RS.WebUI.Reports.Models;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{//eslam 1 dec 2020
    public class GeneralReportsController : Controller
    {
        public JsonResult Data_Report_Open(RepFinancials rp)
        {
            ReportService rep = new ReportService();

            rep.AddParameter("Data_Report", rp.Data_Report);

            string url = rep.GetReportUrl("Get_Name_Report_toParameter");

            return Shared.JsonObject(url);

        }
    }
}