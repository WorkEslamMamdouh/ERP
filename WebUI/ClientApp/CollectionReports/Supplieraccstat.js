$(document).ready(function () {
    Supplieraccstat.InitalizeComponent();
});
var Supplieraccstat;
(function (Supplieraccstat) {
    var compcode;
    var AccountType = 2;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    //------------------------------------------------------------
    var Details_Type_D_Category = new Array();
    var Details_CustomerGroup = new Array();
    var SalesmanDetails = new Array();
    var Details = new Array();
    var Details_Vendor = new Array();
    var VatTypeDetails = new Array();
    //------------------------------------------------------------
    var txt_ID_APP_Category;
    var txt_ID_APP_Type;
    var txtVendorType;
    var Rddetails;
    var Rd_sum;
    var txtDateFrom;
    var txtDateTo;
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
        debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "كشف حساب الموردين";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Supplier Account Statement";
        }
        InitalizeControls();
        InitalizeEvents();
        txtDateFrom.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtDateTo.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        DisplayAccDefVendor();
        Display_SupplierCat();
        Display_SupplierGroup();
        Display_Salesman();
        Display();
        Rddetails.checked = true;
    }
    Supplieraccstat.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category");
        txt_ID_APP_Type = document.getElementById("txt_ID_APP_Type");
        txtVendorType = document.getElementById("txtVendorType");
        txtDateFrom = document.getElementById("txtFromDate");
        txtDateTo = document.getElementById("txtToDate");
        Rddetails = document.getElementById("Rd_detail");
        Rd_sum = document.getElementById("Rd_sum");
        btnReset = document.getElementById("btnReset");
        //---------------------------------------------------------------------- Print Buttons
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function InitalizeEvents() {
        // Print Buttons
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        btnPrint.onclick = function () { PrintReport(4); };
        btnReset.onclick = btnReset_onclick;
    }
    //----------------------------------------------------( Get cus_Cat )
    function Display_SupplierCat() {
        //var StkDefCategory: Array<I_D_Category> = new Array<I_D_Category>();
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GenDefCategory", "GetAll"),
            data: {
                CompCode: compcode, AccountType: AccountType, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                //debugger;
                var result = d;
                if (result.IsSuccess) {
                    Details_Type_D_Category = result.Response;
                    DisplayStGenDefSupplierCat();
                }
            }
        });
    }
    function DisplayStGenDefSupplierCat() {
        debugger;
        for (var i = 0; i < Details_Type_D_Category.length; i++) {
            $('#txt_ID_APP_Category').append('<option value="' + Details_Type_D_Category[i].CatID + '">' + (lang == "ar" ? Details_Type_D_Category[i].Cat_DescA : Details_Type_D_Category[i].Cat_DescE) + '</option>');
        }
    }
    //----------------------------------------------------( Get cus_Group )
    function Display_SupplierGroup() {
        //debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GenDefGroup", "GetAll"),
            data: {
                CompCode: compcode, AccountType: AccountType, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                //debugger;
                var result = d;
                if (result.IsSuccess) {
                    Details_CustomerGroup = result.Response;
                    DisplayStkSupplierGroup();
                }
            }
        });
    }
    function DisplayStkSupplierGroup() {
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
                CompCode: compcode, IsSalesEnable: true, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    //debugger;
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
        var VendorType;
        if ($('#txtVendorType').val() == "Null") {
            VendorType = 0;
        }
        else {
            VendorType = Number($('#txtVendorType').val());
        }
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefVendor", "GetFiltered"),
            data: {
                CompCode: compcode, Catid: catid, Groupid: Groupid, CreditType: IsCredit_Type, VendorType: VendorType, BalType: indebtedness, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    //for (var i = 0; i < Details.length; i++) {
                    //    Details[i].Isbalance = Number((Number(Details[i].Openbalance) - Number(Details[i].Debit) + Number(Details[i].Credit)).toFixed(2));
                    //}
                    debugger;
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
    //----------------------------------------------------(Get Vendor )
    function DisplayAccDefVendor() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefVendor", "GetAll"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                //;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    Details_Vendor = result.Response;
                    DisplayStVendor();
                }
            }
        });
    }
    function DisplayStVendor() {
        debugger;
        for (var i = 0; i < Details_Vendor.length; i++) {
            $('#txt_ID_Vendor').append('<option value="' + Details_Vendor[i].VendorID + '">' + (lang == "ar" ? Details_Vendor[i].NAMEA : Details_Vendor[i].NAMEL) + '</option>');
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
        $('#txtVendorType option[value=Null]').prop('selected', 'selected').change();
        $('#txt_indebtedness option[value=All]').prop('selected', 'selected').change();
        $('#txt_ID_Vendor option[value=Null]').prop('selected', 'selected').change();
    }
    //----------------------------------------------------( Report )
    function PrintReport(OutType) {
        debugger;
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
        if ($("#txt_ID_APP_Category").val() == "Null") { //-------------جميع الفئات
            rp.CatId = -1;
        }
        else {
            rp.CatId = Number($("#txt_ID_APP_Category").val());
        }
        if ($("#txt_ID_APP_Group").val() == "Null") { //-------------جميع المجموعات
            rp.Groupid = -1;
        }
        else {
            rp.Groupid = Number($("#txt_ID_APP_Group").val());
        }
        if ($("#txtVendorType").val() == "Null") { //-------------جميع المناديب 
            rp.VendType = -1;
        }
        if ($("#txtVendorType").val() == "1") {
            rp.VendType = 0;
        }
        if ($("#txtVendorType").val() == "2") {
            rp.VendType = 1;
        }
        if ($("#txt_ID_APP_Type").val() == "Null") { //-------------جميع الانواع
            rp.Status = 3;
        }
        if (Number($("#txt_ID_APP_Type").val()) == 1) { //-------------منفذ 
            rp.Status = 1;
        }
        //if (Number($("#txt_ID_APP_Type").val()) == 0) {//-------------غير منفذ
        //    rp.Status = 0;
        //}
        if ($("#txt_indebtedness").val() == ">") { //******عليه مديونيه
            rp.BalType = 1;
        }
        if ($("#txt_indebtedness").val() == "<") { //******ليه مديونيه
            rp.BalType = 2;
        }
        if ($("#txt_indebtedness").val() == "=") { //******صفري
            rp.BalType = 3;
        }
        if ($("#txt_indebtedness").val() == "All") { //******الجميع
            rp.BalType = 0;
        }
        //txtVendorType
        //if ($("#txtVendorType").val() == "Null") {//-------------جميع النشاطات  
        //    rp.Status = 3;
        //}
        //if (Number($("#txtVendorType").val()) == 1) {//-------------مورد بضاعة 
        //    rp.Status = 1;
        //}
        //if (Number($("#txtVendorType").val()) == 2) {//-------------مورد خدمات
        //    rp.Status = 0;
        //}
        if ($("#txt_ID_Vendor").val() == "Null") { //-------------جميع الفئات
            rp.VendorId = -1;
        }
        else {
            rp.VendorId = Number($("#txt_ID_Vendor").val());
        }
        //  Rd_detail
        if (Rddetails.checked == true) { //******  تقرير تفصيلي 
            rp.check = 1;
            Ajax.Callsync({
                url: Url.Action("IProc_Rpt_AccVendorDetail", "GeneralReports"),
                data: rp,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        else { //******  تقرير ملخص   
            rp.check = 2;
            Ajax.Callsync({
                url: Url.Action("IProc_Rpt_AccVendorSummary", "GeneralReports"),
                data: rp,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(Supplieraccstat || (Supplieraccstat = {}));
//# sourceMappingURL=Supplieraccstat.js.map