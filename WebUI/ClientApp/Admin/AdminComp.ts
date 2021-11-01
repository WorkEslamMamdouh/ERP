$(document).ready(() => {

    AdminComp.InitalizeComponent();
})

namespace AdminComp {

    var compcode: Number;
    var AccountType: Number = 1;
    var sys: SystemTools = new SystemTools();
    var link = 'http://localhost:51374/';
    var SysSession: SystemSession = GetSystemSession();
    //var lang = (SysSession.CurrentEnvironment.ScreenLanguage);


    //////////////////////////////////////////////////////////////////////////


    var txt_COMP_CODE: HTMLInputElement;
    var txt_NameA: HTMLInputElement;
    var txt_NameE: HTMLInputElement;
    var txt_Tel: HTMLInputElement;
    var txt_Email: HTMLInputElement;
    var txt_GMName: HTMLInputElement;
    var txt_Address: HTMLInputElement;
    var txt_GroupVatNo: HTMLInputElement;
    var txt_VATNO: HTMLInputElement;
    var txt_IDNo: HTMLInputElement;
    var ddl_IdType: HTMLSelectElement;
    var txt_LogoIcon: HTMLInputElement;
    var txt_BkImage1: HTMLInputElement;
    var txt_BkImage2: HTMLInputElement;
    var ddl_Country: HTMLSelectElement;
    var ddl_Currency: HTMLSelectElement;
    var txt_Address_Province: HTMLInputElement;
    var txt_Address_City: HTMLInputElement;
    var txt_Address_District: HTMLInputElement;
    var txt_Address_Street: HTMLInputElement;
    var txt_Address_Str_Additional: HTMLInputElement;
    var txt_Address_BuildingNo: HTMLInputElement;
    var txt_Address_Build_Additional: HTMLInputElement;
    var txt_Address_Postal: HTMLInputElement;
    var searchbutmemreport: HTMLInputElement;


    var chk_IsActive: HTMLInputElement;


    var btnSave: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;

    ///////////secondDiv
    var btnSave2: HTMLButtonElement;
    var btnBack2: HTMLButtonElement;
    var btnEdit2: HTMLButtonElement;

    var chk_EMAIL_SSL: HTMLInputElement;
    var chk_EMAIL_Authentication: HTMLInputElement;
    var txt_EMAIL_Sender: HTMLInputElement;
    var txt_EMAIL_SenderPassword: HTMLInputElement;
    var txt_EMAIL_SenderSMTP: HTMLInputElement;
    var txt_EMAIL_SendorPort: HTMLInputElement;
    var txt_EMAIL_SenderName: HTMLInputElement;
    var txt_EmailMaxDaily: HTMLInputElement;
    var txt_SMS_Provider: HTMLInputElement;
    var txt_SMS_UserName: HTMLInputElement;
    var txt_SMS_Password: HTMLInputElement;
    var txt_SMS_SenderName: HTMLInputElement;
    // var txt_MobileNoPreFex      : HTMLInputElement;


    //////////ThirdDiv
    var btnSave3: HTMLButtonElement;
    var btnBack3: HTMLButtonElement;
    var btnEdit3: HTMLButtonElement;

    var chk_SendSMS: HTMLInputElement;
    var chk_SendPublicSMS: HTMLInputElement;
    var chk_IsVat: HTMLInputElement;
    var chk_GL_VoucherCCType: HTMLInputElement;
    var chk_GL_VoucherCCDT_Type: HTMLInputElement;
    var chk_GL_JournalSaveUnbalanced: HTMLInputElement;
    var chk_IsLocalBranchCustomer: HTMLInputElement;
    var chk_IvoiceDateEditable: HTMLInputElement;
    var chk_InvoiceWithoutCust: HTMLInputElement;
    var chk_InvoiceLineDiscount: HTMLInputElement;
    var chk_InvoiceLineAllowance: HTMLInputElement;
    var chk_InvoiceTotalAllowance: HTMLInputElement;
    var chk_InvoiceTotalCharge: HTMLInputElement;
    var chk_OperationPriceWithVAT: HTMLInputElement;
    var chk_SalesPriceWithVAT: HTMLInputElement;
    var chk_sendEmail: HTMLInputElement;
    var chk_sendshopEmail: HTMLInputElement;
    var chk_incoming: HTMLInputElement;
    var chk_GL_VoucherCCDT_Type2: HTMLInputElement;
    var chk_all: HTMLInputElement;

    var txt_MobileLength: HTMLInputElement;
    var txt_IDLength: HTMLInputElement;
    var txt_MaxYearlyMSGs: HTMLInputElement;
    var txt_UsedMSGs: HTMLInputElement;
    var txt_NotePeriodinSec: HTMLInputElement;
    var txt_DashBoardPeriodinSec: HTMLInputElement;
    var txt_SysTimeOut: HTMLInputElement;
    var ddl_DefSlsVatType: HTMLSelectElement;
    var ddl_DefPurVatType: HTMLSelectElement;
    var txt_MembeshipEndDate: HTMLInputElement;
    var txt_MembershipAllanceDays: HTMLInputElement;
    var txt_MembershipreadOnlyDays: HTMLInputElement;
    var ddl_Gl_JournalOpenType: HTMLSelectElement;
    var txt_GL_JournalMonthlyNo: HTMLInputElement;
    var txt_GL_JournalMonthlyNoWidth: HTMLInputElement;
    var ddl_InvoiceTypeCode: HTMLSelectElement;
    var ddl_InvoiceTransCode: HTMLSelectElement;
    var txt_ExceedMinPricePassword: HTMLInputElement;
    var txt_MembeshiptStartDate: HTMLInputElement;


    var IsNew = true;
    var comp_CODE = 0;

    //------------------------------------------------------------

    var Grid: JsGrid = new JsGrid();
    var COMPANY: Array<G_COMPANY> = new Array<G_COMPANY>();
    var Model: G_COMPANY = new G_COMPANY();
    var CodesTypes: Array<G_Codes> = new Array<G_Codes>();
    var CountryFilter: Array<G_Nationality> = new Array<G_Nationality>();
    var CurrencyFilter: Array<G_Currency> = new Array<G_Currency>();
    var SelecteData: Array<G_COMPANY> = new Array<G_COMPANY>();
    var SelecteDataComp: Array<G_COMPANY> = new Array<G_COMPANY>();
    var SerDet: Array<G_COMPANY> = new Array<G_COMPANY>();


    var IControl: Array<I_Control> = new Array<I_Control>();
    var GAlertControl: Array<G_AlertControl> = new Array<G_AlertControl>();
    var GAlertControlFilter: Array<G_AlertControl> = new Array<G_AlertControl>();
    var IControlFilter: Array<I_Control> = new Array<I_Control>();

    var Model_GAlertControl: G_AlertControl = new G_AlertControl();
    var Model_IControl: I_Control = new I_Control();

    var ddl_AllDefVatTypeFilter: Array<A_D_VAT_TYPE> = new Array<A_D_VAT_TYPE>();
    var ddl_DefSlsVatTypeFilter: Array<A_D_VAT_TYPE> = new Array<A_D_VAT_TYPE>();
    var ddl_DefPurVatTypeFilter: Array<A_D_VAT_TYPE> = new Array<A_D_VAT_TYPE>();
    var ddl_Gl_JournalOpenTypeFilter: Array<A_Voucher_Types> = new Array<A_Voucher_Types>();
    var ddl_AllInvoiceCodeFilter: Array<G_Codes> = new Array<G_Codes>();
    var ddl_InvoiceTypeCodeFilter: Array<G_Codes> = new Array<G_Codes>();
    var ddl_InvoiceTransCodeFilter: Array<G_Codes> = new Array<G_Codes>();




    export function InitalizeComponent() {
        try {

            InitalizeControls();
            InitalizeEvents();
            InitializeGrid();
            Fillddl_IdType();
            Fillddl_Country();
            Fillddl_Currency();
            Disabled();
            DisabledSecondDiv();
            DisabledThirdDiv();
            // $("#divcompinformtion").addClass("display_none");
            //$("#SecondDiv").addClass("disabledDiv");
            //$("#ThirdDiv").addClass("disabledDiv");
            Fillddl_DefSlsVatType();
            Fillddl_Gl_JournalOpenTypeFilter();
            Fillddl_InvoiceTypeCodeFilter();
            $("#btnEdit").addClass("display_none");
            $("#btnEdit2").addClass("display_none");
            $("#btnEdit3").addClass("display_none");
        
            Clear();
            CLearSecondDiv();
            clearThirdDiv();
        } catch (e) {
            MessageBox.Show("      يجب معاودة الدخول مرة اخري بستخدم الاسم وكلمة السر", "You must log in again using your name and password ", function () {
                window.location.href = "/Login/LoginIndex";

            }), 1000;
        }






    }

