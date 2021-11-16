$(document).ready(() => {

    SlsTrServices.InitalizeComponent();
})
namespace SlsTrServices {
    //system varables
    var SysSession: SystemSession = GetSystemSession();
    var compcode: Number;
    var BranchCode: number;
    var Currency: number;
    var sys: SystemTools = new SystemTools();
    var vatType: number;
    var Finyear: number;

    //ddl
    var ddlCustomer: HTMLSelectElement;
    var ddlStateType: HTMLSelectElement;
    var ddlInvoiceType: HTMLSelectElement;
    var ddlType: HTMLSelectElement;
    var itemcode = "";
    var itemname = "";

    // Arrays
    var AllCustDetails: Array<CUSTOMER> = new Array<CUSTOMER>();
    var CustDetails: Array<CUSTOMER> = new Array<CUSTOMER>();
    var G_BranchDetails: Array<G_BRANCH> = new Array<G_BRANCH>();
    var StateDetailsAr: Array<string> = new Array<string>();
    var StateDetailsEn: Array<string> = new Array<string>();
    var InvoiceDetailsAr: Array<string> = new Array<string>();
    var InvoiceDetailsEn: Array<string> = new Array<string>();
    var InvoiceTypeDetailsAr: Array<string> = new Array<string>();
    var InvoiceEyptDetailsEn: Array<string> = new Array<string>();
    var AQ_ServSlsInvoiceDetails: Array<AQVAT_GetSlsInvoiceList> = new Array<AQVAT_GetSlsInvoiceList>();
    var SearchDetails: Array<AQVAT_GetSlsInvoiceList> = new Array<AQVAT_GetSlsInvoiceList>();
    var Selecteditem: Array<AQVAT_GetSlsInvoiceList> = new Array<AQVAT_GetSlsInvoiceList>();
    var SlsInvoiceItemsDetails: Array<AVAT_TR_SlsInvoiceItem> = new Array<AVAT_TR_SlsInvoiceItem>();
    var CategorDetails: Array<AVAT_D_SrvCategory> = new Array<AVAT_D_SrvCategory>();

    //Models
    var InvoiceStatisticsModel: Array<AQVAT_GetSlsInvoiceList> = new Array<AQVAT_GetSlsInvoiceList>();
    var InvoiceItemsDetailsModel: Array<AVAT_TR_SlsInvoiceItem> = new Array<AVAT_TR_SlsInvoiceItem>();
    var InvoiceModel: AVAT_TR_SlsInvoice = new AVAT_TR_SlsInvoice();
    var MasterDetailsModel: ServSlsInvoiceMasterDetails = new ServSlsInvoiceMasterDetails();
    var invoiceItemSingleModel: AVAT_TR_SlsInvoiceItem = new AVAT_TR_SlsInvoiceItem();
    var ServicesDetails: Array<AQVAT_GetService> = new Array<AQVAT_GetService>();
    var HeaderWithDetailModel: Array<AVAT_TR_SlsInvoiceItem> = new Array<AVAT_TR_SlsInvoiceItem>();
    //TextBoxes
    var txtStartDate: HTMLInputElement;
    var txtEndDate: HTMLInputElement;
    var txtItemCount: HTMLInputElement;
    var txtPackageCount: HTMLInputElement;
    var txtTotal: HTMLInputElement;
    var txtTotalbefore: HTMLInputElement;
    var txtTotalDiscount: HTMLInputElement;
    var txtTax: HTMLInputElement;
    var txtNet: HTMLInputElement;
    var txtSaleAgreement: HTMLInputElement;
    //var txtDiscountPrcnt: HTMLInputElement;
    var txtDiscountValue: HTMLInputElement;
    var txtInvoiceDate: HTMLInputElement;
    var searchbutmemreport: HTMLInputElement;
    var txtCustomerCode: HTMLInputElement;
    var txtCustomerName: HTMLInputElement;

    //labels
    var lblInvoiceNumber: HTMLInputElement;
    var txtDocNum: HTMLInputElement;

    //checkbox
    var chkActive: HTMLInputElement;
    //buttons                       
    var btnShow: HTMLButtonElement;
    var btnUpdate: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var btnBack: HTMLButtonElement;// btnBack btnSave
    var btnSave: HTMLButtonElement;
    var btnCustomerSrch: HTMLButtonElement;
    var btnSerSlsAgreement: HTMLButtonElement;
    //print buttons 

    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;
    var btnPrintTransaction: HTMLButtonElement;
    // giedView
    var Grid: JsGrid = new JsGrid();

