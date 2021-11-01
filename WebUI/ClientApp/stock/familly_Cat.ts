$(document).ready(() => {
    //debugger;
    familly_Cate.InitalizeComponent();
})
namespace familly_Cate {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var compcode: Number;
    var CountGrid = 0;
    var btnback: HTMLButtonElement;
    var btnNew_sub_Add_service: HTMLButtonElement;
    var btnsave: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var MSG_ID: number;
    var Details: Array<familly_Cat> = new Array<familly_Cat>();
    var Details1: Array<familly_Cat> = new Array<familly_Cat>();
    var Model: familly_Cat = new familly_Cat();
    export function InitalizeComponent() {
        debugger
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = " فئات الأصناف";

        } else {
            document.getElementById('Screen_name').innerHTML = "Item Category";

        }
        //debugger;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        Display();
    }








    function InitalizeControls() {
        //debugger;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnback = document.getElementById("btnback") as HTMLButtonElement;

        // Buton privialges for single record page



    }

    function InitalizeEvents() {
        debugger;
        btnAddDetails.onclick = AddNewRow;//
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
    }
                                              
    function Update() {
        debugger;
        Assign();
        debugger;


        if (Details.filter(x => x.Name_familly_Cat == "").length > 0) {
            MessageBox.Show(" يجب ادخال الوصف باعربي", "خطأ");
            return;
        }

       

        debugger;
        Ajax.Callsync({

            type: "POST",
            url: sys.apiUrl("familly_Cat", "UpdateLst"),
            data: JSON.stringify(Details),
            success: (d) => {
                debugger
                let result = d as BaseResponse;
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

        var StatusFlag: String;
        debugger
        Details = new Array<familly_Cat>();
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

        var CanAdd: boolean = true;
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
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign')

        for (var i = 0; i < CountGrid; i++) {

            $("#txtCode" + i).attr("disabled", "disabled");
        }

        $(".minus_btn").removeClass("display_none");
    }


    function btnback_onclick() {


        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none')
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
        var CanAdd: boolean = true;
        if (CountGrid > 0) {
            var LastRowNo = CountGrid - 1;
            CanAdd = Validation_Grid(LastRowNo);
        }
        if (CanAdd) {
            Update();
        }
    }
    function BuildControls(cnt: number) {
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
                    MessageBox.Show("لا يمكن تكرار اسم صنف", "خطأ")
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
    function DeleteRow(RecNo: number) {

        //if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
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
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("familly_Cat", "GetAll"),
            data: { CompCode: compcode },
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Details = result.Response as Array<familly_Cat>;

                    DisplayStkDefCategory();
                }
            }
        });
    }
    function DisplayStkDefCategory() {
        debugger
        for (var i = 0; i < Details.length; i++) {

            BuildControls(CountGrid);
            $("#txt_ID" + i).val(Details[i].ID_familly_Cat);
            $("#txtCode" + i).val(i + 1);
            $("#txtDescA" + i).val(Details[i].Name_familly_Cat);


            $("#txt_StatusFlag" + i).val("");
            CountGrid++;





        }

    }
    function Validation_Grid(rowcount: number) {


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
   

}