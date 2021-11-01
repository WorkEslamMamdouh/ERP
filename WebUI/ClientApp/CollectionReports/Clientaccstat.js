$(document).ready(function () {
    Clientaccstat.InitalizeComponent();
    $('#headertop1').addClass('display_none');
    $('#headertop2').removeClass('display_none');
});
var Clientaccstat;
(function (Clientaccstat) {
    var compcode;
    var AccountType = 1;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    //------------------------------------------------------------
    var Details_Type_D_Category = new Array();
    var Details_CustomerGroup = new Array();
    var SalesmanDetails = new Array();
    var Details = new Array();
    var CustomersDetails = new Array();
    var Customer = new A_Rec_D_Customer();
    //------------------------------------------------------------
    var txt_ID_APP_Category;
    var txt_ID_APP_Type;
    var ddlCustomer;
    var txtDateFrom;
    var txtDateTo;
    var Rddetails;
    var Rd_sum;
    var btnReset;
    //-------------------------------------------------------------
    var indebtedness;
    //--- Print Buttons
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "كشف حساب العملاء";
        }
        else {
            document.getElementById('Screen_name').innerHTML == "Client Account Statment";
        }
        InitalizeControls();
        InitalizeEvents();
        txtDateFrom.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtDateTo.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        Display_CustomerCat();
        Display_CustomerGroup();
        Display_Salesman();
        FillddlCustomer();
        Rddetails.checked = true;
        Display();
        txt_ID_APP_Type.value = "1";
    }
    Clientaccstat.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category");
        txt_ID_APP_Type = document.getElementById("txt_ID_APP_Type");
        ddlCustomer = document.getElementById("ddlCustomer");
        txtDateFrom = document.getElementById("txtFromDate");
        txtDateTo = document.getElementById("txtToDate");
        Rddetails = document.getElementById("Rd_detail");
        Rd_sum = document.getElementById("Rd_sum");
        //Rddetails = document.querySelector("input[name=details]:checked");
        btnReset = document.getElementById("btnReset");
        //---------------------------------------------------------------------- Print Buttons
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function InitalizeEvents() {
        btnReset.onclick = btnReset_onclick;
        // Print Buttons
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        btnPrint.onclick = function () { PrintReport(4); };
    }
    //----------------------------------------------------( Get cus_Cat )
    function Display_CustomerCat() {
        //var StkDefCategory: Array<I_D_Category> = new Array<I_D_Category>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GenDefCategory", "GetAll"),
            data: {
                CompCode: compcode, AccountType: AccountType, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                //
                var result = d;
                if (result.IsSuccess) {
                    Details_Type_D_Category = result.Response;
                    DisplayStGenDefCustomerCat();
                }
            }
        });
    }
    function DisplayStGenDefCustomerCat() {
        for (var i = 0; i < Details_Type_D_Category.length; i++) {
            $('#txt_ID_APP_Category').append('<option value="' + Details_Type_D_Category[i].CatID + '">' + (lang == "ar" ? Details_Type_D_Category[i].Cat_DescA : Details_Type_D_Category[i].Cat_DescE) + '</option>');
        }
    }
    //----------------------------------------------------( Get cus_Group )
    function Display_CustomerGroup() {
        //
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GenDefGroup", "GetAll"),
            data: {
                CompCode: compcode, AccountType: AccountType, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                //
                var result = d;
                if (result.IsSuccess) {
                    Details_CustomerGroup = result.Response;
                    DisplayStkCustomerGroup();
                }
            }
        });
    }
    function DisplayStkCustomerGroup() {
        for (var i = 0; i < Details_CustomerGroup.length; i++) {
            $('#txt_ID_APP_Group').append('<option value="' + Details_CustomerGroup[i].GroupID + '">' + (lang == "ar" ? Details_CustomerGroup[i].Group_DescA : Details_CustomerGroup[i].Group_DescE) + '</option>');
            $('#txt_Grop').append('<option value="' + Details_CustomerGroup[i].GroupID + '">' + (lang == "ar" ? Details_CustomerGroup[i].Group_DescA : Details_CustomerGroup[i].Group_DescE) + '</option>');
        }
    }
    //----------------------------------------------------( Get sales_man )
    function Display_Salesman() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefSalesMen", "GetAllSalesPeople"),
            data: {
                CompCode: compcode, IsSalesEnable: true, BranchCode: SysSession.CurrentEnvironment.BranchCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    //
                    SalesmanDetails = result.Response;
                    SalesmanDetails = SalesmanDetails.filter(function (s) { return s.Isactive == true; });
                    DisplaySalesman();
                }
            }
        });
    }
    function DisplaySalesman() {
        for (var i = 0; i < SalesmanDetails.length; i++) {
            $('#ddlSalesman').append('<option value="' + SalesmanDetails[i].SalesmanId + '">' + (lang == "ar" ? SalesmanDetails[i].NameA : SalesmanDetails[i].NameE) + '</option>');
        }
    }
    //----------------------------------------------------(Get customer)
    function FillddlCustomer() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefCustomer", "GetAll"),
            data: {
                CompCode: compcode, BranchCode: SysSession.CurrentEnvironment.BranchCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CustomersDetails = result.Response;
                    // CustomersDetails = CustomersDetails.filter(s => s.STATUS == true);
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        DocumentActions.FillCombowithdefult(CustomersDetails, ddlCustomer, "CustomerId", "NAMEE", "Select Category");
                    }
                    else {
                        DocumentActions.FillCombowithdefult(CustomersDetails, ddlCustomer, "CustomerId", "NAMEA", "اختر العميل");
                    }
                }
            }
        });
    }
    //----------------------------------------------------(Get Date )
    function GetDate() {
        var today = new Date();
        var dd = today.getDate().toString();
        var ReturnedDate;
        var mm = (today.getMonth() + 1).toString();
        var yyyy = today.getFullYear();
        if (Number(dd) < 10) {
            dd = ('0' + dd);
        }
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        ReturnedDate = yyyy + '-' + mm + '-' + dd;
        return ReturnedDate;
    }
    //----------------------------------------------------( Data )
    function Display() {
        var SalesmanId = 0;
        var NAME_Salesman;
        var value_list_Salesman = $('#ddlSalesman').find('option:selected').val();
        indebtedness = $('#txt_indebtedness').val();
        var IsCredit_Type;
        if ($('#txt_ID_APP_Type').val() == "Null") {
            IsCredit_Type = 2;
        }
        else {
            IsCredit_Type = Number($('#txt_ID_APP_Type').val());
        }
        var catid;
        if ($('#txt_ID_APP_Category').val() == "Null") {
            catid = 0;
        }
        else {
            catid = Number($('#txt_ID_APP_Category').val());
        }
        var Groupid;
        if ($('#txt_ID_APP_Group').val() == "Null") {
            Groupid = 0;
        }
        else {
            Groupid = Number($('#txt_ID_APP_Group').val());
        }
        var slsid;
        if ($('#ddlSalesman').val() == "Null") {
            slsid = 0;
        }
        else {
            slsid = Number($('#ddlSalesman').val());
        }
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefCustomer", "GetFiltered"),
            data: {
                CompCode: compcode, BranchCode: SysSession.CurrentEnvironment.BranchCode, Catid: catid, Groupid: Groupid, Slsid: slsid, CreditType: IsCredit_Type, BalType: indebtedness, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                //
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    //for (var i = 0; i < Details.length; i++) {
                    //    Details[i].Isbalance = Number((Number(Details[i].Openbalance) + Number(Details[i].Debit) - Number(Details[i].Credit)).toFixed(2));
                    //    //Details[i].NAME_Salesman = $('#ddlSalesman').find('option:selected').text();
                    //    SalesmanId = Details[i].SalesmanId;
                    //    //NAME_Salesman = ddlSalesman.options[ddlSalesman.value = "" + SalesmanId + ""].text;
                    //    //Details[i].NAME_Salesman = NAME_Salesman;
                    //}
                    $('#ddlSalesman').prop("value", value_list_Salesman);
                }
            }
        });
    }
    function GetSystemSession() {
        if (document.cookie.length > 0) {
            // 
            var SysSession = new SystemSession;
            SysSession.CurrentEnvironment = JSON.parse(readCookie("Inv1_systemProperties"));
            SysSession.CurrentPrivileges = JSON.parse(readCookie("Inv1_Privilage"));
            //RS.CurrentMemberComm = JSON.parse(getCookie("Inv1_Comm")) as Kids_Comm;
            return SysSession;
        }
    }
    function btnReset_onclick() {
        txtDateFrom.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtDateTo.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        discharge();
    }
    function discharge() {
        $('#txt_ID_APP_Category option[value=Null]').prop('selected', 'selected').change();
        $('#ddlSalesman option[value=Null]').prop('selected', 'selected').change();
        $('#txt_ID_APP_Group option[value=Null]').prop('selected', 'selected').change();
        $('#ddlCustomer option[value=null]').prop('selected', 'selected').change();
        $('#txt_ID_APP_Type option[value=Null]').prop('selected', 'selected').change();
        $('#txt_indebtedness option[value=All]').prop('selected', 'selected').change();
    }
    //----------------------------------------------------( Report )
    function PrintReport(OutType) {
        var rp = new ReportParameters();
        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        var BranchNameA = SysSession.CurrentEnvironment.BranchName;
        var BranchNameE = SysSession.CurrentEnvironment.BranchNameEn;
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        if (BranchNameA == null || BranchNameE == null) {
            BranchNameA = " ";
            BranchNameE = " ";
        }
        rp.BraNameA = BranchNameA;
        rp.BraNameE = BranchNameE;
        rp.LoginUser = SysSession.CurrentEnvironment.UserCode;
        rp.RepType = OutType; //output report as View
        rp.FromDate = DateFormatRep(txtDateFrom.value);
        rp.ToDate = DateFormatRep(txtDateTo.value);
        if ($("#txt_ID_APP_Category").val() == "Null") {
            rp.CatId = -1;
        }
        else {
            rp.CatId = Number($("#txt_ID_APP_Category").val());
        }
        if ($("#txt_ID_APP_Group").val() == "Null") {
            rp.Groupid = -1;
        }
        else {
            rp.Groupid = Number($("#txt_ID_APP_Group").val());
        }
        if ($("#ddlSalesman").val() == "Null") {
            rp.SalesmanID = -1;
        }
        else {
            rp.SalesmanID = Number($("#ddlSalesman").val());
        }
        if ($("#ddlCustomer").val() == "null") {
            rp.CustomerID = -1;
        }
        else {
            rp.CustomerID = Number($("#ddlCustomer").val());
        }
        if (Number($("#txt_ID_APP_Type").val()) == 3) {
            rp.Status = 3;
        }
        if (Number($("#txt_ID_APP_Type").val()) == 1) {
            rp.Status = 1;
        }
        if ($("#txt_indebtedness").val() == ">") {
            rp.BalType = 1;
        }
        if ($("#txt_indebtedness").val() == "<") {
            rp.BalType = 2;
        }
        if ($("#txt_indebtedness").val() == "=") {
            rp.BalType = 3;
        }
        if ($("#txt_indebtedness").val() == "All") {
            rp.BalType = 0;
        }
        //  Rd_detail
        if (Rddetails.checked == true) {
            rp.check = 1;
            Ajax.Callsync({
                url: Url.Action("IProc_Rpt_AccCustomerSummary", "GeneralReports"),
                data: rp,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        else {
            rp.check = 2;
            Ajax.Callsync({
                url: Url.Action("IProc_Rpt_AccCustomerDetail", "GeneralReports"),
                data: rp,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(Clientaccstat || (Clientaccstat = {}));
//# sourceMappingURL=Clientaccstat.js.map