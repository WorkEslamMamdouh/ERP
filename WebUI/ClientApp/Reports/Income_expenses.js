$(document).ready(function () {
    ////debugger;
    Income_expenses.InitalizeComponent();
});
var Income_expenses;
(function (Income_expenses) {
    var CompCode;
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    //Arrays
    var UserDetails = new Array();
    //texts
    var txtFromDate;
    var txtToDate;
    var ddlUserMaster;
    var ddlType;
    //Buttons
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    function InitalizeComponent() {
        debugger;
        InitalizeControls();
        FillddlUserMaster();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
        IntializeEvents();
    }
    Income_expenses.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "كشف حساب ";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Account Statment";
        }
        CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        ////Drop Downlists
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        ddlUserMaster = document.getElementById("ddlUserMaster");
        ddlType = document.getElementById("ddlType");
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function IntializeEvents() {
        btnPrint.onclick = function () { printreport(4); };
        btnPrintTrview.onclick = function () { printreport(1); };
        btnPrintTrPDF.onclick = function () { printreport(2); };
        btnPrintTrEXEL.onclick = function () { printreport(3); };
    }
    function GetDate() {
        debugger;
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
    function FillddlUserMaster() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetAllUser"),
            data: {},
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    UserDetails = result.Response;
                    debugger;
                    DocumentActions.FillCombowithdefult(UserDetails, ddlUserMaster, "USER_CODE", "USER_CODE", "اختار البائع");
                }
            }
        });
    }
    function printreport(type) {
        debugger;
        var UserVal = ddlUserMaster.value == "null" ? "All" : ddlUserMaster.value;
        var DType = ddlType.value == "1" ? "1" : "2";
        var _StockList = new Array();
        var _Stock = new Settings_Report();
        if (DType == "1") {
            _Stock.ID_Button_Print = 'ACCstament1';
        }
        else {
            _Stock.ID_Button_Print = 'ACCstament2';
        }
        _Stock.Parameter_1 = DateFormatDataBes(txtFromDate.value);
        _Stock.Parameter_2 = DateFormatDataBes(txtToDate.value);
        _Stock.Parameter_3 = UserVal;
        _Stock.Parameter_4 = DType;
        //_Stock.Parameter_5 = "";
        //_Stock.Parameter_6 = "";
        //_Stock.Parameter_7 = "";
        //_Stock.Parameter_8 = "";
        //_Stock.Parameter_9 = "";
        _StockList.push(_Stock);
        var rp = new ReportParameters();
        rp.Data_Report = JSON.stringify(_StockList); //output report as View
        Ajax.Callsync({
            url: Url.Action("Data_Report_Open", "GeneralReports"),
            data: rp,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Income_expenses || (Income_expenses = {}));
//# sourceMappingURL=Income_expenses.js.map