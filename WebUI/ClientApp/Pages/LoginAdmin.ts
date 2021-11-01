$(document).ready(function () {
    LoginComponent.checkBrowser();
    //LoginComponent.InitalizeComponent();
});
var LoginComponent;
(function (LoginComponent) {
    var sys = new SystemTools();
    var sysPar = new SystemParameters();
    var cmbLanguage;
    var OnLoggedUrl = "";
    var txtUserName;
    var txtUserPassword;
    var chkRemember;
    var btnLogin;
    var btnBack;
    var txtYear;
    var hLoggedName;
    var spnLoggedYear;
    var cmbBranch;
    var cmbCompany;
    var login_;
    var vSysTimeOut = " 30";

    var compData = Array();
    var SystemEnv: SystemEnvironment = new SystemEnvironment();
    var SysSession: SystemSession = GetSystemSession();

    function InitalizeComponent() {
        txtUserName = document.getElementById("txtUserName");
        txtUserPassword = document.getElementById("txtUserPassword");
         btnLogin = document.getElementById("btnLogin");
        //btnBack = document.getElementById("btnBack");
         //cmbLanguage = document.getElementById("cmbLanguage");
        //txtYear = document.getElementById("txtYear");
        //hLoggedName = DocumentActions.GetElementById("hLoggedName");
        //spnLoggedYear = DocumentActions.GetElementById("spnLoggedYear");
        //cmbCompany = document.getElementById("cmbCompany");
        //cmbBranch = document.getElementById("cmbBranch");
        OnLoggedUrl = $("#OnLogged").val();
        //btnBack.addEventListener("click", GoBack);
        btnLogin.addEventListener("click", Login);
         //MessageBox

        var loginData = localStorage.getItem("Inv1_Login_Data");
        if (loginData != null) {

            var data = JSON.parse(loginData);
            txtUserName.value = data.USER_CODE;
            txtUserPassword.value = data.USER_PASSWORD;

            //txtYear.value = "2021";
            //cmbLanguage.value = data.Language;
            //chkRemember.checked = true;
        }
        else {
             
        }
    }
    LoginComponent.InitalizeComponent = InitalizeComponent;
    function checkBrowser() {
        // Get the user-agent string
        var userAgentString = navigator.userAgent;
        // Detect Chrome
        var chromeAgent = userAgentString.indexOf("Chrome") > -1;
        if (userAgentString == "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1"
            || "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb)AppleWebKit/ 534.46.0 (KHTML, like Gecko)CriOS / 19.0.1084.60 Mobile/ 9B206 Safari/ 7534.48.3"
            || "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)AppleWebKit/ 602.1.50 (KHTML, like Gecko) CriOS/ 56.0.2924.75 Mobile / 14E5239e Safari/ 602.1") {
            chromeAgent = true;
        }
        // Detect Internet Explorer
        var IExplorerAgent =
            //User - Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/ 79.0.3945.74 Safari/ 537.36 Edg/ 79.0.309.43
            userAgentString.indexOf("MSIE") > -1 ||
            userAgentString.indexOf("rv:") > -1;
        // Detect Firefox
        var firefoxAgent = userAgentString.indexOf("Firefox") > -1;
        // Detect Safari
        var safariAgent = userAgentString.indexOf("Safari") > -1;
        var EdgeAgent = userAgentString.indexOf("Edge") > -1;
        // Discard Safari since it also matches Chrome
        if ((chromeAgent) && (safariAgent))
            safariAgent = false;
        // Detect Opera
        var operaAgent = userAgentString.indexOf("OP") > -1;
        // Discard Chrome since it also matches Opera
        if ((chromeAgent) && (operaAgent))
            chromeAgent = false;
        if (safariAgent || IExplorerAgent || operaAgent || firefoxAgent || EdgeAgent) {
            var mg = "يجب الدخول من متصفح جوجل كروم" + "You must log in from Google Chrome";
            MessageBox.Show(mg, "");
        }
        else {
            InitalizeComponent();
        }
    }
    LoginComponent.checkBrowser = checkBrowser;
    function Login() {
         var userName = txtUserName.value;
        var userPassword = txtUserPassword.value;
        var user = new G_USERS();
        user.USER_CODE = userName;
        user.USER_PASSWORD = userPassword; 
        txtUserName.style.borderColor = "";
        txtUserPassword.style.borderColor = ""; 
        SystemEnv.ScreenLanguage = 'ar';
         SystemEnv.UserCode = userName; 
        var dt = new Date();
        var timenow = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        localStorage.setItem("LastAccess", timenow); 
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "UserLogin"),
            data: { UserCode: user.USER_CODE, Password: user.USER_PASSWORD },
            success: function (d) {
                var res = d;
                if (res.IsSuccess == true) {
                    var result = <G_USERS>res.Response;
                    if (result != null && result.USER_CODE != null && result.USER_ACTIVE == true) {                         

                        SystemEnv.Token = result.Tokenid;
                        SystemEnv.UserType = result.USER_TYPE;
                      
                        document.cookie = "Inv1_systemProperties=" + JSON.stringify(SystemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        
                         OnLogged();

                     }
                    else {  // Error in user or pass or active 
                        txtUserName.style.borderColor = "red";
                        txtUserPassword.style.borderColor = "red";
                    }
                }
                else { // Error in API 
                    alert(res.ErrorMessage);
                    return;
                }
            }
        });
    }
     function OnLogged() {

        // set api session values 
        APiSession.Session.BranchCode = SystemEnv.BranchCode;
        APiSession.Session.CompCode = SystemEnv.CompCode;
        APiSession.Session.SystemCode = SystemEnv.SystemCode;
        APiSession.Session.SubSystemCode = SystemEnv.SubSystemCode;
        APiSession.Session.ScreenLanguage = SystemEnv.ScreenLanguage;
        APiSession.Session.UserCode = SystemEnv.UserCode;
         $.ajax({
            url: OnLoggedUrl,
            success: function (result) {

                var obj = result.result;
                window.location.href = obj.url;
            }
        });

    }
    function GoBack() {
        $("#divCompanies").addClass("display_none");
        $("#div_pass").addClass("display_none");

    }
    function Gologin() {
        $("#div_pass").removeClass("display_none");

        $("#btn_login_1").addClass("display_none");
        $("#btn_login_2").removeClass("display_none");


    }
    function cmbCompany_Onchange(compCode, lang) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetBranchsUser"),
            data: { compCode: compCode, userCode: txtUserName.value },
            success: function (d) {
                var res = d;
                if (res.IsSuccess == true) {
                    var result = res.Response;
                    cmbBranch.innerHTML = "";
                    result.forEach(function (bra, index) {
                        var text = bra.BRA_CODE.toString() + "- " + (lang == "en" ? bra.BRA_DESCE : bra.BRA_DESC);
                        cmbBranch.add(new Option(text, bra.BRA_CODE.toString()));
                    });
                }
            }
        });
    }
})(LoginComponent || (LoginComponent = {}));
//# sourceMappingURL=LoginComponent.js.map