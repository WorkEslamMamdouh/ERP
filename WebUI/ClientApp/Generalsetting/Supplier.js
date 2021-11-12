$(document).ready(function () {
    AccDefVendor.InitalizeComponent();
});
var AccDefVendor;
(function (AccDefVendor) {
    // Arrays
    var AccountType = 2;
    var MSG_ID;
    var Details = new Array();
    var Display = new Array();
    var SearchDetails = new Array();
    var BilldIData = new Array();
    var Model = new Supplier();
    var ReportGrid = new JsGrid();
    var CashDetailsAr = new Array();
    var CashDetailsEn = new Array();
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var ID_Supplier;
    var txt_NAME;
    var txt_phone;
    var txt_Notes;
    var txt_Type_Supplier;
    var btnback;
    var btnShow;
    var btnAdd;
    var btnEdit;
    var btnsave;
    var searchbutmemreport;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var IsNew = false;
    var index;
    var Selecteditem;
    var CustomerIdUpdate = 0;
    var CustomerId;
    var sum_balance;
    var Debit;
    var Credit;
    var Valid = 0;
    var Update_claenData = 0;
    var txt_ID_APP_Category;
    function InitalizeComponent() {
        //debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الموردين";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Supplier";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        GetSupplier();
    }
    AccDefVendor.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category");
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnEdit = document.getElementById("btnedite");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        ID_Supplier = document.getElementById("txt_NAME");
        txt_NAME = document.getElementById("txt_NAME");
        txt_phone = document.getElementById("txt_NAME");
        txt_Notes = document.getElementById("txt_NAME");
        txt_Type_Supplier = document.getElementById("txt_NAME");
        searchbutmemreport = document.getElementById("searchbutmemreport");
    }
    function InitalizeEvents() {
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
        searchbutmemreport.onkeyup = _SearchBox_Change;
    }
    function GetSupplier() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Supplier", "GetAll"),
            data: { CompCode: compcode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    displaysupplier();
                }
            }
        });
    }
    function displaysupplier() {
        debugger;
        $('#txt_ID_APP_Category').html('');
        $('#txt_ID_APP_Category').append(' <option value="Null">اختر المورد</option>');
        for (var i = 0; i < Details.length; i++) {
            $('#txt_ID_APP_Category').append('<option data-ItemID="' + Details[i].Name_Supplier + '" value="' + Details[i].ID_Supplier + '">' + Details[i].Name_Supplier + '</option>');
        }
    }
    function Display_All() {
        //debugger;
        var ID_Supplier = $('#txt_ID_APP_Category').val();
        var Active = $('#txt_Active').val();
        if (ID_Supplier != 'Null' && Active == 2) {
            Display = Details.filter(function (s) { return s.ID_Supplier == ID_Supplier; });
        }
        if (ID_Supplier != 'Null' && Active != 2) {
            Display = Details.filter(function (s) { return s.ID_Supplier == ID_Supplier && s.IS_Active == Active; });
        }
        if (ID_Supplier == 'Null' && Active != 2) {
            Display = Details.filter(function (s) { return s.IS_Active == Active; });
        }
        if (ID_Supplier == 'Null' && Active == 2) {
            Display = Details;
        }
        for (var i = 0; i < Display.length; i++) {
            Display[i].IS_Active_Name = Display[i].IS_Active == false ? 'غير فعال' : 'فعال';
        }
        InitializeGrid();
        ReportGrid.DataSource = Display;
        ReportGrid.Bind();
    }
    function btnEdit_onclick() {
        IsNew = false;
        removedisabled();
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $("#txt_ID_Supplier").attr("disabled", "disabled");
        $("#id_div_Add").attr("disabled", "disabled").off('click');
        var x1 = $("#id_div_Add").hasClass("disabledDiv");
        (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        $(".btnAddDetails").removeAttr("disabled");
        $('#btnAddDetails').toggleClass("display_none");
        $(".fa-minus-circle").removeClass("display_none");
    }
    //onclick
    function btnAdd_onclick() {
        debugger;
        IsNew = true;
        EnableControls();
        removedisabled();
        $("#id_div_Add").attr("disabled", "disabled").off('click');
        var x1 = $("#id_div_Add").hasClass("disabledDiv");
        (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        //reference_Page();
    }
    function reference_Page() {
        $('#btnedite').attr('class', 'btn btn-primary display_none');
        $('#btnsave').attr('class', 'btn btn-success display_none');
        $('#btnback').attr('class', 'btn btn-success display_none');
        $('#btnAdd').attr('class', 'btn btn-primary display_none');
    }
    function btnsave_onClick() {
        debugger;
        if (IsNew == true) {
            Validation();
            if (Valid == 1) {
            }
            else {
                Insert();
                Update_claenData = 0;
                btnback_onclick();
                Display_All();
                //$("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
            }
        }
        else {
            Validation();
            if (Valid == 1) {
            }
            else {
                Update();
                Update_claenData = 1;
                btnback_onclick();
                Display_All();
                //$("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
            }
        }
    }
    function txt_disabled() {
        //debugger;
        $("#txt_Type_Supplier").attr("disabled", "disabled");
        $("#txt_ID_Supplier").attr("disabled", "disabled");
        $("#txt_NAME").attr("disabled", "disabled");
        $("#txt_IS_Active").attr("disabled", "disabled");
        $("#txt_phone").attr("disabled", "disabled");
        $("#txt_Notes").attr("disabled", "disabled");
    }
    function removedisabled() {
        //debugger;
        $("#txt_Type_Supplier").removeAttr("disabled");
        //$("#txt_ID_Supplier").removeAttr("disabled");
        $("#txt_NAME").removeAttr("disabled");
        $("#txt_IS_Active").removeAttr("disabled");
        $("#txt_phone").removeAttr("disabled");
        $("#txt_Notes").removeAttr("disabled");
    }
    function CustomerFoundBefore() {
        var res = true;
        var code = $('#txt_ID_Supplier').val();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Supplier", "GetAll_Item_by_Cat"),
            data: { code: code },
            success: function (d) {
                //debugger
                var result = d;
                if (result.Response == 0) {
                    res = true;
                }
                else
                    res = false;
            }
        });
        return res;
    }
    function Validation() {
        if ($('#txt_NAME').val() == "") {
            MessageBox.Show("يجب ادخال اسم المورد ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        if ($('#txt_phone').val() == 0) {
            MessageBox.Show("يجب ادخال الهاتف ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        return Valid = 0;
    }
    function btnShow_onclick() {
        Display_All();
    }
    function btnback_onclick() {
        Selecteditem = Details.filter(function (x) { return x.ID_Supplier == Number(ReportGrid.SelectedKey); });
        if (Selecteditem.length == 0) {
            IsNew = true;
        }
        if (IsNew == true) {
            $('#btnAddDetails').toggleClass("display_none");
            $('#btnsave').toggleClass("display_none");
            $('#btnback').toggleClass("display_none");
            $(".fa-minus-circle").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            $("#btnedite").removeAttr("disabled");
            txt_disabled();
            $("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
            $("#id_div_Add").attr("disabled", "");
            $("#id_div_Add").removeClass("disabledDiv");
        }
        else {
            $('#btnAddDetails').toggleClass("display_none");
            $('#btnsave').toggleClass("display_none");
            $('#btnback').toggleClass("display_none");
            $(".fa-minus-circle").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            $("#btnedite").removeAttr("disabled");
            txt_disabled();
            Update_claenData = 0;
            $("#id_div_Add").attr("disabled", "");
            $("#id_div_Add").removeClass("disabledDiv");
        }
        DriverDoubleClick();
    }
    function DriverDoubleClick() {
        ////debugger
        Selecteditem = Details.filter(function (s) { return s.ID_Supplier == Number(ReportGrid.SelectedKey); });
        DocumentActions.RenderFromModel(Selecteditem[0]);
        $('#btnedite').removeClass("display_none");
        $('#btnsave').addClass("display_none");
        $('#btnback').addClass("display_none");
        $('#btnedite').removeAttr("disabled");
        $('#txt_IS_Active').prop("value", Selecteditem[0].IS_Active == false ? 0 : 1);
        $("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
    }
    function EnableControls() {
        debugger;
        $("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
        $('#btnsave').removeClass("display_none");
        $('#btnback').removeClass("display_none");
        $('#btnedite').attr('class', 'btn btn-primary display_none');
        $('#txt_IS_Active').prop("selectedIndex", 0);
        ID_Supplier.value = "";
        txt_NAME.value = "";
        txt_phone.value = "";
        txt_Notes.value = "";
        txt_Type_Supplier.value = "";
    }
    function filter_DataSource() {
        ////debugger
        //var IsCredit_Type;
        //if ($('#txt_ID_APP_Type').val() == 0) {
        //    IsCredit_Type = false;
        //}
        //else {
        //    IsCredit_Type = true;
        //}
        //if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details;
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val())
        //}
        //else if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details.filter(x => x.GroupId == $('#txt_ID_APP_Group').val())
        //}
        //else if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    BilldIData = Details.filter(x => x.IsCreditVendor == IsCredit_Type)
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val() && x.GroupId == $('#txt_ID_APP_Group').val())
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val() && x.IsCreditVendor == IsCredit_Type)
        //}
        //else if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    BilldIData = Details.filter(x => x.GroupId == $('#txt_ID_APP_Group').val() && x.IsCreditVendor == IsCredit_Type)
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    //debugger
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val() && x.GroupId == $('#txt_ID_APP_Group').val() && x.Isactive == $('#txt_ID_APP_Type').val())
        //}
        //filter_balance();
    }
    function _SearchBox_Change() {
        debugger;
        if (searchbutmemreport.value != "") {
            var search_1 = searchbutmemreport.value.toLowerCase();
            SearchDetails = Display.filter(function (x) { return x.Name_Supplier.toLowerCase().search(search_1) >= 0 || x.phone.toString().search(search_1) >= 0 || x.Type_Supplier.toString().search(search_1) >= 0; });
            ReportGrid.DataSource = SearchDetails;
            ReportGrid.Bind();
        }
        else {
            ReportGrid.DataSource = Display;
            ReportGrid.Bind();
        }
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        $("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "ID_Supplier";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 10;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.OnItemEditing = function () { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "ID_Supplier", type: "text", width: "100px", visible: false },
            { title: "الاسم", name: "Name_Supplier", type: "text", width: "100px" },
            { title: "رقم الجوال", name: "phone", type: "text", width: "100px" },
            { title: "النوع", name: "Type_Supplier", type: "text", width: "100px" },
            { title: "ملاحظات", name: "Notes", type: "text", width: "100px" },
            { title: "مفعل", name: "IS_Active_Name", type: "textdd", width: "100px" },
        ];
        ReportGrid.Bind();
    }
    function Assign() {
        debugger;
        DocumentActions.AssignToModel(Model); //Insert Update    
        Model.ID_Supplier = IsNew == true ? 0 : $('#txt_ID_Supplier').val();
        Model.Type_Supplier = $('#txt_Type_Supplier').val();
        Model.Name_Supplier = $('#txt_NAME').val();
        Model.IS_Active = $('#txt_IS_Active').val() == '1' ? true : false;
        Model.phone = $('#txt_phone').val();
        Model.Notes = $('#txt_Notes').val();
    }
    function Insert() {
        Assign();
        debugger;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Supplier", "Insert"),
            data: JSON.stringify(Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    MessageBox.Show("تم الحفظ بنجاح", "Success");
                    GetSupplier();
                    displaysupplier();
                    Display_All();
                    Valid = 0;
                }
                else {
                    MessageBox.Show("خطأء", "Error");
                }
            }
        });
    }
    function Update() {
        Assign();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Supplier", "Update"),
            data: JSON.stringify(Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    MessageBox.Show("تم التعديل بنجاح", "Success");
                    GetSupplier();
                    displaysupplier();
                    Display_All();
                    Valid = 0;
                }
                else {
                    MessageBox.Show("خطأء", "Error");
                }
            }
        });
    }
})(AccDefVendor || (AccDefVendor = {}));
//# sourceMappingURL=Supplier.js.map