
$(document).ready(() => {
    ////debugger;
    Salesinventory.InitalizeComponent();
})

namespace Salesinventory {

    var CompCode: Number;
    var SysSession: SystemSession = GetSystemSession();
    var sys: SystemTools = new SystemTools();
    //Arrays     
    var UserDetails: Array<G_USERS> = new Array<G_USERS>();
    var ddlUserMaster: HTMLSelectElement;

    //Textboxes
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var sammury: HTMLInputElement;
    var Detail: HTMLInputElement;     
    //Buttons   
    var btnPrint: HTMLButtonElement;
    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;

    export function InitalizeComponent() {   
        InitalizeControls();
        FillddlUserMaster();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
        IntializeEvents();
        sammury.checked = true;
    }
    function InitalizeControls() {  

        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "جرد المبيعات";

        }
        else {
            document.getElementById('Screen_name').innerHTML = "Salesinventory";
        }           
        CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists  
        sammury = document.getElementById("sammury") as HTMLInputElement;
        Detail = document.getElementById("Detail") as HTMLInputElement;
        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        ddlUserMaster = document.getElementById("ddlUserMaster") as HTMLSelectElement;
        btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
        btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;
        
    }
    function IntializeEvents() {

        btnPrint.onclick = () => { printreport(4) };
        btnPrintTrview.onclick = () => { printreport(1) };
        btnPrintTrPDF.onclick = () => { printreport(2) };
        btnPrintTrEXEL.onclick = () => { printreport(3) };




        }
    function GetDate() {
        debugger
        var today: Date = new Date();
        var dd: string = today.getDate().toString();
        var ReturnedDate: string;
        var mm: string = (today.getMonth() + 1).toString();
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
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetAllUser"),
            data: {},
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    UserDetails = result.Response as Array<G_USERS>;
                    debugger

                    DocumentActions.FillCombowithdefult(UserDetails, ddlUserMaster, "USER_CODE", "USER_CODE", "اختار البائع");


                }
            }
        });
    }
    


   
    function printreport(type: number) {
        debugger;
        let UserVal = ddlUserMaster.value == "null" ? "All User" : ddlUserMaster.value;
        let _StockList: Array<Settings_Report> = new Array<Settings_Report>();
        let _Stock: Settings_Report = new Settings_Report();
        if (Detail.checked == true) {
            _Stock.ID_Button_Print = 'GardSammury';
        } else {
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

        let rp: ReportParameters = new ReportParameters();

        rp.Data_Report = JSON.stringify(_StockList);//output report as View


        Ajax.Callsync({
            url: Url.Action("Data_Report_Open", "GeneralReports"),
            data: rp,
            success: (d) => {
                debugger
                let result = d.result as string;


                window.open(result, "_blank");
            }
        })








    }

}