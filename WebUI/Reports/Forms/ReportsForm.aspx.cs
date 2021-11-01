using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Drawing.Printing;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;
using System.Collections.Specialized;
using System.Globalization;
using System.Text;
using System.Web.Configuration;
using Inv.WebUI.Reports.Models;
using Inv.WebUI.Reports.Forms;
using System.Net.Http;
using Inv.DAL.Repository;
using Inv.DAL.Domain;
using Microsoft.Reporting.WebForms;
using System.Data;
using System.Configuration;
 

namespace RS.WebUI.Reports.Forms
{//eslam 1 dec 2020
    public partial class ReportsForm : System.Web.UI.Page
    {

        //SessionRecord CurrentSession;
        StdParamters CurrentReportParameters;
        Settings_Report_StdParamters Repor = new Settings_Report_StdParamters();

        ReportsDetails ReportsDetail = new ReportsDetails();
        ReportInfo Rep = new ReportInfo();
        ClassPrint Printer = new ClassPrint();

        protected InvEntities db = UnitOfWork.context(BuildConnectionString());
        //private SamahEntities _db = new SamahEntities();
        //string cs = ConfigurationManager.ConnectionStrings["SamahEntities"].ConnectionString;


        //string cs = "Data Source=SQL5061.site4now.net; database =db_a7882d_apieltawhed; user id =db_a7882d_apieltawhed_admin; Password=619619Ss619619";
        string cs = "Data Source= . ; database = POS2021 ; user id = sa ; Password= 619619 ;";
        //string cs = "Data Source= SQL5077.site4now.net ; database = db_a7b97c_pos ; user id = db_a7b97c_pos_admin ; Password= 619619Ss619619 ;";


        //"Data Source=SQL5077.site4now.net;Initial Catalog=db_a7b97c_pos;User Id=db_a7b97c_pos_admin;Password=YOUR_DB_PASSWORD-->

        string Par;

        public static string BuildConnectionString()
        {
            var httpClient = new HttpClient();
            var res = httpClient.GetStringAsync(WebConfigurationManager.AppSettings["ServiceUrl"] + "SystemTools/BuildConnection").Result;
            return res;
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {


                string x = Request["rpt"];
                string y = Request["par"];
                y = y.Replace("*", "+");
                if (Request["rpt"] == null)
                    return;
                if (Request["par"] != null)
                {   //mahroos 
                    Par = Reports.Models.UserTools.Decrypt(y, "Business-Systems");

                    CurrentReportParameters = JsonConvert.DeserializeObject<StdParamters>(Par);
                }
                //add api call returns boolean mahroos 


                reportViewer1.ShowPrintButton = true;

                string ReportName = Request["rpt"];

                if (!IsPostBack)
                {
                    var method = this.GetType().GetMethod(ReportName);
                    method.Invoke(this, null);


                }

            }

        }

