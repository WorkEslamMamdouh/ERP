//using Inv.API.Models.CustomEntities;
using Inv.WebUI.Models;
using Inv.WebUI.Reports.Models;

 using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RS.WebUI.Reports.Models;
using Microsoft.Reporting.WebForms;
using System.Data.SqlClient;
using System.Data;
using Inv.WebUI.Reports.Forms;
using Inv.DAL.Repository;
using Inv.DAL.Domain;
using System.Net.Http;
using System.Web.Configuration;
using Newtonsoft.Json;

namespace Inv.WebUI.Controllers
{//eslam 1 dec 2020
    public class PrintReportsController : Controller
    {

         
        StdParamters CurrentReportParameters;
        Settings_Report_StdParamters Repor = new Settings_Report_StdParamters(); 
        ReportsDetails ReportsDetail = new ReportsDetails();
        ReportInfo Rep = new ReportInfo();
        ClassPrint Printer = new ClassPrint();
        string cs = "Data Source= . ; database = POS2021 ; user id = sa ; Password= 619619 ;";
        protected InvEntities db = UnitOfWork.context(BuildConnectionString());
        string NameAr;
        string NameEn;
        string BrNameAr;
        string BrNameEn;
        string SystemCode = "";
        string SubSystemCode = "";
        int CompCode = 0;
        int? branCode = 0;
        string LoginUser = "";
        string ScreenLanguage = "";
        string reportName = "";
        object[] query;
        ReportViewer reportViewer = new ReportViewer();
        string Par;

        public static string BuildConnectionString()
        {
            var httpClient = new HttpClient();
            var res = httpClient.GetStringAsync(WebConfigurationManager.AppSettings["ServiceUrl"] + "SystemTools/BuildConnection").Result;
            return res;
        }


        public void ReportsDetails()
        {

            ReportsDetail.PrintName = Rep.PrinterName;
            ReportsDetail.PageSize = Rep.PageSize;
            ReportsDetail.Landscape = Rep.Landscape;
            ReportsDetail.RightMargin = Rep.RightMargin;
            ReportsDetail.LeftMargin = Rep.LeftMargin;
            ReportsDetail.TopMargin = Rep.TopMargin;
            ReportsDetail.BottomMargin = Rep.BottomMargin;
            ReportsDetail.PageHight = Rep.PageHight;
            ReportsDetail.PageWidth = Rep.PageWidth;

        }

        
         

        public string Data_Report_Open(RepFinancials rp)
        {





            return Get_Name_Report_toParameter(rp);

        }


        private string BindReport(string reportName, int OutputTypeNo, string OutputType, ReportsDetails ReportsDetail, params object[] models)
        {



            OutputType = "PDF";



            string ReportPDFFilename = "Report-" + DateTime.Now + ".pdf";
            LocalReport localReport = new LocalReport();
            localReport.DataSources.Clear();
            foreach (var model in models)
            {
                ReportDataSource source = new ReportDataSource(reportName, model);
                localReport.DataSources.Add(source);
            }

            if (reportName.Contains("Prnt"))
            {
                localReport.ReportPath = Server.MapPath("../Report/Print/" + reportName + ".rdlc");
            }
            else if (reportName.Contains("Slip"))
            {
                localReport.ReportPath = Server.MapPath("../Report/Slip/" + reportName + ".rdlc");
            }
            else
            {
                localReport.ReportPath = Server.MapPath("../Report/Reports/" + reportName + ".rdlc");
                localReport.ReportPath = Server.MapPath("../Reports/Report/Reports/" + reportName + ".rdlc");
            }

            try
            {
                //byte[] bytes = localReport.Render("PDF");
                //File(bytes, "application/pdf", ReportPDFFilename);

                //Printer.PrintToPrinter(localReport, ReportsDetail);


                string reportType = "Image";
                byte[] renderedBytes; 
                renderedBytes = localReport.Render(reportType, "<DeviceInfo><OutputFormat>JPEG</OutputFormat></DeviceInfo>"); 
                string base64String = Convert.ToBase64String(renderedBytes);
                return base64String;
            }
            catch (Exception ex)
            {

                throw;
            }




        }



        #region Calling Reports Function

        string value1;
        string value2;
        string value3;
        string value4;
        string value5;
        string value6;
        string value7;
        string value8;
        string value9;
        int Type_Print = 1;


        public string Get_Name_Report_toParameter(RepFinancials PORr)
        {
            //ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('" + 11 + "');", true);

            string PO;
            RepFinancials RepPar = PORr;
            PO = RepPar.Data_Report.ToString();
            List<Settings_Report_StdParamters> POR = JsonConvert.DeserializeObject<List<Settings_Report_StdParamters>>(PO);

            //var query = db.Database.SqlQuery<IProc_Rep_AccAdjustList_Result>(_Query).ToList();
            foreach (var item in POR)
            {

                var data3 = db.Get_Settings_Report_and_Parameter(item.ID_Button_Print).ToList();

                value1 = item.Parameter_1;
                value2 = item.Parameter_2;
                value3 = item.Parameter_3;
                value4 = item.Parameter_4;
                value5 = item.Parameter_5;
                value6 = item.Parameter_6;
                value7 = item.Parameter_7;
                value8 = item.Parameter_8;
                value9 = item.Parameter_9;
                Type_Print = item.Type_Print;

                foreach (var data in data3)
                {

                    Repor.ID_Button_Print = data.ID_Button_Print;
                    Repor.Name_Report = data.Name_Report;

                    Repor.Name_Stored_Report = data.Name_Stored_Report;
                    Repor.Parameter_1 = data.Parameter_1;
                    Repor.Parameter_2 = data.Parameter_2;
                    Repor.Parameter_3 = data.Parameter_3;
                    Repor.Parameter_4 = data.Parameter_4;
                    Repor.Parameter_5 = data.Parameter_5;
                    Repor.Parameter_6 = data.Parameter_6;
                    Repor.Parameter_7 = data.Parameter_7;
                    Repor.Parameter_8 = data.Parameter_8;
                    Repor.Parameter_9 = data.Parameter_9;


                    DataTable dt = GetData_toParameter();
                   return BindReport(Repor.Name_Report, Type_Print, "PDF", ReportsDetail, dt);


                }
            }

            return "Eslam";

        }

        public DataTable GetData_toParameter()
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(cs))
            {

                //ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('" + con.WorkstationId + "');", true);

                SqlCommand cmd = new SqlCommand("" + Repor.Name_Stored_Report + "", con);
                cmd.CommandType = CommandType.StoredProcedure;


                if ((Repor.Parameter_1) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_1 + "", value1));
                }
                if ((Repor.Parameter_2) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_2 + "", value2));
                }
                if ((Repor.Parameter_3) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_3 + "", value3));
                }
                if ((Repor.Parameter_4) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_4 + "", value4));
                }
                if ((Repor.Parameter_5) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_5 + "", value5));
                }
                if ((Repor.Parameter_6) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_6 + "", value6));
                }
                if ((Repor.Parameter_7) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_7 + "", value7));
                }
                if ((Repor.Parameter_8) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_8 + "", value8));
                }
                if ((Repor.Parameter_9) != null)
                {
                    cmd.Parameters.Add(new SqlParameter("@" + Repor.Parameter_9 + "", value9));
                }

                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                adp.SelectCommand = cmd;


                try
                {
                    con.Open();
                    adp.Fill(dt);
                }
                catch (Exception sqlEx)
                {
                    Console.WriteLine(@"：Unable to establish a connection: {0}", sqlEx);
                }




            }




            return dt;



        }

      

        #endregion




    }
}