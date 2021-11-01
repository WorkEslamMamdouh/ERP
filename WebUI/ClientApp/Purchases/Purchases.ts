
$(document).ready(() => {
    ////debugger;
    Purchases.InitalizeComponent();
})

namespace Purchases {
    //system varables
    var AccType = 3; //نوع الحساب
    //var SysSession: SystemSession = GetSystemSession();
    var compcode: Number;
    //var sys: SystemTools = new SystemTools();

    var SysSession: SystemSession = GetSystemSession();
    var sys: SystemTools = new SystemTools();
    //Arrays                         
    var CustomerDetails: Array<CUSTOMER> = new Array<CUSTOMER>();

    var Get_IQ_Purchases_Master: Array<IQ_Purchases_Master> = new Array<IQ_Purchases_Master>();
    var SearchDetails: Array<IQ_Purchases_Master> = new Array<IQ_Purchases_Master>();
    var Selected_Data: Array<IQ_Purchases_Master> = new Array<IQ_Purchases_Master>();
    var AllGetStokMasterDetail: Array<IQ_Purchases_Details> = new Array<IQ_Purchases_Details>();

    var FilterFamilyDetails: Array<CATEGRES> = new Array<CATEGRES>();
    var FamilyDetails: Array<CATEGRES> = new Array<CATEGRES>();
    var FamilyDetailsnew: Array<CATEGRES> = new Array<CATEGRES>();
    var ItemFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var DetailsBar: Array<PRODUCT> = new Array<PRODUCT>();
    var ItemBaesdFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var OperationItemModel: Array<IQ_Purchases_Details> = new Array<IQ_Purchases_Details>();
    var OperationItemSingleModel: IQ_Purchases_Details = new IQ_Purchases_Details();

    var PurMasterDetails: PurchasesMasterDetails = new PurchasesMasterDetails();

    var Purchases_Mas: Array<IQ_Purchases_Master> = new Array<IQ_Purchases_Master>();

    var UpdatedModel: Array<Purchases_Master> = new Array<Purchases_Master>();
    var FilteredModel: Array<Purchases_Master> = new Array<Purchases_Master>();


    var GetAllVendorDetails: Array<Supplier> = new Array<Supplier>();
    var SearchVendorDetails: Array<Supplier> = new Array<Supplier>();
    var Detailsfamilly_Cat: Array<familly_Cat> = new Array<familly_Cat>();

    //DropDownlist

    var ddlStateType: HTMLSelectElement;

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
    var btnprint: HTMLButtonElement;

    var btnUpdate: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnSupplierSearch: HTMLButtonElement;
    var btnPaid_Up: HTMLButtonElement;


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
    var txtPaid_Up: HTMLInputElement;
    var txtTo_be_Paid: HTMLInputElement;
    var txt_Barcode: HTMLInputElement;
    var txt_ItemName: HTMLInputElement;
    var txt_Quantity: HTMLInputElement;
    var btnPrint: HTMLButtonElement;
    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;
    var btnAddQty: HTMLButtonElement;
    //flags 
    var CountGrid = -1;
    var CountItems = 0;
    var Qtys: number;
    var ID_Supp;
    var AddNew;
    var CashTot;
    var Success_Balance = true;
    var Bal = 0;
    var IsSuccess = false;

