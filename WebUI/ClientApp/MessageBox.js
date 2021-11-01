var MessageBox;
(function (MessageBox) {
    //azzoz 4/11/2020 10:30 PM
    var MessageBoxDialog;
    var MessageBoxDialogwithoutclick;
    var MessageBoxTitlewithoutclick;
    var MessageBoxTitle;
    var MessageBoxMessagewithoutclick;
    var MessageBoxMessage;
    var MessageBoxOk;
    var MessageBoxCancel;
    var Initalized = false;
    function InitalizeComponent() {
        MessageBoxDialog = document.getElementById("MessageBoxDialog");
        MessageBoxDialogwithoutclick = document.getElementById("MessageBoxDialogwithoutclick");
        MessageBoxTitle = document.getElementById("MessageBoxTitle");
        MessageBoxMessage = document.getElementById("MessageBoxMessage");
        MessageBoxTitlewithoutclick = document.getElementById("MessageBoxTitlewithoutclick");
        MessageBoxMessagewithoutclick = document.getElementById("MessageBoxMessagewithoutclick");
        MessageBoxOk = document.getElementById("MessageBoxOk");
        MessageBoxCancel = document.getElementById("MessageBoxCancel");
        Initalized = true;
    }
    var MessageBoxStyles;
    (function (MessageBoxStyles) {
        MessageBoxStyles[MessageBoxStyles["Danger"] = 0] = "Danger";
        MessageBoxStyles[MessageBoxStyles["Warning"] = 1] = "Warning";
        MessageBoxStyles[MessageBoxStyles["Info"] = 2] = "Info";
    })(MessageBoxStyles = MessageBox.MessageBoxStyles || (MessageBox.MessageBoxStyles = {}));
    function Show(Message, Title, OnOk) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;
        MessageBoxCancel.style.display = "none";
        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxDialog.id).modal("show");
        $("#" + MessageBoxDialog.id).css("z-index", "999999!important");
        $("#" + MessageBoxOk.id).click(function () {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();
        });
    }
    MessageBox.Show = Show;
    function Showwithoutclick(Message, Title) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitlewithoutclick.innerText = Title;
        MessageBoxMessagewithoutclick.innerText = Message;
        MessageBoxCancel.style.display = "none";
        //$("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxDialogwithoutclick.id).modal("show");
        $("#" + MessageBoxDialogwithoutclick.id).css("z-index", "999999!important");
        //$("#" + MessageBoxOk.id).click(() => {
        // $("#" + MessageBoxDialog.id).modal("hide");
        // });
    }
    MessageBox.Showwithoutclick = Showwithoutclick;
    function Ask(Message, Title, OnOk, OnCancel) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;
        MessageBoxCancel.style.display = "";
        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxCancel.id).off("click");
        $("#" + MessageBoxDialog.id).modal("show");
        $("#" + MessageBoxOk.id).click(function () {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();
        });
        $("#" + MessageBoxCancel.id).click(function () {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnCancel != null)
                OnCancel();
        });
    }
    MessageBox.Ask = Ask;
})(MessageBox || (MessageBox = {}));
//# sourceMappingURL=MessageBox.js.map