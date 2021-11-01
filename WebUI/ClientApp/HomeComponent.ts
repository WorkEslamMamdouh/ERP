
$(document).ready(() => {
    //HomeComponent.Language();
    HomeComponent.InitalizeComponent();

});

namespace HomeComponent {
    //let res: any = GetResourceList("");
    var sys: SystemTools = new SystemTools();



    var tol_allnotification2: HTMLButtonElement;
    var But_Outlet: HTMLButtonElement;
    var But_Input: HTMLButtonElement;
    var btnCash: HTMLButtonElement;
    var Close: HTMLButtonElement;
    var Balance = 0;
    var CountGrid = 0;
    var Notification: Array<Notification_Proc> = new Array<Notification_Proc>();
    var UserDetails: Array<G_USERS> = new Array<G_USERS>();


    var btnDashboard: HTMLButtonElement;
    var btn_loguotuser: HTMLButtonElement;
    var SysSession: SystemSession = GetSystemSession();
    var systemEnv: SystemEnvironment = SysSession.CurrentEnvironment;


    export function OpenPage(moduleCode: string) {
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;

        debugger;
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, Modulecode: Modulecode },
            success: (d) => {

                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d) as UserPrivilege;

                    if (result == null) {
                        MessageBox.Show("Access denied", moduleCode);
                        return;
                    }
                    if (result.Access == true) {
                        SysSession.CurrentPrivileges = result;

                        document.cookie = "Inv1_Privilage=" + JSON.stringify(result).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        window.open(Url.Action(moduleCode + "Index", "Home"), "_self");

                    }
                    else {
                        MessageBox.Show("No Inv1_Privilage", moduleCode);
                    }
                }
            }
        });
    }

    export function OpenReportsPopup(moduleCode: string) {

        SysSession.CurrentEnvironment.ModuleCode = moduleCode;
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let Modulecode = SysSession.CurrentEnvironment.ModuleCode;

        Ajax.CallAsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),

            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: Modulecode },
            success: (d) => {
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d) as UserPrivilege;
                    if (result == null) {
                        MessageBox.Show("Access denied", "GeneralReports");
                        return;
                    }
                    if (result.Access == true) {
                        let opt: JQueryAjaxSettings = {
                            url: Url.Action(moduleCode, "GeneralReports"),

                            success: (d) => {

                                let result = d as string;

                                $("#PopupDialog").modal("show");
                                $("#PopupBody").html(result);
                                $('#PopupDialog').modal({
                                    refresh: true
                                });
                                var val = $("#rpTitle").text();
                                $("#TitleSpan").html(val);
                            }
                        };
                        Ajax.CallAsync(opt);
                    }
                    else {
                        MessageBox.Show("Access denied", "GeneralReports");
                    }
                }
            }
        });
    }

    export function InitalizeComponent() {

        $('#sidebarCollapse').on('click', function () {
            $(".left-sidebar-pro").css({ 'display': 'block' });


        });
        $('#sidebarCollapse2').on('click', function () {
            $(".left-sidebar-pro").toggle("slide");
            $("#cont").addClass("colapsdivcont");

            $("#i_toolpar").removeAttr('hidden');
            $("#i_toolpar").addClass('i_toolpar');
        });
        $('#i_toolpar').on('click', function () {
            $(".left-sidebar-pro").css({ 'display': 'none' });
            $("#cont").addClass("colapsdivcont");

            $("#i_toolpar").attr('hidden');
            $("#i_toolpar").removeClass('i_toolpar');
        });
        Language();
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar")
        { document.getElementById('camp_name').innerHTML = SysSession.CurrentEnvironment.CompanyNameAr; }
        else { document.getElementById('camp_name').innerHTML = SysSession.CurrentEnvironment.CompanyName; }

        ApplyModules();
        ApplyCompanyPrivilages();
        $("#btnHelpRep").click(() => { ScreenHelp(); })

        InitializePages();
        $("#DashButton").css('pointer-events', 'auto');
        document.getElementById('Admin_name').innerHTML = SysSession.CurrentEnvironment.UserCode;
        if (SysSession.CurrentEnvironment.ScreenLanguage == 'ar') {
            $('#homeTitle').text("نظام سيف لادارة الاملاك");
        }
        else {
            $('#homeTitle').text("Safe Proprity Managment");
            $("#main-menu").removeClass("sm-rtl");
        }
        if (SysSession.CurrentEnvironment.ScreenLanguage == 'ar') {
            $('#LanguageButtonHome').text("Change Language");
        }
        else {
            $('#LanguageButtonHome').text(" تغير اللغة  ");
        }
        btn_loguotuser = DocumentActions.GetElementById<HTMLButtonElement>("btn_loguotuser");
        btn_loguotuser.onclick = LogoutUserApi;
        //CheckTime(); 
        $("#LanguageButtonHome").click(() => {
            if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") { // English Mode  
                RemoveStyleSheet("bootstrap-rtl");
                RemoveStyleSheet("mainAR");
                RemoveStyleSheet("Style_Arabic");
                RemoveStyleSheet("style");
                RemoveStyleSheet("StyleNewmassege");
                RemoveStyleSheet("responsive_AR");

                AppendStyleSheet("bootstrap.min");
                AppendStyleSheet("main");
                AppendStyleSheet("responsive");
                AppendStyleSheet("StyleEn");
                SysSession.CurrentEnvironment.ScreenLanguage = "en";

                $('#LanguageButtonHome').text(" تغير اللغة  ");


                document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            }
            else { // Arabic Mode

                RemoveStyleSheet("StyleEn");
                RemoveStyleSheet("bootstrap.min");
                RemoveStyleSheet("main");
                RemoveStyleSheet("responsive");

                AppendStyleSheet("bootstrap-rtl");
                AppendStyleSheet("StyleNewmassege");
                AppendStyleSheet("mainAR");
                AppendStyleSheet("style");
                AppendStyleSheet("Style_Arabic");
                AppendStyleSheet("responsive_AR");

                SysSession.CurrentEnvironment.ScreenLanguage = "ar";

                $('#LanguageButtonHome').text("Change Language");

                document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            }

            window.location.reload();
        });

        $(window).scroll(() => {
            let backtotop = $('.back-to-top');


            if (window.scrollY > 10) {
                backtotop.addClass('active');
            } else {
                backtotop.removeClass('active');
            }


        });


        tol_allnotification2 = document.getElementById('tol_allnotification') as HTMLButtonElement
        btnCash = document.getElementById('btnCash') as HTMLButtonElement

        But_Input = document.getElementById('But_Input') as HTMLButtonElement
        But_Outlet = document.getElementById('But_Outlet') as HTMLButtonElement
        Close = document.getElementById('Close') as HTMLButtonElement
        But_Input.onclick = Enter_Money;
        But_Outlet.onclick = Cash_Box;
        btnCash.onclick = Get_balance;
        Close.onclick = Close_Day;
        Check_Close_Day();

        tol_allnotification2.onclick = tol_allnotification_onclick;
        FillddlPilot();         
        if (SysSession.CurrentEnvironment.I_Control[0].IvoiceDateEditable != true) {
            Close.classList.add("display_none");
        }

    }


    function FillddlPilot() {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetAllUser"),
            data: {},
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    UserDetails = result.Response as Array<G_USERS>;

                    UserDetails = UserDetails.filter(x => x.USER_TYPE == 2 && x.USER_ACTIVE == true);



                }
            }
        });
    }
    function OKNotification(ID_ORDER: number, Name_Pilot: string, Tax: number) {

        //WorningMessage("تاكيد الطلب", "Do you want to delete?", "تحذير", "worning", () => {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SlsTrSales", "Aprovd_Order"),
            data: { ID_ORDER_Delivery: ID_ORDER, Name_Pilot: Name_Pilot, Tax: Tax },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {


                    printreport(ID_ORDER);

                    tol_allnotification_onclick()
                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });

        //});
    }
    function printreport(ID_ORDER_Print: number) {
        debugger;
        let _StockList: Array<Settings_Report> = new Array<Settings_Report>();
        let _Stock: Settings_Report = new Settings_Report();
        _Stock.Type_Print = 4;
        _Stock.ID_Button_Print = 'saless_ret';
        _Stock.Parameter_1 = ID_ORDER_Print.toString();
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
            url: Url.Action("Data_Report_Open", "PrintReports"),
            data: rp,
            success: (d) => {
                let result = d as BaseResponse;

                PrintImage(result)
            }
        })

    }


    function ImagetoPrint(source) {
        return "<html><head><scri" + "pt>function step1(){\n" +
            "setTimeout('step2()', 10);}\n" +
            "function step2(){window.print();window.close()}\n" +
            "</scri" + "pt></head><body onload='step1()'>\n" +
            "<img src='data:image/png;base64," + source + "' /></body></html>";
    }
    function PrintImage(source) {

        var pwa = window.open('', 'Print-Window', 'height=600,width=800');
        pwa.document.open();
        pwa.document.write(ImagetoPrint(source));
        pwa.document.close();
    }



    function DeleteNotification(ID_ORDER: number) {


        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {

            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("SlsTrSales", "Delete_Order"),
                data: { ID_ORDER_Delivery: ID_ORDER },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess == true) {

                        tol_allnotification_onclick()
                    }
                    else {

                        MessageBox.Show(result.ErrorMessage, "خطأ");
                    }
                }
            });

        });
    }
    function tol_allnotification_onclick() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("SlsTrSales", "GetAllNotification"),
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    Notification = result.Response as Array<Notification_Proc>;

                    $("#notificationUL").html('');
                    CountGrid = 0;
                    for (var i = 0; i < Notification.length; i++) {

                        BuildNotification(CountGrid);
                        //Disbly_BuildControls(i, AllGetStokMasterDetail);
                        CountGrid += 1;
                    }

                    for (var i = 0; i < UserDetails.length; i++) {

                        $('.ddlName_Pilot').append('<option  value="' + UserDetails[i].USER_NAME + '">' + UserDetails[i].USER_NAME + '</option>');


                    }

                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });

    }
    function BuildNotification(cnt: number) {

        var html;
        html = '<li class="style_li"> <span  id="txt_Notification' + cnt + '" ></span> ' +
            '<br/> ' +
            '<span><select id="ddlName_Pilot' + cnt + '" class="ddlName_Pilot form-control col-lg-5"><option value="null">اختار الطيار</option></select><input id="Tax_Pilot' + cnt + '" type="number"  class="form-control input-sm col-xs-2"></div><button id="btnSave' + cnt + '" type="button" class="btn btn-success col-xs-2"> تأكيد <span class="glyphicon glyphicon-backward"></span></button> <button id="btnDelete' + cnt + '" type="button" class="btn btn-danger col-xs-2"> الغاء <span class="glyphicon glyphicon-floppy-saved"></span></button></span> ' +

            '</li> ';
        $("#notificationUL").append(html);


        $('#txt_Notification' + cnt).html('' + Number(cnt + 1) + '- رقم الفاتوره ( ' + Notification[cnt].Namber_Order_Delivery + ' )   اسم الزبون ( ' + Notification[cnt].CUSTOMER_NAME + ' ) --' + Notification[cnt].Date_Order_Delivery + '')

        $('#btnSave' + cnt + '').on('click', function () {

            if ($('#ddlName_Pilot' + cnt + '').val() == 'null') {
                MessageBox.Show('يجب اختيار الطيار ', 'تحظير');
                Errorinput($('#ddlName_Pilot' + cnt + ''));
                return
            }
            let ddlName_Pilot = $('#ddlName_Pilot' + cnt + '').val();
            let Tax = $('#Tax_Pilot' + cnt + '').val();

            OKNotification(Notification[cnt].ID_ORDER_Delivery, ddlName_Pilot, Number(Tax));

        });

        $('#btnDelete' + cnt + '').on('click', function () {
            DeleteNotification(Notification[cnt].ID_ORDER_Delivery);
        });


    }
    function Get_balance() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Get_Balance"),
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    Balance = result.Response;

                    $('#Balance').html(' المبلغ (' + Balance + ')');


                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });

    }




    export function LogoutUserApi() {
        let userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: (d) => {
                // //debugger;

                if (d !== undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");

                    return;
                }
            }
        });
    };
    function ApplyCompanyPrivilages() {


        if (systemEnv.IsDashboardActive == false) {
            // disable dashboard button
            btnDashboard = DocumentActions.GetElementById<HTMLButtonElement>("btnDashboard");
            btnDashboard.style.display = "none";
        }
    }
    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        let obj = [document.getElementById('liItem')];
        let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;

        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: (d) => {

                modules = d as Array<UserPrivilege>;
            }
        });
        // filter moulules where isavailable = false or access = false 
        let li;
        for (var i = 0; i < modules.length; i++) {

            let singleUserModule: UserPrivilege = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {

                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {

                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }

            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE) as HTMLLIElement;
            }
            //debugger
            if (li != null) {
                if (singleUserModule != null) {
                    if (singleUserModule.Access === false)
                        li.style.display = "none";
                    if (singleUserModule.AVAILABLE === false)
                        li.style.display = "none";
                }
                else {
                    let key: string = li.getAttribute("key");
                    li.style.display = "";
                    li.className = "liItem";
                }
            } else {
                alert("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }
        $('.MED').removeClass('display_none');

        if (SysSession.CurrentEnvironment.GL_VoucherCCDT_Type != 1) {
            $('#btnDtcostcenter').addClass('display_none');
            $('#btnCcdtAccState').addClass('display_none');
        }
    }

    //By Muhammad Rajab 



    function GetNotificationData() {
        let comCode = SysSession.CurrentEnvironment.CompCode;
        let BraCode = SysSession.CurrentEnvironment.BranchCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let yearid = SysSession.CurrentEnvironment.CurrentYear;
        var PeriodinSec = SysSession.CurrentEnvironment.I_Control.NotePeriodinSec;
        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications"),
            data: { comCode: comCode, BraCode: BraCode, yearid: yearid, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            async: false,
            success: (d) => {
                let not = d as NoteificationsModel[];
                let ulcontent = "";
                $("#notificationUL").html("");
                for (let n of not) {
                    let li = document.createElement("li");
                    let span = document.createElement("span");
                    let span2 = document.createElement("span");
                    if (n.NoteCount > 0) {
                        li.onclick = () => {
                            notification_onclick(n.MODULE_CODE, n.MODULE_CODE);
                        }
                    }
                    li.className = "liItem disabledLi dropdown cursor";
                    li.id = n.MODULE_CODE;
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        span.innerText = n.MODULE_DESCA;
                    } else {
                        span.innerText = n.MODULE_DESCE;
                    }
                    span2.className = 'price';
                    span.className = 'bading_left';
                    span2.innerText = n.NoteCount.toString();
                    li.appendChild(span);
                    li.appendChild(span2);
                    $("#notificationUL").append(li);
                }
                setTimeout(GetNotificationData, PeriodinSec * 1000);
            }
        });

    }
    function notification_onclick(ModuleCode: string, btnName: string) {
        let sys: SystemTools = new SystemTools();
        var condation = "CompCode = " + SysSession.CurrentEnvironment.CompCode + " and BranchCode = " + SysSession.CurrentEnvironment.BranchCode + "and finyear = " + SysSession.CurrentEnvironment.CurrentYear;
        //if (ModuleCode == "Note_openinvoice")
        //    condation = condation + "  and Status = 0";
        //else if (ModuleCode == "Note_openreceipt") 
        //    condation = condation + "  and Status = 0 and TrType =1";
        //else if (ModuleCode == "Note_openopration") 
        //    condation = condation + "  and Status = 0 ";
        //else if (ModuleCode == "Note_openpaymnt")
        //    condation = condation + "  and Status = 0 and TrType =2";
        sys.FindKey(ModuleCode, btnName, condation, () => {

        });
    }

    function UpdateNotificationAndSendMsg() {
        if (SysSession.CurrentEnvironment.IsNotificaitonActive == true) {
            var PeriodinSec = SysSession.CurrentEnvironment.I_Control.NotePeriodinSec;

            let comCode = SysSession.CurrentEnvironment.CompCode;
            let BraCode = SysSession.CurrentEnvironment.BranchCode;
            let SystemCode = SysSession.CurrentEnvironment.SystemCode;
            let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
            $.ajax({
                type: "GET",
                url: sys.apiUrl("SystemTools", "UpdateNotificationAndSndMsg"),
                data: { comCode: comCode, BraCode: BraCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
                success: (d) => {
                    GetNotificationData();
                    ApplyModules();
                    setTimeout(UpdateNotificationAndSendMsg, PeriodinSec * 1000);
                }
            });
        }
    }


    export function HomePrev(controllerName: string, moduleCode: string) {
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let Modulecode = SysSession.CurrentEnvironment.ModuleCode;

        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: moduleCode },
            success: (d) => {

                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d) as UserPrivilege;
                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {
                        $("#spnFav").css("display", "inline-block");
                        SysSession.CurrentPrivileges = result;
                        SysSession.CurrentPrivileges.MODULE_CODE = SysSession.CurrentEnvironment.ModuleCode;
                        document.cookie = "Inv1_Privilage=" + JSON.stringify(result).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";

                    }
                    else {
                        MessageBox.Show("Access denied", controllerName);
                    }
                }
            }
        });
    }


    export function OpenView(controllerName: string, moduleCode: string) {
        //debugger;
        SysSession.CurrentEnvironment.ModuleCode = moduleCode;

        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let Modulecode = SysSession.CurrentEnvironment.ModuleCode;
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        localStorage.setItem("Compcode1", compCode);

        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            data: { compCode: compCode, branchCode: branchCode, UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode, Modulecode: Modulecode },
            success: (d) => {
                //debugger;
                if (d == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d) as UserPrivilege;

                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {

                        $("#spnFav").css("display", "inline-block");

                        SysSession.CurrentPrivileges = result;
                        SysSession.CurrentPrivileges.MODULE_CODE = SysSession.CurrentEnvironment.ModuleCode;
                        sessionStorage.setItem("MODU_CODE", SysSession.CurrentEnvironment.ModuleCode);
                        systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                        document.cookie = "Privilage=" + JSON.stringify(d).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        window.open(Url.Action(controllerName + "Index", controllerName), "_self");
                    }
                    else {
                        MessageBox.Show("Access denied", controllerName);
                    }
                }
            }
        });
    }

    function InitializePages() {

        $("#btnHome").click(() => { OpenPage(Modules.Home); })
        $("#btnClientaccstat").click(() => { OpenPage(Modules.Clientaccstat); })//   
        $("#btnUSERS").click(() => { OpenPage(Modules.USERS); })//   
        $("#btnAcc").click(() => { OpenPage(Modules.Acc); })
        $("#btnbranches").click(() => { OpenPage(Modules.branches); })
        $("#btnDefBranches").click(() => { OpenPage(Modules.DefBranches); })


        $("#btnSlsTrSales").click(() => { OpenPage(Modules.SlsTrSales); })
        $("#btnSlsTrReturn").click(() => { OpenPage(Modules.SlsTrReturn); })
        $("#btnPurchases").click(() => { OpenPage(Modules.Purchases); })
        $("#btnCategories").click(() => { OpenPage(Modules.Categories); })
        $("#btnItems").click(() => { OpenPage(Modules.Items); })
        $("#btnSupplier").click(() => { OpenPage(Modules.Supplier); })
        $("#btnCUSTOMERS").click(() => { OpenPage(Modules.CUSTOMERS); })
        $("#btnCatch_Receipt").click(() => { OpenPage(Modules.Catch_Receipt); })    
        $("#btnSalesinventory").click(() => { OpenPage(Modules.Salesinventory); })
        $("#btnfamilly_Cat").click(() => { OpenPage(Modules.familly_Cat); })
        $("#btnIncome_expenses").click(() => { OpenPage(Modules.Income_expenses); })
        $("#btnSlsTrSalesManager").click(() => { OpenPage(Modules.SlsTrSalesManager); })


        


    }

    function Notifications_Message() {

        let comCode = SysSession.CurrentEnvironment.CompCode;
        let BraCode = SysSession.CurrentEnvironment.BranchCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;

        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetNotifications_Message"),
            // data: { comCode: comCode, SystemCode: SystemCode },
            async: false,
            success: (d) => {

                let massg = d as KQ_GetAlertNoteLog[];
                let ulcontent = "";
                $("#creatnotesmassg").html("");
                for (let ms of massg) {
                    let li = document.createElement("li");
                    let span = document.createElement("span");
                    let span2 = document.createElement("span");
                    let span3 = document.createElement("span");
                    let span4 = document.createElement("span");
                    li.id = ms.AlertID.toString();
                    if (ms.NoteSubType == 1) {
                        li.className = "liItem disabledLi dropdown cursor border_li style_li1";
                    } else {
                        li.className = "liItem disabledLi dropdown cursor border_li style_li2";
                    }
                    span.innerText = ms.MsgText;
                    span.className = 'bading_left font_mseeg';
                    span2.className = 'col-lg-12 font_mseeg';
                    span3.className = 'col-lg-12 font_mseeg';
                    span4.className = 'col-lg-12 font_mseeg';
                    span2.innerText = DateTimeFormat(ms.MsgDate);
                    li.appendChild(span);
                    li.appendChild(span2);
                    li.appendChild(span3);
                    li.appendChild(span4);
                    $("#creatnotesmassg").append(li);

                }

            }
        });
    }
    //By Muhammad Rajab
    export function Language() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
            RemoveStyleSheet("bootstrap-rtl");
            RemoveStyleSheet("responsive_AR");
            RemoveStylejs("mainAR");
            RemoveStyleSheet("Style_Arabic");
            RemoveStyleSheet("style");
            RemoveStyleSheet("StyleNewmassege");
            $("#bootstrap_rtl").remove();
            $("#Style_Arabic").remove();

            AppendStyleSheet("bootstrap.min");
            AppendStylejs("main");
            AppendStyleSheet("responsive");
            AppendStyleSheet("StyleEn");
            SysSession.CurrentEnvironment.ScreenLanguage = "en"
            $("#btn_loguotuser").text("Logout");
        }
        else {
            RemoveStyleSheet("StyleEn");
            RemoveStyleSheet("bootstrap.min");
            RemoveStylejs("main");
            RemoveStyleSheet("responsive");

            AppendStyleSheet("bootstrap-rtl");
            AppendStyleSheet("StyleNewmassege");
            AppendStylejs("mainAR");
            AppendStyleSheet("style");
            AppendStyleSheet("Style_Arabic");
            AppendStyleSheet("responsive_AR");
            //$('#langImg').attr('src', '../images/english.png');
            SysSession.CurrentEnvironment.ScreenLanguage = "ar"

            $("#btn_loguotuser").text("الخروج من النظام")
        }
        //$("#SearchBox").draggable();
        App.Startup();
    }

    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "../Style_design/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName) {
        var href = "../Style_design/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
    //By Muhammad Rajab 
    function AppendStylejs(fileName) {

        var script = document.createElement('script');
        script.src = "../Style_design/" + fileName + ".js";
        document.getElementById("caret_script").appendChild(script);
    }
    //By Muhammad Rajab 
    function RemoveStylejs(fileName) {
        var href = "../Style_design/" + fileName + ".js";
        $("<script src=" + href + " ></script>").remove();
    }
    function ScreenHelp() {
        let ModuleCode = SysSession.CurrentPrivileges.MODULE_CODE;
        //debugger

        $.ajax({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetHelp"),
            data: { ModuleCode: ModuleCode },
            async: false,
            success: (d) => {
                //debugger;
                let result = d as BaseResponse;
                let res = result.Response as G_ModuleHelp;
                if (res != null) {
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        $("#modalHelpRep").html(`<div style="direction:rtl;height: 289px;overflow: scroll;overflow-x: hidden;font-weight: bold;" >` + res.HelpBody_Ar + `</div>`);
                    }
                    else {
                        $("#modalHelpRep").html(`<div style="direction:ltr;height: 289px;overflow: scroll;overflow-x: hidden;font-weight: bold;">` + res.HelpBody_En + `</div>`);
                    }
                }
            }


        });

    }



    function Cash_Box() {


        if ($('#id_pirce').val() == '' || $('#id_Dasc_Name').val() == '') {
            MessageBox.Show("  خطأ  يجب ادخل المبلغ والوصف ", "خطأ");
            return
        }

        var Dasc_Name = $('#id_Dasc_Name').val();
        var pirce = Number($('#id_pirce').val());
        var Tr_Type = 'مصروفات';
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Insert"),
            data: { Dasc_Name: Dasc_Name, pirce: pirce, UserName: SysSession.CurrentEnvironment.UserCode, Tr_Type },
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    var Outlet = result.Response;
                    if (Outlet == pirce) {
                        MessageBox.Show("تم ", "الحفظ");

                        $('#id_Dasc_Name').val('');
                        $('#id_pirce').val('');
                        $('#Balance').html(' المبلغ (' + (Balance - pirce) + ')');

                    }
                    else {
                        MessageBox.Show(" خطأ لا يوجد مبلغ كافي  (" + Outlet + ")", "خطأ");
                        $('#id_Dasc_Name').val('');
                        $('#id_pirce').val('');
                    }

                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function Enter_Money() {


        if ($('#id_pirce').val() == '' || $('#id_Dasc_Name').val() == '') {
            MessageBox.Show("  خطأ  يجب ادخل المبلغ والوصف ", "خطأ");
            return
        }

        var Dasc_Name = $('#id_Dasc_Name').val();
        var pirce = Number($('#id_pirce').val());

        var Tr_Type = 'أيرادات';
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Outletpirce", "Insert_Enter_Money"),
            data: { Dasc_Name: Dasc_Name, pirce: pirce, UserName: SysSession.CurrentEnvironment.UserCode, Tr_Type },
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    var Outlet = result.Response;
                    MessageBox.Show("تم ", "الحفظ");

                    $('#id_Dasc_Name').val('');
                    $('#id_pirce').val('');
                    $('#Balance').html(' المبلغ (' + (Balance - Outlet) + ')');

                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function Close_Day() {

        //$('#Close').attr('style', 'margin-top: -18%;background-color: #4df109;');
        if ($('#Close').attr('style') != 'margin-top: -77%;background-color: #4df109;border-radius: 11px;') {

            ConfirmMessage("هل ترغب في قفل اليوم ", "code cannot br repeated?", "تحذير", "worning", () => {
                Ajax.Callsync({
                    type: "Post",
                    url: sys.apiUrl("Close_Day", "Close"),
                    success: (d) => {
                        //debugger


                        let result = d as BaseResponse;
                        if (result.IsSuccess == true) {

                            $('#Close').attr('style', 'margin-top: -77%;background-color: #4df109;border-radius: 11px;');

                        }
                        else {

                            $('#Close').attr('style', 'margin-top: -77%;background-color: #c40303;border-radius: 11px;');

                        }
                    }
                });
                return false;
            });
            //$('#Close').attr('style', 'margin-top: -18%;background-color: #4df109;border-radius: 11px;');

        }


    }
    function Check_Close_Day() {


        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Close_Day", "Check_Close_Day"),
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    let res = result.Response

                    //alert(res);
                    if (res == '1900-01-01T00:00:00') {

                        //Close.style.
                        $('#TitleSpan').html("");


                        $('#Close').attr('style', 'margin-top: -77%;background-color: #4df109;border-radius: 11px;');

                    }
                    else {

                        $('#TitleSpan').html(formatDate(res));


                        $('#Close').attr('style', 'margin-top: -77%;background-color: #c40303;border-radius: 11px;');

                    }
                }
                else {

                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });




    }


}
