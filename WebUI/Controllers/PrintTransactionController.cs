//using Inv.WebUI.Models;
//using Inv.WebUI.Reports.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//eslam 1 dec 2020
//namespace Inv.WebUI.Controllers
//{
//    public class PrintTransactionController : Controller
//    {
//        //asmaa
//        //public JsonResult PrintProgram(int id)
//        //{
//        //    ReportService rep = getStandardParameters();
//        //    rep.AddParameter("TRId", id);
//        //    string url = rep.GetReportUrl("KPrnt_Member");
//        //    return Shared.JsonObject(url);
//        //}



//        public JsonResult PrintPayrollEmp(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("EmpPayroll");
//            return Shared.JsonObject(url);
//        }

//        //public JsonResult PrintemployeeCard(int id)
//        //{
//        //    ReportService rep = getStandardParameters();
//        //    rep.AddParameter("TRId", id);
//        //    string url = rep.GetReportUrl("HPrnt_EmployeeCard");
//        //    return Shared.JsonObject(url);
//        //}

//        public JsonResult Printemployee(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("HPrnt_EmployeeNew");
//            return Shared.JsonObject(url);
//        }

//        public ReportService getStandardParameters()
//        {


//            Models.SessionRecord sr = SessionManager.SessionRecord;
//            ReportService rep = new ReportService();

//            rep.AddParameter("CompCode", sr.CompCode);
//            rep.AddParameter("braCode", sr.BranchCode);
//            rep.AddParameter("LoginUser", sr.UserCode);
//            rep.AddParameter("ScreenLanguage", sr.ScreenLanguage);
//            rep.AddParameter("SystemCode", sr.SystemCode);
//            rep.AddParameter("SubSystemCode", sr.SubSystemCode);

//            return rep;
//        }

//        public JsonResult PrintEmpCard(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("HPrnt_EmployeeCard");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintRewardsAndDiscounts(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("EmpAddDed");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintProgram(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrc_ProgramList");
//            return Shared.JsonObject(url);
//        }

//        //public JsonResult PrintExpenses(int id)// ID must in ID TypeScript
//        //{
//        //    ReportService rep = getStandardParameters();
//        //    rep.AddParameter("TRId", id);
//        //    string url = rep.GetReportUrl("KPrnt_Expenses");
//        //    return Shared.JsonObject(url);
//        //}
//        public JsonResult PrintExpenses(int ExpenseStatementID)// ID must in ID TypeScript
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", ExpenseStatementID);
//            string url = rep.GetReportUrl("KPrnt_Expenses");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintEmpEvaluation(int id)// ID must in ID TypeScript
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("HPrc_Evaluation");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintAttendanceRecord(int id)// ID must in ID TypeScript
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("HPrc_EmpAttendancelistSummary");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult print_EmpTraining(int id)// ID must in ID TypeScript
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrc_Prnt_Specialists");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintTempInvoice(int id)
//        {

//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrnt_TmpInvoice");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintInvoiceReturn(int id)
//        {

//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrnt_InvoiceReturn");
//            return Shared.JsonObject(url);
//        }


//        public JsonResult PrintInvoice(int id)
//        {

//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrnt_Invoice");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintMember(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrnt_Card");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintReceipt(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrnt_Receipt");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintServices(int id)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            string url = rep.GetReportUrl("KPrnt_Services");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintUser(string UserCode)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("usr", UserCode);
//            string url = rep.GetReportUrl("KPrnt_UserPriv");
//            return Shared.JsonObject(url);
//        }


//        public JsonResult PrintMemberCard(int id, bool ISQR)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            rep.AddParameter("ISQR", ISQR);
//            //rep.AddParameter("MemberCode", MemberCode);
//            //rep.AddParameter("imagepath", imgpath);
//            string url = rep.GetReportUrl("KPrnt_MemberCard");
//            return Shared.JsonObject(url);
//        }
//        public JsonResult PrintMember1(int id, bool ISQR)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            rep.AddParameter("ISQR", ISQR);
//            // rep.AddParameter("MemberCode", MemberCode);
//            string url = rep.GetReportUrl("KPrnt_Member");
//            return Shared.JsonObject(url);
//        }
//        public JsonResult PrintMembersCards(int id1, int id2, int id3, int id4, bool ISQR)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("id1", id1);
//            rep.AddParameter("id2", id2);
//            rep.AddParameter("id3", id3);
//            rep.AddParameter("id4", id4);

//            rep.AddParameter("ISQR", ISQR);
//            // rep.AddParameter("MemberCode", MemberCode);
//            string url = rep.GetReportUrl("KProc_CardsMember");
//            return Shared.JsonObject(url);
//        }
//        public JsonResult PrintEmployeeCard(int id, bool ISQR)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("TRId", id);
//            rep.AddParameter("ISQR", ISQR);
//            //rep.AddParameter("MemberCode", MemberCode);
//            //rep.AddParameter("imagepath", imgpath);
//            string url = rep.GetReportUrl("HPrnt_EmployeeCard");
//            return Shared.JsonObject(url);
//        }

//        public JsonResult PrintEmployeesCards(int id1, int id2, int id3, int id4, bool ISQR)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("id1", id1);
//            rep.AddParameter("id2", id2);
//            rep.AddParameter("id3", id3);
//            rep.AddParameter("id4", id4);

//            rep.AddParameter("ISQR", ISQR);
//            // rep.AddParameter("MemberCode", MemberCode);
//            string url = rep.GetReportUrl("HPrnt_EmployeeCards");
//            return Shared.JsonObject(url);
//        }
//        public JsonResult PrintDeliveryCards(int id1, int id2, int id3, int id4, bool ISQR)
//        {
//            ReportService rep = getStandardParameters();
//            rep.AddParameter("id1", id1);
//            rep.AddParameter("id2", id2);
//            rep.AddParameter("id3", id3);
//            rep.AddParameter("id4", id4);

//            rep.AddParameter("ISQR", ISQR);
//            // rep.AddParameter("MemberCode", MemberCode);
//            string url = rep.GetReportUrl("KProc_CardsDelivery");
//            return Shared.JsonObject(url);
//        }

//    }
//}