        #region Bind Reports Functions
        private void BindReport(string reportName, int OutputTypeNo, string OutputType, ReportsDetails ReportsDetail, params object[] models)
        {


            if (OutputTypeNo == 2) { OutputType = "PDF"; }
            else { OutputType = "Excel"; }
            //reportViewer1.LocalReport.ReportPath = Se"Excel"rver.MapPath("../Report/" + reportName + ".rdlc");
            if (reportName.Contains("Prnt"))
                reportViewer1.LocalReport.ReportPath = Server.MapPath("../Report/Print/" + reportName + ".rdlc");
            else if (reportName.Contains("Slip"))
            {
                reportViewer1.LocalReport.ReportPath = Server.MapPath("../Report/Slip/" + reportName + ".rdlc");

            }
            else
                reportViewer1.LocalReport.ReportPath = Server.MapPath("../Report/Reports/" + reportName + ".rdlc");


            reportViewer1.LocalReport.DataSources.Clear();
            foreach (var model in models)
            {
                //ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('" + model + "');", true);

                ReportDataSource source = new ReportDataSource(reportName, model);

                reportViewer1.LocalReport.DataSources.Add(source);

            }


            if (OutputTypeNo == 1)
            {
                reportViewer1.DataBind();
                //Printer.PrintToPrinter(reportViewer1.LocalReport, ReportsDetail);


            }
            else if (OutputTypeNo == 4)
            {

                Printer.PrintToPrinter(reportViewer1.LocalReport, ReportsDetail);
            }
            else
            {

                Warning[] warnings;
                string[] streamIds;
                string mimeType = string.Empty;
                string encoding = string.Empty;
                string extension = string.Empty;
                byte[] bytes = reportViewer1.LocalReport.Render(OutputType, null, out mimeType, out encoding, out extension, out streamIds, out warnings);
                Response.Buffer = true;
                Response.Clear();
                Response.ContentType = mimeType;
                Response.AddHeader("content-disposition", "attachment; filename=" + reportName + "." + extension);
                Response.OutputStream.Write(bytes, 0, bytes.Length);
                Response.Flush();
                Response.End();
            }



        }
        //private void BindReport(string reportName, List<DataSourceStruct> models)
        //{
        //    reportViewer1.LocalReport.ReportPath = Server.MapPath("../Reports/" + reportName + ".rdlc");
        //    reportViewer1.LocalReport.DataSources.Clear();
        //    foreach (var model in models)
        //    {
        //        ReportDataSource source = new ReportDataSource(model.Name, model.DataSource);
        //        reportViewer1.LocalReport.DataSources.Add(source);
        //    }

        //    reportViewer1.DataBind();

        //}
        private void BindSSRS(string reportName, List<DataSourceStruct> models)
        {
            reportViewer1.LocalReport.ReportPath = Server.MapPath("../Reports/" + reportName + ".rdlc");
            reportViewer1.LocalReport.DataSources.Clear();
            foreach (var model in models)
            {
                ReportDataSource source = new ReportDataSource(model.Name, model.DataSource);
                reportViewer1.LocalReport.DataSources.Add(source);
            }

            reportViewer1.DataBind();
        }
        public class ReportPrintDocument : PrintDocument
        {
            private PageSettings m_pageSettings;
            private int m_currentPage;
            private List<Stream> m_pages = new List<Stream>();

            public ReportPrintDocument(ServerReport serverReport)
                : this((Report)serverReport)
            {
                RenderAllServerReportPages(serverReport);
            }

            public ReportPrintDocument(LocalReport localReport)
                : this((Report)localReport)
            {
                RenderAllLocalReportPages(localReport);
            }

            private ReportPrintDocument(Report report)
            {
                // Set the page settings to the default defined in the report 
                ReportPageSettings reportPageSettings = report.GetDefaultPageSettings();
                m_pageSettings = new PageSettings();
                m_pageSettings.PaperSize = reportPageSettings.PaperSize;
                m_pageSettings.Margins = reportPageSettings.Margins;
                m_pageSettings.Landscape = true;
            }

            protected override void Dispose(bool disposing)
            {
                base.Dispose(disposing);

                if (disposing)
                {
                    foreach (Stream s in m_pages)
                    {
                        s.Dispose();
                    }

                    m_pages.Clear();
                }
            }

            protected override void OnBeginPrint(PrintEventArgs e)
            {
                base.OnBeginPrint(e);

                m_currentPage = 0;
            }

            protected override void OnPrintPage(PrintPageEventArgs e)
            {
                if (e == null)
                    throw new ArgumentNullException("e");

                base.OnPrintPage(e);

                Stream pageToPrint = m_pages[m_currentPage];
                pageToPrint.Position = 0;

                // Load each page into a Metafile to draw it. 
                using (Metafile pageMetaFile = new Metafile(pageToPrint))
                {
                    Rectangle adjustedRect = new Rectangle(
                            e.PageBounds.Left - (int)e.PageSettings.HardMarginX,
                            e.PageBounds.Top - (int)e.PageSettings.HardMarginY,
                            e.PageBounds.Width,
                            e.PageBounds.Height);

                    // Draw a white background for the report 
                    e.Graphics.FillRectangle(Brushes.White, adjustedRect);

                    // Draw the report content 
                    e.Graphics.DrawImage(pageMetaFile, adjustedRect);

                    // Prepare for next page.  Make sure we haven't hit the end. 
                    m_currentPage++;
                    e.HasMorePages = m_currentPage < m_pages.Count;
                }
            }

