
$(document).ready(() => {
    Items.InitalizeComponent();
})

namespace Items {

    var AccountType: Number = 1;
    var MSG_ID: number;
    var Details: Array<PRODUCT> = new Array<PRODUCT>();
    var DetailsBar: Array<PRODUCT> = new Array<PRODUCT>();
    var Display_Type: Array<CATEGRES> = new Array<CATEGRES>();
    var Display_Filtr: Array<CATEGRES> = new Array<CATEGRES>();
    var Detailsfamilly: Array<familly_Cat> = new Array<familly_Cat>();
    //var Display_STORE: Array<G_STORE> = new Array<G_STORE>();
    //var Display_D_UOM: Array<I_D_UOM> = new Array<I_D_UOM>();

    //var Display_ItemFamily: Array<CATEGRES> = new Array<CATEGRES>();
    //var BilldItemFamily: Array<CATEGRES> = new Array<CATEGRES>();
    var BilldDetail = new Array<PRODUCT>();

    //var Details: Array<CATEGRES> = new Array<CATEGRES>();
    var btnNew_sub_Add_service: HTMLButtonElement;
    var btnsave: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var btnShow: HTMLButtonElement;
    var btnAddQty: HTMLButtonElement;
    var btnAddOldItem: HTMLButtonElement;


    var txt_Barcode: HTMLInputElement;
    var txt_Quantity: HTMLInputElement;
    var txt_ItemName: HTMLInputElement;

    //var btnView: HTMLButtonElement;
    var sys: SystemTools = new SystemTools();
    //var sys: _shared = new _shared();
    var SysSession: SystemSession = GetSystemSession();
    var Model: PRODUCT = new PRODUCT();

    var CountGrid = 0;
    var compcode: Number;//SharedSession.CurrentEnvironment.CompCode;
    var btnback: HTMLButtonElement;
    var Qtys: number;
    var catId;
    var catId_type_change;
    var ItemFamilyID_change;

    var flag_Assign = 0;
    var ItemFamilyID;
    var storeCode = 1;
    var Itm_DescA;
    var flag_Display = 0;
    var StocK = "All";
    var ID_CAT;
    var ID_CAT_Old =0; 
    var PRODUCT_ID = 0;
    var TrType = 0;

    