    export function InitalizeComponent() {

        debugger


        InitalizeControls();
        IntializeEvents();


        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();

        FillddlVendor();

        FillddlFamily();
        GetAllIItem();
        FillddlPaymentType();
    }
    function InitalizeControls() {
        debugger

        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "المشتريات";

        }
        else {
            document.getElementById('Screen_name').innerHTML = "Sales Invoices";
        }


        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists

        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        ddlVendor = document.getElementById("ddlVendor") as HTMLSelectElement;
        ddlStateType = document.getElementById("ddlStateType") as HTMLSelectElement;
        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;
        txtPaid_Up = document.getElementById("txtPaid_Up") as HTMLInputElement;
        txtTo_be_Paid = document.getElementById("txtTo_be_Paid") as HTMLInputElement;
        txt_Barcode = document.getElementById("txt_Barcode") as HTMLInputElement;
        txt_ItemName = document.getElementById("txt_ItemName") as HTMLInputElement;
        txt_Quantity = document.getElementById("txt_Quantity") as HTMLInputElement;
        btnadd = document.getElementById("btnadd") as HTMLButtonElement;
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnSupplierSearch = document.getElementById("btnSupplierSearch") as HTMLButtonElement;
        btnPaid_Up = document.getElementById("btnPaid_Up") as HTMLButtonElement;
        btnprint = document.getElementById("btnprint") as HTMLButtonElement;
        btnAddQty = document.getElementById("btnAddQty") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
        btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;

    }
    function IntializeEvents() {

        searchbutmemreport.onkeydown = _SearchBox_Change;
        searchbutmemreport.onkeyup = _SearchBox_Change;


        btnShow.onclick = btnShow_onclick;
        btnUpdate.onclick = Update_onclick;
        btnBack.onclick = btnBack_onclick;
        btnSave.onclick = btnSave_onclick;
        btnadd.onclick = btnAdd_onclick;

        btnAddDetails.onclick = AddNewRow;

        btnSupplierSearch.onclick = Search;


        txtPaid_Up.onkeyup = txtPaid_Up_onchange;

        btnPaid_Up.onclick = btnExecute_onclick;
        btnPrint.onclick = () => { printreport(4) };
        btnPrintTrview.onclick = () => { printreport(1) };
        btnPrintTrPDF.onclick = () => { printreport(2) };
        btnPrintTrEXEL.onclick = () => { printreport(3) };
        txt_Barcode.onchange = txt_Barcode_onchange;
        btnAddQty.onclick = btnAddQty_onclick;
    }

    function txtPaid_Up_onchange() {

        ComputeTotals();

        if (Number(txtTo_be_Paid.value) < 0) {

            MessageBox.Show("يجب ان يكون المبلغ المدفوع بيساوي الاجمالي", "خطأ");
            Errorinput($("#txtPaid_Up"));
            Errorinput($("#txtTo_be_Paid"));
            txtTo_be_Paid.value = '0';
            txtPaid_Up.value = $('#txtTotal').val();

        }

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



    function txt_Barcode_onchange() {
        debugger
        let Serial = txt_Barcode.value;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "Getbyserial"),
            data: { Serial: Serial },
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    //debugger
                    DetailsBar = result.Response as Array<PRODUCT>;
                    Qtys = DetailsBar[0].PRODUCT_QET;
                    txt_ItemName.value = DetailsBar[0].PRODUCT_NAME
                }

            }
        });
    }
    function btnAddQty_onclick() {
        debugger
        var CanAdd: boolean = true;
        if (CountGrid > -1) {

            for (var i = 0; i <= CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            CountGrid += 1;
            CountItems = CountItems + 1;
            BuildControls(CountGrid);



            $("#ddlfamilly_Cat" + CountGrid).removeAttr("disabled");
            $("#Family" + CountGrid).removeAttr("disabled");
            $("#Items" + CountGrid).removeAttr("disabled");
            $("#txtQuantity" + CountGrid).removeAttr("disabled");
            $("#txtPrice" + CountGrid).removeAttr("disabled");
            $("#Sales_Price" + CountGrid).removeAttr("disabled");
            $("#MinUnitPrice" + CountGrid).removeAttr("disabled");



            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            $("#txt_StatusFlag" + CountGrid).val("i");
            debugger
            var filter = DetailsBar[0].ID_CAT;
            FamilyDetailsnew = FamilyDetails.filter(x => x.ID_CAT == filter)
            $("#ddlfamilly_Cat" + CountGrid).val("" + FamilyDetailsnew[0].ID_familly_Cat + "");


            let FamilyDetailsfilter = FamilyDetails.filter(x => x.ID_familly_Cat == Number($("#ddlfamilly_Cat" + CountGrid).val()))

            $('#ddlFamily' + CountGrid).empty();
            for (var i = 0; i < FamilyDetailsfilter.length; i++) {
                $('#ddlFamily' + CountGrid).append('<option data-ID_CAT="' + FamilyDetailsfilter[i].ID_CAT + '" value="' + FamilyDetailsfilter[i].Name_CAT + '">');
            }


            let famliy = FamilyDetailsfilter.filter(x => x.ID_CAT == DetailsBar[0].ID_CAT)

            $("#Family" + CountGrid).val("" + famliy[0].Name_CAT + "");
            $("#Items" + CountGrid).val("" + DetailsBar[0].PRODUCT_NAME + "");
            $("#txtQuantity" + CountGrid).val("" + Number(txt_Quantity.value) + "");





            ComputeTotals();


        }







        txt_ItemName.value = "";
        txt_Quantity.value = "";
        txt_Barcode.value = "";

    }


    function FillddlVendor() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Supplier", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    GetAllVendorDetails = result.Response as Array<Supplier>;
                    DocumentActions.FillCombowithdefult(GetAllVendorDetails, ddlVendor, "ID_Supplier", "Name_Supplier", "اختر المورد");

                }
            }
        });
    }


    function btnShow_onclick() {

        $('#divMasterGridiv').removeClass('display_none');

        $("#rowData").addClass("display_none");
        $("#divTotalSatistics").addClass("display_none");

        Display();
        debugger
        if (ddlStateType.value == '0') {
            $('#btnPaid_Up').removeAttr('disabled');
            $('.Paid').removeAttr('disabled');

        }
        else {
            $('#btnPaid_Up').attr('disabled', 'disabled');
            $('.Paid').attr('disabled', 'disabled');
        }

    }

    function Display() {
        //debugger
        var startdt = DateFormatDataBes(txtFromDate.value).toString();
        var enddt = DateFormatDataBes(txtToDate.value).toString();
        var ID_Supplier = ddlVendor.value == "null" ? 0 : ddlVendor.value;
        var Type_Debit = ddlStateType.value;



        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Purchases", "GetAll_IQ_PurchasesMaster"),
            data: { startDate: startdt, endDate: enddt, ID_Supplier: Number(ID_Supplier), Type_Debit: Number(Type_Debit) },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Get_IQ_Purchases_Master = result.Response as Array<IQ_Purchases_Master>;
                    debugger
                    for (var i = 0; i < Get_IQ_Purchases_Master.length; i++) {
                        Get_IQ_Purchases_Master[i].Tr_Date = DateFormat(Get_IQ_Purchases_Master[i].Tr_Date);
                        //Get_IQ_Purchases_Master[i].Type_Supplier = DateFormat(Get_IQ_Purchases_Master[i].Tr_Date);

                        Get_IQ_Purchases_Master[i].Type_Debit_Name = Get_IQ_Purchases_Master[i].Type_Debit == false ? 'غير مسدد' : 'مسدد';


                    }
                    InitializeGrid();
                    divMasterGrid.DataSource = Get_IQ_Purchases_Master;
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
            SearchDetails = Get_IQ_Purchases_Master.filter(x => x.TrNo.toString().search(search) >= 0 || x.Name_Supplier.toLowerCase().search(search) >= 0  /*|| x.PortName.toLowerCase().search(search) >= 0*/);

            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        } else {
            divMasterGrid.DataSource = Get_IQ_Purchases_Master;
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
        divMasterGrid.PrimaryKey = "TrNo";
        divMasterGrid.Columns = [
            { title: "ID", name: "TrNo", type: "text", width: "2%", visible: false },
            { title: "رقم الفاتوره", name: "TrNo", type: "text", width: "10%" },
            { title: " التاريخ  ", name: "Tr_Date", type: "text", width: "18%" },
            { title: "المورد", name: "Name_Supplier", type: "text", width: "20%" },
            { title: "نوع التوريد", name: "Type_Supplier", type: "text", width: "20%" },
            { title: "الحاله", name: "Type_Debit_Name", type: "text", width: "13%" },
            { title: "اجمالي الفاتوره", name: "Total_Amount", type: "text", width: "16%" },
            { title: " المسداد", name: "Paid_Up", type: "text", width: "17%", css: "classfont" },
            { title: "المطلوب سداده", name: "To_be_Paid", type: "text", width: "17%", css: "classfont" },
            {
                title: "سداد نقدي ", css: "ColumPadding", name: "CashPaidAmount", width: "14%",
                itemTemplate: (s: string, item: IQ_Purchases_Master): HTMLInputElement => {
                    let txt: HTMLInputElement = CreateElement("number", "form-control Paid ", " ", " ", "", " ");
                    txt.id = "txtcash";
                    //txt.name = SlsInvoiceListModel.indexOf(item).toString();
                    //SlsInvoiceListModel = Grid.DataSource;
                    txt.style.height = "25px";
                    txt.style.width = "70px";
                    txt.style.backgroundColor = "blanchedalmond";

                    txt.onchange = (e) => {
                        item.CashPaidAmount = Number(txt.value);
                        CashTot = 0;
                        for (let i = 0; i < Purchases_Mas.length; i++) {
                            CashTot += Purchases_Mas[i].CashPaidAmount;
                        }
                        //txtCashTot.value = CashTot.toFixed(2).toString();

                    };

                    txt.value = '0';

                    //    txt.disabled = StatusFlag;
                    //if (item.CashPaidAmount != null) {
                    //    txt.value = item.CashPaidAmount.toString();
                    //}
                    //if (ddlStateType.value != "null") {
                    //    var status = Number(ddlStateType.value.toString());
                    //    if (status == 0) {
                    //        txt.disabled = false;
                    //    }
                    //    else if (status == 2 || status == 1) {
                    //        txt.disabled = true;
                    //    }
                    //}
                    return txt;
                }
            }
        ];

    }
    function btnExecute_onclick() {
        debugger
        Bal = 0;
        var ValidDataFlag = true;
        FilteredModel = divMasterGrid.DataSource;
        /////////
        for (let i = 0; i < FilteredModel.length; i++) {
            var cash: number = FilteredModel[i].CashPaidAmount;
            var Remain: number = FilteredModel[i].To_be_Paid;
            if (cash != 0 && cash != null) {
                if (Remain < cash) {
                    //  $("#btnExecute").attr("disabled", "disabled");

                    MessageBox.Show('يجب ان يكون المبلغ المطلوب سداده مساوي للسداد  للفاتورة رقم   ( ' + FilteredModel[i].TrNo + "  )", "تم");

                    ValidDataFlag = false;
                    break;
                }

                Bal += cash;

            }
        }


        Get_balance();// Chack Balance
        if (Success_Balance == false) {

            Success_Balance = true;
            ValidDataFlag = false;

        } else {

            if (ValidDataFlag == true) {
                ValidDataFlag = false;
                UpdatedModel = divMasterGrid.DataSource;
                UpdatedModel = UpdatedModel.filter(s => s.CashPaidAmount != 0 && s.CashPaidAmount != null);
                for (var i = 0; i < UpdatedModel.length; i++) {
                    var cash: number = UpdatedModel[i].CashPaidAmount;
                    var Paid_Up: number = UpdatedModel[i].Paid_Up;
                    var To_be_Paid: number = UpdatedModel[i].To_be_Paid;

                    UpdatedModel[i].Paid_Up = Paid_Up + cash;
                    UpdatedModel[i].To_be_Paid = To_be_Paid - cash;
                    UpdatedModel[i].Type_Debit = UpdatedModel[i].To_be_Paid == 0 ? true : false;

                }

                if (UpdatedModel.length > 0) {
                    console.log(UpdatedModel);
                    Ajax.Callsync({
                        type: "POST",
                        url: sys.apiUrl("Purchases", "UpdatePurchases_Master"),
                        data: JSON.stringify(UpdatedModel),
                        success: (d) => {
                            let result = d as BaseResponse;
                            if (result.IsSuccess) {
                                debugger
                                let res = result.Response
                                MessageBox.Show("تم الحفظ بنجاح", "تم");

                                btnBack_onclick();

                                //Display();
                                btnShow_onclick();
                                IsSuccess = true;

                            }
                            else {
                                MessageBox.Show("خطأء", "خطأء");

                            }
                        }
                    });
                }
                else {

                    MessageBox.Show('( لا توجد فواتير مسدده كي يتم التنفيذ )', "تم");

                }

            }

            if (IsSuccess != false) {
                Outpirce(Bal);
            }
        }

        ////////////////

    }


    function MasterGridDoubleClick() {
        Selected_Data = new Array<IQ_Purchases_Master>();

        Selected_Data = Get_IQ_Purchases_Master.filter(x => x.TrNo == Number(divMasterGrid.SelectedKey));

        ID_Supp = Selected_Data[0].ID_Supplier;

        $("#rowData").removeClass("display_none");
        $("#divTotalSatistics").removeClass("display_none");
        DisplayData(Selected_Data);


    }
    function DisplayData(Selected_Data: Array<IQ_Purchases_Master>) {
        debugger

        DocumentActions.RenderFromModel(Selected_Data[0]);
        BindGetOperationItemsGridData(Selected_Data[0].TrNo);




    }
    function BindGetOperationItemsGridData(TrNo: number) {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Purchases", "GetAll_IQ_Purchases_Details"),
            data: { TrNo: TrNo },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AllGetStokMasterDetail = result.Response as Array<IQ_Purchases_Details>;

                    $("#div_Data").html('');
                    for (var i = 0; i < AllGetStokMasterDetail.length; i++) {

                        BuildControls(i);
                        Disbly_BuildControls(i, AllGetStokMasterDetail);
                        CountGrid = i;
                    }

                    $("#txtItemCount").val(CountGrid + 1);





                }
            }
        });
    }



    function FillddlPaymentType() {
        //var StkDefCategory: Array<CATEGRES> = new Array<CATEGRES>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("familly_Cat", "GetAll"),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    debugger
                    Detailsfamilly_Cat = result.Response as Array<familly_Cat>;
                    //DocumentActions.FillCombowithdefult(Detailsfamilly_Cat, ddlVendor, "ID_Supplier", "Name_Supplier", "اختر المورد");

                }
            }
        });
    }
    function FillddlFamily() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: {
                CompCode: 1
            },
            success: (d) => {
                //////debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    FamilyDetails = result.Response as Array<CATEGRES>;
                }
            }
        });
    }
    function GetAllIItem() {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll"),//(int CompCode,int ItemFamilyID,int storeCode, string UserCode, string Token)
            data: {
                CompCode: 1
            },
            success: (d) => {
                ////////debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {

                    ItemFamilyDetails = result.Response as Array<PRODUCT>;

                }
            }
        });
    }
    function FillddlItems(Name_CAT: string) {
        debugger
        FilterFamilyDetails = new Array<CATEGRES>();
        FilterFamilyDetails = FamilyDetails.filter(x => x.Name_CAT == Name_CAT);
        ItemBaesdFamilyDetails = ItemFamilyDetails.filter(x => x.ID_CAT == FilterFamilyDetails[0].ID_CAT);
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("StkDefItems", "GetAll"),//(int CompCode,int ItemFamilyID,int storeCode, string UserCode, string Token)
        //    data: {
        //        CompCode: compcode, ItemFamilyID: ItemFamilyID, storeCode: storeCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
        //    },
        //    success: (d) => {
        //        //////debugger;
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {

        //            ItemBaesdFamilyDetails = result.Response as Array<PRODUCT>;
        //        }
        //    }
        //});
    }


    function BuildControls(cnt: number) {
        var html;



        html = '<div id= "No_Row' + cnt + '" class="container-fluid style_border" > <div class="" > <div class="col-lg-12" > ' +
            '<div class="col-lg-1"style="width: 3%;">' +
            '<span id="btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3 display_none" style="font-size: 28px;"></span></div>' +
            '<div class="col-lg-2">' +
            '<select id="ddlfamilly_Cat' + cnt + '" disabled class="form-control"><option value="Null">اختر نوع الفئة</option></select></div>' +
            '<div class="col-lg-2"style=" ">' +
            '<form> <input list="ddlFamily' + cnt + '"  disabled name="Family' + cnt + '" class="form-control" id="Family' + cnt + '">  <datalist id="ddlFamily' + cnt + '"> <option value="اختر النوع"> </datalist>  </form></div>' +
            '<div class="col-lg-2"style=" ">' +
            '<form> <input list="ddlItem' + cnt + '" disabled name="Items' + cnt + '" class="form-control" id="Items' + cnt + '">  <datalist id="ddlItem' + cnt + '"> <option value="اختر النوع"> </datalist>  </form></div>' +
            '<div class="col-lg-1" style="width: 7%;"><input id="txtQuantity' + cnt + '" data-qet="0" type="number" disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style="width: 7%;"><input id="txtQuantityRetrun' + cnt + '" data-product_qet_stock="0" type="number" disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style="width: 7%;"><input id="txtPrice' + cnt + '" type="number" disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style="width: 7%;"><input id="Sales_Price' + cnt + '" type="number" disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1"style="width: 7%;"><input id="MinUnitPrice' + cnt + '" type="number" disabled class="form-control right2"   value="0"/></div>' +
            //'<div class="col-lg-1" style=""><input id="txtReturn' + cnt + '" type="number" disabled class="form-control right2"   value=""/></div>' +
            '<div class="col-lg-2" style="width: 12%;"><input id="txtTotal' + cnt + '" type="number"  class="form-control right2"   value="0"/></div>' +

            '</div></div></div>' +

            '<input id="txt_StatusFlag' + cnt + '" name = " " type = "hidden" class="form-control"/><input id="txt_ID' + cnt + '" name = " " type = "hidden" class="form-control" /><input id="PRODUCT_ID' + cnt + '" name = " " type = "hidden" class="form-control" />';

        $("#div_Data").append(html);



        for (var i = 0; i < Detailsfamilly_Cat.length; i++) {

            $('#ddlfamilly_Cat' + cnt).append('<option value="' + Detailsfamilly_Cat[i].ID_familly_Cat + '">' + Detailsfamilly_Cat[i].Name_familly_Cat + '</option>');
        }

        debugger


        $("#ddlfamilly_Cat" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            debugger
            if ($("#ddlfamilly_Cat" + cnt).val() != "Null") {

                $('#Family' + cnt).removeAttr('disabled');

                let FamilyDetailsfilter = FamilyDetails.filter(x => x.ID_familly_Cat == Number($("#ddlfamilly_Cat" + cnt).val()))

                $('#ddlFamily' + cnt).empty();
                for (var i = 0; i < FamilyDetailsfilter.length; i++) {
                    $('#ddlFamily' + cnt).append('<option data-ID_CAT="' + FamilyDetailsfilter[i].ID_CAT + '" value="' + FamilyDetailsfilter[i].Name_CAT + '">');
                }
            }
            else {

                $('#Family' + cnt).attr('disabled', 'disabled');
                $("#Items" + cnt).attr('disabled', 'disabled');
                $("#txtQuantity" + cnt).attr('disabled', 'disabled');
                $("#txtPrice" + cnt).attr('disabled', 'disabled');
                $("#Sales_Price" + cnt).attr('disabled', 'disabled');
                $("#MinUnitPrice" + cnt).attr('disabled', 'disabled');



            }
            $('#Family' + cnt).val("");
            $("#Items" + cnt).val("");
            $("#txtQuantity" + cnt).val(0);
            $("#txtPrice" + cnt).val(0);
            $("#Sales_Price" + cnt).val(0);
            $("#MinUnitPrice" + cnt).val(0);


        });



        debugger
        var drop = '#ddlFamily' + cnt;


        $('#Family' + cnt).change(
            () => {

                if ($("#txt_StatusFlag" + cnt).val() != "i")
                    $("#txt_StatusFlag" + cnt).val("u");

                debugger
                if ($('#Family' + cnt).val() != "" && $('#Family' + cnt).val() != " " && $('#Family' + cnt).val() != "  " && $('#Family' + cnt).val() != "   ") {
                    $('#ddlItem' + cnt).empty();
                    //$('#ddlItem' + cnt).append('<option value="' + null + '">' + "اختر الصنف" + '</option>');
                    FillddlItems($('#Family' + cnt).val());
                    for (var i = 0; i < ItemBaesdFamilyDetails.length; i++) {
                        $('#ddlItem' + cnt).append('<option  value="' + ItemBaesdFamilyDetails[i].PRODUCT_NAME + '"> ');

                    }
                }
                else {
                    alert("يجب اختيار النوع");
                    $('#ddlFamily' + cnt).val("null");
                }

                $("#txtQuantity" + cnt).val('0');
                $("#txtPrice" + cnt).val('0');
                $("#txtTotal" + cnt).val('0');

                //$("#Items" + cnt).removeAttr("disabled");

                //$("#txtQuantity" + cnt).removeAttr("disabled");
                //$("#txtPrice" + cnt).removeAttr("disabled");
                //$("#Sales_Price" + cnt).removeAttr("disabled");
                //$("#MinUnitPrice" + cnt).removeAttr("disabled");

                ComputeTotals();
            });


        var dropddlItem = '#ddlItem' + cnt;
        $('#ddlItem' + cnt).change(
            () => {
                if ($("#txt_StatusFlag" + cnt).val() != "i")
                    $("#txt_StatusFlag" + cnt).val("u");


                if ($('#ddlItem' + cnt).val() == "null") {
                    $("#txtQuantity" + cnt).val("1");
                    $("#txtPrice" + cnt).val("1");
                    $("#txtTotal" + cnt).val("0");
                    $("#txtTax" + cnt).val("0");
                    $("#txtTotAfterTax" + cnt).val("0");
                } else {
                    var selectedItem = $(dropddlItem + ' option:selected').attr('value');
                    var selectedFamily = $(drop + ' option:selected').attr('value');

                    var itemID = Number(selectedItem);
                    var FamilyID = Number(selectedFamily);
                    // var NumberSelect = ItemBaesdFamilyDetails.filter(s => s.ItemID == itemID);
                    debugger
                    var res = false;
                    res = checkRepeatedItems(itemID, FamilyID);
                    if (res == true) {
                        $("#ddlItem" + cnt).val("null");
                        $("#txtPrice" + cnt).val("1");
                        MessageBox.Show('( لايمكن تكرار نفس الاصناف علي الفاتورة )', '(Error)');

                    } else {
                        let Price = $('option:selected', $("#ddlItem" + cnt)).attr('data-PRODUCT_PRICE');
                        $("#txtQuantity" + cnt).val(1);
                        $("#txtPrice" + cnt).val(Price);
                        var txtQuantityValue = $("#txtQuantity" + cnt).val();
                        var txtPriceValue = $("#txtPrice" + cnt).val();
                        if ($("#txtPrice" + cnt).val() == 0) {
                            var total = Number(txtQuantityValue) * 1;
                            $("#txtTotal" + cnt).val(total);

                        } else {
                            var total = Number(txtQuantityValue) * Number(txtPriceValue);
                            $("#txtTotal" + cnt).val(total);

                        }
                    }
                }


                ComputeTotals();
                //
            });

        // text change



        $("#txtQuantity" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();

            var txtPriceValue = $("#txtPrice" + cnt).val();
            if ($("#txtPrice" + cnt).val() != 0) {
                var total = (Number(txtQuantityValue) * Number(txtPriceValue))/* - (Number(txtQuantityReturnValue) *0)*/;
                $("#txtTotal" + cnt).val(total);
            }
            $("#txtAvailableQty" + cnt).val(Number($("#txtQuantity" + cnt).val()) - Number($("#txtSoldQty" + cnt).val()) - Number($("#txtScrapQty" + cnt).val()));
            if (Number($("#txtQuantity" + cnt).val()) < 0) {
                $("#txtQuantity" + cnt).val('0');
            }
            ComputeTotals();
        });
        $("#txtPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();

            var txtPriceValue = $("#txtPrice" + cnt).val();
            if ($("#txtPrice" + cnt).val() != 0) {
                var total = (Number(txtQuantityValue) * Number(txtPriceValue))/* - (Number(txtQuantityReturnValue) *0)*/;
                $("#txtTotal" + cnt).val(total);
            }
            if (Number($("#txtPrice" + cnt).val()) < 0) {
                $("#txtPrice" + cnt).val('0');

            }
            $("#txtAvailableQty" + cnt).val(Number($("#txtQuantity" + cnt).val()) - Number($("#txtSoldQty" + cnt).val()) - Number($("#txtScrapQty" + cnt).val()));

            //$("#txtMinPrice" + cnt).val($("#txtPrice" + cnt).val() - 1);
            ComputeTotals();
        });
        $("#Sales_Price" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            if (Number($("#Sales_Price" + cnt).val()) < 0) {
                $("#Sales_Price" + cnt).val("0");
            }
            else {
                $("#MinUnitPrice" + cnt).val($("#Sales_Price" + cnt).val() - 1);
            }
        });
        $("#MinUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            debugger
            if ($("#Sales_Price" + cnt).val() == "" || $("#Sales_Price" + cnt).val() == 0) {
                MessageBox.Show('يجب أدخال سعر الصنف اوالاً', 'خطأ');
                Errorinput($("#Sales_Price" + cnt));

                $("#MinUnitPrice" + cnt).val(0)
            }
            else if (Number($("#MinUnitPrice" + cnt).val()) > Number($("#Sales_Price" + cnt).val())) {
                MessageBox.Show('يجب ان يكون أقل سعر اصغر من سعر الصنف', 'خطأ');
                Errorinput($("#MinUnitPrice" + cnt));

                $("#MinUnitPrice" + cnt).val($("#Sales_Price" + cnt).val() - 1)
            }
            if (Number($("#txtMinPrice" + cnt).val()) < 0) {
                $("#MinUnitPrice" + cnt).val('0');
            }

        });

        $("#txtQuantityRetrun" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            debugger
            if (Number($("#txtQuantityRetrun" + cnt).val()) < 0) {
                $("#txtQuantityRetrun" + cnt).val("0");
            }
            else {

                let chack

                if (Number($("#txtQuantity" + cnt).attr('data-qet')) < Number($("#txtQuantityRetrun" + cnt).attr('data-product_qet_stock'))) {
                    chack = Number($("#txtQuantity" + cnt).attr('data-qet'));
                }
                else {
                    chack = Number($("#txtQuantityRetrun" + cnt).attr('data-product_qet_stock'));

                }



                if ($("#txtQuantity" + cnt).val() != "" || $("#Sales_Price" + cnt).val() != 0) {

                    let qet = Number($("#txtQuantity" + cnt).attr('data-qet')) - Number($("#txtQuantityRetrun" + cnt).val())
                    $("#txtQuantity" + cnt).val(qet);

                }
                if (Number(chack) < Number($("#txtQuantityRetrun" + cnt).val())) {
                    MessageBox.Show('يجب ان يكون متساوي للكميه الموجوده ( ' + chack + ' )', 'خطأ');

                    let quut = chack - Number($("#txtQuantity" + cnt).attr('data-qet'));

                    if (quut < 0) {
                        quut = quut * -1;
                    }

                    $("#txtQuantity" + cnt).val(quut);
                    $("#txtQuantityRetrun" + cnt).val(chack);

                }

                var total = (Number($("#txtQuantity" + cnt).val()) * Number($("#txtPrice" + cnt).val()))/* - (Number(txtQuantityReturnValue) *0)*/;
                $("#txtTotal" + cnt).val(total);

                ComputeTotals();
            }



        });


        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });


        $("#txtTotal" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            Number($("#txtPrice" + cnt).val((Number($("#txtTotal" + cnt).val()) / Number($("#txtQuantity" + cnt).val()))));
            ComputeTotals();

        });


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        return;

    }
    function Disbly_BuildControls(cnt: number, AllGetStokItemInfo: Array<IQ_Purchases_Details>) {
        debugger
        $("#btnAddDetails").addClass("display_none");
        $("#btn_minus" + cnt).addClass("display_none");
        $("#txt_StatusFlag" + cnt).val("");

        $("#ddlfamilly_Cat" + cnt).prop("value", AllGetStokItemInfo[cnt].ID_familly_Cat);
        $("#Family" + cnt).prop("value", AllGetStokItemInfo[cnt].Name_CAT);

        var itemcode = AllGetStokItemInfo[cnt].PRODUCT_NAME;
        $("#txt_ID" + cnt).prop("value", AllGetStokItemInfo[cnt].ID);
        $('#PRODUCT_ID' + cnt).val(AllGetStokItemInfo[cnt].PRODUCT_ID);
        $("#Items" + cnt).prop("value", itemcode.toString());
        $("#txtQuantity" + cnt).prop("value", ((AllGetStokItemInfo[cnt].Purchases_Quantity == null || undefined) ? 0 : AllGetStokItemInfo[cnt].Purchases_Quantity));
        $("#txtQuantity" + cnt).attr("data-Qet", ((AllGetStokItemInfo[cnt].Purchases_Quantity == null || undefined) ? 0 : AllGetStokItemInfo[cnt].Purchases_Quantity));
        $("#txtQuantityRetrun" + cnt).attr("data-PRODUCT_QET_Stock", ((AllGetStokItemInfo[cnt].PRODUCT_QET == null || undefined) ? 0 : AllGetStokItemInfo[cnt].PRODUCT_QET));
        $("#txtPrice" + cnt).prop("value", (AllGetStokItemInfo[cnt].Purchases_Price == null || undefined) ? 0 : AllGetStokItemInfo[cnt].Purchases_Price);
        $("#Sales_Price" + cnt).prop("value", ((AllGetStokItemInfo[cnt].Sales_Price == null || undefined) ? 0 : AllGetStokItemInfo[cnt].Sales_Price));
        $("#MinUnitPrice" + cnt).prop("value", ((AllGetStokItemInfo[cnt].MinUnitPrice == null || undefined) ? 0 : AllGetStokItemInfo[cnt].MinUnitPrice));

        var Total = (Number(AllGetStokItemInfo[cnt].Purchases_Quantity) * Number(AllGetStokItemInfo[cnt].Purchases_Price));
        $("#txtTotal" + cnt).prop("value", (Total).toFixed(2));

        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });

        FillddlItems(AllGetStokItemInfo[cnt].Name_CAT);
        for (var i = 0; i < ItemBaesdFamilyDetails.length; i++) {

            $('#ddlItem' + cnt).append('<option  value="' + ItemBaesdFamilyDetails[i].PRODUCT_NAME + '"> ');

        }

    }
    function AddNewRow() {
        debugger
        //if (!SysSession.CurrentPrivileges.AddNew) return;
        var CanAdd: boolean = true;
        if (CountGrid > -1) {

            for (var i = 0; i <= CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            CountGrid += 1;
            CountItems = CountItems + 1;
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode         
            $("#ddlfamilly_Cat" + CountGrid).removeAttr("disabled");
            $("#Family" + CountGrid).removeAttr("disabled");
            $("#Items" + CountGrid).removeAttr("disabled");
            $("#txtQuantity" + CountGrid).removeAttr("disabled");
            $("#txtPrice" + CountGrid).removeAttr("disabled");
            $("#Sales_Price" + CountGrid).removeAttr("disabled");
            $("#MinUnitPrice" + CountGrid).removeAttr("disabled");



            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");

            ComputeTotals();


        }
    }
    function DeleteRow(RecNo: number) {
        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
            //////debugger;
            let chack

            if (Number($("#txtQuantity" + RecNo).attr('data-qet')) <= Number($("#txtQuantityRetrun" + RecNo).attr('data-product_qet_stock'))) {
                chack = Number($("#txtQuantity" + RecNo).attr('data-qet'));

                if ($("#txt_StatusFlag" + RecNo).val() == 'i') {
                    $("#txt_StatusFlag" + RecNo).val("m");
                }
                else {
                    $("#txt_StatusFlag" + RecNo).val("d");

                }
                CountItems = CountItems - 1;
                ComputeTotals();

                $("#ddlfamilly_Cat" + RecNo).val("1");
                $("#ddlFamily" + RecNo).val("1");
                $("#ddlItem" + RecNo).val("2");
                $("#txtQuantity" + RecNo).val("1");
                $("#txtPrice" + RecNo).val("1");
                $("#txtQuantityRetrun" + RecNo).val("0");
                $("#txtAddons" + RecNo).val("0");
                $("#txtTotAddons" + RecNo).val("0");
                $("#txtTax" + RecNo).val("0");
                $("#No_Row" + RecNo).attr("hidden", "true");
                $("#txtCode" + RecNo).val("000");
                ComputeTotals();
            }
            else {
                chack = Number($("#txtQuantityRetrun" + RecNo).attr('data-product_qet_stock'));

                alert('لا يمكنك الحزف لانه تم السحب منه في عملية البيع ');
            }


        });
    }
    function checkRepeatedItems(itemValue: number, familyValue: number) {
        debugger
        var items: number = Number(CountGrid);//Error
        var flag = false;
        for (let i = 0; i < items; i++) {
            if (Number($("#ddlItem" + i).val()) == itemValue && Number($("#ddlFamily" + i).val()) == familyValue) {
                flag = true;
            }
        }
        return flag;
    }
    function ComputeTotals() {

        var CountTotal = 0;
        var ItemCount = 0;

        for (let i = 0; i < CountGrid + 1; i++) {
            var flagvalue = $("#txt_StatusFlag" + i).val();
            if (flagvalue != "d" && flagvalue != "m") {

                CountTotal += Number($("#txtTotal" + i).val());
                CountTotal = Number(CountTotal.toFixed(2).toString());
                ItemCount += 1;
            }
        }

        $("#txtItemCount").val(ItemCount);
        $("#txtTotal").val(CountTotal);

        var To_be_Paid = Number(CountTotal - Number($("#txtPaid_Up").val() == null ? 0 : $("#txtPaid_Up").val()));

        $("#txtTo_be_Paid").val(To_be_Paid)


    }

    function Validation_Grid(rowcount: number) {
        //else
        debugger
        if (($("#txt_StatusFlag" + rowcount).val() == 'd') || ($("#txt_StatusFlag" + rowcount).val() == 'm')) {
            return true;

        }
        else {

            if ($("#ddlfamilly_Cat" + rowcount).val() == "Null" && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

                MessageBox.Show(" برجاء أختيار نوع الفئة", "خطأ");
                Errorinput($("#ddlfamilly_Cat" + rowcount));


                return false
            }
            else if ($("#Family" + rowcount).val() == "" && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

                MessageBox.Show(" برجاءادخال الفئة", "خطأ");
                Errorinput($("#Family" + rowcount));


                return false
            }
            else if (($("#Items" + rowcount).val() == "" || $("#ddlItem" + rowcount).val() == "الصنف") && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

                MessageBox.Show(" برجاءادخال الصنف", "خطأ");
                Errorinput($("#Items" + rowcount));
                Errorinput($("#ddlItem" + rowcount));

                return false
            }
            else if (($("#txtQuantity" + rowcount).val() == "" || $("#txtQuantity" + rowcount).val() <= 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

                MessageBox.Show(" برجاءادخال الكمية", "خطأ");
                Errorinput($("#txtQuantity" + rowcount));


                return false
            }
            else if (($("#txtPrice" + rowcount).val() == "" || $("#txtPrice" + rowcount).val() == "0.00" || $("#txtPrice" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

                MessageBox.Show("  برجاءادخال السعر الشراء", "خطأ");
                Errorinput($("#txtPrice" + rowcount));

                return false
            }
            else if (($("#Sales_Price" + rowcount).val() == "" || $("#Sales_Price" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

                MessageBox.Show("  برجاءادخال السعر البيع ", "خطأ");
                Errorinput($("#Sales_Price" + rowcount));


                return false
            }
            else if (($("#MinUnitPrice" + rowcount).val() == "" || $("#MinUnitPrice" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

                MessageBox.Show(" برجاءادخال السعر اقل سعر بيع", "خطأ");
                Errorinput($("#MinUnitPrice" + rowcount));


                return false
            }

        }
        return true;

    }

    ////-----------------------------------------------------------------------------------------------------------------------

    ////----------------------------------------------------- Div_items-------------------------------------------------------
    function Assign() {

        debugger;
        PurMasterDetails = new PurchasesMasterDetails();
        var StatusFlag: String;


        Bal = 0;

        for (var i = 0; i <= CountGrid + 1; i++) {
            OperationItemSingleModel = new IQ_Purchases_Details();
            StatusFlag = $("#txt_StatusFlag" + i).val();

            if (StatusFlag == "i") {
                OperationItemSingleModel.StatusFlag = StatusFlag.toString();
                OperationItemSingleModel.ID = 0;
                OperationItemSingleModel.PRODUCT_ID = 0;
                OperationItemSingleModel.TrNo = $('#txtNumber').val();
                OperationItemSingleModel.ID_familly_Cat = $('#ddlfamilly_Cat' + i).val();
                OperationItemSingleModel.Name_CAT = $("#Family" + i).val();
                OperationItemSingleModel.PRODUCT_NAME = $("#Items" + i).val();
                OperationItemSingleModel.Purchases_Quantity = Number($('#txtQuantity' + i).val());
                OperationItemSingleModel.Purchases_Price = Number($("#txtPrice" + i).val());
                OperationItemSingleModel.Sales_Price = Number($("#Sales_Price" + i).val());
                OperationItemSingleModel.MinUnitPrice = Number($("#MinUnitPrice" + i).val());

                PurMasterDetails.Purchases_Details.push(OperationItemSingleModel);

            }
            if (StatusFlag == "u") {
                var OperationItemID = $("#txt_ID" + i).val();
                OperationItemSingleModel.StatusFlag = StatusFlag.toString();
                OperationItemSingleModel.ID = OperationItemID;
                OperationItemSingleModel.PRODUCT_ID = 0;
                OperationItemSingleModel.TrNo = $('#txtNumber').val();
                OperationItemSingleModel.ID_familly_Cat = $('#ddlfamilly_Cat' + i).val();
                OperationItemSingleModel.Name_CAT = $("#Family" + i).val();
                OperationItemSingleModel.PRODUCT_NAME = $("#Items" + i).val();
                OperationItemSingleModel.Purchases_Quantity = Number($('#txtQuantity' + i).val());
                OperationItemSingleModel.Purchases_Price = Number($("#txtPrice" + i).val());
                OperationItemSingleModel.Sales_Price = Number($("#Sales_Price" + i).val());
                OperationItemSingleModel.MinUnitPrice = Number($("#MinUnitPrice" + i).val());

                PurMasterDetails.Purchases_Details.push(OperationItemSingleModel);

            }
            if (StatusFlag == "d") {
                if ($("#txt_ID" + i).val() != "") {
                    var OperationItemID = $("#txt_ID" + i).val();
                    OperationItemSingleModel.StatusFlag = StatusFlag.toString();
                    OperationItemSingleModel.ID = OperationItemID;
                    OperationItemSingleModel.TrNo = $('#txtNumber').val();
                    OperationItemSingleModel.ID_familly_Cat = $('#ddlfamilly_Cat' + i).val();
                    OperationItemSingleModel.Name_CAT = $("#Family" + i).val();
                    OperationItemSingleModel.PRODUCT_NAME = $("#Items" + i).val();
                    OperationItemSingleModel.Purchases_Quantity = Number($('#txtQuantity' + i).val());
                    OperationItemSingleModel.Purchases_Price = Number($("#txtPrice" + i).val());
                    OperationItemSingleModel.Sales_Price = Number($("#Sales_Price" + i).val());
                    OperationItemSingleModel.MinUnitPrice = Number($("#MinUnitPrice" + i).val());

                    PurMasterDetails.Purchases_Details.push(OperationItemSingleModel);
                }
            }


        }
        debugger
        DocumentActions.AssignToModel(PurMasterDetails.Purchases_Master);

        PurMasterDetails.Purchases_Master.TrNo = Number($('#txtNumber').val());
        PurMasterDetails.Purchases_Master.Tr_Date = $('#txtDate').val();
        PurMasterDetails.Purchases_Master.ID_Supplier = Number(ID_Supp);
        PurMasterDetails.Purchases_Master.Type_Debit = Number(txtTo_be_Paid.value) == 0 ? true : false;
        PurMasterDetails.Purchases_Master.Total_Amount = Number($('#txtTotal').val());
        PurMasterDetails.Purchases_Master.Paid_Up = Number($('#txtPaid_Up').val());
        PurMasterDetails.Purchases_Master.To_be_Paid = Number($('#txtTo_be_Paid').val());
        PurMasterDetails.Purchases_Master.REMARKS = $('#txtRemarks').val();

        Bal = Number($('#txtPaid_Up').val());



    }
    function Update() {
        debugger
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Purchases", "Insert_Purchases"),
            data: JSON.stringify(PurMasterDetails),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    debugger
                    let res = result.Response
                    //MessageBox.Show("تم الحفظ بنجاح", "تم");
                    alert('تم الحفظ بنجاح');

                    btnBack_onclick();

                    //Display();
                    btnShow_onclick();

                    Selected_Data = new Array<IQ_Purchases_Master>();

                    Selected_Data = Get_IQ_Purchases_Master.filter(x => x.TrNo == Number(res));

                    ID_Supp = Selected_Data[0].ID_Supplier;

                    $("#rowData").removeClass("display_none");
                    $("#divTotalSatistics").removeClass("display_none");
                    DisplayData(Selected_Data);

                    IsSuccess = true;

                }
                else {

                    IsSuccess = false;

                    MessageBox.Show("خطأء", "خطأء");

                }
            }
        });

    }
    function Get_balance() {

        Success_Balance = true;

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Get_Balance"),
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    var Balance = result.Response;

                    if (Balance < Number(Bal)) {
                        MessageBox.Show('لا يوجد مبلغ كافي لاتمام الشراء ( المبلغ المتواجد ( ' + Balance + ' )ج ) ', '');

                        Success_Balance = false;
                    }

                }
                else {
                    Success_Balance = false;



                }
            }
        });



    }
    function Outpirce(pirce: number) {

        let Tr_Type = 'مشتريات';
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Insert"),
            data: { Dasc_Name: "مشتريات", pirce: pirce, UserName: SysSession.CurrentEnvironment.UserCode, Tr_Type },
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    var Outlet = result.Response;
                    if (Outlet == pirce) {


                    }
                    else {
                        MessageBox.Show(" خطأ لا يوجد مبلغ كافي  (" + Outlet + ")", "خطأ");
                    }

                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });


    }
    function Enter_Money(pirce: number) {


        var Dasc_Name = 'مشتريات';
        var Tr_Type = "مرتجع مشتريات";
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Insert_Enter_Money"),
            data: { Dasc_Name: Dasc_Name, pirce: pirce, UserName: SysSession.CurrentEnvironment.UserCode, Tr_Type: Tr_Type },
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    var Outlet = result.Response;
                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    ////----------------------------------------------------------------------------------------------------------------------------


    ////-------------------------------------------------------button---Save and Back and Eidt-------------------------------------- 
    function btnAdd_onclick() {

        AddNew = true;



        btnUpdate.classList.add("display_none");
        btnSave.classList.remove("display_none");
        btnBack.classList.remove("display_none");

        $("#DivShow").removeClass("disabledDiv");
        //$("#DivHederMaster").attr("disabled", "disabled").off('click');
        $("#DivHederMaster").addClass("disabledDiv");

        $(".fontitm3").removeClass("display_none");
        $("#btnAddDetails").removeClass("display_none");

        //remove_disabled_Grid_Controls();

        $("#txtDate").removeAttr("disabled");
        $("#txtPaid_Up").removeAttr("disabled");
        //$("#txtTo_be_Paid").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");
        $("#div_Data").html("");

        btnSupplierSearch.disabled = false;

        clear();

        $("#txtDate").val(GetDate());
        CountGrid = -1;
        CountItems = 0;

        $("#rowData").removeClass("display_none");
        $("#divTotalSatistics").removeClass("display_none");

        ID_Supp = 0;
    }
    function Update_onclick() {

        AddNew = false;

        btnUpdate.classList.add("display_none");
        btnSave.classList.remove("display_none");
        btnBack.classList.remove("display_none");

        $("#DivShow").removeClass("disabledDiv");
        //$("#DivHederMaster").attr("disabled", "disabled").off('click');
        $("#DivHederMaster").addClass("disabledDiv");

        $(".fontitm3").removeClass("display_none");
        $("#btnAddDetails").removeClass("display_none");

        $("#txtDate").removeAttr("disabled");
        //$("#txtPaid_Up").removeAttr("disabled");
        //$("#txtTo_be_Paid").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");
        //remove_disabled_Grid_Controls();
        for (var i = 0; i < CountGrid + 1; i++) {

            $("#txtQuantityRetrun" + i).removeAttr("disabled");
            $("#txtPrice" + i).removeAttr("disabled");
            $("#Sales_Price" + i).removeAttr("disabled");
            $("#MinUnitPrice" + i).removeAttr("disabled");

        }


    }
    function btnBack_onclick() {
        if (AddNew == true) {
            $("#DivHederMaster").removeClass("disabledDiv");

            $("#btnAddDetails").addClass("display_none");
            btnUpdate.classList.remove("display_none");
            btnSave.classList.add("display_none");
            btnBack.classList.add("display_none");
            $("#div_Data").html('');
            CountGrid = -1;
            CountItems = 0;
            clear();
            disabled_Grid_Controls();

            $("#rowData").addClass("display_none");
            $("#divTotalSatistics").addClass("display_none");
        }
        else {


            $("#DivHederMaster").removeClass("disabledDiv");

            $("#btnAddDetails").addClass("display_none");
            btnUpdate.classList.remove("display_none");
            btnSave.classList.add("display_none");
            btnBack.classList.add("display_none");
            $("#div_Data").html('');
            CountGrid = -1;
            for (var i = 0; i < AllGetStokMasterDetail.length; i++) {

                BuildControls(i);
                Disbly_BuildControls(i, AllGetStokMasterDetail);
                CountGrid = i;
            }

            disabled_Grid_Controls();

            DocumentActions.RenderFromModel(Selected_Data[0]);
        }
        ComputeTotals();
    }
    function btnSave_onclick() {
        //alert('ok');
        debugger
        if (ID_Supp == 0) {

            MessageBox.Show(" برجاءادخال المورد ", "خطأ");
            Errorinput($("#btnSupplierSearch"));
            Errorinput($("#txtName_Supplier"));

            return false
        }
        if (CountGrid < 0) {

            MessageBox.Show(" برجاءادخال الاصناف ", "خطأ");
            Errorinput($("#btnAddDetails"));


            return false
        }
        //if (Number($("#txtPaid_Up").val()) <= 0 || $("#txtPaid_Up").val() == null || $("#txtPaid_Up").val() == "" || $("#txtPaid_Up").val() == " ") {

        //    MessageBox.Show(" برجاءادخال المبلغ المدفوع", "خطأ");
        //    Errorinput($("#txtPaid_Up"));


        //    return false
        //}

        else {

            var CanAdd: boolean = true;
            if (CountGrid > -1) {

                for (var i = 0; i <= CountGrid; i++) {
                    CanAdd = Validation_Grid(i);
                    if (CanAdd == false) {
                        break;
                    }
                }
            }
            if (CanAdd) {//add
                IsSuccess = false;
                if ($('#txtNumber').val() == '') {

                    //alert('Add');
                    Assign();
                    Get_balance();
                    if (Success_Balance == false) {

                        Success_Balance = true;
                        return
                    } else {

                        Update();

                        if (IsSuccess != false) {
                            Outpirce(Bal);
                        }
                    }

                }
                else {//Edit

                    if (Number($("#txtTo_be_Paid").val()) < 0) {

                        let Paid = Number($("#txtTo_be_Paid").val()) * -1;

                        WorningMessage(" برجاءاستلام (" + Paid + ")ج من المورد ", "Do you want to delete?", "تحذير", "worning", () => {

                            $("#txtPaid_Up").val((Number($("#txtPaid_Up").val()) - Paid).toString());
                            $("#txtTo_be_Paid").val(0);
                            Assign();
                            Update();
                            if (IsSuccess != false) {
                                Enter_Money(Paid);
                            }
                        });

                    }
                    else {
                        Assign();
                        Update();
                    }


                }

            }
        }

    }
    function Search() {

        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Purchases, "btnSupplierSearch", "", () => {
            let ID_Supplier = SearchGrid.SearchDataGrid.SelectedKey;
            ID_Supp = ID_Supplier;
            //alert(id);
            SearchVendorDetails = GetAllVendorDetails.filter(x => x.ID_Supplier == Number(ID_Supplier));
            DocumentActions.RenderFromModel(SearchVendorDetails[0]);

            //GetAllVendorDetails
            //btnAddReturn_onclick();
            //$("#ddlVendorDetails").attr("disabled", "disabled");
            //$("#ddlReturnTypeShow").attr("disabled", "disabled");
            //$("#ddlFreeSalesman").attr("disabled", "disabled");
        });

    }
    function clear() {
        $('#txtNumber').val('');
        $('#txtName_Supplier').val('');
        $('#txtType_Supplier').val('');
        $('#txtPHONE').val('');
        $('#txtPaid_Up').val('');
        $('#txtTo_be_Paid').val('');
        $('#txtRemarks').val('');
        $('#txtTotal').val('');
        $('#txtItemCount').val('');


    }
    function remove_disabled_Grid_Controls() {

        $("#txtDate").removeAttr("disabled");
        $("#txtPaid_Up").removeAttr("disabled");
        //$("#txtTo_be_Paid").removeAttr("disabled");
        $("#txtRemarks").removeAttr("disabled");


        for (var i = 0; i < CountGrid + 1; i++) {
            $("#ddlfamilly_Cat" + i).removeAttr("disabled");
            $("#Family" + i).removeAttr("disabled");
            $("#Items" + i).removeAttr("disabled");
            $("#txtQuantity" + i).removeAttr("disabled");
            $("#txtPrice" + i).removeAttr("disabled");
            $("#Sales_Price" + i).removeAttr("disabled");
            $("#MinUnitPrice" + i).removeAttr("disabled");
            $("#txt_StatusFlag" + i).val("");

            //$("#txtTotal" + i).removeAttr("disabled");

        }
    }
    function disabled_Grid_Controls() {

        btnSupplierSearch.disabled = true;

        $("#txtDate").attr("disabled", "disabled");
        $("#txtPaid_Up").attr("disabled", "disabled");
        $("#txtTo_be_Paid").attr("disabled", "disabled");
        $("#txtRemarks").attr("disabled", "disabled");

        for (var i = 0; i < CountGrid + 1; i++) {

            $("#ddlfamilly_Cat" + i).attr("disabled", "disabled");
            $("#Family" + i).attr("disabled", "disabled");
            $("#Items" + i).attr("disabled", "disabled");
            $("#txtQuantity" + i).attr("disabled", "disabled");
            $("#txtQuantityRetrun" + i).attr("disabled", "disabled");
            $("#txtPrice" + i).attr("disabled", "disabled");
            $("#Sales_Price" + i).attr("disabled", "disabled");
            $("#txtMinPrice" + i).attr("disabled", "disabled");
            $("#txt_StatusFlag" + i).val("");

            //$("#txtScrapQty" + i).attr("disabled", "disabled");
        }
    }


    function printreport(type: number) {
        debugger;
        let _StockList: Array<Settings_Report> = new Array<Settings_Report>();
        let _Stock: Settings_Report = new Settings_Report();
        _Stock.Type_Print = type;
        _Stock.ID_Button_Print = 'Purchases';
        _Stock.Parameter_1 = $('#txtNumber').val();
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