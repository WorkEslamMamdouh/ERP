
$(document).ready(() => {
    ////debugger;
    CatchReceipt.InitalizeComponent();
})

namespace CatchReceipt {
    //system varables
    var AccType = 3; //نوع الحساب
    //var SysSession: SystemSession = GetSystemSession();
    var compcode: Number;
    //var sys: SystemTools = new SystemTools();

    var SysSession: SystemSession = GetSystemSession();
    var sys: SystemTools = new SystemTools();
    //Arrays     
   
    var CustomerDetails: Array<CUSTOMER> = new Array<CUSTOMER>();
    var SearchCustomerDetails: Array<CUSTOMER> = new Array<CUSTOMER>();

    

    var Get_IQ_IQ_Catch_Receipt: Array<IQ_Catch_Receipt> = new Array<IQ_Catch_Receipt>();
    var SearchDetails: Array<IQ_Catch_Receipt> = new Array<IQ_Catch_Receipt>();
    var Selected_Data: Array<IQ_Catch_Receipt> = new Array<IQ_Catch_Receipt>();
    var AllGetStokMasterDetail: Array<ReviewSalesItemInfo> = new Array<ReviewSalesItemInfo>();
    var FamilyDetails: Array<CATEGRES> = new Array<CATEGRES>();
    var ItemFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var ItemBaesdFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var OperationItemModel: Array<Stok_ORDER_DELIVERY> = new Array<Stok_ORDER_DELIVERY>();
    var OperationItemSingleModel: Stok_ORDER_DELIVERY = new Stok_ORDER_DELIVERY();
    var Model: Catch_Receipt = new Catch_Receipt();

    

    var SlsMasterDetils: SlsMasterDetails = new SlsMasterDetails();


    var ddlStateType: HTMLSelectElement;
    var ddlSalesman: HTMLSelectElement;
    var ddlCustomerMaster: HTMLSelectElement;
    var ddlVendor: HTMLSelectElement;
   

    var id_divGridDetails: HTMLDivElement;

    // giedView
    var divMasterGrid: JsGrid = new JsGrid();
    //Textboxes
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var txtdateopening: HTMLInputElement;
    var txtDateHeader: HTMLInputElement;
    var txtNationality: HTMLSelectElement;
    //buttons 
    var btnPresent: HTMLButtonElement;
    var btnClose: HTMLButtonElement;
    var btnOpen: HTMLButtonElement;
    var btnView_load: HTMLButtonElement;
    var btnExpenses: HTMLButtonElement;
    var btnShow: HTMLButtonElement;
    var btnadd: HTMLButtonElement;

    var btnAdd: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnPrint: HTMLButtonElement;
    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;
    var btnCustomerSearch: HTMLButtonElement;


    


    //new
    var txtClose_Adjustment: HTMLInputElement;
    var txtClose_SalesManCommition: HTMLInputElement;
    var txtClose_CompanyCommitionPrc: HTMLInputElement;
    var txtTruckNumber: HTMLInputElement;
    var txtPaperPurchaseValue: HTMLInputElement;
    var txtPortName: HTMLInputElement;
    var btnAddDetails: HTMLButtonElement;
    var btnAddDetailsCharge: HTMLButtonElement;
    var btnAddDetailslebel: HTMLButtonElement;
    var searchbutmemreport: HTMLInputElement;
    var Success_Balance = true;
    //flags 
    var CountGrid = -1;
    var CountItems = 0;
    var Bal = 0;
    var ID_Receipt = 0; 

    var Credit;

    var CUSTOMER_ID = 0;

    export function InitalizeComponent() {

        //debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "  سداد دفعات العملاء";

        } else {
            document.getElementById('Screen_name').innerHTML = "Catch Receipt";

        }

