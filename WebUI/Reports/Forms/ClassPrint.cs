using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Printing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Inv.WebUI.Reports.Forms
{



    public class ClassPrint
    {
        private static List<Stream> m_streams;
        private static int m_currentPageIndex;

        public void PrintToPrinter(LocalReport report, ReportsDetails ReportsDetail)
        {
            Export(report, ReportsDetail);

        }

        public static void Export(LocalReport report, ReportsDetails ReportsDetail, bool print = true)
        {
            string deviceInfo =
             @"<DeviceInfo>
                <OutputFormat>EMF</OutputFormat>
                <PageWidth>3in</PageWidth>
                <PageHeight>8.3in</PageHeight>
                <MarginTop>0in</MarginTop>
                <MarginLeft>0.1in</MarginLeft>
                <MarginRight>0.1in</MarginRight>
                <MarginBottom>0in</MarginBottom>
            </DeviceInfo>";
            Warning[] warnings;
            m_streams = new List<Stream>();
            report.Render("Image", deviceInfo, CreateStream, out warnings);
            foreach (Stream stream in m_streams)
                stream.Position = 0;

            if (print)
            {
                Print(report, ReportsDetail.PrintName, ReportsDetail.PageSize, ReportsDetail.Landscape);
            }
        }


        public static void Print(LocalReport report, string PrintName, string PageSize, bool Landscape)
        {
            if (m_streams == null || m_streams.Count == 0)
                throw new Exception("Error: no stream to print.");
            PrintDocument printDoc = new PrintDocument();
            PrinterSettings ps = new PrinterSettings();
            printDoc.PrinterSettings = ps;
            if (!printDoc.PrinterSettings.IsValid)
            {
                throw new Exception("Error: cannot find the default printer.");
            }
            else
            {
                printDoc.PrintPage += new PrintPageEventHandler(PrintPage);
                if (PrintName != null)
                {
                    printDoc.PrinterSettings.PrinterName = PrintName;

                }


                if (PageSize != null)
                {
                    var Paper = GetPaperSize(PageSize);
                    printDoc.DefaultPageSettings.PaperSize = Paper;
                }
                else
                {

                    printDoc.DefaultPageSettings.PaperSize = report.GetDefaultPageSettings().PaperSize;
                    printDoc.DefaultPageSettings.Margins = report.GetDefaultPageSettings().Margins;
                    printDoc.DefaultPageSettings.Landscape = report.GetDefaultPageSettings().IsLandscape;
                }

                if (Landscape != false)
                {
                    printDoc.DefaultPageSettings.Landscape = Landscape;

                }

                m_currentPageIndex = 0;
                printDoc.Print();


            }



        }
        public static PaperSize GetPaperSize(string Name)
        {
            PaperSize size1 = null;
            Name = Name.ToUpper();
            PrinterSettings settings = new PrinterSettings();
            foreach (PaperSize size in settings.PaperSizes)
                if (size.Kind.ToString().ToUpper() == Name)
                {
                    size1 = size;
                    break;
                }
            return size1;
        }
        public static Stream CreateStream(string name, string fileNameExtension, Encoding encoding, string mimeType, bool willSeek)
        {
            Stream stream = new MemoryStream();
            m_streams.Add(stream);
            return stream;
        }

        public static void PrintPage(object sender, PrintPageEventArgs ev)
        {
            Metafile pageImage = new
               Metafile(m_streams[m_currentPageIndex]);

            // Adjust rectangular area with printer margins.
            Rectangle adjustedRect = new Rectangle(
                ev.PageBounds.Left - (int)ev.PageSettings.HardMarginX,
                ev.PageBounds.Top - (int)ev.PageSettings.HardMarginY,
                ev.PageBounds.Width,
                ev.PageBounds.Height);

            //PageSettings page = new PageSettings();
            //page.PaperSize
            // Draw a white background for the report
            ev.Graphics.FillRectangle(Brushes.White, adjustedRect);

            // Draw the report content
            ev.Graphics.DrawImage(pageImage, adjustedRect);

            // Prepare for the next page. Make sure we haven't hit the end.
            m_currentPageIndex++;
            ev.HasMorePages = (m_currentPageIndex < m_streams.Count);

            // Draw the report FromLTRB (int left, int top, int right, int bottom);
            //Rectangle myRectangle = Rectangle.FromLTRB(200, 150, 300, 400);
            //ev.Graphics.DrawRectangle(SystemPens.ControlText, myRectangle);
        }

        public static void DisposePrint()
        {
            if (m_streams != null)
            {
                foreach (Stream stream in m_streams)
                    stream.Close();
                m_streams = null;
            }
        }






    }
}