$(document).ready(function () {
    ////debugger;
    Salesinventory.InitalizeComponent();
});
var Salesinventory;
(function (Salesinventory) {
    var CompCode;
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    //Arrays     
    var UserDetails = new Array();
    var ddlUserMaster;
    //Textboxes
    var txtFromDate;
    var txtToDate;
    var sammury;
    var Detail;
    //Buttons   
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    function InitalizeComponent() {
        InitalizeControls();
        FillddlUserMaster();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
        IntializeEvents();
        sammury.checked = true;
    }
    Salesinventory.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "جرد المبيعات";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Salesinventory";
        }
        CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists  
        sammury = document.getElementById("sammury");
        Detail = document.getElementById("Detail");
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        ddlUserMaster = document.getElementById("ddlUserMaster");
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
        var UserVal = ddlUserMaster.value == "null" ? "All User" : ddlUserMaster.value;
        var _StockList = new Array();
        var _Stock = new Settings_Report();
        if (Detail.checked == true) {
            _Stock.ID_Button_Print = 'GardSammury';
        }
        else {
            _Stock.ID_Button_Print = 'GardDetail';
        }
        _Stock.Type_Print = type;
        _Stock.Parameter_1 = UserVal;
        _Stock.Parameter_2 = DateFormatDataBes(txtFromDate.value);
        _Stock.Parameter_3 = DateFormatDataBes(txtToDate.value);
        //_Stock.Parameter_4 = "";
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
})(Salesinventory || (Salesinventory = {}));
//# sourceMappingURL=Salesinventory.js.map