    export function InitalizeComponent() {
        debugger
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الاصناف";

        } else {
            document.getElementById('Screen_name').innerHTML = "Items";

        }

        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        Display_DrpPaymentType();
        Displayfamilly();
        //Display_All();
    }


    $('#btnedite').on('click', function () {

        if ($('#drpPaymentType').val() == 'null' || $('#drpPaymentType').val() == 'Null') {
            MessageBox.Show('يبجب اختيار الفئة اوالاً', '');
            return;
        }

        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");

        $('#btnAddOldItem').addClass("display_none");

        
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $(".SelectDIS").attr("disabled", "disabled");


        

        if ($('#drpitem_family :selected').text() == "النوع") {
            $("#drpitem_family").attr("disabled", "disabled")
        }
        else {
            $("#drpitem_family").removeAttr("disabled");
        }
        $("#drp_G_Store").attr("disabled", "disabled");

        $("#drpPaymentType").attr("disabled", "disabled");
        $("#drpitem_family").attr("disabled", "disabled");
        $("#drp_StocK").attr("disabled", "disabled");

        $(".btnAddDetails").removeAttr("disabled");
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign')

        $(".fa-minus-circle").removeClass("display_none");

        $("#drbfamilly_cat").attr("disabled", "disabled");


        $(".lType").attr("disabled", "disabled");


    });

    function InitalizeControls() {
        //                               يث
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnback = document.getElementById("btnback") as HTMLButtonElement;
        btnAddQty = document.getElementById("btnAddQty") as HTMLButtonElement;
        btnAddOldItem = document.getElementById("btnAddOldItem") as HTMLButtonElement;


        txt_Barcode = document.getElementById("txt_Barcode") as HTMLInputElement;
        txt_Quantity = document.getElementById("txt_Quantity") as HTMLInputElement;
        txt_ItemName = document.getElementById("txt_ItemName") as HTMLInputElement;
    }



    function InitalizeEvents() {

        btnAddDetails.onclick = AddNewRow;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnAddOldItem.onclick = btnAddOldItem_onclick;


        //btnShow.onclick = btnShow_onclick;
        txt_Barcode.onchange = txt_Barcode_onchange;
        btnAddQty.onclick = btnAddQty_onclick;
    }


    function btnAddOldItem_onclick() {

        $("#PopupDialog").modal("show");


    }


    function btnShow_onclick() {



        btnback_onclick();
    }


    function AddNewRow() {

        if (!SysSession.CurrentPrivileges.AddNew) return;
        var CanAdd: boolean = true;
        if (CountGrid > 0) {
            var LastRowNo = CountGrid - 1;
            CanAdd = Validation_Grid(LastRowNo);
        }
        if (CanAdd) {
            BuildControls(CountGrid);


            $("#txtDescA" + CountGrid).removeAttr("disabled");
            $("#dllType" + CountGrid).removeAttr("disabled");
            $("#txtOnhandQty" + CountGrid).removeAttr("disabled");
            $("#select_Type_Item" + CountGrid).removeAttr("disabled");
            $("#txtPurchasing_price" + CountGrid).removeAttr("disabled");
            $("#txtUnitPrice" + CountGrid).removeAttr("disabled");
            $("#txtMinUnitPrice" + CountGrid).removeAttr("disabled");
            $("#Serial" + CountGrid).removeAttr("disabled");




            $("#txtCode" + CountGrid).val(CountGrid + 1);

            $("#select_Type_Item" + CountGrid).prop('value', $("#drpPaymentType").val() == 'Null' ? '10101' : Number($("#drpPaymentType").val()));


            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode

            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");

            CountGrid++;
        }

        $("#btnedite").addClass("display_none");



    }


    function BuildControls(cnt: number) {

        var html;
        // 
        html = '<div id="No_Row' + cnt + '" class="container-fluid ">' +


            '<div class="row">' +
            '<div class="col-lg-12">' +
            '<span id = "btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3 display_none" disabled = "disabled"> </span>' +

            '<div class=" "><input id="txtID' + cnt + '" type="text" class="form-control right2 display_none" disabled=""></div>' +
            '<div class="col-lg-1"><input id="txtCode' + cnt + '" type="text" class="form-control right2 SelectDIS" disabled=""></div>' +
            '<div class="col-lg-2"><select id="select_Type_Item' + cnt + '" class="form-control" disabled=""></select></div> ' +
            '<div class="col-lg-2"><input id="txtDescA' + cnt + '" type="text" class="form-control right2" disabled=""></div> ' +
            '<div class="col-lg-1"><select id="dllType' + cnt + '" class="form-control" disabled="">  <option value="0">سلعة</option> <option value="1">خدمة</option></select></div> ' +
            '<div class="col-lg-1"><input id="txtOnhandQty' + cnt + '" type="number" disabled="" class="form-control right2 "></div> ' +
            '<div class="col-lg-1"><input id="txtPurchasing_price' + cnt + '" type="number" disabled="" class="form-control right2 "></div> ' +
            '<div class="col-lg-1"><input id="txtUnitPrice' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '<div class="col-lg-1"><input id="txtMinUnitPrice' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '<div class="col-lg-2"><input id="Serial' + cnt + '" type="number" disabled="" class="form-control right2 "></div> ' +

            '</div>' +
            '</div> ' +
            '<input id="txt_StatusFlag' + cnt + '" name=" " type="hidden" class="form-control" value=""> ' +
            '<input id="txtID' + cnt + '" name=" " type="hidden" class="form-control" value=""> ' +
            '</div> ';
        $("#div_Data").append(html);


        //Display_Type = Display_Filtr;

        $('#select_Type_Item' + cnt).append('<option value="10101">أختر الفئه</option>');
        for (var i = 0; i < Display_Type.length; i++) {
            $('#select_Type_Item' + cnt).append('<option value="' + Display_Type[i].ID_CAT + '">' + Display_Type[i].Name_CAT + '</option>');
        }


        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#txtCode" + cnt).on('change', function () {

        });
        $("#txtDescA" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            Validate_code(cnt);
        });
        $("#dllType" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");


            if ($("#dllType" + cnt).val() == '1') {

                $('#txtOnhandQty' + cnt).val('1');
                $('#txtPurchasing_price' + cnt).val('0');
                $('#Serial' + cnt).val('');

                $('#txtOnhandQty' + cnt).attr("disabled", "disabled");
                $('#txtPurchasing_price' + cnt).attr("disabled", "disabled");
                $('#Serial' + cnt).attr("disabled", "disabled");

            }
            else {

                $('#txtOnhandQty' + cnt).removeAttr("disabled");
                $('#txtPurchasing_price' + cnt).removeAttr("disabled");
                $('#Serial' + cnt).removeAttr("disabled");
                 
            }

           


        });
        $("#select_Type_Item" + cnt).on('change', function () {

            catId_type_change = $("#select_Type_Item" + cnt).val();

            $("#select_ItemFamily" + cnt).removeAttr("disabled");

            $('#select_ItemFamily' + cnt).html("");



            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtPurchasing_price" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtOnhandQty" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtMinUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");

            //debugger
            if ($("#txtUnitPrice" + cnt).val() == "" || $("#txtUnitPrice" + cnt).val() == 0) {
                MessageBox.Show('يجب أدخال سعر الصنف اوالاً', 'خطأ');
                $("#txtMinUnitPrice" + cnt).val(0)
            }
            else if (Number($("#txtMinUnitPrice" + cnt).val()) > Number($("#txtUnitPrice" + cnt).val())) {
                MessageBox.Show('يجب ان يكون أقل سعر اصغر من سعر الصنف', 'خطأ');
                $("#txtMinUnitPrice" + cnt).val($("#txtUnitPrice" + cnt).val() - 1)
            }


        });
        $("#Serial" + cnt).on('keyup', function () {

            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });



        if (SysSession.CurrentPrivileges.Remove) {
            //$("#btn_minus" + cnt).removeClass("display_none");
            //$("#btn_minus" + cnt).removeAttr("disabled");

            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }
        else {
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }






        return;
    }

    function btnsave_onClick() {

        if (Validation_Grid(CountGrid - 1))
            Update();
        flag_Assign = 0;
    }
    $('#drbfamilly_cat').on('change', function () {
        if ($('#drbfamilly_cat').val() == "Null") {
            $('#drpPaymentType').attr('disabled', 'disabled');
            $('#drpPaymentType').html('');
            $('#drpPaymentType').append('<option   value="null">اختر الفئه</option>');

            $("#div_Data").html('');
        } else {
            Display_Type = Display_Filtr.filter(x => x.ID_familly_Cat == Number($('#drbfamilly_cat').val()))
            DisplayStkDefCategory();
            $('#drpPaymentType').removeAttr('disabled');
        }

    });

    $('#drpPaymentType').on('change', function () {

        if ($('#drpPaymentType').val() == 'null') {
            $("#div_Data").html('');
        }
        else {
            Display();

        }

    });

    function Display_DrpPaymentType() {
        debugger;
        //var StkDefCategory: Array<CATEGRES> = new Array<CATEGRES>();  
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: { CompCode: compcode },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Display_Filtr = result.Response as Array<CATEGRES>;


                }
            }
        });
    }

    function DisplayStkDefCategory() {
        debugger;
        $('#drpPaymentType').html('');
        $('#drpPaymentType').append('<option   value="null">اختر الفئه</option>');
        for (var i = 0; i < Display_Type.length; i++) {

            $('#drpPaymentType').append('<option data-ItemID="' + Display_Type[i].Name_CAT + '" value="' + Display_Type[i].ID_CAT + '">' + Display_Type[i].Name_CAT + '</option>');


        }

    }

    function Displayfamilly() {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("familly_Cat", "GetAll"),
            data: { CompCode: compcode },
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Detailsfamilly = result.Response as Array<familly_Cat>;

                    DisplayStkDefCategoryfamilly();
                }
            }
        });
    }
    function DisplayStkDefCategoryfamilly() {
        debugger
        for (var i = 0; i < Detailsfamilly.length; i++) {

            $('#drbfamilly_cat').append('<option value="' + Detailsfamilly[i].ID_familly_Cat + '">' + Detailsfamilly[i].Name_familly_Cat + '</option>');


        }


    }


    function refresh() {


        $('#div_Data').html("");

        CountGrid = 0;


        ItemFamilyID = $('#drpitem_family').val();


        Display();
        flag_Assign = 0;

    }

    function Update() {
        Assign();




        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("Items", "Updat"),
            data: JSON.stringify(BilldDetail),
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    MessageBox.Show("تم الحفظ", "الحفظ");
                    btnback_onclick();

                    //refresh();
                    flag_Assign = 0;
                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }

    function Assign() {

        debugger;
        BilldDetail = new Array<PRODUCT>();
        var StatusFlag: String;
        for (var i = 0; i < CountGrid; i++) {
            Model = new PRODUCT();
            debugger
            StatusFlag = $("#txt_StatusFlag" + i).val();
            //$("#txt_StatusFlag" + i).val("");


            //debugger
            if (StatusFlag == "i") {
                //debugger
                Model.StatusFlag = StatusFlag.toString();
                Model.PRODUCT_ID = 0;
                Model.ID_CAT = Number($('#select_Type_Item' + i).val());
                Model.PRODUCT_NAME = $("#txtDescA" + i).val();
                Model.TrType = Number($("#dllType" + i).val());
                Model.PRODUCT_QET = Number($("#txtOnhandQty" + i).val());
                Model.PRODUCT_PRICE = Number($('#txtUnitPrice' + i).val());
                Model.MinUnitPrice = Number($('#txtMinUnitPrice' + i).val());
                Model.PRODUCT_Purchasing_price = Number($("#txtPurchasing_price" + i).val());
                Model.serial = $("#Serial" + i).val();

                BilldDetail.push(Model);

                flag_Assign = 1;

            }
            if (StatusFlag == "u") {
                debugger
                Model.StatusFlag = StatusFlag.toString();
                Model.PRODUCT_ID = Number($("#txtID" + i).val());
                Model.ID_CAT = Number($('#select_Type_Item' + i).val());
                Model.PRODUCT_NAME = $("#txtDescA" + i).val();
                Model.TrType = Number($("#dllType" + i).val());
                Model.PRODUCT_QET = Number($("#txtOnhandQty" + i).val());
                Model.PRODUCT_PRICE = Number($('#txtUnitPrice' + i).val());
                Model.MinUnitPrice = Number($('#txtMinUnitPrice' + i).val());
                Model.PRODUCT_Purchasing_price = Number($("#txtPurchasing_price" + i).val());
                Model.serial = $("#Serial" + i).val();

                BilldDetail.push(Model);
                flag_Assign = 1;


            }
            if (StatusFlag == "d") {
                //debugger

                if ($("#txtID" + i).val() != "") {

                    Model.StatusFlag = StatusFlag.toString();
                    Model.PRODUCT_ID = Number($("#txtID" + i).val());
                    BilldDetail.push(Model);
                    flag_Assign = 1;
                }


            }


        }
    }

    function Display_All() {

        ItemFamilyID = 0;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll"),
            data: { CompCode: 1 },
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    //debugger
                    Details = result.Response as Array<PRODUCT>;


                    Details_All();
                }
            }
        });

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
                    txt_ItemName.value = DetailsBar[0].PRODUCT_NAME;
                    $('#txt_PRODUCT_PRICE').val(DetailsBar[0].PRODUCT_PRICE);
                    $('#txt_MinUnitPrice').val(DetailsBar[0].MinUnitPrice);
                    $('#txt_PRODUCT_Purchasing_price').val(DetailsBar[0].PRODUCT_Purchasing_price);
                    PRODUCT_ID = DetailsBar[0].PRODUCT_ID;
                    ID_CAT_Old = DetailsBar[0].ID_CAT;
                    TrType = DetailsBar[0].TrType;

                }
                refresh();
            }
        });
    }
    function Vladshin_Popup() {

        if (txt_ItemName.value.trim() == '' ) {
            MessageBox.Show("برجاء ادخال الاسم", "تحزير");
            Errorinput(txt_ItemName);
            return false;
        } 
        if (txt_Quantity.value.trim() == '' || txt_Quantity.value == '0') {
            MessageBox.Show("برجاء ادخال الكميه", "تحزير");
            Errorinput(txt_Quantity); 
            return false;
        } 
        if ($('#txt_PRODUCT_Purchasing_price').val().trim() == '' || $('#txt_PRODUCT_Purchasing_price').val() == '0') {
            MessageBox.Show("برجاء ادخال سعر الشراء", "تحزير");
            Errorinput($('#txt_PRODUCT_Purchasing_price')); 
            return false;
        } 
        if ($('#txt_PRODUCT_PRICE').val().trim() == '' || $('#txt_PRODUCT_PRICE').val() == '0') {
            MessageBox.Show("برجاء ادخال السعر", "تحزير");
            Errorinput($('#txt_PRODUCT_PRICE')); 
            return false;
        } 
        if ($('#txt_MinUnitPrice').val().trim() == '' || $('#txt_MinUnitPrice').val() == '0') {
            MessageBox.Show("برجاء ادخال اقل سعر", "تحزير");
            Errorinput($('#txt_MinUnitPrice')); 
            return false;
        }

        return true;

    }
    function btnAddQty_onclick() {
      
        if (!Vladshin_Popup())  
            return 




        let Serial = txt_Barcode.value;
        let qty = Qtys + Number(txt_Quantity.value);


        Model = new PRODUCT();

        Model.serial = Serial;
        Model.PRODUCT_QET = qty;
        Model.PRODUCT_Purchasing_price = $('#txt_PRODUCT_Purchasing_price').val(); 
        Model.PRODUCT_PRICE = $('#txt_PRODUCT_PRICE').val();
        Model.MinUnitPrice = $('#txt_MinUnitPrice').val();
        Model.PRODUCT_NAME = txt_ItemName.value;
        Model.PRODUCT_ID = PRODUCT_ID;
        Model.ID_CAT = ID_CAT_Old; 
        Model.TrType = TrType; 
         

         
        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("Items", "UpdateQTy"),
            data: JSON.stringify(Model),
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    MessageBox.Show("تم التعديل", "الحفظ");
                    txt_ItemName.value = "";
                    txt_Quantity.value = "";
                    txt_Barcode.value = "";
                    $('#txt_PRODUCT_PRICE').val('');
                    $('#txt_MinUnitPrice').val('');
                    $('#txt_PRODUCT_Purchasing_price').val('');
                    PRODUCT_ID = 0;
                    ID_CAT_Old = 0;
                    refresh();
                }
                else { MessageBox.Show(result.ErrorMessage, "خطأ"); }
            }
        });

       
    }


    function Details_All() {


        CountGrid = 0;



        $("#div_Data").html('');
        for (var i = 0; i < Details.length; i++) {

            ID_CAT = Details[i].ID_CAT;

            BuildControls(CountGrid);



            $("#txtID" + i).val(Details[i].PRODUCT_ID);
            $("#txtCode" + i).val(i + 1);
            $("#txtDescA" + i).val(Details[i].PRODUCT_NAME);
            $("#dllType" + i).val(Details[i].TrType);
            $("#txtOnhandQty" + i).val(Details[i].PRODUCT_QET);
            $("#txtPurchasing_price" + i).val(Details[i].PRODUCT_Purchasing_price);
            $("#txtUnitPrice" + i).val(Details[i].PRODUCT_PRICE);
            $("#txtMinUnitPrice" + i).val(Details[i].MinUnitPrice);
            $("#Serial" + i).val(Details[i].serial);
            $('#select_Type_Item' + i).prop("value", Details[i].ID_CAT);

          
            if (Details[i].TrType == 1) {

                $("#txtOnhandQty" + i).addClass("lType");
                $("#txtPurchasing_price" + i).addClass("lType");
                $("#Serial" + i).addClass("lType");
                 

            }


            $("#txt_StatusFlag" + i).val("");




            CountGrid++;

        }






    }


    function Display() {
        //debugger

        var cate: number = $("#drpPaymentType").val();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll_Item_by_Cat"),
            data: {
                cat: cate
            },
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Details = result.Response as Array<PRODUCT>;



                    DisplayGetItemStore();
                }
            }
        });
    }

    function DisplayGetItemStore() {


        CountGrid = 0;



        $("#div_Data").html('');
        for (var i = 0; i < Details.length; i++) {

            BuildControls(CountGrid);



            $("#txtID" + i).val(Details[i].PRODUCT_ID);
            $("#txtCode" + i).val(i + 1);
            $("#txtDescA" + i).val(Details[i].PRODUCT_NAME);
            $("#dllType" + i).val(Details[i].TrType);
            $("#txtOnhandQty" + i).val(Details[i].PRODUCT_QET);
            $("#txtPurchasing_price" + i).val(Details[i].PRODUCT_Purchasing_price);
            $("#txtUnitPrice" + i).val(Details[i].PRODUCT_PRICE);
            $("#txtMinUnitPrice" + i).val(Details[i].MinUnitPrice);
            $("#Serial" + i).val(Details[i].serial);
            $('#select_Type_Item' + i).prop("value", Details[i].ID_CAT);

      

            if (Details[i].TrType == 1) {

                $("#txtOnhandQty" + i).addClass("lType");
                $("#txtPurchasing_price" + i).addClass("lType");
                $("#Serial" + i).addClass("lType");
                 

            }


            $("#txt_StatusFlag" + i).val("");

            CountGrid++;

        }






    }

    function DeleteRow(RecNo: number) {

        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {


            if ($("#txtCode" + RecNo).val() == "") {

                Null_Fild(RecNo);
                $("#No_Row" + RecNo).attr("hidden", "true");

            }
            else {


                $("#No_Row" + RecNo).attr("hidden", "true");

            }

            if ($("#txt_StatusFlag" + RecNo).val() == 'i') {
                $("#txt_StatusFlag" + RecNo).val("m");
            }
            else {
                $("#txt_StatusFlag" + RecNo).val("d");

            }
            //$("#txtCode" + RecNo).val("");
            $("#txtCode" + RecNo).val("000");
            $("#txtDescA" + RecNo).val("000");
            $("#dllType" + RecNo).val("000");
            $("#txtOnhandQty" + RecNo).val("000");
            $("#txtPurchasing_price" + RecNo).val("000");
            $("#txtUnitPrice" + RecNo).val("000");
            $("#txtMinUnitPrice" + RecNo).val("000");
        });
    }

    function Null_Fild(RecNo: number) {


        $("#txtID" + RecNo).val("");
        $("#txtCode" + RecNo).val("0");
        $("#txtDescA" + RecNo).val(0);
        $("#dllType" + RecNo).val(0);
        $("#txtRefItemCode" + RecNo).val(0);
        $("#txtOnhandQty" + RecNo).val(0);
        $("#txtLastBarCodeSeq" + RecNo).val(0);
        $("#txtLastBarCodeSeq" + RecNo).val(0);
        $('#select_Type_Item' + RecNo).prop("selectedIndex", 0);
        $('#select_ItemFamily' + RecNo).prop("selectedIndex", 0);
        //$("#txt_StatusFlag" + RecNo).val("");


    }

    function btnback_onclick() {


        if ($('#btnback').attr('class') != "btn btn-warning display_none") {
            $('#btnback').toggleClass("display_none");
        }
        if ($('#btnsave').attr('class') != "btn btn-success display_none") {
            $('#btnsave').toggleClass("display_none");
        }


        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none')
        $(".fa-minus-circle").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");

        $("#btnback").removeAttr("disabled");
        $("#btnsave").removeAttr("disabled");

        CountGrid = 0;
        $("#div_Data").html("");


        if ($("#drpPaymentType").val() == "Null") {
            Display_All();
        }
        else {
            Display();

        }


        $("#drpPaymentType").removeAttr("disabled");
        $("#drpitem_family").removeAttr("disabled");
        $("#drp_StocK").removeAttr("disabled");
        $("#drbfamilly_cat").removeAttr("disabled");

        $('#btnAddOldItem').removeClass("display_none");


    }

    function Validation_Grid(rowcount: number) {

        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;

        }
        else {

            if (($("#select_Type_Item" + rowcount).val() == "10101") && $("#txt_StatusFlag" + rowcount).val() != "d") {
                MessageBox.Show("برجاء اختار الفئة  ", "خطأ");
                Errorinput($("#select_Type_Item" + rowcount));

                return false;
            }
            if (
                ($("#txtDescA" + rowcount).val() == "") && $("#txt_StatusFlag" + rowcount).val() != "d") {
                MessageBox.Show("  برجاء ادخل الوصف العربي ", "خطأ");
                Errorinput($("#txtDescA" + rowcount));
                return false;
            } 
            if ($("#txtOnhandQty" + rowcount).val() == "") {
                MessageBox.Show("برجاء ادخل الكميه المتاحه", "خطأ");
                Errorinput($("#txtOnhandQty" + rowcount));

                return false;
            }
            if ($("#txtPurchasing_price" + rowcount).val() == "") {
                MessageBox.Show("برجاء ادخل سعر الشراء", "خطأ");
                Errorinput($("#txtPurchasing_price" + rowcount));

                return false;
            }
            if ($("#txtUnitPrice" + rowcount).val() == "") {
                MessageBox.Show(" برجاء ادخل السعر البيع", "خطأ");
                Errorinput($("#txtUnitPrice" + rowcount));

                return false;
            }
            if ($("#txtMinUnitPrice" + rowcount).val() == "") {
                MessageBox.Show("برجاء ادخل اقل سعر", "خطأ");
                Errorinput($("#txtMinUnitPrice" + rowcount));

                return false;
            }
        }

        return true;
    }

    function Validate_code(rowno: number) {

        for (var i = 0; i < CountGrid; i++) {
            if (i != rowno) {

                if ($("#txt_StatusFlag" + i).val() == "d" || $("#txt_StatusFlag" + i).val() == "d") {
                    return true;

                }
                else {

                    if ($("#txtDescA" + rowno).val() == $("#txtDescA" + i).val()) {

                        let Code = $("#txtDescA" + rowno).val();
                        $("#txtDescA" + rowno).val("");
                        WorningMessage("لا يمكن تكرار الصنف " + Code, "code cannot br repeated?", "تحذير", "worning", () => {
                            $("#txtDescA" + rowno).val("");
                            return false;
                        });
                    }

                }
            }
        }
        if ($("#txt_StatusFlag" + rowno).val() != "i") $("#txt_StatusFlag" + rowno).val("u");
        return true;
    }


}












