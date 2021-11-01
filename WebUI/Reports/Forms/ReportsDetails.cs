using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Inv.WebUI.Reports.Forms
{
    public class ReportsDetails
    {

        public string PrintName { get; set; }
        public string PageSize { get; set; }
        public Nullable<double> RightMargin { get; set; }
        public Nullable<double> LeftMargin { get; set; }
        public Nullable<double> TopMargin { get; set; }
        public Nullable<double> BottomMargin { get; set; }
        public bool Landscape { get; set; }
        public Nullable<double> PageHight { get; set; }
        public Nullable<double> PageWidth { get; set; }

    }


    public class ReportInfo
    {
        public string dataSource { get; set; }
        public string reportName { get; set; }
        public string OutputType { get; set; }
        public string OutputTypeNo { get; set; }
        public string PrinterName { get; set; }
        public string PageSize { get; set; }
        public double RightMargin { get; set; }
        public double LeftMargin { get; set; }
        public double TopMargin { get; set; }
        public double BottomMargin { get; set; }
        public double PageHight { get; set; }
        public double PageWidth { get; set; }
        public bool Landscape { get; set; }
    }

    public class DataSourceStruct
    {
        public string Name { get; set; }
        public object DataSource { get; set; }
    }


    public class ReportStandardParameters
    {

        public SqlParameter spComCode { get; set; }

        public SqlParameter spComNameA { get; set; }

        public SqlParameter spComNameE { get; set; }

        public SqlParameter spBraNameA { get; set; }

        public SqlParameter braNameE { get; set; }

        public SqlParameter spLoginUser { get; set; }

        public SqlParameter spbra { get; set; }

    }

}