        InitalizeControls();
        IntializeEvents();    
        FillddlCustomerMaster();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
      
    }
    function InitalizeControls() {
        debugger

      

        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists

        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
   
        ddlCustomerMaster = document.getElementById("ddlCustomerMaster") as HTMLSelectElement;
        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;

        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
       btnBack = document.getElementById("btnBack") as HTMLButtonElement;
       btnSave = document.getElementById("btnSave") as HTMLButtonElement;
       btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
       btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
       btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
       btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;
       btnCustomerSearch = document.getElementById("btnCustomerSearch") as HTMLButtonElement;

       
               
    }
    function IntializeEvents() {

        searchbutmemreport.onkeydown = _SearchBox_Change;
        searchbutmemreport.onkeyup = _SearchBox_Change;


        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnBack.onclick = btnBack_onclick;
        btnSave.onclick = btnSave_onclick;
        btnPrint.onclick = () => { printreport(4) };
        btnPrintTrview.onclick = () => { printreport(1) };
        btnPrintTrPDF.onclick = () => { printreport(2) };
        btnPrintTrEXEL.onclick = () => { printreport(3) };
        btnCustomerSearch.onclick = btnCustomerSearch_onclick;


    }

    function btnCustomerSearch_onclick() {
        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Catch_Receipt, "btnCustomerSearch", " Debit > 0", () => {
            let CUST_ID = SearchGrid.SearchDataGrid.SelectedKey;
            CUSTOMER_ID = CUST_ID; 

            $("#rowData :input").val("");
            $('#txt_Type').val('1');
            $('#txt_NewDate').val(GetDate());

            SearchCustomerDetails = CustomerDetails.filter(x => x.CUSTOMER_ID == Number(CUST_ID));
            DocumentActions.RenderFromModel(SearchCustomerDetails[0]);

         
        });
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

   
    function FillddlCustomerMaster() {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "GetAll"),
            data: { CompCode: 1 },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CustomerDetails = result.Response as Array<CUSTOMER>;
                    debugger

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
        debugger
        var startdt = DateFormatDataBes(txtFromDate.value).toString();
        var enddt = DateFormatDataBes(txtToDate.value).toString();
        var CustomerId = 0;
        var USER_CODE = "null";


       
        if (ddlCustomerMaster.value != "null") { CustomerId = Number(ddlCustomerMaster.value.toString()); }


        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "GetAll_IQ_Catch_Receipt"),
            data: { startDate: startdt, endDate: enddt, CustomerId: CustomerId },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Get_IQ_IQ_Catch_Receipt = result.Response as Array<IQ_Catch_Receipt>;
                    debugger
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
        debugger
        if (searchbutmemreport.value != "") {



            let search: string = searchbutmemreport.value.toLowerCase();
            SearchDetails = Get_IQ_IQ_Catch_Receipt.filter(x => x.CUSTOMER_NAME.toString().search(search) >= 0  /*|| x.PortName.toLowerCase().search(search) >= 0*/);

            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        } else {
            divMasterGrid.DataSource = Get_IQ_IQ_Catch_Receipt;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        //$("#divMasterGrid").attr("style", "");
        let res: any = GetResourceList("");
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
        Selected_Data = new Array<IQ_Catch_Receipt>();

        Selected_Data = Get_IQ_IQ_Catch_Receipt.filter(x => x.ID_Receipt == Number(divMasterGrid.SelectedKey));

        $("#rowData").removeClass("display_none");
        $("#divTotalSatistics").removeClass("display_none");
        DisplayData(Selected_Data);

        ID_Receipt = Selected_Data[0].ID_Receipt; 

        $("#txtShootMoney").attr("disabled", "disabled");
        $("#btnCustomerSearch").attr("disabled", "disabled");
        $("#txtRemarks").attr("disabled", "disabled");     

        $('#txt_NewDate').val(DateFormat(Selected_Data[0].Data));


    }
    function DisplayData(Selected_Data: Array<IQ_Catch_Receipt>) {
        debugger
        
        DocumentActions.RenderFromModel(Selected_Data[0]);
       

      

    }     
    
    ////-----------------------------------------------------------------------------------------------------------------------

    ////----------------------------------------------------- Div_items-------------------------------------------------------
    function Assign() {

                    
        //DocumentActions.AssignToModel(Model);//Insert Update 

        Model = new Catch_Receipt();
        Model.ID_Receipt =3;   
        Model.CUSTOMER_ID = CUSTOMER_ID;
        Model.ID_ORDER_Delivery = 1;
        Model.Data = $('#txt_NewDate').val();
        Model.Remarks = $('#txtRemarks').val()
        Model.USER_CODE = SysSession.CurrentEnvironment.UserCode;
        Model.Amount = Number($('#txt_balance').val());
        Model.AmountRequired = Number(Number($('#txt_Debit').val()) - Number($('#txtShootMoney').val()));
        Model.ShootMoney = Number($('#txtShootMoney').val());

          

       
      

    }
    function Update() {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "Insert"),
            data: { CUSTOMER_ID: Model.CUSTOMER_ID, USER_CODE: Model.USER_CODE, ID_ORDER_Delivery: Model.ID_ORDER_Delivery, AmountRequired: Model.AmountRequired, Amount: Model.Amount, ShootMoney: Model.ShootMoney, Remarks: Model.Remarks, Data: Model.Data  },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                   
                    ID_Receipt = result.Response as number;

                    btnBack_onclick();
                    FillddlCustomerMaster();
                    Display();

                    Selected_Data = new Array<IQ_Catch_Receipt>();

                    Selected_Data = Get_IQ_IQ_Catch_Receipt.filter(x => x.ID_Receipt == Number(ID_Receipt));

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

        if (CUSTOMER_ID == 0 ) {
            MessageBox.Show(' برجاء اختيار العميل', '');
            Errorinput($('#btnCustomerSearch'));
            return
        }
        else  if ($('#txtShootMoney').val().trim() == '' && Number($('#txtShootMoney').val()) <= 0) {
            MessageBox.Show(' برجاء ادخال المبلغ','');
            Errorinput($('#txtShootMoney'))
            return
        }
        else if (Number($('#txtShootMoney').val()) > Number($('#txt_Debit').val())) {
            MessageBox.Show(' لايمكنك تجاوز المدين', '');
            Errorinput($('#txtShootMoney'))
            Errorinput($('#txt_Debit'))        
            return
        }
        else  {
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

    function printreport(type: number) {
        debugger;
        let _StockList: Array<Settings_Report> = new Array<Settings_Report>();
        let _Stock: Settings_Report = new Settings_Report();
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

        let rp: ReportParameters = new ReportParameters();

        rp.Data_Report = JSON.stringify(_StockList);//output report as View

        debugger
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