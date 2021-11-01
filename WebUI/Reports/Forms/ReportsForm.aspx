<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportsForm.aspx.cs" Inherits="RS.WebUI.Reports.Forms.ReportsForm" EnableEventValidation="false" %>


<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb"  %>

<%--<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>--%>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <title></title>

    <style>
        body:nth-of-type(1) img[src*="Blank.gif"] {
            display: none;
        }
		
        /*#reportViewer1_ReportViewer #reportViewer1 #reportViewer1_HttpHandlerMissingErrorMessage {
	        display:block!important;
        }*/

        html, body {
            width: 100%;
            height: 100%;
        }

        #reportViewer {
            width: 100% !important;
            height: 100%;
        }

        #reportViewer1_ctl09 {
            height: auto !important;
        }

        @font-face {
            font-family: 'IDAutomationSC39XS';
            src: url('/Forms/IDAutomationSC39XS.ttf');
            src: url('/Forms/IDAutomationSC39XS.ttf') format('truetype');
        }

        div[style="WIDTH:46.08mm;"]{font-family:IDAutomationSC39XS;}
        td[style="WIDTH:47.49mm;min-width:46.08mm;HEIGHT:9.98mm;"] {
            font-family:IDAutomationSC39XS !important;
        }

    </style>
</head>
<body dir="ltr">
    <form id="form1" runat="server" style="float:left!important">
        <%-- <asp:DropDownList runat="server" ID="lstPrinters"></asp:DropDownList>--%>
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <rsweb:ReportViewer ID="reportViewer1"  Height="100%" Width="100%" SizeToReportContent="true" ShowPrintButton="true" AsyncRendering="false"  runat="server"></rsweb:ReportViewer>
   <%-- style="float:left!important"--%>

    </form>
</body>
</html>
