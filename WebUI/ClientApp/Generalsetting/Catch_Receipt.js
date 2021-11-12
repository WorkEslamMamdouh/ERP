$(document).ready(function () {
    ////debugger;
    CatchReceipt.InitalizeComponent();
});
var CatchReceipt;
(function (CatchReceipt) {
    //system varables
    var AccType = 3; //نوع الحساب
    //var SysSession: SystemSession = GetSystemSession();
    var compcode;
    //var sys: SystemTools = new SystemTools();
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    //Arrays     
    var CustomerDetails = new Array();
    var SearchCustomerDetails = new Array();
    var Get_IQ_IQ_Catch_Receipt = new Array();
    var SearchDetails = new Array();
    var Selected_Data = new Array();
    var AllGetStokMasterDetail = new Array();
    var FamilyDetails = new Array();
    var ItemFamilyDetails = new Array();
    var ItemBaesdFamilyDetails = new Array();
    var OperationItemModel = new Array();
    var OperationItemSingleModel = new Stok_ORDER_DELIVERY();
    var Model = new Catch_Receipt();
    var SlsMasterDetils = new SlsMasterDetails();
    var ddlStateType;
    var ddlSalesman;
    var ddlCustomerMaster;
    var ddlVendor;
    var id_divGridDetails;
    // giedView
    var divMasterGrid = new JsGrid();
    //Textboxes
    var txtFromDate;
    var txtToDate;
    var txtdateopening;
    var txtDateHeader;
    var txtNationality;
    //buttons 
    var btnPresent;
    var btnClose;
    var btnOpen;
    var btnView_load;
    var btnExpenses;
    var btnShow;
    var btnadd;
    var btnAdd;
    var btnSave;
    var btnBack;
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var btnCustomerSearch;
    //new
    var txtClose_Adjustment;
    var txtClose_SalesManCommition;
    var txtClose_CompanyCommitionPrc;
    var txtTruckNumber;
    var txtPaperPurchaseValue;
    var txtPortName;
    var btnAddDetails;
    var btnAddDetailsCharge;
    var btnAddDetailslebel;
    var searchbutmemreport;
    var Success_Balance = true;
    //flags 
    var CountGrid = -1;
    var CountItems = 0;
    var Bal = 0;
    var ID_Receipt = 0;
    var Credit;
    var CUSTOMER_ID = 0;
    function InitalizeComponent() {
        //debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "  سداد دفعات العملاء";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Catch Receipt";
        }
        InitalizeControls();
        IntializeEvents();
        FillddlCustomerMaster();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
    }
    CatchReceipt.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        debugger;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        ddlCustomerMaster = document.getElementById("ddlCustomerMaster");
        searchbutmemreport = document.getElementById("searchbutmemreport");
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnBack = document.getElementById("btnBack");
        btnSave = document.getElementById("btnSave");
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
        btnCustomerSearch = document.getElementById("btnCustomerSearch");
    }
    function IntializeEvents() {
        searchbutmemreport.onkeydown = _SearchBox_Change;
        searchbutmemreport.onkeyup = _SearchBox_Change;
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnBack.onclick = btnBack_onclick;
        btnSave.onclick = btnSave_onclick;
        btnPrint.onclick = function () { printreport(4); };
        btnPrintTrview.onclick = function () { printreport(1); };
        btnPrintTrPDF.onclick = function () { printreport(2); };
        btnPrintTrEXEL.onclick = function () { printreport(3); };
        btnCustomerSearch.onclick = btnCustomerSearch_onclick;
    }
    function btnCustomerSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Catch_Receipt, "btnCustomerSearch", " Debit > 0", function () {
            var CUST_ID = SearchGrid.SearchDataGrid.SelectedKey;
            CUSTOMER_ID = CUST_ID;
            $("#rowData :input").val("");
            $('#txt_Type').val('1');
            $('#txt_NewDate').val(GetDate());
            SearchCustomerDetails = CustomerDetails.filter(function (x) { return x.CUSTOMER_ID == Number(CUST_ID); });
            DocumentActions.RenderFromModel(SearchCustomerDetails[0]);
        });
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
    function FillddlCustomerMaster() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "GetAll"),
            data: { CompCode: 1 },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CustomerDetails = result.Response;
                    debugger;
                    DocumentActions.FillCombowithdefult(CustomerDetails, ddlCustomerMaster, "CUSTOMER_ID", "CUSTOMER_NAME", "اختار العميل");
                }
            }
        });
    }
    function btnShow_onclick() {
        $('#divMasterGridiv').removeClass('display_none');
        $("#rowData").addClass("display_none");
        $("#divTotalSatistics").addClass("display_none");
        Display();
    }
    function Display() {
        debugger;
        var startdt = DateFormatDataBes(txtFromDate.value).toString();
        var enddt = DateFormatDataBes(txtToDate.value).toString();
        var CustomerId = 0;
        var USER_CODE = "null";
        if (ddlCustomerMaster.value != "null") {
            CustomerId = Number(ddlCustomerMaster.value.toString());
        }
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "GetAll_IQ_Catch_Receipt"),
            data: { startDate: startdt, endDate: enddt, CustomerId: CustomerId },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Get_IQ_IQ_Catch_Receipt = result.Response;
                    debugger;
                    for (var i = 0; i < Get_IQ_IQ_Catch_Receipt.length; i++) {
                        Get_IQ_IQ_Catch_Receipt[i].Data = DateFormat(Get_IQ_IQ_Catch_Receipt[i].Data);
                        //Credit = Number(Get_IQ_IQ_Catch_Receipt[i].Openbalance - Get_IQ_IQ_Catch_Receipt[i].CreditLimit);
                        if (Credit < 0) {
                            //Get_IQ_IQ_Catch_Receipt[i].Debit = (Credit * -1);
                            //Get_IQ_IQ_Catch_Receipt[i].DebitFC = 0;   
                        }
                        else {
                            //Get_IQ_IQ_Catch_Receipt[i].DebitFC = Credit;
                            //Get_IQ_IQ_Catch_Receipt[i].Debit = 0;       
                        }
                    }
                    InitializeGrid();
                    divMasterGrid.DataSource = Get_IQ_IQ_Catch_Receipt;
                    divMasterGrid.Bind();
                }
            }
        });
    }
    function _SearchBox_Change() {
        //  k//debugger;
        debugger;
        if (searchbutmemreport.value != "") {
            var search_1 = searchbutmemreport.value.toLowerCase();
            SearchDetails = Get_IQ_IQ_Catch_Receipt.filter(function (x) { return x.CUSTOMER_NAME.toString().search(search_1) >= 0; } /*|| x.PortName.toLowerCase().search(search) >= 0*/);
            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        }
        else {
            divMasterGrid.DataSource = Get_IQ_IQ_Catch_Receipt;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        //$("#divMasterGrid").attr("style", "");
        var res = GetResourceList("");
        divMasterGrid.ElementName = "divMasterGrid";
        divMasterGrid.Paging = true;
        divMasterGrid.PageSize = 10;
        divMasterGrid.Sorting = true;
        divMasterGrid.InsertionMode = JsGridInsertionMode.Binding;
        divMasterGrid.Editing = false;
        divMasterGrid.Inserting = false;
        divMasterGrid.SelectedIndex = 1;
        divMasterGrid.OnRowDoubleClicked = MasterGridDoubleClick;
        divMasterGrid.PrimaryKey = "ID_Receipt";
        divMasterGrid.Columns = [
            { title: "ID_Receipt", name: "ID_Receipt", type: "text", width: "2%", visible: false },
            { title: "اسم العميل", name: "CUSTOMER_NAME", type: "text", width: "10%" },
            { title: " التاريخ  ", name: "Data", type: "text", width: "12%" },
            { title: "المبلغ المطلوب سداده", name: "AmountRequired", type: "text", width: "100px" },
            { title: "المبلغ المدفوع", name: "ShootMoney", type: "text", width: "100px" },
        ];
    }
    function MasterGridDoubleClick() {
        Selected_Data = new Array();
        Selected_Data = Get_IQ_IQ_Catch_Receipt.filter(function (x) { return x.ID_Receipt == Number(divMasterGrid.SelectedKey); });
        $("#rowData").removeClass("display_none");
        $("#divTotalSatistics").removeClass("display_none");
        DisplayData(Selected_Data);
        ID_Receipt = Selected_Data[0].ID_Receipt;
        $("#txtShootMoney").attr("disabled", "disabled");
        $("#btnCustomerSearch").attr("disabled", "disabled");
        $("#txtRemarks").attr("disabled", "disabled");
        $('#txt_NewDate').val(DateFormat(Selected_Data[0].Data));
    }
    function DisplayData(Selected_Data) {
        debugger;
        DocumentActions.RenderFromModel(Selected_Data[0]);
    }
    ////-----------------------------------------------------------------------------------------------------------------------
    ////----------------------------------------------------- Div_items-------------------------------------------------------
    function Assign() {
        //DocumentActions.AssignToModel(Model);//Insert Update 
        Model = new Catch_Receipt();
        Model.ID_Receipt = 3;
        Model.CUSTOMER_ID = CUSTOMER_ID;
        Model.ID_ORDER_Delivery = 1;
        Model.Data = $('#txt_NewDate').val();
        Model.Remarks = $('#txtRemarks').val();
        Model.USER_CODE = SysSession.CurrentEnvironment.UserCode;
        Model.Amount = Number($('#txt_balance').val());
        Model.AmountRequired = Number(Number($('#txt_Debit').val()) - Number($('#txtShootMoney').val()));
        Model.ShootMoney = Number($('#txtShootMoney').val());
    }
    function Update() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "Insert"),
            data: { CUSTOMER_ID: Model.CUSTOMER_ID, USER_CODE: Model.USER_CODE, ID_ORDER_Delivery: Model.ID_ORDER_Delivery, AmountRequired: Model.AmountRequired, Amount: Model.Amount, ShootMoney: Model.ShootMoney, Remarks: Model.Remarks, Data: Model.Data },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    ID_Receipt = result.Response;
                    btnBack_onclick();
                    FillddlCustomerMaster();
                    Display();
                    Selected_Data = new Array();
                    Selected_Data = Get_IQ_IQ_Catch_Receipt.filter(function (x) { return x.ID_Receipt == Number(ID_Receipt); });
                    $("#rowData").removeClass("display_none");
                    $("#divTotalSatistics").removeClass("display_none");
                    DisplayData(Selected_Data);
                    ID_Receipt = Selected_Data[0].ID_Receipt;
                    $("#txtShootMoney").attr("disabled", "disabled");
                    $("#btnCustomerSearch").attr("disabled", "disabled");
                    $("#txtRemarks").attr("disabled", "disabled");
                    MessageBox.Show("تم الحفظ بنجاح", "تم");
                }
                else {
                    MessageBox.Show("خطأء", "خطأء");
                }
            }
        });
    }
    ////-----------------------------------------------------------------------------------------------------------------------
    ////-------------------------------------------------------button---Save and Back and Eidt--------------------------------------
    function btnAdd_onclick() {
        btnAdd.classList.add("display_none");
        btnSave.classList.remove("display_none");
        btnBack.classList.remove("display_none");
        $("#DivShow").removeClass("disabledDiv");
        //$("#DivHederMaster").attr("disabled", "disabled").off('click');
        $("#DivHederMaster").addClass("disabledDiv");
        $(".fontitm3").removeClass("display_none");
        $("#rowData").removeClass("display_none");
        remove_disabled_Grid_Controls();
        $("#txtShootMoney").removeAttr("disabled");
        $("#btnCustomerSearch").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");
        $("#rowData :input").val("");
        $('#txt_Type').val('1');
        CUSTOMER_ID = 0;
        $('#txt_NewDate').val(GetDate());
    }
    function btnBack_onclick() {
        $("#DivHederMaster").removeClass("disabledDiv");
        $("#rowData").addClass("display_none");
        btnAdd.classList.remove("display_none");
        btnSave.classList.add("display_none");
        btnBack.classList.add("display_none");
    }
    function btnSave_onclick() {
        if (CUSTOMER_ID == 0) {
            MessageBox.Show(' برجاء اختيار العميل', '');
            Errorinput($('#btnCustomerSearch'));
            return;
        }
        else if ($('#txtShootMoney').val().trim() == '' && Number($('#txtShootMoney').val()) <= 0) {
            MessageBox.Show(' برجاء ادخال المبلغ', '');
            Errorinput($('#txtShootMoney'));
            return;
        }
        else if (Number($('#txtShootMoney').val()) > Number($('#txt_Debit').val())) {
            MessageBox.Show(' لايمكنك تجاوز المدين', '');
            Errorinput($('#txtShootMoney'));
            Errorinput($('#txt_Debit'));
            return;
        }
        else {
            Assign();
            Update();
        }
    }
    function remove_disabled_Grid_Controls() {
    }
    function disabled_Grid_Controls() {
        for (var i = 0; i < CountGrid + 1; i++) {
            $("#ddlFamily" + i).attr("disabled", "disabled");
            $("#ddlItem" + i).attr("disabled", "disabled");
            $("#txtQuantity" + i).attr("disabled", "disabled");
            $("#txtPrice" + i).attr("disabled", "disabled");
            $("#txtMinPrice" + i).attr("disabled", "disabled");
            $("#txtScrapQty" + i).attr("disabled", "disabled");
        }
    }
    function printreport(type) {
        debugger;
        var _StockList = new Array();
        var _Stock = new Settings_Report();
        _Stock.Type_Print = type;
        _Stock.ID_Button_Print = 'saless_ret';
        _Stock.Parameter_1 = ID_Receipt.toString();
        //_Stock.Parameter_2 = "";
        //_Stock.Parameter_3 = "";
        //_Stock.Parameter_4 = "";
        //_Stock.Parameter_5 = "";
        //_Stock.Parameter_6 = "";
        //_Stock.Parameter_7 = "";
        //_Stock.Parameter_8 = "";
        //_Stock.Parameter_9 = "";
        _StockList.push(_Stock);
        var rp = new ReportParameters();
        rp.Data_Report = JSON.stringify(_StockList); //output report as View
        debugger;
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
})(CatchReceipt || (CatchReceipt = {}));
//# sourceMappingURL=Catch_Receipt.js.map