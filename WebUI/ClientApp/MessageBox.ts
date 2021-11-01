namespace MessageBox {
    //azzoz 4/11/2020 10:30 PM
    var MessageBoxDialog: HTMLDivElement;
    var MessageBoxDialogwithoutclick: HTMLDivElement;
    var MessageBoxTitlewithoutclick: HTMLHeadingElement;
    var MessageBoxTitle: HTMLHeadingElement;

    var MessageBoxMessagewithoutclick: HTMLHeadingElement;
    var MessageBoxMessage: HTMLHeadingElement;

    var MessageBoxOk: HTMLButtonElement;
    var MessageBoxCancel: HTMLButtonElement;

    var Initalized: boolean = false;
    function InitalizeComponent() {
        MessageBoxDialog = document.getElementById("MessageBoxDialog") as HTMLDivElement;
        MessageBoxDialogwithoutclick = document.getElementById("MessageBoxDialogwithoutclick") as HTMLDivElement;

        MessageBoxTitle = document.getElementById("MessageBoxTitle") as HTMLHeadingElement;
        MessageBoxMessage = document.getElementById("MessageBoxMessage") as HTMLHeadingElement;
        MessageBoxTitlewithoutclick = document.getElementById("MessageBoxTitlewithoutclick") as HTMLHeadingElement;
        MessageBoxMessagewithoutclick = document.getElementById("MessageBoxMessagewithoutclick") as HTMLHeadingElement;

        MessageBoxOk = document.getElementById("MessageBoxOk") as HTMLButtonElement;

        MessageBoxCancel = document.getElementById("MessageBoxCancel") as HTMLButtonElement;


        Initalized = true;

    }

    export enum MessageBoxStyles {
        Danger,
        Warning,
        Info
    }
    export function Show(Message: string, Title: string, OnOk?: () => void) {
         
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;

        MessageBoxCancel.style.display = "none";
        
        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxDialog.id).modal("show");
        $("#" + MessageBoxDialog.id).css("z-index", "999999!important");
        $("#" + MessageBoxOk.id).click(() => {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();

        });
    }
    export function Showwithoutclick(Message: string, Title: string) {
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
    export function Ask(Message: string, Title: string, OnOk?: () => void, OnCancel?: () => void) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;

        MessageBoxCancel.style.display = "";

        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxCancel.id).off("click");

        $("#" + MessageBoxDialog.id).modal("show");

        $("#" + MessageBoxOk.id).click(() => {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();

        });

        $("#" + MessageBoxCancel.id).click(() => {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnCancel != null)
                OnCancel();


        });
    }

}