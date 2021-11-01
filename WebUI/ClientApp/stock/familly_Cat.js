$(document).ready(function () {
    //debugger;
    familly_Cate.InitalizeComponent();
});
var familly_Cate;
(function (familly_Cate) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var compcode;
    var CountGrid = 0;
    var btnback;
    var btnNew_sub_Add_service;
    var btnsave;
    var btnAddDetails;
    var btnEdit;
    var MSG_ID;
    var Details = new Array();
    var Details1 = new Array();
    var Model = new familly_Cat();
    function InitalizeComponent() {
        debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = " فئات الأصناف";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Item Category";
        }
        //debugger;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        Display();
    }
    familly_Cate.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //debugger;
        btnAddDetails = document.getElementById("btnAddDetails");
        btnEdit = document.getElementById("btnedite");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        // Buton privialges for single record page
    }
    function InitalizeEvents() {
        debugger;
        btnAddDetails.onclick = AddNewRow; //
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
    }
    function Update() {
        debugger;
        Assign();
        debugger;
        if (Details.filter(function (x) { return x.Name_familly_Cat == ""; }).length > 0) {
            MessageBox.Show(" يجب ادخال الوصف باعربي", "خطأ");
            return;
        }
        debugger;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("familly_Cat", "UpdateLst"),
            data: JSON.stringify(Details),
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    MessageBox.Show("تم الحفظ", "الحفظ");
                    btnback_onclick();
                    //BilldItemFamily = Details.filter(x => x.CatID == 0)
                    refresh();
                }
                else {
                    debugger;
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function refresh() {
        $('#div_Data').html("");
        CountGrid = 0;
        Display();
    }
    function Assign() {
        var StatusFlag;
        debugger;
        Details = new Array();
        for (var i = 0; i < CountGrid; i++) {
            Model = new familly_Cat();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            //$("#txt_StatusFlag" + i).val("");
            debugger;
            if (StatusFlag == "i") {
                Model.StatusFlag = StatusFlag.toString();
                Model.ID_familly_Cat = 0;
                Model.Name_familly_Cat = $("#txtDescA" + i).val();
                Details.push(Model);
            }
            if (StatusFlag == "u") {
                Model.StatusFlag = StatusFlag.toString();
                Model.ID_familly_Cat = $("#txt_ID" + i).val();
                Model.Name_familly_Cat = $("#txtDescA" + i).val();
                $("#txt_StatusFlag" + i).val("");
                Details.push(Model);
            }
            if (StatusFlag == "d") {
                if ($("#txt_ID" + i).val() != "") {
                    Model.StatusFlag = StatusFlag.toString();
                    Model.ID_familly_Cat = $("#txt_ID" + i).val();
                    Model.Name_familly_Cat = $("#txtDescA" + i).val();
                    Details.push(Model);
                }
            }
        }
    }
    function AddNewRow() {
        //debugger
        var CanAdd = true;
        if (CountGrid > 0) {
            var LastRowNo = CountGrid - 1;
            CanAdd = Validation_Grid(LastRowNo);
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            //$("#txtCode" + CountGrid).removeAttr("disabled");
            $("#txtCode" + CountGrid).val(CountGrid + 1);
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            // can delete new inserted record  without need for delete privilage
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            //$(".minus_btn").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            CountGrid++;
        }
        $("#btnedite").addClass("display_none");
    }
    function btnEdit_onclick() {
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $(".btnAddDetails").removeAttr("disabled");
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign');
        for (var i = 0; i < CountGrid; i++) {
            $("#txtCode" + i).attr("disabled", "disabled");
        }
        $(".minus_btn").removeClass("display_none");
    }
    function btnback_onclick() {
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none');
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").attr("disabled", "true");
        $(".minus_btn").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        $("#btnback").removeAttr("disabled");
        $("#btnsave").removeAttr("disabled");
        CountGrid = 0;
        $("#div_Data").html("");
        Display();
    }
    function btnsave_onClick() {
        //debugger;
        var CanAdd = true;
        if (CountGrid > 0) {
            var LastRowNo = CountGrid - 1;
            CanAdd = Validation_Grid(LastRowNo);
        }
        if (CanAdd) {
            Update();
        }
    }
    function BuildControls(cnt) {
        var html;
        debugger;
        html = '<div id="No_Row' + cnt + '" class="col-lg-12" ><div class="col-lg-12"><span id="btn_minus' + cnt + '" class="glyphicon glyphicon-remove-sign fontitm3  minus_btn"></span><div class="col-lg-1 style_pading"> <input id="txtCode' + cnt + '" type= "text" class="form-control right2 " disabled="disabled"/></div><div class="col-lg-4 style_pading"> <input id="txtDescA' + cnt + '" type= "text" class="form-control right3" disabled="disabled"/></div><div class="col-lg-4 style_pading"> <input id = "txt_StatusFlag' + cnt + '" name = " " type = "hidden" disabled class="form-control"/></div><div class="col-lg-12"> <input id = "txt_ID' + cnt + '" name = " " type = "hidden" class="form-control"/></div></div></div>';
        $("#div_Data").append(html);
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#txtDescA" + cnt).on('change', function () {
            for (var i = 0; i < Details.length; i++) {
                if ($("#txtDescA" + cnt).val() == Details[i].Name_familly_Cat) {
                    MessageBox.Show("لا يمكن تكرار اسم صنف", "خطأ");
                    $("#txtDescA" + cnt).val("");
                }
            }
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#btn_minus" + cnt).addClass("display_none");
        $("#btn_minus" + cnt).attr("disabled", "disabled");
        return;
    }
    function DeleteRow(RecNo) {
        //if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            debugger;
            if ($("#txt_StatusFlag" + RecNo).val() == 'i') {
                $("#txt_StatusFlag" + RecNo).val("m");
            }
            else {
                $("#txt_StatusFlag" + RecNo).val("d");
            }
            $("#No_Row" + RecNo).attr("hidden", "true");
            $("#txtDescA" + RecNo).val("00000");
            $("#txtCode" + RecNo).val("000");
        });
    }
    function Display() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("familly_Cat", "GetAll"),
            data: { CompCode: compcode },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    DisplayStkDefCategory();
                }
            }
        });
    }
    function DisplayStkDefCategory() {
        debugger;
        for (var i = 0; i < Details.length; i++) {
            BuildControls(CountGrid);
            $("#txt_ID" + i).val(Details[i].ID_familly_Cat);
            $("#txtCode" + i).val(i + 1);
            $("#txtDescA" + i).val(Details[i].Name_familly_Cat);
            $("#txt_StatusFlag" + i).val("");
            CountGrid++;
        }
    }
    function Validation_Grid(rowcount) {
        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;
        }
        else {
            if ($("#txtCode" + rowcount).val() == "") {
                MessageBox.Show("ادخل الكود", "خطأ");
                Errorinput($("#txtCode" + rowcount));
                return false;
            }
            if ($("#txtDescA" + rowcount).val() == "") {
                MessageBox.Show("ادخل الوصف بالعربي", "خطأ");
                Errorinput($("#txtDescA" + rowcount));
                return false;
            }
        }
        return true;
    }
})(familly_Cate || (familly_Cate = {}));
//# sourceMappingURL=familly_Cat.js.map