    function InitalizeControls() {
          chk_IsActive = document.getElementById("chk_IsActive") as HTMLInputElement;
        txt_COMP_CODE = document.getElementById("txt_COMP_CODE") as HTMLInputElement;
        txt_NameA = document.getElementById("txt_NameA") as HTMLInputElement;
        txt_NameE = document.getElementById("txt_NameE") as HTMLInputElement;
        txt_Tel = document.getElementById("txt_Tel") as HTMLInputElement;
        txt_Email = document.getElementById("txt_Email") as HTMLInputElement;
        txt_GMName = document.getElementById("txt_GMName") as HTMLInputElement;
        txt_Address = document.getElementById("txt_Address") as HTMLInputElement;
        txt_GroupVatNo = document.getElementById("txt_GroupVatNo") as HTMLInputElement;
        txt_VATNO = document.getElementById("txt_VATNO") as HTMLInputElement;
        txt_IDNo = document.getElementById("txt_IDNo") as HTMLInputElement;
        ddl_IdType = document.getElementById("txt_IdType") as HTMLSelectElement;
        txt_LogoIcon = document.getElementById("txt_LogoIcon") as HTMLInputElement;
        txt_BkImage1 = document.getElementById("txt_BkImage1") as HTMLInputElement;
        txt_BkImage2 = document.getElementById("txt_BkImage2") as HTMLInputElement;
        ddl_Country = document.getElementById("txt_Country") as HTMLSelectElement;
        ddl_Currency = document.getElementById("txt_Currency") as HTMLSelectElement;
        txt_Address_Province = document.getElementById("txt_Address_Province") as HTMLInputElement;
        txt_Address_City = document.getElementById("txt_Address_City") as HTMLInputElement;
        txt_Address_District = document.getElementById("txt_Address_District") as HTMLInputElement;
        txt_Address_Street = document.getElementById("txt_Address_Street") as HTMLInputElement;
        txt_Address_Str_Additional = document.getElementById("txt_Address_Str_Additional") as HTMLInputElement;
        txt_Address_BuildingNo = document.getElementById("txt_Address_BuildingNo") as HTMLInputElement;
        txt_Address_Build_Additional = document.getElementById("txt_Address_Build_Additional") as HTMLInputElement;
        txt_Address_Postal = document.getElementById("txt_Address_Postal") as HTMLInputElement;
        searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;


        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnEdit = document.getElementById("btnEdit") as HTMLButtonElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;

        ///////////secondDiv
        btnSave2 = document.getElementById("btnSave2") as HTMLButtonElement;
        btnBack2 = document.getElementById("btnBack2") as HTMLButtonElement;
        btnEdit2 = document.getElementById("btnEdit2") as HTMLButtonElement;

        txt_EMAIL_Sender = document.getElementById("txt_EMAIL_Sender") as HTMLInputElement;
        txt_EMAIL_SenderPassword = document.getElementById("txt_EMAIL_SenderPassword") as HTMLInputElement;
        txt_EMAIL_SenderSMTP = document.getElementById("txt_EMAIL_SenderSMTP") as HTMLInputElement;
        txt_EMAIL_SendorPort = document.getElementById("txt_EMAIL_SendorPort") as HTMLInputElement;
        txt_EMAIL_SenderName = document.getElementById("txt_EMAIL_SenderName") as HTMLInputElement;
        txt_EmailMaxDaily = document.getElementById("txt_EmailMaxDaily") as HTMLInputElement;
        txt_SMS_Provider = document.getElementById("txt_SMS_Provider") as HTMLInputElement;
        txt_SMS_UserName = document.getElementById("txt_SMS_UserName") as HTMLInputElement;
        txt_SMS_Password = document.getElementById("txt_SMS_Password") as HTMLInputElement;
        txt_SMS_SenderName = document.getElementById("txt_SMS_SenderName") as HTMLInputElement;
        // txt_MobileNoPreFex = document.getElementById("txt_MobileNoPreFex") as HTMLInputElement;
        chk_EMAIL_SSL = document.getElementById("chk_EMAIL_SSL") as HTMLInputElement;
        chk_EMAIL_Authentication = document.getElementById("chk_EMAIL_Authentication") as HTMLInputElement;

        //////////ThirdDiv
        btnSave3 = document.getElementById("btnSave3") as HTMLButtonElement;
        btnBack3 = document.getElementById("btnBack3") as HTMLButtonElement;
        btnEdit3 = document.getElementById("btnEdit3") as HTMLButtonElement;

        txt_MobileLength = document.getElementById("txt_MobileLength") as HTMLInputElement;
        txt_IDLength = document.getElementById("txt_IDLength") as HTMLInputElement;
        txt_MaxYearlyMSGs = document.getElementById("txt_MaxYearlyMSGs") as HTMLInputElement;
        txt_UsedMSGs = document.getElementById("txt_UsedMSGs") as HTMLInputElement;
        txt_NotePeriodinSec = document.getElementById("txt_NotePeriodinSec") as HTMLInputElement;
        txt_DashBoardPeriodinSec = document.getElementById("txt_DashBoardPeriodinSec") as HTMLInputElement;
        txt_SysTimeOut = document.getElementById("txt_SysTimeOut") as HTMLInputElement;
        ddl_DefSlsVatType = document.getElementById("ddl_DefSlsVatType") as HTMLSelectElement;
        ddl_DefPurVatType = document.getElementById("ddl_DefPurVatType") as HTMLSelectElement;
        txt_MembeshipEndDate = document.getElementById("txt_MembeshipEndDate") as HTMLInputElement;
        txt_MembershipAllanceDays = document.getElementById("txt_MembershipAllanceDays") as HTMLInputElement;
        txt_MembershipreadOnlyDays = document.getElementById("txt_MembershipreadOnlyDays") as HTMLInputElement;
        ddl_Gl_JournalOpenType = document.getElementById("ddl_Gl_JournalOpenType") as HTMLSelectElement;
        txt_GL_JournalMonthlyNo = document.getElementById("txt_GL_JournalMonthlyNo") as HTMLInputElement;
        txt_GL_JournalMonthlyNoWidth = document.getElementById("txt_GL_JournalMonthlyNoWidth") as HTMLInputElement;
        ddl_InvoiceTypeCode = document.getElementById("ddl_InvoiceTypeCode") as HTMLSelectElement;
        ddl_InvoiceTransCode = document.getElementById("ddl_InvoiceTransCode") as HTMLSelectElement;
        txt_ExceedMinPricePassword = document.getElementById("txt_ExceedMinPricePassword") as HTMLInputElement;
        txt_MembeshiptStartDate = document.getElementById("txt_MembeshiptStartDate") as HTMLInputElement;
        chk_incoming = document.getElementById("chk_incoming") as HTMLInputElement;
        chk_GL_VoucherCCDT_Type2 = document.getElementById("chk_GL_VoucherCCDT_Type2") as HTMLInputElement;
        chk_all = document.getElementById("chk_all") as HTMLInputElement;


        chk_SendSMS = document.getElementById("chk_SendSMS") as HTMLInputElement;
        chk_SendPublicSMS = document.getElementById("chk_SendPublicSMS") as HTMLInputElement;
        chk_IsVat = document.getElementById("chk_IsVat") as HTMLInputElement;
        chk_GL_VoucherCCType = document.getElementById("chk_GL_VoucherCCType") as HTMLInputElement;
        chk_GL_VoucherCCDT_Type = document.getElementById("chk_GL_VoucherCCDT_Type") as HTMLInputElement;
        chk_GL_JournalSaveUnbalanced = document.getElementById("chk_GL_JournalSaveUnbalanced") as HTMLInputElement;
        chk_IsLocalBranchCustomer = document.getElementById("chk_IsLocalBranchCustomer") as HTMLInputElement;
        chk_IvoiceDateEditable = document.getElementById("chk_IvoiceDateEditable") as HTMLInputElement;
        chk_InvoiceWithoutCust = document.getElementById("chk_InvoiceWithoutCust") as HTMLInputElement;
        chk_InvoiceLineDiscount = document.getElementById("chk_InvoiceLineDiscount") as HTMLInputElement;
        chk_InvoiceLineAllowance = document.getElementById("chk_InvoiceLineAllowance") as HTMLInputElement;
        chk_InvoiceTotalAllowance = document.getElementById("chk_InvoiceTotalAllowance") as HTMLInputElement;
        chk_InvoiceTotalCharge = document.getElementById("chk_InvoiceTotalCharge") as HTMLInputElement;
        chk_OperationPriceWithVAT = document.getElementById("chk_OperationPriceWithVAT") as HTMLInputElement;
        chk_SalesPriceWithVAT = document.getElementById("chk_SalesPriceWithVAT") as HTMLInputElement;
        chk_sendEmail = document.getElementById("chk_sendEmail") as HTMLInputElement;
        chk_sendshopEmail = document.getElementById("chk_sendshopEmail") as HTMLInputElement;


    }