            protected override void OnQueryPageSettings(QueryPageSettingsEventArgs e)
            {
                if (e == null)
                    throw new ArgumentNullException("e");

                e.PageSettings = (PageSettings)m_pageSettings.Clone();
            }

            private void RenderAllServerReportPages(ServerReport serverReport)
            {
                string deviceInfo = CreateEMFDeviceInfo();

                // Generating Image renderer pages one at a time can be expensive.  In order 
                // to generate page 2, the server would need to recalculate page 1 and throw it 
                // away.  Using PersistStreams causes the server to generate all the pages in 
                // the background but return as soon as page 1 is complete. 
                NameValueCollection firstPageParameters = new NameValueCollection();
                firstPageParameters.Add("rs:PersistStreams", "True");

                // GetNextStream returns the next page in the sequence from the background process 
                // started by PersistStreams. 
                NameValueCollection nonFirstPageParameters = new NameValueCollection();
                nonFirstPageParameters.Add("rs:GetNextStream", "True");

                string mimeType;
                string fileExtension;
                Stream pageStream = serverReport.Render("IMAGE", deviceInfo, firstPageParameters, out mimeType, out fileExtension);

                // The server returns an empty stream when moving beyond the last page. 
                while (pageStream.Length > 0)
                {
                    m_pages.Add(pageStream);

                    pageStream = serverReport.Render("IMAGE", deviceInfo, nonFirstPageParameters, out mimeType, out fileExtension);
                }
            }

            private void RenderAllLocalReportPages(LocalReport localReport)
            {
                string deviceInfo = CreateEMFDeviceInfo();

                Warning[] warnings;
                localReport.Render("IMAGE", deviceInfo, LocalReportCreateStreamCallback, out warnings);
            }

            private Stream LocalReportCreateStreamCallback(
                string name,
                string extension,
                Encoding encoding,
                string mimeType,
                bool willSeek)
            {
                MemoryStream stream = new MemoryStream();
                m_pages.Add(stream);

                return stream;
            }

            private string CreateEMFDeviceInfo()
            {
                PaperSize paperSize = m_pageSettings.PaperSize;
                Margins margins = m_pageSettings.Margins;

                // The device info string defines the page range to print as well as the size of the page. 
                // A start and end page of 0 means generate all pages. 
                return string.Format(
                    CultureInfo.InvariantCulture,
                    "<DeviceInfo><OutputFormat>emf</OutputFormat><StartPage>0</StartPage><EndPage>0</EndPage><MarginTop>{0}</MarginTop><MarginLeft>{1}</MarginLeft><MarginRight>{2}</MarginRight><MarginBottom>{3}</MarginBottom><PageHeight>{4}</PageHeight><PageWidth>{5}</PageWidth></DeviceInfo>",
                    ToInches(margins.Top),
                    ToInches(margins.Left),
                    ToInches(margins.Right),
                    ToInches(margins.Bottom),
                    "21.5cm",
                    "14cm");
            }

            private static string ToInches(int hundrethsOfInch)
            {
                double inches = hundrethsOfInch / 100.0;
                return inches.ToString(CultureInfo.InvariantCulture) + "in";
            }
        }

        protected void btnPrint_Click(object sender, EventArgs e)
        {
            ReportPrintDocument rp = new ReportPrintDocument(reportViewer1.LocalReport);
            rp.Print();
        }

        #endregion

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


        public void Get_Name_Report_toParameter()
        {
            //ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('" + 11 + "');", true);

            string PO;
            RepFinancials RepPar = JsonConvert.DeserializeObject<RepFinancials>(Par);
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
                    BindReport(Repor.Name_Report, Type_Print, "PDF", ReportsDetail, dt);


                }
            }



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

        #endregion



    }

}



