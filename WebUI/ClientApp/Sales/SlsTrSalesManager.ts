$(document).ready(() => {

    SlsTrSalesManager.InitalizeComponent();
})
namespace SlsTrSalesManager {

    var SysSession: SystemSession = GetSystemSession();
    var compcode: Number;
    var BranchCode: number;
    var sys: SystemTools = new SystemTools();
    var vatType: number;
    var Finyear: number;

    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    var InvoiceType: number = 0;      // 1:Retail invoice , 2: Wholesale invoice            

    var ddlStore: HTMLInputElement;
    var ddlCustomer: HTMLInputElement;
    var ddlSalesman: HTMLInputElement;
    var ddlType: HTMLSelectElement;
    var ddlCashBox: HTMLInputElement;

    //Models        
    var SlsInvoiceItemsDetails: Array<IQ_GetSlsInvoiceItem> = new Array<IQ_GetSlsInvoiceItem>();
    var InvoiceItemsDetailsModel: Array<I_Sls_TR_InvoiceItems> = new Array<I_Sls_TR_InvoiceItems>();
    var InvoiceModel: I_Sls_TR_Invoice = new I_Sls_TR_Invoice();
    var MasterDetailsModel: SlsInvoiceMasterDetails = new SlsInvoiceMasterDetails();
    var invoiceItemSingleModel: I_Sls_TR_InvoiceItems = new I_Sls_TR_InvoiceItems();
    var List_MinUnitPrice: Array<I_Sls_TR_InvoiceItems> = new Array<I_Sls_TR_InvoiceItems>();

    //TextBoxes    
    var txtItemCount: HTMLInputElement;
    var txtPackageCount: HTMLInputElement;
    var txtTotalbefore: HTMLInputElement;
    var txtTotalDiscount: HTMLInputElement;
    var txtDiscountValue: HTMLInputElement;
    var txtTotal: HTMLInputElement;
    var txtTax: HTMLInputElement;
    var txtNet: HTMLInputElement;
    var txt_Remarks: HTMLInputElement;
    var txtInvoiceDate: HTMLInputElement;
    var txtCustomerMobile: HTMLInputElement;
    var txtInvoiceCustomerName: HTMLInputElement;
    var txtCustomerCode: HTMLInputElement;
    var txt_ApprovePass: HTMLInputElement;
    var lblInvoiceNumber: HTMLInputElement;
    //checkbox
    var chkActive: HTMLInputElement;
    //buttons       
    var btnAddDetails: HTMLButtonElement;
    var btnBack: HTMLButtonElement;// btnBack btnSave
    var btnSave: HTMLButtonElement;