    function InitalizeEvents() {

        btnAdd.onclick = btnAdd_onclick;
        btnSave.onclick = btnSave_onclick;
        btnBack.onclick = btnBack_onclick
        btnEdit.onclick = btnEdit_onclick
        searchbutmemreport.onkeyup = SearchBox;

        btnEdit2.onclick = btnEdit2_onclick;
        btnBack2.onclick = btnBack2_onclick;

        btnEdit3.onclick = btnEdit3_onclick;
        btnBack3.onclick = btnBack3_onclick;

        btnSave2.onclick = btnSave2_onclick;
        btnSave3.onclick = btnSave3_onclick;
    }

    function InitializeGrid() {

        let res: any = GetResourceList("");
        Grid.ElementName = "divGridDetails";
        Grid.Paging = true;
        Grid.PageSize = 10;
        Grid.Sorting = true;
        Grid.Editing = false;
        Grid.Inserting = false;
        Grid.SelectedIndex = 1;
        Grid.OnRowDoubleClicked = Grid_RowDoubleClicked;
        Grid.OnItemEditing = () => { };
        Grid.PrimaryKey = "COMP_CODE";
        Grid.Columns = [
            { title: res.App_Number, name: "COMP_CODE", type: "text", width: "2%", visible: false },
            { title: "رقم الفرع", name: "COMP_CODE", type: "text", width: "13%" },
            { title: "اسم الفرع", name: "NameA", type: "text", width: "12%" },
            { title: "رقم الموبيل", name: "Tel", type: "text", width: "20%" },
            { title: "الحالة", name: "NameActive", type: "text", width: "20%" },
            //  { title: "الحالة", name: COMPANY[0].IsActive == true ? "تم" : "لا" , type: "text", width: "20%" },
        ];
        BindGrid();
    }

    GAlertControl
    ///////  BIND   ////////////////////////////////////////////////

