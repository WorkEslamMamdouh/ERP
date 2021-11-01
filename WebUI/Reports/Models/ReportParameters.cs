using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//eslam 1 dec 2020
namespace Inv.WebUI.Reports.Models
{


    public class Settings_Report_StdParamters
    {

        public string ID_Button_Print { get; set; }
        public string Name_Report { get; set; }
        public string Name_Stored_Report { get; set; }
        public string Parameter_1 { get; set; }
        public string Parameter_2 { get; set; }
        public string Parameter_3 { get; set; }
        public string Parameter_4 { get; set; }
        public string Parameter_5 { get; set; }
        public string Parameter_6 { get; set; }
        public string Parameter_7 { get; set; }
        public string Parameter_8 { get; set; }
        public string Parameter_9 { get; set; }
        public string Parameter_ { get; set; }
        public int Type_Print { get; set; }

    }

    public class StdParamters
    {
        public string SystemCode { get; set; }
        public string SubSystemCode { get; set; }
        public string Modulecode { get; set; }
        public string UserCode { get; set; }
        public string CompCode { get; set; }
        public string BranchCode { get; set; }
        public string Language { get; set; }
        public string CurrentYear { get; set; }
        public string ScreenLanguage { get; set; }
        public string SystemName { get; set; }
        public string SubSystemName { get; set; }
        public string CompNameE { get; set; }
        public string CompNameA { get; set; }
        public string BranchName { get; set; }
        public string Tokenid { get; set; }
    }
    public class ReportParameters : StdParamters // eslam Adding base class 
    {

        public int DepartmentID { get; set; }
         public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
    public class RepAttend : StdParamters // mahroos Adding base class 
    {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string FromDt { get; set; }
        public string ToDt { get; set; }
        public int? SrvId { get; set; }
        public int? ShiftId { get; set; }
        public int Sex { get; set; }
        public int? PeriodId { get; set; }
        public int Type { get; set; }

        public int Shift { get; set; }
    }


    public class RepAttendAndResev : StdParamters // eslam Adding base class 
    {
        public int id1 { get; set; }
        public int id2 { get; set; }
        public int id3 { get; set; }
        public int id4 { get; set; }
        public int typ { get; set; }
        public bool ISQR { get; set; }
    }
    public class Reportparam : StdParamters // eslam Adding base class 
    {

        public bool ISQR { get; set; }
        public int TRId { get; set; }
        public int usr { get; set; }


    }
    public class Reporttransactionparam : StdParamters // eslam Adding base class 
    {

        public bool ISQR { get; set; }
        public int id { get; set; }
        public int id1 { get; set; }
        public int id2 { get; set; }
        public int id3 { get; set; }
        public int id4 { get; set; }
        public int Type { get; set; }
        public int ExpenseStatementID { get; set; }
        public string User_Code { get; set; }


    }

    public class RepExpensesDetails : StdParamters // eslam Adding base class 
    {
        public DateTime FromDt { get; set; }
        public DateTime ToDt { get; set; }
        public int CatId { get; set; }
        public int ExpID { get; set; }
        public int PeriodId { get; set; }
        public int PurchId { get; set; }
        public int Type { get; set; }

    }

    public class RepCollInPer : StdParamters // eslam Adding base class 
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDt { get; set; }
        public DateTime ToDt { get; set; }
        public int SrvId { get; set; }
        public int ShiftId { get; set; }
        public int Sex { get; set; }
        public int PeriodId { get; set; }
        public int Shift { get; set; }
        public string User { get; set; }
        public int cashType { get; set; }
        public int stat { get; set; }
 
        public int Type { get; set; }
    }

    public class RepStatement : StdParamters // eslam Adding base class 
    {
        public DateTime FromDt { get; set; }
        public DateTime ToDt { get; set; }

        public int MemId { get; set; }
        public int SrvId { get; set; }
        public int ShiftId { get; set; }
        public int Sex { get; set; }
        public int PeriodId { get; set; }
        public int Type { get; set; }
        public int Shift { get; set; }

    }

    public class RepFinancialSituation : StdParamters // eslam Adding base class 
    {
        public DateTime FromDt { get; set; }
        public DateTime ToDt { get; set; }
        public int stat { get; set; }
        public int Shift { get; set; }
        public int PeriodId { get; set; }
        public int SrvId { get; set; }
        public int ShiftId { get; set; }
        public int Sex { get; set; }
        public int Type { get; set; }
        // public string User { get; set; }
    }

    public class RepCurrentSubscribers : StdParamters // eslam Adding base class 
    {
        public DateTime FromDt { get; set; }
        public DateTime ToDt { get; set; }
        public int PeriodDays { get; set; }
        public int SrvId { get; set; }
        public int ShiftId { get; set; }
        public int Sex { get; set; }
        public int Shift { get; set; }
        public int PeriodId { get; set; }
        public int Type { get; set; }
    }

    public class RepAttendanceReport : StdParamters // mahroos Adding base class 
    {
        public int TRId { get; set; }
        public int CatId { get; set; }
        public int JobID { get; set; }
        public int NatId { get; set; }
        public int Empid { get; set; }
        public int EmpStat1 { get; set; }
        public int EmpStat2 { get; set; }
        public int EmpStat3 { get; set; }
        public int EmpStat5 { get; set; }
        public int Type { get; set; }

    }

    public class RepEmployeeReport : StdParamters // eslam Adding base class 
    {
        public int CatId { get; set; }
        public int JobID { get; set; }
        public int NatId { get; set; }
        public int EmpStat1 { get; set; }
        public int EmpStat2 { get; set; }
        public int EmpStat3 { get; set; }
        public int EmpStat5 { get; set; }
        public int Type { get; set; }

    }

    public class RepVatList : StdParamters // eslam Adding base class 
    {
        public DateTime FromDt { get; set; }
        public DateTime ToDt { get; set; }
        public int Type { get; set; }
        public int stat { get; set; }

    }
    public class RepFinServiceIncome : StdParamters // eslam Adding base class 
    {

        public DateTime FromDt { get; set; }
        public DateTime ToDt { get; set; }
        public int SrvCatId { get; set; }
        public int ShiftId { get; set; }
        public int Sex { get; set; }
        public int PeriodId { get; set; }
        public int Type { get; set; }

        public int Shift { get; set; }
    }

    public class RepFinancials : StdParamters // Mona Adding  class 
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int BoxId { get; set; }
        public int RepType { get; set; }
        public string TrType { get; set; }
        public int RecType { get; set; }
        public string BnfID { get; set; }
        public string BnfDesc { get; set; }
        public int Status { get; set; }
        public int Repdesign { get; set; }
        public int TRId { get; set; }
        public int AdjDebit { get; set; }
        public int AdjId { get; set; }
        public int CustomerID { get; set; }
        public int VendorId { get; set; }
        public int SalesmanID { get; set; }
        public int CashType { get; set; }
        public int PaymentType { get; set; }
        public int CashBoxID { get; set; }
        public string MobileNo { get; set; }
        public int typ { get; set; }
        public int Type { get; set; }
        public int CatId { get; set; }
        public int Groupid { get; set; }
        public int IsCredit { get; set; }
        public int BalStatus { get; set; }
        public int slip { get; set; }
        public int VendType { get; set; }
        public string Data_Report { get; set; }
        



    }

}