    //global    
    var Discount = 0;
    var StoreID;
    var CountGrid = 0;
    var CountItems: number = 0;
    var PackageCount: number = 0;
    var CountTotal: number = 0;
    var TaxCount: number = 0;
    var NetCount: number = 0;
    var VatPrc: number = 0;
    var Validation_Insert = 0;
    var GlobalinvoiceID: number = 0;
    var invoiceID: number;
    //flags : 
    var TypeFlag: boolean = false;
    var IsSuccess: boolean = true;
    var Show: boolean = true;
    var NewAdd: boolean = true;
    var AutherizeFlag: boolean = false;
    var flag_PriceWithVAT = (SysSession.CurrentEnvironment.I_Control[0].SalesPriceWithVAT);
    var btnPrint: HTMLInputElement;
    var Tax_Rate = 0;
    var Tax_Type_Model: Tax_Type = new Tax_Type();
    var NumCnt = 0;
    var CustomerId = 0;
    //------------------------------------------------------ Main Region------------------------
    export function InitalizeComponent() {
        // VatPrc                                           
        document.getElementById('Screen_name').innerHTML = "الفاتوره الاكترونيه ";

        InitalizeControls();
        InitializeEvents();
        clear();

    }
    function InitalizeControls() {

        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;// btnBack btnSave

        ddlStore = document.getElementById("ddlStore") as HTMLInputElement;
        ddlSalesman = document.getElementById("ddlSalesman") as HTMLInputElement;
        ddlCashBox = document.getElementById("ddlCashBox") as HTMLInputElement;
        ddlType = document.getElementById("ddlType") as HTMLSelectElement;

        lblInvoiceNumber = document.getElementById("lblInvoiceNumber") as HTMLInputElement;
        txtItemCount = document.getElementById("txtItemCount") as HTMLInputElement;
        txtPackageCount = document.getElementById("txtPackageCount") as HTMLInputElement;
        txtTotalbefore = document.getElementById("txtTotalbefore") as HTMLInputElement;
        txtTotalDiscount = document.getElementById("txtTotalDiscount") as HTMLInputElement;
        txtDiscountValue = document.getElementById("txtDiscountValue") as HTMLInputElement;
        txtTotal = document.getElementById("txtTotal") as HTMLInputElement;
        txtTax = document.getElementById("txtTax") as HTMLInputElement;
        txtNet = document.getElementById("txtNet") as HTMLInputElement;
        txt_Remarks = document.getElementById("txt_Remarks") as HTMLInputElement;
        txtInvoiceDate = document.getElementById("txtInvoiceDate") as HTMLInputElement;
        txtCustomerMobile = document.getElementById("txtCustomerMobile") as HTMLInputElement;
        txtInvoiceCustomerName = document.getElementById("txtInvoiceCustomerName") as HTMLInputElement;
        txtCustomerCode = document.getElementById("txtCustomerCode") as HTMLInputElement;

        //checkbox
        chkActive = document.getElementById("chkActive") as HTMLInputElement;

    }
    function InitializeEvents() {
        btnBack.onclick = btnBack_onclick;
        btnSave.onclick = btnSave_onclick;
        btnAddDetails.onclick = AddNewRow;
        ddlType.onchange = ddlType_onchange

    }
    function ddlType_onchange() {
        if (ddlType.value == '1') {
            $('#Div_Money').removeClass('display_none');
        }
        else {
            $('#Div_Money').addClass('display_none');
        }
    }
    //------------------------------------------------------ Buttons Region------------------------
    function btnSave_onclick() {

        if (!ValidationHeader()) return;

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
            MasterDetailsModel = new SlsInvoiceMasterDetails();
            Assign();
            MasterDetailsModel.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
            MasterDetailsModel.UserCode = SysSession.CurrentEnvironment.UserCode;
            InvoiceModel.VatType = vatType;
            InvoiceModel.VatAmount = Number(txtTax.value);
            InvoiceModel.CommitionAmount = Number(txt_Remarks.value);


            insert();


        }
    }
    function btnBack_onclick() {
        clear();
    }
    //------------------------------------------------------ Controls Grid Region------------------------
    function BuildControls(cnt: number) {
        var html;


        html = '<div id= "No_Row' + cnt + '" class="container-fluid style_border" > <div class="row " > <div class="col-lg-12" > ' +

            '<span id="btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3SlsTrSalesManager2 display_none"></span>' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0" style="width: 4%;">' +
            '<input id="txtSerial' + cnt + '" type="text" class="form-control input-sm input-sm right2" disabled /></div>' +

            '<input id="InvoiceItemID' + cnt + '" type="hidden" class="form-control input-sm right2 display_none"  />' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0" style="width: 11%;">' +            
            '<input id="txtServiceCode' + cnt + '" name=""   type="text" class="  form-control input-sm  text_Display  " />' +
            '</div>' +
            '<div class="col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xs-3 p-0">' +
            '<input id="txtServiceName' + cnt + '" name="FromDate"   type="text" class="form-control input-sm  text_Display" /></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            '<select id="ddlTypeuom' + cnt + '" class="form-control input-sm"   style="width: 100%;border-radius: 30px;">'+
            '<option value= "null" > اختر الوحده </option>' +
            '<option value= "1" > بالقطعه </option>' +
            '<option value= "2" > بالبكت </option>' +
            '<option value= "3" > بالكرتونه </option>' +
            '<option value= "4" > بالمتر </option>' +
            '<option value= "5" > بالكيلو </option>' +
            '<option value= "6" > بالجرام </option></select >' +
            '</div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"><input type="number" id="txtQuantity' + cnt + '" name="quant[1]" class="form-control input-sm   font1" value="1" min="1" max="1000" step="1"></div>' +

          

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number"  id="txtPrice' + cnt + '" name="quant[2]" class="form-control input-sm   font1" value="1" min="0" max="1000" step="0.5"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number"  id="txtDiscountPrc' + cnt + '" name="quant[2]" class="form-control input-sm   font1" value="0" min="0" max="1000" step="0.5"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number"  id="txtDiscountAmount' + cnt + '" name="quant[2]" class="form-control input-sm   font1" value="0" min="0" max="1000" step="0.5"></div>' +

            '<div class=" col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0"  ><input type="number" disabled id="txtNetUnitPrice' + cnt + '" name="quant[2]" class="form-control input-sm   font1" value="0" min="0" max="1000" step="0.5"></div>' +

            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 p-0">' +
            '<input id="txtTotal' + cnt + '" type="text" class="form-control input-sm right2" disabled /></div>' +


            '<div class="col-lg-6 col-md-6 col-sm-6 col-xl-6 col-xs-6" style="position:absolute; right:97%">' +
                                                
            '<div class="col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xs-3 p-0">' +
            '<input id="txtTax_Rate' + cnt + '" type="text" class="form-control input-sm input-sm right2" disabled /></div>' +

            '<div class="col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xs-3 p-0">' +
            '<input id="txtTax' + cnt + '" type="text" class="form-control input-sm right2" disabled /></div>' +

            '<div class="col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xs-3 p-0">' +
            '<input id="txtTotAfterTax' + cnt + '" type="text" class="form-control input-sm right2" disabled /></div>' +
            '</div></div></div>' +

            '<input id="txt_StatusFlag' + cnt + '" name = " " type = "hidden" class="form-control"/><input id="txt_ItemID' + cnt + '" name = " " type = "hidden" class="form-control"/><input id="txt_ID' + cnt + '" name = " " type = "hidden" class="form-control" />';
        $("#div_Data").append(html);



        //Search Region
        //// First Search                 
        $("#txtServiceCode" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");




        });
        //// Second Search


        $("#ddlTypeuom" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            let Typeuom = $("#ddlTypeuom" + cnt);
            let UnitPrice = $('option:selected', Typeuom).attr('data-UnitPrice');

            $('#txtPrice' + cnt + '').val(UnitPrice);
            $('#txtNetUnitPrice' + cnt + '').val(UnitPrice);
            $('#txtQuantity' + cnt + '').val('1');

            totalRow(cnt);

        });

        // text change      
        $("#txtQuantity" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();

            let Typeuom = $("#ddlTypeuom" + cnt);
            let OnhandQty = $('option:selected', Typeuom).attr('data-OnhandQty');

            if (Number(txtQuantityValue) > Number(OnhandQty)) {

                DisplayMassage(" لا يمكن تجاوز الكميه المتاحه  " + OnhandQty + " ", "Please select a customer", MessageType.Worning);
                $("#txtQuantity" + cnt).val(OnhandQty);
                Errorinput($("#txtQuantity" + cnt));
            }

            totalRow(cnt);

        });

        $("#txtPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
            $('#txtTax_Rate' + cnt).val(Tax_Rate);

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
            totalRow(cnt);

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
            $('#txtTax_Rate' + cnt).val(Tax_Rate);

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
        $("#txtNetUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            ComputeTotals();

        });

        $("#btn_minus" + cnt).click(function (e) {
            DeleteRow(cnt);
            // alert('delete');
        });
        return;
    }
    function totalRow(cnt: number) {
        let txtPrice = Number($("#txtPrice" + cnt).val());
        let txtDiscountPrc = Number($("#txtDiscountPrc" + cnt).val());

        $("#txtDiscountAmount" + cnt).val(((txtDiscountPrc * txtPrice) / 100).toFixed(2));

        $("#txtNetUnitPrice" + cnt).val((txtPrice - ((txtDiscountPrc * txtPrice) / 100)).toFixed(2));


        var txtQuantityValue = $("#txtQuantity" + cnt).val();
        var txtPriceValue = $("#txtNetUnitPrice" + cnt).val();
        $('#txtTax_Rate' + cnt).val(Tax_Rate);

        var total = Number(txtQuantityValue) * Number(txtPriceValue);
        VatPrc = $("#txtTax_Rate" + cnt).val();
        var vatAmount = Number(total) * VatPrc / 100;
        $("#txtTax" + cnt).val(vatAmount.toFixed(2));
        var total = Number(txtQuantityValue) * Number(txtPriceValue);
        $("#txtTotal" + cnt).val(total.toFixed(2));

        var totalAfterVat = Number(vatAmount.toFixed(2)) + Number(total.toFixed(2));
        $("#txtTotAfterTax" + cnt).val(totalAfterVat.toFixed(2));


        ComputeTotals();

    }
    function Display_GridConrtol(cnt) {

        $("#txtServiceCode" + cnt).attr("disabled", "disabled");
        $("#txtServiceName" + cnt).attr("disabled", "disabled");
        $("#ddlTypeuom" + cnt).attr("disabled", "disabled");   
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
        $("#txt_StatusFlag" + cnt).val("");

        $("#txtServiceName" + cnt).prop("value", (lang == "ar" ? SlsInvoiceItemsDetails[cnt].it_DescA : SlsInvoiceItemsDetails[cnt].It_DescE));
        $("#txtServiceCode" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].it_itemCode);

        $("#txtSerial" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].Serial);
        $("#txtQuantity" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].SoldQty);
        $("#txtPrice" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].Unitprice);
        $("#txtDiscountPrc" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].DiscountPrc);
        $("#txtDiscountAmount" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].DiscountAmount);
        $("#txtNetUnitPrice" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].NetUnitPrice);
        $("#txtTax_Rate" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].VatPrc);
        $("#txtReturnQuantity" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].TotRetQty);
        $("#txtTotal" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].ItemTotal);
        $("#txtTax" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].VatAmount.toFixed(2));
        $("#txtTotAfterTax" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].NetAfterVat.toFixed(2));
        $("#InvoiceItemID" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].InvoiceItemID);
        $("#txt_ItemID" + cnt).prop("value", SlsInvoiceItemsDetails[cnt].ItemID);


        $('#ddlTypeuom' + cnt + '').val(SlsInvoiceItemsDetails[cnt].UomID == null ? 'null' : SlsInvoiceItemsDetails[cnt].UomID);



        //$('#ddlTypeuom' + cnt + '').html('');
        //$('#ddlTypeuom' + cnt + '').append('<option  data-OnhandQty="' + SlsInvoiceItemsDetails[cnt].StockSoldQty + '" data-UnitPrice="' + SlsInvoiceItemsDetails[cnt].Unitprice + '" data-MinPrice=" " data-Rate=" " value="' + SlsInvoiceItemsDetails[cnt].UomID + '">' + (lang == "ar" ? SlsInvoiceItemsDetails[cnt].Uom_DescA : SlsInvoiceItemsDetails[cnt].Uom_DescE) + '</option>');




    }
    function DeleteRow(RecNo: number) {
        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
            CountItems = CountItems - 1;
            ComputeTotals();
            Insert_Serial();

            txtItemCount.value = CountItems.toString();
            $("#ddlFamily" + RecNo).val("99");
            $("#ddlItem" + RecNo).val("99");
            $("#txtQuantity" + RecNo).val("99");
            $("#txtPrice" + RecNo).val("199");
            $("#txtUnitpriceWithVat" + RecNo).val("199");
            $("#No_Row" + RecNo).attr("hidden", "true");
        });
    }
    function AddNewRow() {


        //if (ddlType.value == "0" && CustomerId == 0) {//علي الحساب  
        //    DisplayMassage(" برجاء اختيار العميل", "Please select a customer", MessageType.Worning);
        //    Errorinput(btnCustomerSrch);
        //    return false
        //}

        //if (InvoiceType == 1) {       //Retail  
        //    if (1 == 0 ) {
        //        DisplayMassage(" برجاء اختيار العميل", "Please select a customer", MessageType.Worning);
        //        Errorinput(btnCustomerSrch);
        //        return false
        //    }
        //}
        //if (InvoiceType == 2) {  //Wholesale   
        //    if (1 == 0 ) {
        //        DisplayMassage(" برجاء اختيار العميل", "Please select a customer", MessageType.Worning);
        //        Errorinput(btnCustomerSrch);
        //        return false
        //    }
        //}
        if (ddlStore.value == 'null') {
            DisplayMassage(" برجاء اختيار المستودع", "Please select a customer", MessageType.Worning);
            Errorinput(ddlStore);
            return false
        }



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
            $("#ddlFamily" + CountGrid).removeAttr("disabled");
            $("#ddlItem" + CountGrid).removeAttr("disabled");
            $("#txtQuantity" + CountGrid).removeAttr("disabled");
            $("#txtPrice" + CountGrid).removeAttr("disabled");

            $("#txtReturnQuantity" + CountGrid).attr("disabled", "disabled");
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            CountGrid++;
            Insert_Serial();

            if (flag_PriceWithVAT == true) {

                $("#txtUnitpriceWithVat" + CountGrid).removeAttr("disabled");
                $("#txtPrice" + CountGrid).attr("disabled", "disabled");

            } else {
                $("#txtPrice" + CountGrid).removeAttr("disabled");
                $("#txtUnitpriceWithVat" + CountGrid).attr("disabled", "disabled");
            }
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
    //------------------------------------------------------ Clear &&Validation  Region ------------------------   
    function ValidationHeader() {
        debugger


        if (ddlSalesman.value == "null") {
            DisplayMassage(" برجاء اختيار المندوب", "Please select a Salesman", MessageType.Error);

            Errorinput(ddlSalesman);
            return false
        }
        if (ddlStore.value == "null" && NewAdd == true) {
            DisplayMassage(" برجاء اختيار المستودع", "Please select a Store", MessageType.Error);
            Errorinput(ddlStore);
            return false
        }
        if (txtInvoiceDate.value == "") {
            DisplayMassage(" برجاء ادخال التاريخ", "Please select a Date", MessageType.Error);
            Errorinput(txtInvoiceDate);
            return false
        }
        if (CountGrid == 0) {
            DisplayMassage(" برجاء ادخال بيانات الفاتورة", "Please select a Invoice data", MessageType.Error);

            Errorinput(btnAddDetails);
            return false
        }
        if (txtItemCount.value == '0') {
            DisplayMassage(" برجاء ادخال بيانات الفاتورة", "Please select a Invoice data", MessageType.Error);
            Errorinput(btnAddDetails);
            return false
        }
        if ($('#txtCardMoney').val().trim() != '' || $('#txtCashMoney').val().trim() != '') {

            let card = Number($('#txtCardMoney').val());
            let Cash = Number($('#txtCashMoney').val());
            let Net = card + Cash;
            if (Net != Number($('#txtNet').val())) {
                DisplayMassage("يجب المبلغ المسدد يساوي الصاف ييجب ان يكون مجموع المبلغ المسدد بالكارت مع المسدد نقدا مساويا لصافي الفاتورة", "The amount paid should be equal to the net", MessageType.Worning);
                Errorinput($('#txtNet'));
                if ($('#txtCardMoney').val().trim() != '') {
                    Errorinput($('#txtCardMoney'));

                }
                if ($('#txtCashMoney').val().trim() != '') {
                    Errorinput($('#txtCashMoney'));

                }
                return false
            }

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
                DisplayMassage(" برجاء ادخال الكود", "Please enter the type", MessageType.Error);
                Errorinput($("#txtServiceCode" + rowcount));
                return false
            }
            if ($("#txtServiceName" + rowcount).val() == "") {
                DisplayMassage(" برجاء ادخال اسم الصـنـــف", "Please enter the type", MessageType.Error);
                Errorinput($("#txtServiceName" + rowcount));
                return false
            }
            if ($("#ddlTypeuom" + rowcount).val() == "null") {
                DisplayMassage(" برجاء اختار الوحده", "Please enter the type", MessageType.Error);
                Errorinput($("#ddlTypeuom" + rowcount));
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
                Errorinput($("#txtUnitpriceWithVat" + rowcount));
                return false
            }
            return true;
        }
    }
    function clear() {

        chkActive.disabled = true;
        $("#DivInvoiceDetails").removeClass("display_none");
        lblInvoiceNumber.value = '';
        txtInvoiceDate.value = GetDate();
        txtInvoiceCustomerName.value = "عميل نقدي عام";
        txtCustomerCode.value = ''
        ddlSalesman.value = ''
        txtCustomerMobile.value = "";
        txtTotal.value = '0';
        txtTax.value = '0';
        txtNet.value = '0';
        txtTotalDiscount.value = '0';
        txtTotalbefore.value = '0';
        txt_Remarks.value = '';
        txtDiscountValue.value = '';
        txtItemCount.value = '0'
        txtPackageCount.value = '0'
        ddlStore.value = '';
        ddlCashBox.value = '';
        chkActive.checked = true;
        $("#div_Data").html("");
        CountGrid = 0;
        CountItems = 0;
        ddlType.value = '1';
        $('#Div_Money').removeClass('display_none');
        AddNewRow();

    }
    //------------------------------------------------------ main Functions  Region------------------------
    function Assign() {
        List_MinUnitPrice = new Array<I_Sls_TR_InvoiceItems>();
        var StatusFlag: String;
        InvoiceModel = new I_Sls_TR_Invoice();
        InvoiceItemsDetailsModel = new Array<I_Sls_TR_InvoiceItems>();

     
        InvoiceModel.TrNo = Number(lblInvoiceNumber.value);    
        InvoiceModel.PaymentMeansTypeCode = ddlType.value == '0' ? 2 : 1; //  Cash or   Credit            
        InvoiceModel.InvoiceID = GlobalinvoiceID;
        InvoiceModel.SalesmanId = Number(ddlSalesman.value);
        InvoiceModel.StoreId = Number(ddlStore.value);
        InvoiceModel.NetAfterVat = Number(txtNet.value) - Number(txtDiscountValue.value);
        InvoiceModel.ItemDiscountTotal = Number(txtTotalDiscount.value);
        InvoiceModel.TotalAmount = Number(txtTotal.value);
        InvoiceModel.TrDate = txtInvoiceDate.value;
        InvoiceModel.CustomerName = txtInvoiceCustomerName.value;
        InvoiceModel.CustomerMobileNo = txtCustomerMobile.value;  
        InvoiceModel.Remark = txt_Remarks.value;    
        InvoiceModel.CardAmount = $('#txtCardMoney').val().trim() == '' ? 0 : $('#txtCardMoney').val();
        InvoiceModel.CashAmount = $('#txtCashMoney').val().trim() == '' ? 0 : $('#txtCashMoney').val();     
        InvoiceModel.TaxNotes = $('#txtTerms_of_Payment').val();
        InvoiceModel.ItemTotal = Number(txtTotalbefore.value);
        InvoiceModel.RoundingAmount = Number(txtDiscountValue.value);
                                  
        // Details
        for (var i = 0; i < CountGrid; i++) {
            invoiceItemSingleModel = new I_Sls_TR_InvoiceItems();
            StatusFlag = $("#txt_StatusFlag" + i).val();

            invoiceItemSingleModel.Name_Item = $("#txtServiceName" + i).val();
            invoiceItemSingleModel.MinUnitPrice = Number($('option:selected', $("#ddlTypeuom" + i)).attr('data-minprice'));

            if (Number($("#txtPrice" + i).val()) < Number($('option:selected', $("#ddlTypeuom" + i)).attr('data-minprice'))) {
                List_MinUnitPrice.push(invoiceItemSingleModel);
                Validation_Insert = 1;
            }

            if (StatusFlag == "i") {
                invoiceItemSingleModel.InvoiceItemID = 0;
                invoiceItemSingleModel.ItemID = $("#txt_ItemID" + i).val();
                invoiceItemSingleModel.Serial = $("#txtSerial" + i).val();
                invoiceItemSingleModel.SoldQty = $('#txtQuantity' + i).val();                          
                invoiceItemSingleModel.StockSoldQty = Number($('option:selected', $("#ddlTypeuom" + i)).attr('data-rate')) * Number($('#txtQuantity' + i).val());//
                invoiceItemSingleModel.NetUnitPrice = $("#txtNetUnitPrice" + i).val();
                invoiceItemSingleModel.Unitprice = $("#txtPrice" + i).val();
                invoiceItemSingleModel.UnitpriceWithVat = $("#txtPrice" + i).val();
                invoiceItemSingleModel.DiscountPrc = $("#txtDiscountPrc" + i).val();
                invoiceItemSingleModel.DiscountAmount = $("#txtDiscountAmount" + i).val();
                //-----------------------------------------------------
                invoiceItemSingleModel.UomID = Number($("#ddlTypeuom" + i).val());
                invoiceItemSingleModel.UomID = Number($("#ddlTypeuom" + i).val());
                invoiceItemSingleModel.NetUnitPriceWithVat = $("#txtPrice" + i).val();
                invoiceItemSingleModel.BaseQty = 1;
                invoiceItemSingleModel.BaseQtyPrice = $("#txtPrice" + i).val();
                invoiceItemSingleModel.BaseQtyUomid = Number($("#ddlTypeuom" + i).val());
                invoiceItemSingleModel.ChargeVatNatID = null;
                invoiceItemSingleModel.DiscountVatNatID = null;
                invoiceItemSingleModel.ChargeCode = null;
                //-----------------------------------------------------
                VatPrc = $("#txtTax_Rate" + i).val();
                let VatNatID = Number($("#txtTax_Rate" + i).attr('data-VatNatID'));
                invoiceItemSingleModel.VatPrc = VatPrc;//$("#txtTax" + i).val();
                invoiceItemSingleModel.VatNatID = VatNatID;
                invoiceItemSingleModel.VatAmount = $("#txtTax" + i).val();
                invoiceItemSingleModel.ItemTotal = invoiceItemSingleModel.Unitprice * invoiceItemSingleModel.SoldQty;    
                invoiceItemSingleModel.StatusFlag = StatusFlag.toString();
                InvoiceItemsDetailsModel.push(invoiceItemSingleModel);

            }
            if (StatusFlag == "u") {
                var invoiceItemId = $("#InvoiceItemID" + i).val()
                invoiceItemSingleModel.InvoiceItemID = invoiceItemId;
                invoiceItemSingleModel.ItemID = $("#txt_ItemID" + i).val();
                invoiceItemSingleModel.Serial = $("#txtSerial" + i).val();
                invoiceItemSingleModel.SoldQty = $('#txtQuantity' + i).val();                           
                invoiceItemSingleModel.StockSoldQty = Number($('option:selected', $("#ddlTypeuom" + i)).attr('data-rate')) * Number($('#txtQuantity' + i).val());//
                invoiceItemSingleModel.NetUnitPrice = $("#txtNetUnitPrice" + i).val();
                invoiceItemSingleModel.Unitprice = $("#txtPrice" + i).val();
                invoiceItemSingleModel.UnitpriceWithVat = $("#txtPrice" + i).val();
                invoiceItemSingleModel.DiscountPrc = $("#txtDiscountPrc" + i).val();
                invoiceItemSingleModel.DiscountAmount = $("#txtDiscountAmount" + i).val();
                //-----------------------------------------------------
                invoiceItemSingleModel.UomID = Number($("#ddlTypeuom" + i).val());
                invoiceItemSingleModel.NetUnitPriceWithVat = $("#txtPrice" + i).val();
                invoiceItemSingleModel.BaseQty = 1;
                invoiceItemSingleModel.BaseQtyPrice = $("#txtPrice" + i).val();
                invoiceItemSingleModel.BaseQtyUomid = Number($("#ddlTypeuom" + i).val());
                invoiceItemSingleModel.ChargeVatNatID = null;
                invoiceItemSingleModel.DiscountVatNatID = null;
                invoiceItemSingleModel.ChargeCode = null;
                //-----------------------------------------------------
                VatPrc = $("#txtTax_Rate" + i).val();
                let VatNatID = Number($("#txtTax_Rate" + i).attr('data-VatNatID'));
                invoiceItemSingleModel.VatPrc = VatPrc;//$("#txtTax" + i).val();
                invoiceItemSingleModel.VatNatID = VatNatID;
                invoiceItemSingleModel.VatAmount = $("#txtTax" + i).val();
                invoiceItemSingleModel.ItemTotal = invoiceItemSingleModel.Unitprice * invoiceItemSingleModel.SoldQty;    
                invoiceItemSingleModel.StatusFlag = StatusFlag.toString();
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
        //MasterDetailsModel.I_Sls_TR_Invoice = InvoiceModel;
        //MasterDetailsModel.I_Sls_TR_InvoiceItems = InvoiceItemsDetailsModel;
    }
    function insert() {
        InvoiceModel.InvoiceID = 0;




        PrintTransaction();
    }
    //------------------------------------------------------Print------------------------    
    function PrintTransaction() {

    }
    //------------------------------------------------------ Events Region------------------------    
    function txtDiscountValue_onchange() {

        if (txtDiscountValue.value.trim() != '' && txtDiscountValue.value != '0') {
            txtNet.value = (Number(NetCount.toFixed(2)) - Number(txtDiscountValue.value)).toFixed(2);

        }
        else {
            ComputeTotals();
        }
    }



}