    function BindGrid() {

        $('#divShow').removeClass("display_none");

        var COMP_CODE = 0;

        Ajax.Callsync({
            type: "Get",
            url: link + "GComp/GetAll",
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    COMPANY = result.Response as Array<G_COMPANY>;

                    for (let i = 0; i < COMPANY.length; i++) {
                        COMPANY[i].NameActive = COMPANY[i].IsActive == true ? "مفعلة" : "غير مفعلة"; 
                    }


                    Grid.DataSource = COMPANY;
                    Grid.Bind();


                }
            }
        });


    }

    function BindIControlGrid() {

        var COMP_CODE = Number(Grid.SelectedKey);

        Ajax.Callsync({
            type: "Get",
            url: link + "I_Control/GetAll",
            data: { CompCode: COMP_CODE },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    IControl = result.Response as Array<I_Control>;
                    IControlFilter = IControl.filter(x => x.CompCode == COMP_CODE);
                    chk_SendSMS.checked = IControl[0].SendSMS;
                    chk_SendPublicSMS.checked = IControl[0].SendPublicSMS; ``
                    chk_IsVat.checked = IControl[0].SendSMS;
                    chk_GL_VoucherCCType.checked = IControl[0].SendSMS;
                    chk_GL_VoucherCCDT_Type.checked = IControl[0].SendSMS;
                    chk_GL_JournalSaveUnbalanced.checked = IControl[0].SendSMS;
                    chk_IsLocalBranchCustomer.checked = IControl[0].SendSMS;
                    chk_IvoiceDateEditable.checked = IControl[0].SendSMS;
                    chk_InvoiceWithoutCust.checked = IControl[0].SendSMS;
                    chk_InvoiceLineDiscount.checked = IControl[0].SendSMS;
                    chk_InvoiceLineAllowance.checked = IControl[0].SendSMS;
                    chk_InvoiceTotalAllowance.checked = IControl[0].SendSMS;
                    chk_InvoiceTotalCharge.checked = IControl[0].SendSMS;
                    chk_OperationPriceWithVAT.checked = IControl[0].SendSMS;
                    chk_SalesPriceWithVAT.checked = IControl[0].SendSMS;
                    chk_sendEmail.checked = IControl[0].SendSMS;
                    chk_sendshopEmail.checked = IControl[0].SendSMS;
                    chk_incoming.checked = IControl[0].SendSMS;
                    chk_GL_VoucherCCDT_Type2.checked = IControl[0].SendSMS;
                    chk_all.checked = IControl[0].SendSMS;
                    txt_MobileLength.value = IControl[0].MobileLength.toString();
                    txt_IDLength.value = IControl[0].IDLength.toString();
                    txt_MaxYearlyMSGs.value = IControl[0].MaxYearlyMSGs.toString();
                    txt_UsedMSGs.value = IControl[0].UsedMSGs.toString();
                    txt_NotePeriodinSec.value = IControl[0].NotePeriodinSec.toString();
                    txt_DashBoardPeriodinSec.value = IControl[0].DashBoardPeriodinSec.toString();
                    txt_SysTimeOut.value = IControl[0].SysTimeOut.toString();
                    ddl_DefSlsVatType.value = IControl[0].DefSlsVatType.toString();
                    ddl_DefPurVatType.value = IControl[0].DefPurVatType.toString();
                    txt_MembeshipEndDate.value = DateFormat(IControl[0].MembeshipEndDate);
                    txt_MembershipAllanceDays.value = IControl[0].MembershipAllanceDays.toString();
                    txt_MembershipreadOnlyDays.value = IControl[0].MembershipreadOnlyDays.toString();
                    ddl_Gl_JournalOpenType.value = IControl[0].Gl_JournalOpenType.toString();
                    txt_GL_JournalMonthlyNo.value = IControl[0].GL_JournalMonthlyNo.toString();
                    txt_GL_JournalMonthlyNoWidth.value = IControl[0].GL_JournalMonthlyNoWidth == null ? '' : IControl[0].GL_JournalMonthlyNoWidth.toString();
                    ddl_InvoiceTypeCode.value = IControl[0].InvoiceTypeCode.toString();
                    ddl_InvoiceTransCode.value = IControl[0].InvoiceTransCode.toString();
                    txt_ExceedMinPricePassword.value = IControl[0].ExceedMinPricePassword.toString();
                    txt_MembeshiptStartDate.value = DateFormat(IControl[0].MembeshiptStartDate);


                }
            }
        });

    }

    function BindGAlertControlGrid() {
        debugger
        var COMP_CODE = Number(Grid.SelectedKey);
        Ajax.Callsync({
            type: "Get",
            url: link + "GAlertControl/GetAll",
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    GAlertControl = result.Response as Array<G_AlertControl>;
                    GAlertControlFilter = GAlertControl.filter(X => X.Compcode == COMP_CODE);
                    chk_EMAIL_SSL.checked = GAlertControlFilter[0].EMAIL_SSL;
                    chk_EMAIL_Authentication.checked = GAlertControlFilter[0].EMAIL_Authentication;
                    txt_EMAIL_Sender.value = GAlertControlFilter[0].EMAIL_Sender.toString();
                    txt_EMAIL_SenderPassword.value = GAlertControlFilter[0].EMAIL_SenderPassword.toString();
                    txt_EMAIL_SenderSMTP.value = GAlertControlFilter[0].EMAIL_SenderSMTP.toString();
                    txt_EMAIL_SendorPort.value = GAlertControlFilter[0].EMAIL_SendorPort.toString();
                    txt_EMAIL_SenderName.value = GAlertControlFilter[0].EMAIL_SenderName.toString();
                    txt_EmailMaxDaily.value = GAlertControlFilter[0].EmailMaxDaily.toString();
                    txt_SMS_Provider.value = GAlertControlFilter[0].SMS_Provider.toString();
                    txt_SMS_UserName.value = GAlertControlFilter[0].SMS_UserName.toString();
                    txt_SMS_Password.value = GAlertControlFilter[0].SMS_Password.toString();
                    txt_SMS_SenderName.value = GAlertControlFilter[0].SMS_SenderName.toString();
                    //txt_MobileNoPreFex.value = GAlertControlFilter[0].MobileNoPreFex.toString();

                }
            }
        });

    }

    ////////////////////////////////////////////////////////////////
    function Grid_RowDoubleClicked() {
        debugger
        $("#divGrid").removeClass("display_none");
        $("#btnEdit").removeClass("display_none");
        $("#btnEdit2").removeClass("display_none");
        $("#btnEdit3").removeClass("display_none");
        $("#btnSave").addClass("display_none");
        $("#btnBack").addClass("display_none");
        $("#btnSave2").addClass("display_none");
        $("#btnBack2").addClass("display_none");
        $("#btnSave3").addClass("display_none");
        $("#btnBack3").addClass("display_none");

        // $('#divcompinformtion').removeClass("display_none");
        SelecteData = COMPANY.filter(x => x.COMP_CODE == Number(Grid.SelectedKey));
        DocumentActions.RenderFromModel(SelecteData[0]);

        ddl_IdType.value = SelecteData[0].VndIDTypeCode == null ? 'null' : SelecteData[0].VndIDTypeCode.toString();
        ddl_Country.value = SelecteData[0].NationalityID == null ? 'null' : SelecteData[0].NationalityID.toString();
        ddl_Currency.value = SelecteData[0].Currencyid == null ? 'null' : SelecteData[0].Currencyid.toString();
        Disabled();
        BindIControlGrid();
        BindGAlertControlGrid();

    }

    function succes() {
        BindGrid();
        Disabled();
        // $("#divcompinformtion").removeClass("display_none");
        $("#btnEdit").removeClass("display_none");
        $("#divGrid").removeClass("disabledDiv");
        $("#btnBack").addClass("display_none");
        $("#btnSave").addClass("display_none");
        if (IsNew == false) {
            Grid_RowDoubleClicked();
        }
        else {
            $("#divGrid").removeClass("display_none");
            $("#btnEdit").removeClass("display_none");
            $("#btnSave").addClass("display_none");
            $("#btnBack").addClass("display_none");
            //   $('#divcompinformtion').removeClass("display_none");
            SelecteData = COMPANY.filter(x => x.COMP_CODE == Number(comp_CODE));
            DocumentActions.RenderFromModel(SelecteData[0]);

            ddl_IdType.value = SelecteData[0].VndIDTypeCode == null ? 'null' : SelecteData[0].VndIDTypeCode.toString();
            ddl_Country.value = SelecteData[0].NationalityID == null ? 'null' : SelecteData[0].NationalityID.toString();
            ddl_Currency.value = SelecteData[0].Currencyid == null ? 'null' : SelecteData[0].Currencyid.toString();
            Disabled();
        }

    }

    function Update() {
        Assign();

        $("#btnEdit").removeClass("display_none");
        $("#btnSave").addClass("display_none");
        $("#btnBack").addClass("display_none");

        Ajax.Callsync({
            type: "POST",
            url: link + "GComp/Update",
            data: JSON.stringify(Model),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
                    var comp_CODE = result.Response as G_COMPANY;

                }
            }
        });
    }

    function Insert() {

        Assign();
        Ajax.Callsync({
            type: "Post",
            url: link + "GComp/Insert",
            data: JSON.stringify(Model),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
                    comp_CODE = result.Response;

                }
                else {
                    DisplayMassage("خطأء", "Error", MessageType.Error);
                }
            }
        });
    }

    function Assign() {

        Model = new G_COMPANY();
        DocumentActions.AssignToModel(Model);
        Model.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        Model.IDNo = txt_IDNo.value;
        Model.UserCode = SysSession.CurrentEnvironment.UserCode;
    }


    /////  FILL ////////////////////////////////////////////////////////////////

    function Fillddl_IdType() {

        Ajax.Callsync({
            type: "Get",
            url: link + "GCodes/GetAll",
            data: { codeType: 'VNDIDType', UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {

                    CodesTypes = result.Response as Array<G_Codes>;
                    DocumentActions.FillCombowithdefult(CodesTypes, ddl_IdType, "CodeValue", "DescA", " اختر نوع المعرف ");
                }
            }
        });


    }

    function Fillddl_Country() {

        Ajax.Callsync({
            type: "Get",
            url: link + "Nationality/GetAll",
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {

                    CountryFilter = result.Response as Array<G_Nationality>;
                    DocumentActions.FillCombowithdefult(CountryFilter, ddl_Country, "NationalityID", "DescA", " اختر الدولة ");
                }
            }
        });
    }

    function Fillddl_Currency() {

        Ajax.Callsync({
            type: "Get",
            url: link + "AccDefVendor/GetAllCurrency",
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {

                    CurrencyFilter = result.Response as Array<G_Currency>;
                    DocumentActions.FillCombowithdefult(CurrencyFilter, ddl_Currency, "CurrencyID", "DescA", " اختر العملة ");
                }
            }
        });
    }

    function Fillddl_DefSlsVatType() {

        Ajax.Callsync({
            type: "Get",
            url: link + "GenVatType/GetAll",
            data: { CompCode: SysSession.CurrentEnvironment.CompCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {

                    ddl_AllDefVatTypeFilter = result.Response as Array<A_D_VAT_TYPE>;

                    ddl_DefSlsVatTypeFilter = ddl_AllDefVatTypeFilter.filter(x => x.TYPE == 1)
                    DocumentActions.FillCombowithdefult(ddl_DefSlsVatTypeFilter, ddl_DefSlsVatType, "CODE", "DESCRIPTION", " اختر الضريبة في المبيعات ");


                    ddl_DefPurVatTypeFilter = ddl_AllDefVatTypeFilter.filter(x => x.TYPE == 2)
                    DocumentActions.FillCombowithdefult(ddl_DefPurVatTypeFilter, ddl_DefPurVatType, "CODE", "DESCRIPTION", " اختر الضريبة في المشتريات ");
                }
            }
        });
    }

    function Fillddl_Gl_JournalOpenTypeFilter() {

        Ajax.Callsync({
            type: "Get",
            url: link + "GLTrVoucher/GetAll",
            data: { CompCode: SysSession.CurrentEnvironment.CompCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {


                    ddl_Gl_JournalOpenTypeFilter = result.Response as Array<A_Voucher_Types>;

                    DocumentActions.FillCombowithdefult(ddl_Gl_JournalOpenTypeFilter, ddl_Gl_JournalOpenType, "TYPE_CODE", "TYPE_DESCA", " اختر القيد الافتتاحي ");

                }
            }
        });
    }

    function Fillddl_InvoiceTypeCodeFilter() {

        Ajax.Callsync({
            type: "Get",
            url: link + "GCodes/GetAll_GCodes",
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {

                    ddl_AllInvoiceCodeFilter = result.Response as Array<G_Codes>;

                    ddl_InvoiceTypeCodeFilter = ddl_AllInvoiceCodeFilter.filter(x => x.CodeType == "InvoiceType")
                    DocumentActions.FillCombowithdefult(ddl_InvoiceTypeCodeFilter, ddl_InvoiceTypeCode, "CodeValue", "DescA", " اختر نوع الفاتورة ");


                    ddl_InvoiceTransCodeFilter = ddl_AllInvoiceCodeFilter.filter(x => x.CodeType == "InvoiceTrans")
                    DocumentActions.FillCombowithdefult(ddl_InvoiceTransCodeFilter, ddl_InvoiceTransCode, "CodeValue", "DescA", " اختر نوع حركة الفاتورة ");
                }
            }
        });
    }


    ///// function  BUTTONS FIRSTDIV  ////////////////////////////////////////////////////////////////

    function btnAdd_onclick() {
        debugger

        $("#divGrid").addClass("disabledDiv");
        $("#btnEdit").addClass("display_none");
        $("#btnEdit2").addClass("display_none");
        $("#btnEdit3").addClass("display_none");
        $("#btnSave").removeClass("display_none");
        $("#btnBack").removeClass("display_none");
        //$('#divcompinformtion').removeClass("display_none");
        Clear();
        CLearSecondDiv();
        clearThirdDiv();
        Enabled();
        DisabledSecondDiv();
        DisabledThirdDiv();

        IsNew = true;


    }

    function btnEdit_onclick() {
        $("#btnBack").removeClass("display_none");
        $("#btnSave").removeClass("display_none");
        $("#btnEdit").addClass("display_none");
        $("#divGrid").addClass("disabledDiv");
        Enabled();
        IsNew = false;
    }

    function btnSave_onclick() {

        if (!validation())
            return;
        Assign();

        if (IsNew == false) {
            Update();
        }
        else {
            Insert();
        }
        succes();

        Disabled();
        //$("#btnBack").addClass("display_none");
        //$("#btnSave").addClass("display_none");
        //$("#btnEdit").removeClass("display_none");
        //$("#divGrid").removeClass("display_none");

    }

    function btnBack_onclick() {
        $("#btnEdit").removeClass("display_none");
        $("#btnSave").addClass("display_none");
        $("#btnBack").addClass("display_none");
        $("#divGrid").removeClass("disabledDiv");
        Disabled();
        if (IsNew == true) {
            $("#btnEdit").addClass("display_none");
            $("#btnEdit2").addClass("display_none");
            $("#btnEdit3").addClass("display_none");
            Clear();
            CLearSecondDiv();
            clearThirdDiv();
        }
        else {
            Grid_RowDoubleClicked();

            // $("#divcompinformtion").removeClass("display_none");
        }


    }


    /////function  BUTTONS SECONDDIV  ////////////////////////////////////////////////////////////////

    function btnSave2_onclick() {
        $("#btnEdit2").removeClass("display_none");
        $("#btnSave2").addClass("display_none");
        $("#btnBack2").addClass("display_none");
        $("#divGrid").removeClass("disabledDiv");

        Model_GAlertControl = new G_AlertControl();

        Model_GAlertControl.UserCode = sys.SysSession.CurrentEnvironment.UserCode;
        Model_GAlertControl.Token = "HGFD-" + sys.SysSession.CurrentEnvironment.Token;
        Model_GAlertControl.Compcode = Number(txt_COMP_CODE.value);
        Model_GAlertControl.SystemCode = sys.SysSession.CurrentEnvironment.SystemCode;
        Model_GAlertControl.EMAIL_SSL = chk_EMAIL_SSL.checked;
        Model_GAlertControl.EMAIL_SenderName = txt_EMAIL_SenderName.value;
        Model_GAlertControl.EMAIL_Sender = txt_EMAIL_Sender.value;
        Model_GAlertControl.EMAIL_SenderPassword = txt_EMAIL_SenderPassword.value;
        Model_GAlertControl.EMAIL_SendorPort = Number(txt_EMAIL_SendorPort.value);
        Model_GAlertControl.EMAIL_SenderSMTP = txt_EMAIL_SenderSMTP.value;
        Model_GAlertControl.SMS_Provider = txt_SMS_Provider.value;
        Model_GAlertControl.SMS_UserName = txt_SMS_UserName.value;
        Model_GAlertControl.SMS_SenderName = txt_SMS_SenderName.value;
        Model_GAlertControl.SMS_Password = txt_SMS_Password.value;
        // Model_GAlertControl.MobileNoPreFex = "";
        Model_GAlertControl.EmailMaxDaily = Number(txt_EmailMaxDaily.value);


        Ajax.Callsync({
            type: "POST",
            url: link + "GAlertControl/Update",
            data: JSON.stringify(Model_GAlertControl),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
                } else { alert(result); }
            }
        });

        DisabledSecondDiv();


    }

    function btnEdit2_onclick() {
        $("#btnBack2").removeClass("display_none");
        $("#btnSave2").removeClass("display_none");
        $("#btnEdit2").addClass("display_none");
        $("#divGrid").addClass("disabledDiv");


        EnabledSecondDiv();
        IsNew = false;
    }

    function btnBack2_onclick() {
        $("#btnEdit2").removeClass("display_none");
        $("#btnSave2").addClass("display_none");
        $("#btnBack2").addClass("display_none");
        $("#divGrid").removeClass("disabledDiv");

        DisabledSecondDiv();
        if (IsNew == true) {
            $("#btnEdit").addClass("display_none");
        }
        else {
            Grid_RowDoubleClicked();
        }

    }


    /////function  BUTTONS THIRDDIV  ////////////////////////////////////////////////////////////////

    function btnSave3_onclick() {

        if (!ThirdDivvalidation()) {
            btnEdit2_onclick();
            btnEdit_onclick();
            return;
        }
        else {
            DisabledThirdDiv();
            $("#btnEdit3").removeClass("display_none");
            $("#btnBack3").addClass("display_none");
            $("#btnSave3").addClass("display_none");
            $("#divGrid").removeClass("disabledDiv");

            Model_IControl = new I_Control();

            Model_IControl.CompCode = Number(txt_COMP_CODE.value);
            Model_IControl.DefSlsVatType = Number(ddl_DefSlsVatType.value);
            Model_IControl.DefPurVatType = Number(ddl_DefPurVatType.value);
            Model_IControl.IsVat = chk_IsVat.checked;
            Model_IControl.MobileLength = Number(txt_MobileLength.value);
            Model_IControl.IDLength = Number(txt_IDLength.value);
            Model_IControl.SendSMS = chk_SendSMS.checked;
            Model_IControl.SendPublicSMS = chk_SendPublicSMS.checked;
            Model_IControl.NotePeriodinSec = Number(txt_NotePeriodinSec.value);
            Model_IControl.DashBoardPeriodinSec = Number(txt_DashBoardPeriodinSec.value);
            Model_IControl.MaxYearlyMSGs = Number(txt_MaxYearlyMSGs.value);
            Model_IControl.UsedMSGs = Number(txt_UsedMSGs.value);
            Model_IControl.UserTimeZoneUTCDiff = 0;
            Model_IControl.ServerTimeZoneUTCDiff = 0;
            Model_IControl.SaudiNationID = 1;
            Model_IControl.WebCustomerWebsite = false;
            DateFormat(Model_IControl.MembeshiptStartDate = txt_MembeshiptStartDate.value);
            DateFormat(Model_IControl.MembeshipEndDate = txt_MembeshipEndDate.value);
            Model_IControl.MembershipAllanceDays = Number(txt_MembershipAllanceDays.value);
            Model_IControl.MembershipreadOnlyDays = Number(txt_MembershipreadOnlyDays.value);
            Model_IControl.IsFreePurchaseReturn = true;
            Model_IControl.IsFreeSalesReturn = true;
            Model_IControl.ExceedMinPricePassword = txt_ExceedMinPricePassword.value;
            Model_IControl.GL_VoucherCCType = Number(chk_GL_VoucherCCType.checked);
            Model_IControl.GL_VoucherCCType = Number(chk_GL_VoucherCCDT_Type.checked);
            Model_IControl.Gl_JournalOpenType = Number(ddl_Gl_JournalOpenType.value);
            Model_IControl.GL_JournalMonthlyNo = txt_GL_JournalMonthlyNo.checked;
            Model_IControl.GL_JournalMonthlyNoWidth = Number(txt_GL_JournalMonthlyNoWidth.value);
            Model_IControl.GL_JournalSaveUnbalanced = chk_GL_JournalSaveUnbalanced.checked;
            Model_IControl.IsLocalBranchCustomer = chk_IsLocalBranchCustomer.checked;
            Model_IControl.SysTimeOut = Number(txt_SysTimeOut.value);
            Model_IControl.NationalityID = Number(ddl_Country.value);
            Model_IControl.Currencyid = Number(ddl_Currency.value);
            Model_IControl.InvoiceTypeCode = Number(ddl_InvoiceTypeCode.value);
            Model_IControl.InvoiceTransCode = Number(ddl_InvoiceTransCode.value);
            Model_IControl.InvoiceWithoutCust = chk_InvoiceWithoutCust.checked;
            Model_IControl.IvoiceDateEditable = chk_IvoiceDateEditable.checked;
            Model_IControl.InvoiceLineDiscount = chk_InvoiceLineDiscount.checked;
            Model_IControl.InvoiceLineAllowance = chk_InvoiceLineAllowance.checked;
            Model_IControl.InvoiceTotalAllowance = chk_InvoiceTotalAllowance.checked;
            Model_IControl.InvoiceTotalCharge = chk_InvoiceTotalCharge.checked;
            Model_IControl.OperationPriceWithVAT = chk_OperationPriceWithVAT.checked;
            Model_IControl.SalesPriceWithVAT = chk_SalesPriceWithVAT.checked;






            //Model_IControl.sendEmail = chk_sendEmail.checked;
            //Model_IControl.sendshopEmail = chk_sendshopEmail.checked;
            // Model_IControl.incoming = chk_incoming.checked;
            // Model_IControl.all = chk_all.checked;




            Ajax.Callsync({
                type: "POST",
                url: link + "I_Control/Update",
                data: JSON.stringify(Model_IControl),
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);


                    }
                }
            });

        }
        btnSave2_onclick();
    }

    function btnEdit3_onclick() {
        $("#btnBack3").removeClass("display_none");
        $("#btnSave3").removeClass("display_none");
        $("#btnEdit3").addClass("display_none");
        $("#divGrid").addClass("disabledDiv");
        EnabledThirdDiv();
        IsNew = false;
    }

    function btnBack3_onclick() {
        $("#btnEdit3").removeClass("display_none");
        $("#btnSave3").addClass("display_none");
        $("#btnBack3").addClass("display_none");
        $("#divGrid").removeClass("disabledDiv");

        DisabledThirdDiv();
        if (IsNew == true) {
            $("#btnEdit").addClass("display_none");
        }
        else {
            Grid_RowDoubleClicked();

        }


    }


    function UpdateThirdDiv() {
        Assign();

        $("#btnEdit3").removeClass("display_none");
        $("#btnSave3").addClass("display_none");
        $("#btnBack3").addClass("display_none");

        Ajax.Callsync({
            type: "POST",
            url: link + "I_Control/Update",
            data: JSON.stringify(Model),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayMassage("تم الحفظ بنجاح", "Saved successfully", MessageType.Succeed);
                    var comp_CODE = result.Response as G_COMPANY;

                }
            }
        });
    }



    /////CONTROL FIRSTDIV  //////////////////////////////////////////////////////////////////////////

    function Disabled() {
        txt_COMP_CODE.disabled = true;
        txt_NameA.disabled = true;
        txt_NameE.disabled = true;
        txt_Tel.disabled = true;
        txt_Email.disabled = true;
        txt_GMName.disabled = true;
        txt_Address.disabled = true;
        txt_GroupVatNo.disabled = true;
        txt_VATNO.disabled = true;
        txt_IDNo.disabled = true;
        ddl_IdType.disabled = true;
        txt_LogoIcon.disabled = true;
        txt_BkImage1.disabled = true;
        txt_BkImage2.disabled = true;
        ddl_Country.disabled = true;
        ddl_Currency.disabled = true;
        txt_Address_Province.disabled = true;
        txt_Address_City.disabled = true;
        txt_Address_District.disabled = true;
        txt_Address_Street.disabled = true;
        txt_Address_Str_Additional.disabled = true;
        txt_Address_BuildingNo.disabled = true;
        txt_Address_Build_Additional.disabled = true;
        txt_Address_Postal.disabled = true;

    }

    function Enabled() {
        txt_COMP_CODE.disabled = false;
        txt_NameA.disabled = false;
        txt_NameE.disabled = false;
        txt_Tel.disabled = false;
        txt_Email.disabled = false;
        txt_GMName.disabled = false;
        txt_Address.disabled = false;
        txt_GroupVatNo.disabled = false;
        txt_VATNO.disabled = false;
        txt_IDNo.disabled = false;
        ddl_IdType.disabled = false;
        txt_LogoIcon.disabled = false;
        txt_BkImage1.disabled = false;
        txt_BkImage2.disabled = false;
        ddl_Country.disabled = false;
        ddl_Currency.disabled = false;
        txt_Address_Province.disabled = false;
        txt_Address_City.disabled = false;
        txt_Address_District.disabled = false;
        txt_Address_Street.disabled = false;
        txt_Address_Str_Additional.disabled = false;
        txt_Address_BuildingNo.disabled = false;
        txt_Address_Build_Additional.disabled = false;
        txt_Address_Postal.disabled = false;
    }

    function Clear() {
        txt_COMP_CODE.value = "";
        txt_NameA.value = "";
        txt_NameE.value = "";
        txt_Tel.value = "";
        txt_Email.value = "";
        txt_GMName.value = "";
        txt_Address.value = "";
        txt_GroupVatNo.value = "";
        txt_VATNO.value = "";
        txt_IDNo.value = "";
        ddl_IdType.value = "null";
        txt_LogoIcon.value = "";
        txt_BkImage1.value = "";
        txt_BkImage2.value = "";
        ddl_Country.value = "null";
        ddl_Currency.value = "null";
        txt_Address_Province.value = "";
        txt_Address_City.value = "";
        txt_Address_District.value = "";
        txt_Address_Street.value = "";
        txt_Address_Str_Additional.value = "";
        txt_Address_BuildingNo.value = "";
        txt_Address_Build_Additional.value = "";
        txt_Address_Postal.value = "";
        chk_IsActive.checked = false;
    }

    function validateEmail(email) {

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validate_email() {


        const email = $("#txt_Email").val();
        validateEmail(email)

        return validateEmail(email);
    }

    function validation() {

        var zero = Number(txt_COMP_CODE.value);
        SelecteDataComp = COMPANY.filter(x => x.COMP_CODE == zero);


        if (IsNew == true && SelecteDataComp.length > 0) {

            DisplayMassage("الرمز موجود من قبل ", "The Code already exists", MessageType.Worning);
            Errorinput(txt_COMP_CODE);
            return false;

        }
        if (txt_COMP_CODE.value == "" || txt_COMP_CODE.value.trim() == "" || zero <= 0) {
            DisplayMassage("يجب ادخال الرمز  ", "Please, Enter The Code!", MessageType.Worning);
            Errorinput(txt_COMP_CODE);
            return false;
        }

        //if (txt_LogoIcon.value == "" || txt_LogoIcon.value.trim() == "") {
        //    DisplayMassage("يجب صورة اللوجن  ", "Please, Enter The Login!", MessageType.Worning);
        //    Errorinput(txt_LogoIcon);
        //    return false;
        //}

        if ((txt_NameA.value == "" || txt_NameA.value.trim() == "") && (txt_NameE.value == "" || txt_NameE.value.trim() == "")) {
            DisplayMassage("يجب ادخال اسم الشركة بالعربي او اسم الشركة بالانجليزي  ", "Please, Enter The Arabic Or English Name !", MessageType.Worning);
            Errorinput(txt_NameA); Errorinput(txt_NameE);
            return false;
        }
        if ((txt_NameA.value == "" || txt_NameA.value.trim() == "") && txt_NameE.value != "") {
            txt_NameA.value = txt_NameE.value;
        }
        if ((txt_NameE.value == "" || txt_NameE.value.trim() == "") && txt_NameA.value != "") {
            txt_NameE.value = txt_NameA.value;
        }

        //if (txt_BkImage1.value == "" || txt_BkImage1.value.trim() == "") {
        //    DisplayMassage("يجب ادخال صورة الخلفية   ", "Please, Enter The Background!", MessageType.Worning);
        //    Errorinput(txt_BkImage1);
        //    return false;
        //}

        //if (txt_BkImage2.value == "" || txt_BkImage2.value.trim() == "") {
        //    DisplayMassage("يجب ادخال صورة الخلفية الاضافية  ", "Please, Enter The Additional Background!", MessageType.Worning);
        //    Errorinput(txt_BkImage2);
        //    return false;
        //}

        //if (txt_Tel.value == "" || txt_Tel.value.trim() == "") {
        //    DisplayMassage("يجب ادخال رقم الهاتف  ", "Please, Enter The telephone Number!", MessageType.Worning);
        //    Errorinput(txt_Tel);
        //    return false;
        //}

        if ($('#txt_Email').val().trim() != '') {

            if (validate_email() == false) {
                DisplayMassage("يجب ادخال البريد الالكتروني صحيح ", "You must enter a valid email", MessageType.Worning);
                Errorinput($('#txt_Email'));
                return false;
            }
        }

        //if (txt_Email.value == "" || txt_Email.value.trim() == "") {
        //    DisplayMassage("يجب ادخال البريد الالكتروني  ", "Please, Enter The Email!", MessageType.Worning);
        //    Errorinput(txt_Email);
        //    return false;
        //}

        //if (txt_GMName.value == "" || txt_GMName.value.trim() == "") {
        //    DisplayMassage("يجب ادخال اسم المسؤول  ", "Please, Enter The Responsible Name!", MessageType.Worning);
        //    Errorinput(txt_GMName);
        //    return false;
        //}

        //if (txt_Address.value == "" || txt_Address.value.trim() == "") {
        //    DisplayMassage("يجب ادخال العنوان  ", "Please, Enter The Address!", MessageType.Worning);
        //    Errorinput(txt_Address);
        //    return false;
        //}

        if (txt_GroupVatNo.value.trim() != "" && txt_VATNO.value.trim() == "") {
            DisplayMassage("يجب ادخال الرقم الضريبي  ", "Please, Enter The Tax!", MessageType.Worning);
            Errorinput(txt_VATNO);
            return false;
        }
        //if (txt_GroupVatNo.value == "" || txt_GroupVatNo.value.trim() == "") {
        //    DisplayMassage("يجب ادخال رقم المجموعة الضريبية  ", "Please, Enter The group Tax!", MessageType.Worning);
        //    Errorinput(txt_GroupVatNo);
        //    return false;
        //}
        //if (txt_VATNO.value == "" || txt_VATNO.value.trim() == "") {
        //    DisplayMassage("يجب ادخال قيمةالضريبية  ", "Please, Enter The Tax!", MessageType.Worning);
        //    Errorinput(txt_VATNO);
        //    return false;
        //}

        //if (txt_IDNo.value == "" || txt_IDNo.value.trim() == "") {
        //    DisplayMassage("يجب ادخال الرقم التعريفي  ", "Please, Enter The Identity!", MessageType.Worning);
        //    Errorinput(txt_IDNo);
        //    return false;
        //}

        //if (ddl_IdType.value == "" || ddl_IdType.value == "null" || ddl_IdType.value.trim() == "") {
        //    DisplayMassage("يجب ادخال نوع المعرف  ", "Please, Enter The Vndor ID Type Code!", MessageType.Worning);
        //    Errorinput(ddl_IdType);
        //    return false;
        //}

        if (txt_IDNo.value.trim() != "" && ddl_IdType.value == "null") {
            DisplayMassage("يجب ادخال نوع المعرف  ", "Please, Enter The Vndor ID Type Code!", MessageType.Worning);
            Errorinput(ddl_IdType);
            return false;
        }

        //if (ddl_Country.value == "" || ddl_Country.value == "null" || ddl_Country.value.trim() == "") {
        //    DisplayMassage("يجب ادخال الدولة", "Please, Enter The Country!", MessageType.Worning);
        //    Errorinput(ddl_Country);
        //    return false;
        //}

        //if (ddl_Currency.value == "" || ddl_Currency.value == "null" || ddl_Currency.value.trim() == "") {
        //    DisplayMassage("يجب ادخال العملة", "Please, Enter The Currency!", MessageType.Worning);
        //    Errorinput(ddl_Currency);
        //    return false;
        //}

        //if (txt_Address_Province.value == "" || txt_Address_Province.value.trim() == "") {
        //    DisplayMassage("يجب ادخال المنطقة  ", "Please, Enter The Region!", MessageType.Worning);
        //    Errorinput(txt_Address_Province);
        //    return false;
        //}

        //if (txt_Address_City.value == "" || txt_Address_City.value.trim() == "") {
        //    DisplayMassage("يجب ادخال المدينة  ", "Please, Enter The City!", MessageType.Worning);
        //    Errorinput(txt_Address_City);
        //    return false;
        //}

        //if (txt_Address_District.value == "" || txt_Address_District.value.trim() == "") {
        //    DisplayMassage("يجب ادخال الحي  ", "Please, Enter The District!", MessageType.Worning);
        //    Errorinput(txt_Address_District);
        //    return false;
        //}

        //if (txt_Address_Street.value == "" || txt_Address_Street.value.trim() == "") {
        //    DisplayMassage("يجب ادخال الشارع  ", "Please, Enter The Street", MessageType.Worning);
        //    Errorinput(txt_Address_Street);
        //    return false;
        //}

        //if (txt_Address_Str_Additional.value == "" || txt_Address_Str_Additional.value.trim() == "") {
        //    DisplayMassage("يجب ادخال الشارع الاضافي  ", "Please, Enter The Additional Street!", MessageType.Worning);
        //    Errorinput(txt_Address_Str_Additional);
        //    return false;
        //}

        //if (txt_Address_BuildingNo.value == "" || txt_Address_BuildingNo.value.trim() == "") {
        //    DisplayMassage("يجب ادخال رقم المبني   ", "Please, Enter The Building Number!", MessageType.Worning);
        //    Errorinput(txt_Address_BuildingNo);
        //    return false;
        //}

        //if (txt_Address_Build_Additional.value == "" || txt_Address_Build_Additional.value.trim() == "") {
        //    DisplayMassage(" يجب ادخال رقم المبني الاضافي    ", "Please, Enter The Additional Building Number!", MessageType.Worning);
        //    Errorinput(txt_Address_Build_Additional);
        //    return false;
        //}

        //if (txt_Address_Postal.value == "" || txt_Address_Postal.value.trim() == "") {
        //    DisplayMassage(" يجب ادخال الرمز البريدي    ", "Please, Enter The post Code!", MessageType.Worning);
        //    Errorinput(txt_Address_Postal);
        //    return false;
        //}

        return true;
    }

    function SearchBox() {

        var SearchDetails: Array<G_COMPANY> = new Array<G_COMPANY>();
        if (searchbutmemreport.value != "") {



            let search: string = searchbutmemreport.value.toLowerCase();
            SearchDetails = COMPANY.filter(x => x.COMP_CODE.toString().toLowerCase().search(search) >= 0 || x.NameA.toLowerCase().search(search) >= 0 || x.NameE.toLowerCase().search(search) >= 0);


            Grid.DataSource = SearchDetails;
            Grid.Bind();
        } else {
            Grid.DataSource = COMPANY;
            Grid.Bind();
        }
    }


    /////CONTROL SECONDDIV  //////////////////////////////////////////////////////////////////////////

    function DisabledSecondDiv() {
        txt_EMAIL_Sender.disabled = true;
        txt_EMAIL_SenderPassword.disabled = true;
        txt_EMAIL_SenderSMTP.disabled = true;
        txt_EMAIL_SendorPort.disabled = true;
        txt_EMAIL_SenderName.disabled = true;
        txt_EmailMaxDaily.disabled = true;
        txt_SMS_Provider.disabled = true;
        txt_SMS_UserName.disabled = true;
        txt_SMS_Password.disabled = true;
        txt_SMS_SenderName.disabled = true;
        //  txt_MobileNoPreFex.disabled = true;
        chk_EMAIL_SSL.disabled = true;
        chk_EMAIL_Authentication.disabled = true;
    }

    function EnabledSecondDiv() {
        txt_EMAIL_Sender.disabled = false;
        txt_EMAIL_SenderPassword.disabled = false;
        txt_EMAIL_SenderSMTP.disabled = false;
        txt_EMAIL_SendorPort.disabled = false;
        txt_EMAIL_SenderName.disabled = false;
        txt_EmailMaxDaily.disabled = false;
        txt_SMS_Provider.disabled = false;
        txt_SMS_UserName.disabled = false;
        txt_SMS_Password.disabled = false;
        txt_SMS_SenderName.disabled = false;
        // txt_MobileNoPreFex.disabled = false;
        chk_EMAIL_SSL.disabled = false;
        chk_EMAIL_Authentication.disabled = false;
    }

    function CLearSecondDiv() {
        txt_EMAIL_Sender.value = "";
        txt_EMAIL_SenderPassword.value = "";
        txt_EMAIL_SenderSMTP.value = "";
        txt_EMAIL_SendorPort.value = "";
        txt_EMAIL_SenderName.value = "";
        txt_EmailMaxDaily.value = "";
        txt_SMS_Provider.value = "";
        txt_SMS_UserName.value = "";
        txt_SMS_Password.value = "";
        txt_SMS_SenderName.value = "";
        //   txt_MobileNoPreFex.value = "";
        chk_EMAIL_SSL.checked = false;
        chk_EMAIL_Authentication.checked = false;
    }

    function SecondDivvalidation() {

        if ($('#txt_Email').val().trim() != '') {

            if (validate_email() == false) {
                DisplayMassage("يجب ادخال البريد الالكتروني صحيح ", "You must enter a valid email", MessageType.Worning);
                Errorinput($('#txt_Email'));
                return false;
            }
        }

        if (txt_Email.value == "" || txt_Email.value.trim() == "") {
            DisplayMassage("يجب ادخال البريد الالكتروني  ", "Please, Enter The Email!", MessageType.Worning);
            Errorinput(txt_Email);
            return false;
        }


        return true;
    }

    /////CONTROL THIRDDIV  //////////////////////////////////////////////////////////////////////////

    function DisabledThirdDiv() {
        txt_MobileLength.disabled = true;
        txt_IDLength.disabled = true;
        txt_MaxYearlyMSGs.disabled = true;
        txt_UsedMSGs.disabled = true;
        txt_NotePeriodinSec.disabled = true;
        txt_DashBoardPeriodinSec.disabled = true;
        txt_SysTimeOut.disabled = true;
        ddl_DefSlsVatType.disabled = true;
        ddl_DefPurVatType.disabled = true;
        txt_MembeshipEndDate.disabled = true;
        txt_MembershipAllanceDays.disabled = true;
        txt_MembershipreadOnlyDays.disabled = true;
        ddl_Gl_JournalOpenType.disabled = true;
        txt_GL_JournalMonthlyNo.disabled = true;
        txt_GL_JournalMonthlyNoWidth.disabled = true;
        ddl_InvoiceTypeCode.disabled = true;
        ddl_InvoiceTransCode.disabled = true;
        txt_ExceedMinPricePassword.disabled = true;
        txt_MembeshiptStartDate.disabled = true;
        chk_SendSMS.disabled = true;
        chk_SendPublicSMS.disabled = true;
        chk_IsVat.disabled = true;
        chk_GL_VoucherCCType.disabled = true;
        chk_GL_VoucherCCDT_Type.disabled = true;
        chk_GL_JournalSaveUnbalanced.disabled = true;
        chk_IsLocalBranchCustomer.disabled = true;
        chk_IvoiceDateEditable.disabled = true;
        chk_InvoiceWithoutCust.disabled = true;
        chk_InvoiceLineDiscount.disabled = true;
        chk_InvoiceLineAllowance.disabled = true;
        chk_InvoiceTotalAllowance.disabled = true;
        chk_InvoiceTotalCharge.disabled = true;
        chk_OperationPriceWithVAT.disabled = true;
        chk_SalesPriceWithVAT.disabled = true;
        chk_sendEmail.disabled = true;
        chk_sendshopEmail.disabled = true;
        chk_incoming.disabled = true;
        chk_GL_VoucherCCDT_Type2.disabled = true;
        chk_all.disabled = true;

    }

    function EnabledThirdDiv() {
        txt_MobileLength.disabled = false;
        txt_IDLength.disabled = false;
        txt_MaxYearlyMSGs.disabled = false;
        txt_UsedMSGs.disabled = false;
        txt_NotePeriodinSec.disabled = false;
        txt_DashBoardPeriodinSec.disabled = false;
        txt_SysTimeOut.disabled = false;
        ddl_DefSlsVatType.disabled = false;
        ddl_DefPurVatType.disabled = false;
        txt_MembeshipEndDate.disabled = false;
        txt_MembershipAllanceDays.disabled = false;
        txt_MembershipreadOnlyDays.disabled = false;
        ddl_Gl_JournalOpenType.disabled = false;
        txt_GL_JournalMonthlyNo.disabled = false;
        txt_GL_JournalMonthlyNoWidth.disabled = false;
        ddl_InvoiceTypeCode.disabled = false;
        ddl_InvoiceTransCode.disabled = false;
        txt_ExceedMinPricePassword.disabled = false;
        txt_MembeshiptStartDate.disabled = false;

        chk_SendSMS.disabled = false;
        chk_SendPublicSMS.disabled = false;
        chk_IsVat.disabled = false;
        chk_GL_VoucherCCType.disabled = false;
        chk_GL_VoucherCCDT_Type.disabled = false;
        chk_GL_JournalSaveUnbalanced.disabled = false;
        chk_IsLocalBranchCustomer.disabled = false;
        chk_IvoiceDateEditable.disabled = false;
        chk_InvoiceWithoutCust.disabled = false;
        chk_InvoiceLineDiscount.disabled = false;
        chk_InvoiceLineAllowance.disabled = false;
        chk_InvoiceTotalAllowance.disabled = false;
        chk_InvoiceTotalCharge.disabled = false;
        chk_OperationPriceWithVAT.disabled = false;
        chk_SalesPriceWithVAT.disabled = false;
        chk_sendEmail.disabled = false;
        chk_sendshopEmail.disabled = false;
        chk_incoming.disabled = false;
        chk_GL_VoucherCCDT_Type2.disabled = false;
        chk_all.disabled = false;


    }

    function clearThirdDiv() {
        txt_MobileLength.value = "";
        txt_IDLength.value = "";
        txt_MaxYearlyMSGs.value = "";
        txt_UsedMSGs.value = "";
        txt_NotePeriodinSec.value = "";
        txt_DashBoardPeriodinSec.value = "";
        txt_SysTimeOut.value = "";
        ddl_DefSlsVatType.value = "";
        ddl_DefPurVatType.value = "";
        txt_MembeshipEndDate.value = "";
        txt_MembershipAllanceDays.value = "";
        txt_MembershipreadOnlyDays.value = "";
        ddl_Gl_JournalOpenType.value = "";
        txt_GL_JournalMonthlyNo.value = "";
        txt_GL_JournalMonthlyNoWidth.value = "";
        ddl_InvoiceTypeCode.value = "";
        ddl_InvoiceTransCode.value = "";
        txt_ExceedMinPricePassword.value = "";
        txt_MembeshiptStartDate.value = "";

        chk_SendSMS.checked = false;
        chk_SendPublicSMS.checked = false;
        chk_IsVat.checked = false;
        chk_GL_VoucherCCType.checked = false;
        chk_GL_VoucherCCDT_Type.checked = false;
        chk_GL_JournalSaveUnbalanced.checked = false;
        chk_IsLocalBranchCustomer.checked = false;
        chk_IvoiceDateEditable.checked = false;
        chk_InvoiceWithoutCust.checked = false;
        chk_InvoiceLineDiscount.checked = false;
        chk_InvoiceLineAllowance.checked = false;
        chk_InvoiceTotalAllowance.checked = false;
        chk_InvoiceTotalCharge.checked = false;
        chk_OperationPriceWithVAT.checked = false;
        chk_SalesPriceWithVAT.checked = false;
        chk_sendEmail.checked = false;
        chk_sendshopEmail.checked = false;
        chk_incoming.checked = false;
        chk_GL_VoucherCCDT_Type2.checked = false;
        chk_all.checked = false;
        

    }

    function ThirdDivvalidation() {


        if ((txt_EMAIL_Sender.value.trim() == "" || txt_EMAIL_SenderPassword.value.trim() == "" || txt_EMAIL_SenderSMTP.value.trim() == "" || txt_EMAIL_SendorPort.value.trim() == "" || chk_EMAIL_SSL.checked == false || chk_EMAIL_Authentication.checked == false || txt_EMAIL_SenderName.value.trim() == "" || txt_EmailMaxDaily.value.trim() == "") && chk_sendEmail.checked == true) {
            DisplayMassage("يجب ادخال بيانات الايميل  ", "Please, Enter The Email Data!", MessageType.Worning);
            Errorinput(txt_EMAIL_Sender);
            Errorinput(txt_EMAIL_SenderPassword);
            Errorinput(txt_EMAIL_SenderSMTP);
            Errorinput(txt_EMAIL_SendorPort);
            Errorinput(txt_EMAIL_SenderName);
            Errorinput(txt_EmailMaxDaily);
            return false;
        }
        if ((txt_EMAIL_Sender.value.trim() == "" || txt_EMAIL_SenderPassword.value.trim() == "" || txt_EMAIL_SenderSMTP.value.trim() == "" || txt_EMAIL_SendorPort.value.trim() == "" || chk_EMAIL_SSL.checked == false || chk_EMAIL_Authentication.checked == false || txt_EMAIL_SenderName.value.trim() == "" || txt_EmailMaxDaily.value.trim() == "") && chk_sendshopEmail.checked == true) {
            DisplayMassage("يجب ادخال بيانات الايميل  ", "Please, Enter The Email Data!", MessageType.Worning);
            Errorinput(txt_EMAIL_Sender);
            Errorinput(txt_EMAIL_SenderPassword);
            Errorinput(txt_EMAIL_SenderSMTP);
            Errorinput(txt_EMAIL_SendorPort);
            Errorinput(txt_EMAIL_SenderName);
            Errorinput(txt_EmailMaxDaily);
            return false;
        }

        if ((txt_SMS_Provider.value.trim() == "" || txt_SMS_UserName.value.trim() == "" || txt_SMS_Password.value.trim() == "" || txt_SMS_SenderName.value.trim() == "") && chk_SendSMS.checked == true) {
            DisplayMassage("يجب ادخال بيانات رسائل الموبيل  ", "Please, Enter The Message Phone !", MessageType.Worning);
            Errorinput(txt_SMS_Provider);
            Errorinput(txt_SMS_UserName);
            Errorinput(txt_SMS_Password);
            Errorinput(txt_SMS_SenderName);
            return false;
        }

        if ((txt_SMS_Provider.value.trim() == "" || txt_SMS_UserName.value.trim() == "" || txt_SMS_Password.value.trim() == "" || txt_SMS_SenderName.value.trim() == "") && chk_SendPublicSMS.checked == true) {
            DisplayMassage("يجب ادخال بيانات رسائل الموبيل  ", "Please, Enter The Message Phone !", MessageType.Worning);
            Errorinput(txt_SMS_Provider);
            Errorinput(txt_SMS_UserName);
            Errorinput(txt_SMS_Password);
            Errorinput(txt_SMS_SenderName);
            return false;
        }

        var Per = Number(txt_NotePeriodinSec.value);
        if (Per < 10) {
            DisplayMassage("لا يجب ان يقل الثواني لتحديث الاشعارات عن 10  ", "Please, Enter The telephone Number!", MessageType.Worning);
            Errorinput(txt_NotePeriodinSec);
            return false;
        }


        var Board = Number(txt_DashBoardPeriodinSec.value);
        if (Board < 10) {
            DisplayMassage("لا يجب ان يقل الثواني الثواني لتحديث لوحة الإدارة عن 10  ", "Please, Enter The group Tax!", MessageType.Worning);
            Errorinput(txt_DashBoardPeriodinSec);
            return false;
        }

        var Sys = Number(txt_SysTimeOut.value);
        if (Sys < 10) {
            DisplayMassage("لا يجب ان يقل طول فترة الجلسة (دقائق) عن 10  ", "Please, Enter The Tax!", MessageType.Worning);
            Errorinput(txt_SysTimeOut);
            return false;
        }

        if (ddl_DefSlsVatType.value == "null" || ddl_DefPurVatType.value == "null") {
            DisplayMassage("يجب ادخال الرقم الضريبي  ", "Please, Enter The Tax!", MessageType.Worning);
            Errorinput(txt_GroupVatNo);
            return false;
        }
        return true;
    }



}