    //global
    var CountGrid = 0;
    var CountItems: number = 0;
    var PackageCount: number = 0;
    var CountTotal: number = 0;
    var TaxCount: number = 0;
    var NetCount: number = 0;
    var VatPrc;
    var GlobalinvoiceID: number = 0;
    //flags : 
    var Show: boolean = true;
    var NewAdd: boolean = true;
    var FlagAfterInsertOrUpdate: boolean = false;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    var btnPrint: HTMLInputElement;
    var CustomerId = 0;
    //------------------------------------------------------ Main Region------------------------
    export function InitalizeComponent() {

        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "فاتورة مبيعات";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Sales Invoices";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        Finyear = Number(SysSession.CurrentEnvironment.CurrentYear);
        Currency = SysSession.CurrentEnvironment.I_Control[0].Currencyid;

        InitalizeControls();
        InitializeEvents();

        txtStartDate.value = SysSession.CurrentEnvironment.StartDate;
        txtEndDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;

        FillddlStateType();
        FillddlInvoiceType();
        FillddlType();
        vatType = SysSession.CurrentEnvironment.I_Control[0].DefSlsVatType;
        $('#ddlStateType').prop("value", "2");
        $('#ddlInvoiceType').prop("value", "2");
        txtItemCount.value = CountItems.toString();
        txtPackageCount.value = PackageCount.toString();
        txtTotal.value = CountTotal.toString();
        txtTotalDiscount.value = CountTotal.toString();
        txtTotalbefore.value = CountTotal.toString();
        txtTax.value = TaxCount.toString();
        txtNet.value = NetCount.toString();
        GetBranch();

        fillddlCustomer();


        //FillddlVatNature();
        //FillddlFamily();
        //GetVatPercentage();
        //GetAllServices();
        //GetAllCostCenters();
    }
    function InitalizeControls() {
        btnPrint = document.getElementById("btnPrint") as HTMLInputElement;

        // Drop down lists
        ddlCustomer = document.getElementById("ddlCustomer") as HTMLSelectElement;
        ddlStateType = document.getElementById("ddlStateType") as HTMLSelectElement;
        ddlInvoiceType = document.getElementById("ddlInvoiceType") as HTMLSelectElement;
        ddlType = document.getElementById("ddlType") as HTMLSelectElement;

        //TextBoxes
        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;
        txtStartDate = document.getElementById("txtStartDate") as HTMLInputElement;
        txtEndDate = document.getElementById("txtEndDate") as HTMLInputElement;
        txtItemCount = document.getElementById("txtItemCount") as HTMLInputElement;
        txtPackageCount = document.getElementById("txtPackageCount") as HTMLInputElement;
        txtTotal = document.getElementById("txtTotal") as HTMLInputElement;
        txtTotalbefore = document.getElementById("txtTotalbefore") as HTMLInputElement;
        txtTotalDiscount = document.getElementById("txtTotalDiscount") as HTMLInputElement;
        txtTax = document.getElementById("txtTax") as HTMLInputElement;
        txtNet = document.getElementById("txtNet") as HTMLInputElement;
        //txtDiscountPrcnt = document.getElementById("txtDiscountPrcnt") as HTMLInputElement;
        txtDiscountValue = document.getElementById("txtDiscountValue") as HTMLInputElement;
        txtInvoiceDate = document.getElementById("txtInvoiceDate") as HTMLInputElement;
        txtCustomerCode = document.getElementById("txtCustomerCode") as HTMLInputElement;
        txtCustomerName = document.getElementById("txtCustomerName") as HTMLInputElement;
        txtSaleAgreement = document.getElementById("txtSaleAgreement") as HTMLInputElement;
        //labels
        lblInvoiceNumber = document.getElementById("lblInvoiceNumber") as HTMLInputElement;
        txtDocNum = document.getElementById("txtDocNum") as HTMLInputElement;

        //checkbox
        chkActive = document.getElementById("chkActive") as HTMLInputElement;
        //button                                                            
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;// btnBack btnSave
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnCustomerSrch = document.getElementById("btnCustomerSrch") as HTMLButtonElement;
        btnSerSlsAgreement = document.getElementById("btnSerSlsAgreement") as HTMLButtonElement;
        //print 
        btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;
        btnPrintTransaction = document.getElementById("btnPrintTransaction") as HTMLButtonElement;
        // btnPrintslip = document.getElementById("btnPrintslip") as HTMLButtonElement;                                                          
        ////

    }
    function InitializeEvents() {

        chkActive.onclick = chkActive_onchecked;        
        btnShow.onclick = btnShow_onclick;
        btnUpdate.onclick = btnUpdate_onclick;
        btnAddDetails.onclick = AddNewRow;
        btnBack.onclick = btnBack_onclick;
        btnSave.onclick = btnSave_onclick;

        searchbutmemreport.onkeyup = _SearchBox_Change;
        ddlType.onchange = ddlType_onchange;
        btnCustomerSrch.onclick = btnCustomerSrch_onclick;
        //txtDiscountPrcnt.onkeyup = txtDiscountPrcnt_onchange;
        txtDiscountValue.onkeyup = txtDiscountValue_onchange;
        txtCustomerCode.onchange = txtCustomerCode_onchange;
        //print
        btnPrintTrview.onclick = () => { PrintReport(1); }
        btnPrintTrPDF.onclick = () => { PrintReport(2); }
        btnPrintTrEXEL.onclick = () => { PrintReport(3); }
        btnPrint.onclick = () => { PrintReport(4); }
        btnPrintTransaction.onclick = PrintTransaction;
        //  btnPrintslip.onclick = btnPrintslip_onclick;

        // btnPrintInvoicePrice.onclick = btnPrintInvoicePrice_onclick;


    }
    //------------------------------------------------------ Events Region------------------------ 
    function ddlInvoiceCustomer_onchange() {
        if (txtCustomerCode.value == "") {
        } else {
            var custcode = txtCustomerCode.value;
            var customer = CustDetails.filter(s => s.CustomerCODE == custcode);

        }
    }
    function checkValidation() {
        if (!SysSession.CurrentPrivileges.CUSTOM1) {
            chkActive.disabled = true;
        } else {
            chkActive.disabled = false;
        }
    }
    function chkActive_onchecked() {
        if (chkActive.checked == false) {
            openInvoice();
        }
    }
    function chkPreivilegeToEditApprovedInvoice() {

        if (SysSession.CurrentPrivileges.CUSTOM2 == false) {
            chkActive.disabled = true;
            btnUpdate.disabled = true;
        } else {
            chkActive.disabled = false;
            btnUpdate.disabled = true;
        }
    }
    function Check_CreditLimit_Custom(net: number) {

        var custCode = txtCustomerCode.value;

        var custom1 = CustDetails.filter(s => s.CustomerCODE == custCode);

        var Isbalance = Number((Number(custom1[0].Openbalance) + Number(custom1[0].Debit) - Number(custom1[0].Credit)).toFixed(2));

        let res = Number((net + Isbalance).toFixed(2));

        if (custom1[0].CreditLimit > 0) {

            if (res <= custom1[0].CreditLimit) { return true }
            else {
                WorningMessage("خطأ لا يمكن ان تجاوز صافي الفاتوره (" + net + ") مع الرصيد (" + Isbalance + ") الحد الائتماني     (" + custom1[0].CreditLimit + ")", "Error The net invoice (" + net + ") cannot exceed the balance (" + Isbalance + ") credit limit (" + custom1[0].CreditLimit + ") ");
                return false
            }

        }
        return true
    }
    function ddlType_onchange() {
        if (ddlType.value == "0") {// علي الحساب

            txtCustomerCode.value = "";
            txtCustomerName.value = "";
        } else {
            txtCustomerCode.value = "";
            txtCustomerName.value = lang == "ar" ? "عميل نقدي عام " : "General Cash Customer";
        }
    }
    function btnCustomerSrch_onclick() {

        let Credit = '';
        if (ddlType.value == "0") {
            Credit = "and IsCreditCustomer = 1"
        }
        else {
            Credit = ""

        }
        let sys: SystemTools = new SystemTools();
        //sys.FindKey(Modules.Sales_Services, "btnCustomerSrch", "CompCode=" + compcode + "and BranchCode=" + BranchCode + " and ISPersonal ='" + CustType.IsPersonal + "' and SalesInvoiceNature = " + CustType.SalesInvoiceNature + "", () => {
        var cond: string;

        cond = "CompCode=" + compcode + "" + Credit;
        if (SysSession.CurrentEnvironment.I_Control.IsLocalBranchCustomer == true) { cond = cond + "and BranchCode=" + BranchCode; }


        sys.FindKey(Modules.SlsTrSales, "btnCustomerSrch", cond, () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey;
            CustomerId = id;
            var custObjct = AllCustDetails.filter(s => s.CUSTOMER_ID == id);
            txtCustomerCode.value = custObjct[0].CustomerCODE;
            txtCustomerName.value = lang == "ar" ? custObjct[0].CUSTOMER_NAME : custObjct[0].NAMEE;
            ddlInvoiceCustomer_onchange();
        });
    }
    function txtCustomerCode_onchange() {
        if (txtCustomerCode.value != "") {
            var custObjct = AllCustDetails.filter(s => s.CustomerCODE == txtCustomerCode.value);
            if (custObjct.length > 0) {
                txtCustomerName.value = lang == "ar" ? custObjct[0].CUSTOMER_NAME : custObjct[0].NAMEE;
            } else {
                txtCustomerCode.value = "";
                txtCustomerName.value = "";
                DisplayMassage("كود العميل غير صحيح", "Wrong Customer code", MessageType.Error);
            }
        } else {
            txtCustomerCode.value = "";
            txtCustomerName.value = "";
        }
    }
    function txtDiscountValue_onchange() {

        if (txtDiscountValue.value.trim() != '' && txtDiscountValue.value != '0') {
            txtNet.value = (Number(NetCount.toFixed(2)) - Number(txtDiscountValue.value)).toFixed(2);

        }
        else {
            ComputeTotals();
        }
    }
    //------------------------------------------------------ Buttons Region------------------------
    function btnSave_onclick() {
        debugger

        
        if (!SysSession.CurrentPrivileges.AddNew) return;
        if (!ValidationHeader()) return;

        for (let i = 0; i < CountGrid; i++) {
            if (!Validation_Grid(i))
                return;
        }

        if (txtCustomerCode.value != "" && ddlType.value == "0") {

            let net = Number(txtNet.value);
            if (!Check_CreditLimit_Custom(net))
                return;
        }

        Assign();

        if (NewAdd == true) {
            insert();
        }
        else {
            Update();
        }
        //$("#btnPrintInvoicePrice").removeClass("display_none");
        $("#div_btnPrint").removeClass("display_none");
        $("#btnPrintTransaction").removeClass("display_none");
        chkActive.disabled = true;
    }
    function btnBack_onclick() {
        //$("#btnPrintInvoicePrice").removeClass("display_none");
        $("#div_btnPrint").removeClass("display_none");
        $("#btnPrintTransaction").removeClass("display_none");
        


        $('#txt_Remarks').attr("disabled", "disabled");
        $('#txtDeliveryDate').attr("disabled", "disabled");
        $('#txtDeliveryEndDate').attr("disabled", "disabled");
        $('#txtContractNo').attr("disabled", "disabled");
        $('#txtWorkOrderType').attr("disabled", "disabled");
        $('#txtWorkOrderNo').attr("disabled", "disabled");
        $('#txtPurchaseorderNo').attr("disabled", "disabled");
        $('#txtPaymentTerms').attr("disabled", "disabled");


        $("#btnBack").addClass("display_none");
        $("#btnSave").addClass("display_none");
        $("#btnUpdate").removeClass("display_none");

        $("#cotrolDiv").removeClass("disabledDiv");
        if (NewAdd == true) { //add

            $("#DivInvoiceDetails").addClass("display_none");
            $("#chkActive").attr("disabled", "disabled");


        }
        else {//Edit

            Grid_RowDoubleClicked();

        }
        chkActive.disabled = true;
    }       
    //*****************new 26-10-20219***********************//
    function Enable_DisableControls() {
        $('#txt_Remarks').removeAttr('disabled');
        $('#txtDeliveryDate').removeAttr('disabled');
        $('#txtDeliveryEndDate').removeAttr('disabled');
        $('#txtContractNo').removeAttr('disabled');
        $('#txtWorkOrderType').removeAttr('disabled');
        $('#txtWorkOrderNo').removeAttr('disabled');
        $('#txtPurchaseorderNo').removeAttr('disabled');
        $('#txtPaymentTerms').removeAttr('disabled');
        chkActive.disabled = false;
        btnCustomerSrch.disabled = false;
        txtCustomerCode.disabled = false;
        //SysSession.CurrentEnvironment.I_Control[0].IvoiceDateEditable == true ? $('#txtInvoiceDate').removeAttr("disabled") : $('#txtInvoiceDate').attr("disabled", "disabled");

        txtDiscountValue.disabled = false;
        $("#btnAddDetails").removeClass("display_none");
        $("#btnUpdate").addClass("display_none");
        $("#btnPrintTransaction").addClass("display_none");
        $("#div_btnPrint").addClass("display_none");
        $("#btnBack").removeClass("display_none");
        $("#btnSave").removeClass("display_none");
        $("#cotrolDiv").attr("disabled", "disabled").off('click');
        $("#cotrolDiv").addClass("disabledDiv");
        txtSaleAgreement.disabled = false;
        btnSerSlsAgreement.disabled = false;
    }
    //*******************************************************//
    function btnShow_onclick() {
        InitializeGrid();
        $("#divShow").removeClass("display_none");
        $("#DivInvoiceDetails").addClass("display_none");
        $("#cotrolDiv").removeClass("disabledDiv");
    }
    function btnUpdate_onclick() {
       
        if (!SysSession.CurrentPrivileges.EDIT) return;
        $("#cotrolDiv").attr("disabled", "disabled").off('click');
        $("#cotrolDiv").addClass("disabledDiv");
        Show = false;
        $("#btnUpdate").addClass("display_none");
        $("#btnPrintTransaction").addClass("display_none");
        //$("#btnPrintInvoicePrice").addClass("display_none");
        $("#div_btnPrint").addClass("display_none");
        $("#btnBack").removeClass("display_none");
        $("#btnSave").removeClass("display_none");

        for (let i = 0; i < CountGrid; i++) {
            $("#txtReturnQuantity" + i).removeAttr("disabled");     
        }
        btnCustomerSrch.disabled = false;
        txtCustomerCode.disabled = false;
        $("#chkActive").removeAttr("disabled");
        $("#btnAddDetails").removeClass("display_none");


        //$('#txt_Remarks').removeAttr('disabled');
        //$('#txtDeliveryDate').removeAttr('disabled');
        //$('#txtDeliveryEndDate').removeAttr('disabled');
        //$('#txtContractNo').removeAttr('disabled');
        //$('#txtWorkOrderType').removeAttr('disabled');
        //$('#txtWorkOrderNo').removeAttr('disabled');
        //$('#txtPurchaseorderNo').removeAttr('disabled');
        //$('#txtPaymentTerms').removeAttr('disabled');

        checkValidation();

        NewAdd = false;

        //txtDiscountPrcnt.disabled = false;
        txtDiscountValue.disabled = false;
        if (ddlType.value == '1') {
        }


        $('#ddlCashBox').prop('selectedIndex', 0);
        $('#ddlCashBox').attr('disabled', 'disabled');
        $('#txtDiscountValue').attr('disabled', 'disabled');
        $('#txtCustomerCode').attr('disabled', 'disabled');
        $('#txtCustomerName').attr('disabled', 'disabled');
        $('#btnCustomerSrch').attr('disabled', 'disabled');
        $('#ddlType').attr('disabled', 'disabled');
        $('#lblInvoiceNumber').attr('disabled', 'disabled');
        $('#lblInvoiceNumber').removeAttr('disabled');
        $('#lblInvoiceNumber').removeAttr('disabled');
        SysSession.CurrentEnvironment.I_Control[0].IvoiceDateEditable == true ? $('#txtInvoiceDate').removeAttr("disabled") : $('#txtInvoiceDate').attr("disabled", "disabled");




        chkActive.disabled = false; 

    }
    //------------------------------------------------------ Drop Down Region------------------------
    function fillddlCustomer() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "GetAll"),
            data: {
                CompCode: compcode, BranchCode: BranchCode
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllCustDetails = result.Response as Array<CUSTOMER>;
                    $("#ddlCustomer").append("<option value ='null'>" + (lang == "ar" ? "اختر" : "Choose") + "</option> ")
                    for (var i = 0; i < AllCustDetails.length; i++) {
                        $("#ddlCustomer").append("<option value = '" + AllCustDetails[i].CUSTOMER_ID + "'>" + (lang == "ar" ? AllCustDetails[i].CUSTOMER_NAME : AllCustDetails[i].NAMEE) + "</option> ")
                    }
                }
            }
        });
    }
    function GetBranch() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GBranch", "GetAll"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {

                    G_BranchDetails = result.Response as Array<G_BRANCH>;

                }
            }
        });
    }
    function FillddlStateType() {
        StateDetailsAr = ["غير معتمد", " معتمد", "الجميع"];
        StateDetailsEn = [" Not Approved", " Approved", "All"];

        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
            for (let i = 0; i < StateDetailsEn.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = StateDetailsEn[i];
                ddlStateType.options.add(newoption);
            }
        }
        else {
            for (let i = 0; i < StateDetailsAr.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = StateDetailsAr[i];
                ddlStateType.options.add(newoption);
            }
        }
    }
    function FillddlInvoiceType() {
        InvoiceDetailsAr = ["علي الحساب", " نقدي", "الجميع"];
        InvoiceDetailsEn = [" Credit ", " Cash", "All"];

        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
            for (let i = 0; i < InvoiceDetailsEn.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = InvoiceDetailsEn[i];
                ddlInvoiceType.options.add(newoption);
            }
        }
        else {
            for (let i = 0; i < InvoiceDetailsAr.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = InvoiceDetailsAr[i];
                ddlInvoiceType.options.add(newoption);
            }
        }
    }
    function FillddlType() {
        InvoiceTypeDetailsAr = ["علي الحساب", " نقدي"];
        InvoiceEyptDetailsEn = [" Credit ", " Cash"];

        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
            for (let i = 0; i < InvoiceEyptDetailsEn.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = InvoiceEyptDetailsEn[i];
                ddlType.options.add(newoption);
            }
        }
        else {
            for (let i = 0; i < InvoiceTypeDetailsAr.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = InvoiceTypeDetailsAr[i];
                ddlType.options.add(newoption);
            }
        }

    }
    //------------------------------------------------------ Normal Grid Region------------------------
    function InitializeGrid() {
        let res: any = GetResourceList("");
        Grid.ElementName = "divGridDetails";
        Grid.Paging = true;
        Grid.PageSize = 10;
        Grid.Sorting = true;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Editing = false;
        Grid.Inserting = false;
        Grid.SelectedIndex = 1;
        Grid.OnRowDoubleClicked = Grid_RowDoubleClicked;
        Grid.OnItemEditing = () => { };
        Grid.PrimaryKey = "InvoiceID";
        Grid.Columns = [
            { title: res.App_Number, name: "InvoiceID", type: "text", width: "2%", visible: false },
            { title: res.App_Number, name: "TrNo", type: "text", width: "13%" },
            { title: res.App_date, name: "TrDate", type: "text", width: "20%" },
            { title: res.App_Cutomer, name: "CustomerName", type: "text", width: "25%" },
            { title: res.App_total, name: "TotalAmount", type: "text", width: "15%" },
            { title: res.App_Tax, name: "VatAmount", type: "text", width: "12%" },
            { title: res.App_Net, name: "NetAfterVat", type: "text", width: "13%" },
            { title: res.App_DocumentNo, name: "DocNo", type: "text", width: "20%" },
            { title: 'التسلسل العام', name: "GlobalInvoiceCounter", type: "text", width: "20%" },
            { title: res.App_invoiceType, name: "IsCashDesciption", type: "text", width: "16%" },
            { title: res.App_Certified, name: "statusDesciption", type: "text", width: "17%" },
        ];
        BindStatisticGridData();
    }
    function BindStatisticGridData() {
        debugger
        var startDate = txtStartDate.value.toString();
        var endDate = txtEndDate.value.toString();
        var customerId = 0;
        var status = 0;
        var IsCash: number = 0;

        if (ddlCustomer.value != "null") {
            customerId = Number(ddlCustomer.value.toString());
        }
        if (ddlStateType.value != "null") {
            status = Number(ddlStateType.value.toString());
        }
        if (Number(ddlInvoiceType.value) == 0) {
            IsCash = 0;
        } else if (Number(ddlInvoiceType.value) == 1) {
            IsCash = 1;
        } else {
            IsCash = 2;
        }

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SlsTrSales", "GetAllServSalesInvoice"),
            data: { CompCode: compcode, trtype: 0, BranchCode: BranchCode, IsCash: IsCash, StartDate: startDate, EndDate: endDate, Status: status, CustId: customerId, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AQ_ServSlsInvoiceDetails = result.Response as Array<AQVAT_GetSlsInvoiceList>;
                    debugger
                    for (let i = 0; i < AQ_ServSlsInvoiceDetails.length; i++) {
                        AQ_ServSlsInvoiceDetails[i].TrDate = DateFormat(AQ_ServSlsInvoiceDetails[i].TrDate.toString());
                        AQ_ServSlsInvoiceDetails[i].statusDesciption = AQ_ServSlsInvoiceDetails[i].Status == 1 ? (lang == "ar" ? "معتمد" : "A certified") : (lang == "ar" ? "غير معتمد" : "Not supported");
                        AQ_ServSlsInvoiceDetails[i].IsCashDesciption = AQ_ServSlsInvoiceDetails[i].IsCash == true ? (lang == "ar" ? "نقدي" : "Cash") : (lang == "ar" ? "علي الحساب" : "On account");
                    }
                    Grid.DataSource = AQ_ServSlsInvoiceDetails;
                    Grid.Bind();
                }
            }
        });
    }
    function Grid_RowDoubleClicked() {
        Show = true;
        $("#divShow").removeClass("display_none");
        $("#btnUpdate").removeClass("display_none");
        $("#btnPrintTransaction").removeClass("display_none");
        $("#DivInvoiceDetails").removeClass("display_none");
        txtSaleAgreement.value = "";
        clear();
        InvoiceStatisticsModel = new Array<AQVAT_GetSlsInvoiceList>();

        if (FlagAfterInsertOrUpdate == true) {
            Selecteditem = AQ_ServSlsInvoiceDetails.filter(x => x.InvoiceID == Number(GlobalinvoiceID));
        } else {
            if (Grid.SelectedKey == undefined) {
                Selecteditem = AQ_ServSlsInvoiceDetails.filter(x => x.InvoiceID == Number(GlobalinvoiceID));
            } else
                Selecteditem = AQ_ServSlsInvoiceDetails.filter(x => x.InvoiceID == Number(Grid.SelectedKey));
        }
        GlobalinvoiceID = Number(Selecteditem[0].InvoiceID);

        InvoiceStatisticsModel = Selecteditem;
        Display(InvoiceStatisticsModel);
    }
    //****new 25-12
    function Display(InvoiceStatisticsModel: Array<AQVAT_GetSlsInvoiceList>) {

        if (InvoiceStatisticsModel.length > 0) {
            txtTotal.value = InvoiceStatisticsModel[0].TotalAmount.toString();
            txtTax.value = InvoiceStatisticsModel[0].VatAmount.toString();
            txtNet.value = (InvoiceStatisticsModel[0].NetAfterVat - InvoiceStatisticsModel[0].DiscountAmount).toFixed(2);
            lblInvoiceNumber.value = InvoiceStatisticsModel[0].TrNo.toString();
            txtDocNum.value = InvoiceStatisticsModel[0].DocNo.toString();
            txtInvoiceDate.value = DateFormat(InvoiceStatisticsModel[0].TrDate.toString());
            $('#txtCustomerName').val(InvoiceStatisticsModel[0].Cus_NameA)
            $('#txtCustomerCode').val(InvoiceStatisticsModel[0].Cus_Code)
            txtDiscountValue.value = InvoiceStatisticsModel[0].RoundingAmount.toFixed(2);

            //txtCustomerName.value = lang == "ar" ? InvoiceStatisticsModel[0].Cus_NameA.toString() : InvoiceStatisticsModel[0].Cus_NameE.toString();
            //txtCustomerCode.value = InvoiceStatisticsModel[0].Cus_Code.toString();
            //$('#txtWorkOrderNo').val(InvoiceStatisticsModel[0].WorkOrderNo)
            //$('#txtWorkOrderType').val(InvoiceStatisticsModel[0].WorkOrderType)

            //txtDiscountValue.value = InvoiceStatisticsModel[0].DiscountAmount.toFixed(2);
            //txtDiscountPrcnt.value = InvoiceStatisticsModel[0].DiscountPrc.toString();




            if (InvoiceStatisticsModel[0].Status == 1) {
                chkActive.checked = true;
                chkPreivilegeToEditApprovedInvoice();
            } else {
                chkActive.checked = false;
                btnUpdate.disabled = !SysSession.CurrentPrivileges.EDIT;
                chkActive.disabled = true;
            }
            if (InvoiceStatisticsModel[0].IsCash == true) {
                $('#ddlType').prop("value", "1");

            } else {
                $('#ddlType').prop("value", "0");

            }

            $('#divCreationPanel').removeClass("display_none");

            $('#txtCreatedBy').prop("value", InvoiceStatisticsModel[0].CreatedBy);
            $('#txtCreatedAt').prop("value", InvoiceStatisticsModel[0].CreatedAt);
            $('#txtUpdatedBy').prop("value", InvoiceStatisticsModel[0].UpdatedBy);
            $('#txtUpdatedAt').prop("value", InvoiceStatisticsModel[0].UpdatedAt);
        }
        SlsInvoiceItemsDetails = new Array<AVAT_TR_SlsInvoiceItem>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("ServTrSales", "GetServSalesInvByID"),
            data: { InvoiceID: GlobalinvoiceID, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    HeaderWithDetailModel = result.Response as Array<AVAT_TR_SlsInvoiceItem>;

                }
            }
        });

        SlsInvoiceItemsDetails = HeaderWithDetailModel.filter(s => s.InvoiceID == GlobalinvoiceID);

        for (let i = 0; i < SlsInvoiceItemsDetails.length; i++) {
            BuildControls(i);

        }
        CountGrid = SlsInvoiceItemsDetails.length;
        CountItems = SlsInvoiceItemsDetails.length;

        $("#btnSave").addClass("display_none");
        $("#btnBack").addClass("display_none");

        $("ddlInvoiceCustomer").attr("disabled", "disabled");





        txtCustomerCode.disabled = true;

        btnCustomerSrch.disabled = true;
        //txtDiscountPrcnt.disabled = true;
        txtDiscountValue.disabled = true;

        $('#txt_Remarks').attr("disabled", "disabled");
        $('#txtDeliveryDate').attr("disabled", "disabled");
        $('#txtDeliveryEndDate').attr("disabled", "disabled");
        $('#txtContractNo').attr("disabled", "disabled");
        $('#txtWorkOrderType').attr("disabled", "disabled");
        $('#txtWorkOrderNo').attr("disabled", "disabled");
        $('#txtPurchaseorderNo').attr("disabled", "disabled");
        $('#txtPaymentTerms').attr("disabled", "disabled");

        if (InvoiceStatisticsModel[0].Status == 1) {
            if (!SysSession.CurrentPrivileges.CUSTOM2) {
                $("#btnUpdate").addClass("display_none");
            } else {
                $("#btnUpdate").removeClass("display_none");

            }
        }
        let DeliveryDate: string = InvoiceStatisticsModel[0].DeliveryDate == null ? GetDate() : DateFormat(InvoiceStatisticsModel[0].DeliveryDate);
        $('#txtDeliveryDate').val(DeliveryDate);
        let DeliveryEndDate: string = InvoiceStatisticsModel[0].DeliveryEndDate == null ? GetDate() : DateFormat(InvoiceStatisticsModel[0].DeliveryEndDate);
        $('#txtDeliveryEndDate').val(DeliveryEndDate);

        $('#txtContractNo').val(InvoiceStatisticsModel[0].ContractNo.toString());
        $('#txtPurchaseorderNo').val(InvoiceStatisticsModel[0].PurchaseorderNo.toString());
        $('#txt_Remarks').val(InvoiceStatisticsModel[0].Remark.toString());
        $('#txtPaymentTerms').val(InvoiceStatisticsModel[0].PaymentTerms.toString());
        CustomerId = InvoiceStatisticsModel[0].CustomerId

        DocumentActions.RenderFromModel(InvoiceStatisticsModel[0]);
        ComputeTotals();
        btnSerSlsAgreement.disabled = true;
        txtSaleAgreement.disabled = true;
    }
    //------------------------------------------------------ Controls Grid Region------------------------
    function BuildControls(cnt: number) {
        var html;

        html = '<div id= "No_Row' + cnt + '" class="container-fluid style_border" > <div class="row " > <div class="col-lg-12" > ' +

            '<span id="btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3SlsTrSalesManager2 display_none"style="Right : 2%"></span>' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0" style="width: 4%;Right : 2%">' +
            '<input id="txtSerial' + cnt + '" type="text" class="form-control input-sm input-sm right2" disabled /></div>' +

            '<input id="InvoiceItemID' + cnt + '" type="hidden" class="form-control input-sm right2 display_none"  />' +

            //'<div class="col-lg-2">' +
            //'<select id="ddlItem' + cnt + '" class="form-control input-sm"><option value="null">' + (lang == "ar" ? "الخدمه" : "Service") + '</option></select></div>' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0" style="width: 11%;Right : 2.40%">' +
            '<input id="txtServiceCode' + cnt + '" name="" disabled type="text" class="col-lg-9 form-control input-sm EditCont text_Display  " />' +
            '</div>' +
            '<div class="col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xs-3 p-0">' +
            '<input id="txtServiceName' + cnt + '" name="FromDate" type="text" class="form-control input-sm  text_Display" /></div>' +
            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"><input type="number" id="txtQuantity' + cnt + '" name="quant[1]" class="form-control input-sm  EditCont font1" value="1" min="1" max="1000" step="1"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"><input type="text"  class="form-control input-sm" id="txtReturnQuantity' + cnt + '" name="quant[3]" class="form-control input-sm   font1" value="0" min="0" max="1000" step="1"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            '<select id="ddlUOM' + cnt + '" class="form-control input-sm" style="width: 100%;border-radius: 30px;">' +
            '<option value="1"> كرتونه   </option>' +
            '<option value="2"> باكت  </option >' +
            '</select > ' +

            '</div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number"  id="txtPrice' + cnt + '" name="quant[2]" class="form-control input-sm  EditCont font1" value="1" min="0" max="1000" step="0.5"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number"  id="txtDiscountPrc' + cnt + '" name="quant[2]" class="form-control input-sm EditCont  font1" value="0" min="0" max="1000" step="0.5"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number"  id="txtDiscountAmount' + cnt + '" name="quant[2]" class="form-control input-sm EditCont  font1" value="0" min="0" max="1000" step="0.5"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number" disabled id="txtNetUnitPrice' + cnt + '" name="quant[2]" class="form-control input-sm   font1" value="0" min="0" max="1000" step="0.5"></div>' +



            '<div class="col-lg-12 col-md-12 col-sm-12 col-xl-12 col-xs-12" style="position:absolute; right:97%">' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            '<input id="txtTotal' + cnt + '" type="text" class="form-control input-sm right2" disabled /></div>' +


            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            '<input id="txtTax_Rate' + cnt + '" type="Number" class="form-control input-sm input-sm right2"/></div>' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            '<input id="txtTax' + cnt + '" type="Number" class="form-control input-sm right2"/></div>' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            '<input id="txtTotAfterTax' + cnt + '" type="text" class="form-control input-sm right2" disabled /></div>' +

            //'<div class="col-lg-4 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            //'<input id="txtRemarks' + cnt + '" type="text" class="form-control input-sm right2 EditCont" disabled /></div></div>' +

            '</div></div></div>' +

            '<input id="txt_StatusFlag' + cnt + '" name = " " type = "hidden" class="form-control input-sm"/><input id="txt_ID' + cnt + '" name = " " type = "hidden" class="form-control input-sm" />';
        $("#div_Data").append(html);

        //Search Region
        //// First Search

        $("#txtRemarks" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

        // text change

        $("#txtQuantity" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
            var total = 0;

            var quntity = Number(Number(txtQuantityValue).toFixed(2));
            if ($("#txtPrice" + cnt).val() == 0) { total = quntity * 1; }
            else { total = quntity * Number(txtPriceValue); }
            //  $('#txtTax_Rate' + cnt).val(Tax_Rate);

            $("#txtTotal" + cnt).val(total.toFixed(2));
            VatPrc = $("#txtTax_Rate" + cnt).val();
            var vatAmount = Number(total) * VatPrc / 100;
            $("#txtTax" + cnt).val(vatAmount.toFixed(2));
            var totalAfterVat = Number(vatAmount.toFixed(2)) + Number(total.toFixed(2));
            $("#txtTotAfterTax" + cnt).val(totalAfterVat.toFixed(2));
            ComputeTotals();

        });

        $("#txtPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
            //   $('#txtTax_Rate' + cnt).val(Tax_Rate);

            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            VatPrc = $("#txtTax_Rate" + cnt).val();
            var vatAmount = Number(total) * VatPrc / 100;
            $("#txtTax" + cnt).val(vatAmount.toFixed(2));
            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            $("#txtTotal" + cnt).val(total.toFixed(2));

            var totalAfterVat = Number(vatAmount.toFixed(2)) + Number(total.toFixed(2));
            $("#txtTotAfterTax" + cnt).val(totalAfterVat.toFixed(2));


            let txtPrice = Number($("#txtPrice" + cnt).val());
            let txtDiscountPrc = Number($("#txtDiscountPrc" + cnt).val());

            $("#txtDiscountAmount" + cnt).val(((txtDiscountPrc * txtPrice) / 100).toFixed(2));

            $("#txtNetUnitPrice" + cnt).val((txtPrice - ((txtDiscountPrc * txtPrice) / 100)));



            ComputeTotals();

        });


        $("#txtTax" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
            //   $('#txtTax_Rate' + cnt).val(Tax_Rate);

            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            VatPrc = $("#txtTax_Rate" + cnt).val();
            var vatAmount = Number(total) * VatPrc / 100;
            $("#txtTax" + cnt).val(vatAmount.toFixed(2));
            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            $("#txtTotal" + cnt).val(total.toFixed(2));

            var totalAfterVat = Number(vatAmount.toFixed(2)) + Number(total.toFixed(2));
            $("#txtTotAfterTax" + cnt).val(totalAfterVat.toFixed(2));


            let txtPrice = Number($("#txtPrice" + cnt).val());
            let txtDiscountPrc = Number($("#txtDiscountPrc" + cnt).val());

            $("#txtDiscountAmount" + cnt).val(((txtDiscountPrc * txtPrice) / 100).toFixed(2));

            $("#txtNetUnitPrice" + cnt).val((txtPrice - ((txtDiscountPrc * txtPrice) / 100)));



            ComputeTotals();

        }); $("#txtTax_Rate" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
            //   $('#txtTax_Rate' + cnt).val(Tax_Rate);

            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            VatPrc = $("#txtTax_Rate" + cnt).val();
            var vatAmount = Number(total) * VatPrc / 100;
            $("#txtTax" + cnt).val(vatAmount.toFixed(2));
            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            $("#txtTotal" + cnt).val(total.toFixed(2));

            var totalAfterVat = Number(vatAmount.toFixed(2)) + Number(total.toFixed(2));
            $("#txtTotAfterTax" + cnt).val(totalAfterVat.toFixed(2));


            let txtPrice = Number($("#txtPrice" + cnt).val());
            let txtDiscountPrc = Number($("#txtDiscountPrc" + cnt).val());

            $("#txtDiscountAmount" + cnt).val(((txtDiscountPrc * txtPrice) / 100).toFixed(2));

            $("#txtNetUnitPrice" + cnt).val((txtPrice - ((txtDiscountPrc * txtPrice) / 100)));



            ComputeTotals();

        });
        $("#txtDiscountPrc" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");



            let txtPrice = Number($("#txtPrice" + cnt).val());
            let txtDiscountPrc = Number($("#txtDiscountPrc" + cnt).val());

            $("#txtDiscountAmount" + cnt).val(((txtDiscountPrc * txtPrice) / 100).toFixed(2));

            $("#txtNetUnitPrice" + cnt).val((txtPrice - ((txtDiscountPrc * txtPrice) / 100)).toFixed(2));


            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
            //   $('#txtTax_Rate' + cnt).val(Tax_Rate);

            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            VatPrc = $("#txtTax_Rate" + cnt).val();
            var vatAmount = Number(total) * VatPrc / 100;
            $("#txtTax" + cnt).val(vatAmount.toFixed(2));
            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            $("#txtTotal" + cnt).val(total.toFixed(2));

            var totalAfterVat = Number(vatAmount.toFixed(2)) + Number(total.toFixed(2));
            $("#txtTotAfterTax" + cnt).val(totalAfterVat.toFixed(2));


            ComputeTotals();

        });
        $("#txtDiscountAmount" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");





            let txtPrice = Number($("#txtPrice" + cnt).val());
            let txtDiscountAmount = Number($("#txtDiscountAmount" + cnt).val());

            $("#txtDiscountPrc" + cnt).val(((txtDiscountAmount / txtPrice) * 100).toFixed(2));

            $("#txtNetUnitPrice" + cnt).val((txtPrice - txtDiscountAmount).toFixed(2));



            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
            //   $('#txtTax_Rate' + cnt).val(Tax_Rate);

            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            VatPrc = $("#txtTax_Rate" + cnt).val();
            var vatAmount = Number(total) * VatPrc / 100;
            $("#txtTax" + cnt).val(vatAmount.toFixed(2));
            var total = Number(txtQuantityValue) * Number(txtPriceValue);
            $("#txtTotal" + cnt).val(total.toFixed(2));

            var totalAfterVat = Number(vatAmount.toFixed(2)) + Number(total.toFixed(2));
            $("#txtTotAfterTax" + cnt).val(totalAfterVat.toFixed(2));



            ComputeTotals();

        });
        $("#txtReturnQuantity" + cnt).on('keyup', function () {
            if (Number($("#txtReturnQuantity" + cnt).val()) > Number($("#txtQuantity" + cnt).val())) {
                Number($("#txtReturnQuantity" + cnt).val(Number($("#txtQuantity" + cnt).val())));
                DisplayMassage('لا يمكن ان تكون الكمية المرتجعة اكبر من الكمية المباعة', 'The quantity returned cannot be greater than the quantity sold', MessageType.Error);
                Errorinput($("#txtReturnQuantity" + cnt));          
            }

        });

        $("#txtNetUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            ComputeTotals();

        });

        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });

        if (SysSession.CurrentPrivileges.Remove) {
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).removeAttr("disabled");
        }
        else {
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }

        if (Show == true) {
            // disabled

            $("#btnSearchCostCenter" + cnt).attr("disabled", "disabled");
            $("#btnSearchService" + cnt).attr("disabled", "disabled");
            $("#txtServiceCode" + cnt).attr("disabled", "disabled");
            $("#txtServiceName" + cnt).attr("disabled", "disabled");
            $("#ddlUOM" + cnt).attr("disabled", "disabled");
            $("#txtRemarks" + cnt).attr("disabled", "disabled");

            $("#txtSerial" + cnt).attr("disabled", "disabled");
            $("#txtTax_Rate" + cnt).attr("disabled", "disabled");
            $("#txtQuantity" + cnt).attr("disabled", "disabled");
            $("#txtPrice" + cnt).attr("disabled", "disabled");
            $("#txtDiscountPrc" + cnt).attr("disabled", "disabled");
            $("#txtDiscountAmount" + cnt).attr("disabled", "disabled");
            $("#txtNetUnitPrice" + cnt).attr("disabled", "disabled");
            $("#txtReturnQuantity" + cnt).attr("disabled", "disabled");
            $("#txtTotal" + cnt).attr("disabled", "disabled");
            $("#txtTax" + cnt).attr("disabled", "disabled");
            $("#txtTotAfterTax" + cnt).attr("disabled", "disabled");


            $("#btnAddDetails").addClass("display_none");

            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");

            //bind Data
            debugger
            $("#txt_StatusFlag" + cnt).val("");
            $("#txtServiceName" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].Name_Item);
            $("#txtServiceCode" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].Name_Category);
            $("#ddlUOM" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].UomID);
            $("#txtCustomerName").val(SlsInvoiceItemsDetails[0].AllowReason);
            $("#txtCustomerCode").val(SlsInvoiceItemsDetails[0].CC_CODE);
            //$("#txtRemarks" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].Remarks);

            $("#txtSerial" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].Serial);

            //*******new 26-10
            let InvoiceSoldQty = SlsInvoiceItemsDetails[cnt].SoldQty - SlsInvoiceItemsDetails[cnt].TotRetQty;
            $("#txtQuantity" + cnt).prop("value", InvoiceSoldQty);
            //$("#txtQuantity" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].SoldQty);
            //********
            $("#txtPrice" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].Unitprice);
            $("#txtDiscountPrc" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].DiscountPrc);
            $("#txtDiscountAmount" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].DiscountAmount);
            $("#txtNetUnitPrice" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].NetUnitPrice);
            $("#txtTax_Rate" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].VatPrc);
            $("#txtReturnQuantity" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].TotRetQty == null ? 0 : SlsInvoiceItemsDetails[cnt].TotRetQty);
            $("#txtTotal" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].ItemTotal);
            $("#txtTax" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].VatAmount.toFixed(2));
            $("#txtTotAfterTax" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].NetAfterVat.toFixed(2));
            $("#InvoiceItemID" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].InvoiceItemID);
        }
        $("#btn_minus" + cnt).click(function (e) {
            DeleteRow(cnt);
        });
        return;
    }
    function DeleteRow(RecNo: number) {
        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
            CountItems = CountItems - 1;

            txtItemCount.value = CountItems.toString();
            $("#txtCostCntrNum" + RecNo).val("99");
            $("#txtRemarks" + RecNo).val("99");
            $("#txtServiceCode" + RecNo).val("99");
            $("#txtServiceName" + RecNo).val("99");
            $("#ddlUOM" + RecNo).val("99");
            $("#txtQuantity" + RecNo).val("99");
            $("#txtPrice" + RecNo).val("199");
            $("#txtDiscountPrc" + RecNo).val("199");
            $("#txtDiscountAmount" + RecNo).val("199");
            $("#txtNetUnitPrice" + RecNo).val("199");
            $("#No_Row" + RecNo).attr("hidden", "true");
            ComputeTotals();
            Insert_Serial();

        });
    }
    function AddNewRow() {

        if (!SysSession.CurrentPrivileges.AddNew) return;
        var CanAdd: boolean = true;
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            CountItems = CountItems + 1;
            txtItemCount.value = CountItems.toString();
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
            $("#txtCostCntrNum" + CountGrid).removeAttr("disabled");
            $("#txtRemarks" + CountGrid).removeAttr("disabled");
            $("#txtServiceCode" + CountGrid).removeAttr("disabled");
            //$("#txtTotAfterTax" + CountGrid).attr("disabled", "disabled");
            //$("#ddlUOM" + CountGrid).attr("disabled", "disabled");
            $("#btnServiceSearch" + CountGrid).removeAttr("disabled");
            $("#btnSearchCostCenter" + CountGrid).removeAttr("disabled");

            $("#txtQuantity" + CountGrid).removeAttr("disabled");
            $("#txtPrice" + CountGrid).removeAttr("disabled");
            $("#txtDiscountPrc" + CountGrid).removeAttr("disabled");
            $("#txtDiscountAmount" + CountGrid).removeAttr("disabled");
            $("#txtReturnQuantity" + CountGrid).attr("disabled", "disabled");
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            CountGrid++;
            Insert_Serial();

        }
    }
    function ComputeTotals() {

        PackageCount = 0;
        CountTotal = 0;
        let TotalDiscount = 0;
        let Totalbefore = 0;
        TaxCount = 0;
        NetCount = 0;
        for (let i = 0; i < CountGrid; i++) {
            var flagvalue = $("#txt_StatusFlag" + i).val();
            if (flagvalue != "d" && flagvalue != "m") {
                PackageCount += Number($("#txtQuantity" + i).val());
                PackageCount = Number(PackageCount.toFixed(2).toString());

                Totalbefore += (Number($("#txtQuantity" + i).val()) * Number($("#txtPrice" + i).val()));
                Totalbefore = Number(Totalbefore.toFixed(2).toString());

                TotalDiscount += (Number($("#txtQuantity" + i).val()) * Number($("#txtDiscountAmount" + i).val()));
                TotalDiscount = Number(TotalDiscount.toFixed(2).toString());

                CountTotal += Number($("#txtTotal" + i).val());
                CountTotal = Number(CountTotal.toFixed(2).toString());

                TaxCount += Number($("#txtTax" + i).val());
                TaxCount = Number(TaxCount.toFixed(2).toString());

                NetCount += Number($("#txtTotAfterTax" + i).val());
                //NetCount = Number(NetCount.toFixed(2).toString());
                //NetCount = (Number(NetCount.toFixed(2)) - Number(txtDiscountValue.value));

            }
        }
        txtItemCount.value = CountItems.toString();
        txtPackageCount.value = PackageCount.toString();
        txtTotalDiscount.value = TotalDiscount.toString();
        txtTotalbefore.value = Totalbefore.toString();
        txtTotal.value = CountTotal.toString();
        txtTax.value = TaxCount.toString();
        txtNet.value = (Number(NetCount.toFixed(2)) - Number(txtDiscountValue.value)).toFixed(2);
        //txtDiscountPrcnt_onchange();
    }
    function Insert_Serial() {

        let Ser = 1;
        for (let i = 0; i < CountGrid; i++) {
            var flagvalue = $("#txt_StatusFlag" + i).val();
            if (flagvalue != "d" && flagvalue != "m") {
                $("#txtSerial" + i).val(Ser);
                Ser++;
            }
        }

    }
    //------------------------------------------------------ Search && Clear &&Validation  Region------------------------
    function _SearchBox_Change() {
        if (searchbutmemreport.value != "") {
            let search: string = searchbutmemreport.value.toLowerCase();
            SearchDetails = AQ_ServSlsInvoiceDetails.filter(x => x.TrNo.toString().search(search) >= 0 || x.Cus_NameA.toLowerCase().search(search) >= 0
                || x.Cus_NameE.toLowerCase().search(search) >= 0 || x.DocNo.toLowerCase().search(search) >= 0
                || x.statusDesciption.toLowerCase().search(search) >= 0 || x.IsCashDesciption.toLowerCase().search(search) >= 0);

            Grid.DataSource = SearchDetails;
            Grid.Bind();
        } else {
            Grid.DataSource = AQ_ServSlsInvoiceDetails;
            Grid.Bind();
        }
    }
    function ValidationHeader() {
        if (!CheckDate(DateFormat(txtInvoiceDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {

            WorningMessage('  التاريخ ليس متطابق مع تاريخ السنه (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', '  The date is not identical with the date of the year (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', "تحذير", "worning");
            return
        } else if (txtCustomerCode.value == "") {
            DisplayMassage('(برجاء ادخال العميل)', '(Please enters a customer)', MessageType.Error);
            Errorinput(txtCustomerCode);
            return false
        }

        else if (txtInvoiceDate.value == "") {
            DisplayMassage(" برجاء ادخال التاريخ", "Please select a Date", MessageType.Error);
            Errorinput(txtInvoiceDate);
            return false
        }
        else if (CountGrid == 0) {
            DisplayMassage(" برجاء ادخال بيانات الفاتورة", "Please select a Invoice data", MessageType.Error);

            Errorinput(btnAddDetails);
            return false
        }
        else if (txtItemCount.value == '0') {
            DisplayMassage(" برجاء ادخال بيانات الفاتورة", "Please select a Invoice data", MessageType.Error);
            Errorinput(btnAddDetails);
            return false
        }

        return true;
    }
    function Validation_Grid(rowcount: number) {

        var Qty: number = Number($("#txtQuantity" + rowcount).val());
        var Price: number = Number($("#txtPrice" + rowcount).val());
        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;
        } else {
            if ($("#txtServiceCode" + rowcount).val() == "") {
                DisplayMassage(" برجاء ادخال الصنف", "Please enter the item", MessageType.Error);
                Errorinput($("#txtServiceCode" + rowcount));
                return false
            }
            if ($("#txtServiceName" + rowcount).val() == "") {
                DisplayMassage(" برجاء ادخال الصنف", "Please enter the name of item", MessageType.Error);
                Errorinput($("#txtServiceName" + rowcount));
                return false
            }


            else if (Qty == 0) {
                DisplayMassage(" برجاء ادخال الكمية المباعة", "Please enter the Quantity sold", MessageType.Error);
                Errorinput($("#txtQuantity" + rowcount));
                return false
            }
            else if (Price == 0) {
                DisplayMassage(" برجاء ادخال السعر", "Please enter the Price", MessageType.Error);
                Errorinput($("#txtPrice" + rowcount));
                return false
            }
            return true;
        }
    }
    function clear() {
        $('#div_Data').html("");
        CountGrid = 0;
    }
    //------------------------------------------------------ main Functions  Region------------------------
    function Assign() {
        debugger
        var StatusFlag: String;
        MasterDetailsModel = new ServSlsInvoiceMasterDetails();
        InvoiceModel = new AVAT_TR_SlsInvoice();
        InvoiceItemsDetailsModel = new Array<AVAT_TR_SlsInvoiceItem>();
        var CustCode = txtCustomerCode.value;
        //var custObj = CustDetails.filter(s => s.CustomerCODE == CustCode);
        //InvoiceModel.CustomerId = custObj[0].CustomerId;
        InvoiceModel.CustomerId = CustomerId;
        InvoiceModel.CustomerName = txtCustomerName.value;
        InvoiceModel.CustomerId = CustomerId;
        InvoiceModel.CompCode = Number(compcode);
        InvoiceModel.BranchCode = Number(BranchCode);
        //InvoiceModel.InvoiceCurrenyID = Currency;              
        InvoiceModel.RoundingAmount = Number(txtDiscountValue.value);
        InvoiceModel.TrNo = Number(lblInvoiceNumber.value);
        //InvoiceModel.DocNo = (txtDocNum.value);  
        MasterDetailsModel.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        MasterDetailsModel.UserCode = SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.TrType = 1//0 invoice 1 return
        InvoiceModel.SlsInvSrc = 1   // 1 from store 2 from van 
        InvoiceModel.SlsInvType = 1
        InvoiceModel.RefTrID = null;
        InvoiceModel.InvoiceID = GlobalinvoiceID;
        InvoiceModel.NetAfterVat = Number(txtNet.value) - Number(txtDiscountValue.value);
        InvoiceModel.TotalAmount = Number(txtTotal.value);
        InvoiceModel.ItemTotal = Number(txtTotalbefore.value);
        InvoiceModel.ItemDiscountTotal = Number(txtTotalDiscount.value);
        InvoiceModel.TrDate = txtInvoiceDate.value;
        InvoiceModel.VatType = vatType;
        InvoiceModel.VatAmount = Number(txtTax.value);
        //InvoiceModel.TaxCurrencyID = Number(SysSession.CurrentEnvironment.I_Control[0].Currencyid);
        //InvoiceModel.InvoiceCurrenyID = Number(SysSession.CurrentEnvironment.I_Control[0].Currencyid);   
        InvoiceModel.InvoiceTransCode = 1;
        InvoiceModel.ContractNo = $('#txtContractNo').val();
        InvoiceModel.PurchaseorderNo = $('#txtPurchaseorderNo').val();
        InvoiceModel.DeliveryDate = $('#txtDeliveryDate').val();
        InvoiceModel.DeliveryEndDate = $('#txtDeliveryEndDate').val();
        InvoiceModel.Remark = $('#txt_Remarks').val();
        InvoiceModel.TaxNotes = '';
        if (ddlType.value == "0") {
            InvoiceModel.IsCash = false;
        } else {
            InvoiceModel.IsCash = true;
        }

        if (chkActive.checked == true) {
            InvoiceModel.Status = 1;
        } else {
            InvoiceModel.Status = 0;
        }




        // Details
        for (var i = 0; i < CountGrid; i++) {
            invoiceItemSingleModel = new AVAT_TR_SlsInvoiceItem();
            StatusFlag = $("#txt_StatusFlag" + i).val();


            if (StatusFlag == "i") {
                invoiceItemSingleModel.InvoiceItemID = 0;


                invoiceItemSingleModel.ItemID = 0;

                invoiceItemSingleModel.VatNatID = 0;
                invoiceItemSingleModel.UomID = Number($("#ddlUOM" + i).val());
                invoiceItemSingleModel.Serial = $("#txtSerial" + i).val();
                invoiceItemSingleModel.SoldQty = Number($('#txtQuantity' + i).val());
                invoiceItemSingleModel.DiscountPrc = Number($("#txtDiscountPrc" + i).val());
                invoiceItemSingleModel.DiscountAmount = Number($("#txtDiscountAmount" + i).val());
                invoiceItemSingleModel.NetUnitPrice = Number($("#txtNetUnitPrice" + i).val());
                invoiceItemSingleModel.Unitprice = Number($("#txtPrice" + i).val());
                invoiceItemSingleModel.Name_Item = $("#txtServiceName" + i).val();
                invoiceItemSingleModel.Name_Category = $("#txtServiceCode" + i).val();
                VatPrc = $("#txtTax_Rate" + i).val();
                invoiceItemSingleModel.VatPrc = VatPrc;
                invoiceItemSingleModel.VatApplied = VatPrc;
                invoiceItemSingleModel.VatAmount = Number($("#txtTax" + i).val());
                invoiceItemSingleModel.ItemNetAmount = Number($("#txtTotAfterTax" + i).val());
                invoiceItemSingleModel.ItemTotal = (Number(invoiceItemSingleModel.Unitprice) * Number(invoiceItemSingleModel.SoldQty));
                invoiceItemSingleModel.TotRetQty = Number($("#txtCustomerCode" + i).val());
                invoiceItemSingleModel.StatusFlag = StatusFlag.toString();
                invoiceItemSingleModel.CC_CODE = $("#txtCustomerCode").val();
                invoiceItemSingleModel.AllowReason = $("#txtCustomerName").val();
                InvoiceItemsDetailsModel.push(invoiceItemSingleModel);


            }
            if (StatusFlag == "u") {
                invoiceItemSingleModel.ItemID = 0;
                invoiceItemSingleModel.VatNatID = 0;
                invoiceItemSingleModel.UomID = Number($("#ddlUOM" + i).val());
                invoiceItemSingleModel.Serial = $("#txtSerial" + i).val();
                invoiceItemSingleModel.SoldQty = Number($('#txtQuantity' + i).val());
                invoiceItemSingleModel.DiscountPrc = Number($("#txtDiscountPrc" + i).val());
                invoiceItemSingleModel.DiscountAmount = Number($("#txtDiscountAmount" + i).val());
                invoiceItemSingleModel.NetUnitPrice = Number($("#txtNetUnitPrice" + i).val());
                invoiceItemSingleModel.Unitprice = Number($("#txtPrice" + i).val());
                invoiceItemSingleModel.Name_Item = $("#txtServiceName" + i).val();
                invoiceItemSingleModel.Name_Category = $("#txtServiceCode" + i).val();
                VatPrc = $("#txtTax_Rate" + i).val();
                invoiceItemSingleModel.VatPrc = VatPrc;
                invoiceItemSingleModel.VatApplied = VatPrc;
                invoiceItemSingleModel.VatAmount = Number($("#txtTax" + i).val());
                invoiceItemSingleModel.ItemNetAmount = Number($("#txtTotAfterTax" + i).val());
                invoiceItemSingleModel.ItemTotal = (Number(invoiceItemSingleModel.Unitprice) * Number(invoiceItemSingleModel.SoldQty));
                invoiceItemSingleModel.TotRetQty = Number($("#txtReturnQuantity" + i).val());
                invoiceItemSingleModel.StatusFlag = StatusFlag.toString();
                invoiceItemSingleModel.CC_CODE = $("#txtCustomerCode").val();
                invoiceItemSingleModel.AllowReason = $("#txtCustomerName").val();
                InvoiceItemsDetailsModel.push(invoiceItemSingleModel);

            }
            if (StatusFlag == "d") {
                if ($("#InvoiceItemID" + i).val() != "") {
                    var deletedID = $("#InvoiceItemID" + i).val();
                    invoiceItemSingleModel.StatusFlag = StatusFlag.toString();
                    invoiceItemSingleModel.InvoiceItemID = deletedID;
                    InvoiceItemsDetailsModel.push(invoiceItemSingleModel);
                }
            }
        }
        MasterDetailsModel.AVAT_TR_SlsInvoice = InvoiceModel;
        MasterDetailsModel.AVAT_TR_SlsInvoiceItem = InvoiceItemsDetailsModel;
    }
    function Update() {
        InvoiceModel.InvoiceID = GlobalinvoiceID;
        InvoiceModel.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.UpdatedAt = DateTimeFormat(Date().toString());
        if (InvoiceStatisticsModel.length > 0) {
            InvoiceModel.CreatedAt = InvoiceStatisticsModel[0].CreatedAt;
            InvoiceModel.CreatedBy = InvoiceStatisticsModel[0].CreatedBy;
            InvoiceModel.DocNo = InvoiceStatisticsModel[0].DocNo;
            InvoiceModel.DocUUID = InvoiceStatisticsModel[0].DocUUID;
            InvoiceModel.TrTime = InvoiceStatisticsModel[0].TrTime;
            InvoiceModel.TrNo = InvoiceStatisticsModel[0].TrNo;
        }
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("ServTrSales", "updateInvoiceMasterDetail"),
            data: JSON.stringify(MasterDetailsModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    // 
                    let res = result.Response as AVAT_TR_SlsInvoice;
                    DisplayMassage('( تم تعديل الفاتورة بنجاح )', '(The invoice has been successfully modified)', MessageType.Succeed);
                    $("#cotrolDiv").removeClass("disabledDiv");
                    $('#divCreationPanel').removeClass("display_none");
                    $('#txtUpdatedBy').prop("value", res.UpdatedBy);
                    $('#txtUpdatedAt').prop("value", res.UpdatedAt);
                    GlobalinvoiceID = res.InvoiceID;
                    FlagAfterInsertOrUpdate = true;
                    InitializeGrid();
                    Grid_RowDoubleClicked();
                    FlagAfterInsertOrUpdate = false;

                } else {
                    DisplayMassage("الرجاء تحديث الصفحة واعادت تكرارالمحاولة مره اخري ", "Please refresh the page and try again", MessageType.Error);
                }
            }
        });


    }
    function insert() {
        debugger
        InvoiceModel.CreatedAt = DateTimeFormat(Date().toString());
        InvoiceModel.CreatedBy = SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.InvoiceID = 0;
        console.log(MasterDetailsModel);
        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("ServTrSales", "InsertInvoiceMasterDetail"),
            data: JSON.stringify(MasterDetailsModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    // 
                    let res = result.Response as AVAT_TR_SlsInvoice;
                    GlobalinvoiceID = res.InvoiceID;
                    FlagAfterInsertOrUpdate = true;

                    InitializeGrid();
                    Grid_RowDoubleClicked();
                    FlagAfterInsertOrUpdate = false;
                    DisplayMassage(" تم اصدار  فاتورة رقم  " + res.TrNo + " ", "An invoice number has been issued ", MessageType.Succeed);
                    $("#cotrolDiv").removeClass("disabledDiv");
                    NewAdd = false;

                } else {
                    DisplayMassage("الرجاء تحديث الصفحة واعادت تكرارالمحاولة مره اخري", "Please refresh the page and try again", MessageType.Error);
                }
            }
        });

    }
    function openInvoice() {
        Assign();
        InvoiceModel.InvoiceID = GlobalinvoiceID;
        InvoiceModel.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.UpdatedAt = DateTimeFormat(Date().toString());
        if (InvoiceStatisticsModel.length > 0) {
            InvoiceModel.CreatedAt = InvoiceStatisticsModel[0].CreatedAt;
            InvoiceModel.CreatedBy = InvoiceStatisticsModel[0].CreatedBy;
            InvoiceModel.DocNo = InvoiceStatisticsModel[0].DocNo;
            InvoiceModel.DocUUID = InvoiceStatisticsModel[0].DocUUID;
            InvoiceModel.TrTime = InvoiceStatisticsModel[0].TrTime;
            InvoiceModel.TrNo = InvoiceStatisticsModel[0].TrNo;
        }
        InvoiceModel.Status = 0;

        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("ServTrSales", "OpenSrvSlsInv"),
            data: JSON.stringify(MasterDetailsModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    btnUpdate.disabled = false;
                    DisplayMassage(' تم فك الاعتماد بنجاح ', 'Deaccredited successfully', MessageType.Succeed);
                    let res = result.Response as AVAT_TR_SlsInvoice;
                    $("#cotrolDiv").removeClass("disabledDiv");
                    GlobalinvoiceID = res.InvoiceID;
                    FlagAfterInsertOrUpdate = true;
                    InitializeGrid();
                    Grid_RowDoubleClicked();
                    FlagAfterInsertOrUpdate = false;

                } else {
                    DisplayMassage("الرجاء تحديث الصفحة واعادت تكرارالمحاولة مره اخري ", "Please refresh the page and try again", MessageType.Error);
                }
            }
        });
    }
    //------------------------------------------------------Print------------------------
    function PrintReport(OutType: number) {

        if (!SysSession.CurrentPrivileges.PrintOut) return;
        let rp: ReportParameters = new ReportParameters();
        rp.RepType = OutType;//output report as View
        rp.FromDate = DateFormatRep(txtStartDate.value);
        rp.ToDate = DateFormatRep(txtEndDate.value);
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
        rp.TrType = 1;    //---------------------------------slsinvoice
        if (ddlCustomer.selectedIndex > 0) { rp.CustomerID = Number($("#ddlCustomer").val()); }
        else { rp.CustomerID = -1; }

        rp.CashType = Number($("#ddlInvoiceType").val());
        rp.Status = Number($("#ddlStateType").val())



        Ajax.Callsync({
            url: Url.Action("IProc_Rpt_VATSlsInvoiceList", "GeneralReports"),
            data: rp,
            success: (d) => {

                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
    function PrintTransaction() {
        if (!SysSession.CurrentPrivileges.PrintOut) return;
        window.open(Url.Action("ReportsPopup", "Home"), "blank");
        localStorage.setItem("result", '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');

        let rp: ReportParameters = new ReportParameters();

        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        rp.BraNameA = SysSession.CurrentEnvironment.BranchName;
        rp.BraNameE = SysSession.CurrentEnvironment.BranchName;
        if (rp.BraNameA == null || rp.BraNameE == null) {

            rp.BraNameA = " ";
            rp.BraNameE = " ";
        }

        rp.TRId = GlobalinvoiceID;
        rp.slip = 0;

        Ajax.CallAsync({
            url: Url.Action("IProc_Prnt_VATSlsInvoice", "GeneralRep"),
            data: rp,
            success: (d) => {
                let result = d as BaseResponse;
                window.open(Url.Action("ReportsPopup", "Home"), "blank");
                localStorage.setItem("result", "" + result + "");

                //let result = d.result as string;
                //window.open(result, "_blank");
            }
        })
    }



}               