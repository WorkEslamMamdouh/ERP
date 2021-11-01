class SystemTools {
    constructor() {
        this.orgCondition = "";
        this.SysSession = GetSystemSession();
    }

    public orgCondition: string;
    public SysSession: SystemSession; 

    public apiUrl(controller: string, action: string) {


        var apiUrl = $("#GetAPIUrl").val() + controller + "/" + action;
        return (apiUrl);
    }

    public getJsonData(model: any, type: string = ""): any {
         
        switch (type) {

            case "Insert":
                model.CreatedAt = DateTimeFormat(GetCurrentDate().toString());
                model.CreatedBy = this.SysSession.CurrentEnvironment.UserCode;
                break;
            case "Update":
                model.UpdatedAt = DateTimeFormat(GetCurrentDate().toString());
                model.UpdatedBy = this.SysSession.CurrentEnvironment.UserCode;
                break;
            default:
                break;
        }

        var res = JSON.stringify(model)
        return res;
    }

    public GetResourceByName<T>(callbackfn: (value: T, index: number, array: T[]) => any): string {

        let func: string = callbackfn.toString().split(".")[1].split(";")[0];
        let result = Ajax.Call<string>({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: func }

        });
        return result;
    }

    public GetFavorites() {
        var data = {
            session: this.SysSession.CurrentEnvironment
        };

        let UserCode = this.SysSession.CurrentEnvironment.UserCode;
        let SystemCode = this.SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;

        $.ajax({
            url: this.apiUrl("SystemTools", "GetFavorites"),
            data: { UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: (response) => {

                let result = response as Array<FavModules>;
                SharedWork.UserFavorits = result;
                this.SwitchFavoriteIcon();
                let div = DocumentActions.GetElementById<HTMLUListElement>("favourite_div");// document.getElementById("favourite_div") as HTMLDivElement;
                div.innerHTML = "";

                for (var fav of result) {
                    let li: HTMLLIElement = DocumentActions.CreateElement<HTMLLIElement>("li");
                    let desc: string = "";
                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "en")
                        desc = fav.MODULE_DESCE;
                    else
                        desc = fav.MODULE_DESCA;
                    li.innerHTML = `
                        <a href="#" onclick="HomeComponent.OpenView('`+ fav.MODULE_CODE + `','` + fav.MODULE_CODE + `');">
                            <strong>`+ desc + `</strong>
                        </a>`;
                    div.appendChild(li);
                }
            }
        });
    }

    private SwitchFavoriteIcon() {
        //imgFavUrl
         
        if (sessionStorage.getItem("MODU_CODE") == null) {
            sessionStorage.setItem("imgFavUrl", "../images/favourit.gif");
            return;
        }
        let favs = SharedWork.UserFavorits.filter(f => f.MODULE_CODE == sessionStorage.getItem("MODU_CODE"));

        let favImage = DocumentActions.GetElementById<HTMLImageElement>("favImage");
        if (favs.length > 0) { // This page is in favorite list
            //sessionStorage.setItem("imgFavUrl", "../images/favourit.gif");
            //$("#imgFavUrl").val("../images/favourit.gif");
            favImage.src = "../images/favourit.gif";
        }
        else {
            //$("#imgFavUrl").val("../images/favourit2.gif");
            //sessionStorage.setItem("imgFavUrl", "../images/favourit2.gif");
            favImage.src = "../images/favourit2.gif";
        }
    }

    public SwitchUserFavorite() {
        let UserCode = this.SysSession.CurrentEnvironment.UserCode;
        let Modulecode = this.SysSession.CurrentPrivileges.MODULE_CODE;
        let SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;
         
        Ajax.CallAsync({
            type: "GET",
            url: this.apiUrl("SystemTools", "SwitchUserFavorite"),
            data: { UserCode: UserCode, Modulecode: Modulecode, SubSystemCode: SubSystemCode },
            success: (response) => {
                this.GetFavorites();
            }
        });

    }

    public FindKey(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
         
        this.orgCondition = Condition;

        let SystemCode = this.SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;
        let ScreenLanguage = this.SysSession.CurrentEnvironment.ScreenLanguage;
        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "FindKey"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName,
                SystemCode: SystemCode,
                SubSystemCode: SubSystemCode,
                ScreenLanguage: ScreenLanguage
            },
            async: true,
            success: (resp) => {
                 
                var response = resp;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }

                let columns = response.Columns as Array<datatableColumn>;
                let result = JSON.parse(response.DataResult);

                let settings = response.Settings as G_SearchForm;
                let TableName = response.TableName as string;
                let Condition = response.Condition as string;

                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;

                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

                let boxWidth: string = settings.Width <= 100 ? "80%" : settings.Width.toString() + "px";
                let boxHeight: string = settings.Height <= 100 ? "80%" : settings.Height.toString() + "px";
                let boxLeft: string = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";
                 
                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);

                SearchGrid.SearchDataGrid.Bind();

                SearchGrid.SearchDataGrid.OnDoubleClick = () => {
                    console.log(SearchGrid.SearchDataGrid.SelectedKey);
                    $("#SearchBox").modal("hide");//.css("display", "none");
                    OnSearchSelected();
                };

                try {

                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (this.SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language...');
                }

                $(".ui-igedit-input").keyup((e) => {

                });

                $("#SearchBox").modal("show");//.css("display", "");//
                // $("#SearchBox").addClass("in");//.css("display", "");//

                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    }
    //old code
    //public FindNotification(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
    //    this.orgCondition = Condition;

    //    Ajax.CallAsync({
    //        url: Url.Action("Find", "ClientTools"),
    //        data: {
    //            moduleCode: moduleCode,
    //            Condition: Condition,
    //            controlName: _SearchControlName//$("#SearchControlName").val()
    //        },
    //        async: true,
    //        success: (resp) => {
    //            var response = resp.result;
    //            if (response == null) {
    //                MessageBox.Show("Search not available, Please call your app administrator", "Search");
    //                return;
    //            }

    //            let columns = response.Columns as Array<datatableColumn>;
    //            let result = JSON.parse(response.DataResult);

    //            let settings = response.Settings as G_SearchForm;
    //            let TableName = response.TableName as string;
    //            let Condition = response.Condition as string;

    //            SearchGrid.SearchDataGrid = new DataTable();
    //            SearchGrid.SearchDataGrid.Columns = columns;

    //            SearchGrid.SearchDataGrid.dataScr = result;
    //            SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
    //            SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
    //            SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

    //            let boxWidth: string = settings.Width <= 100 ? "70%" : settings.Width.toString() + "px";
    //            let boxHeight: string = settings.Height <= 100 ? "50%" : settings.Height.toString() + "px";
    //            let boxLeft: string = settings.Left <= 50 ? "14%" : settings.Left.toString() + "px";
    //            let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";

    //            $("#SearchBox").css("width", boxWidth);
    //            $("#SearchBox").css("height", boxHeight);
    //            $("#SearchBox").css("left", boxLeft);
    //            $("#SearchBox").css("top", boxTop);

    //            SearchGrid.SearchDataGrid.Bind();



    //            try {
    //                if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
    //                    document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
    //                }
    //                else if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
    //                    document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
    //                }
    //            } catch (e) {
    //                console.log('error in language...');
    //            }

    //            $(".ui-igedit-input").keyup((e) => {

    //            });

    //            $("#SearchBox").modal("show");//.css("display", "");//
    //            $("#SearchDataTable").css("width", "100%");
    //            $("#SearchDataTable").css("height", "100%");
    //        }
    //    });
    //}
    //new code//
    public FindNotification(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
        this.orgCondition = Condition;

        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "Find"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName
            },
            async: true,
            success: (resp) => {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }

                let columns = response.Columns as Array<datatableColumn>;
                let result = JSON.parse(response.DataResult);

                let settings = response.Settings as G_SearchForm;
                let TableName = response.TableName as string;
                let Condition = response.Condition as string;

                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;

                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize;// < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";

                let boxWidth: string = settings.Width <= 100 ? "70%" : settings.Width.toString() + "px";
                let boxHeight: string = settings.Height <= 100 ? "50%" : settings.Height.toString() + "px";
                let boxLeft: string = settings.Left <= 50 ? "14%" : settings.Left.toString() + "px";
                let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";

                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);

                SearchGrid.SearchDataGrid.Bind();



                try {
                    if (this.SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (this.SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language...');
                }

                $(".ui-igedit-input").keyup((e) => {

                });

                $("#SearchBox").modal("show");//.css("display", "");//
                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    }
    //***********************************************//
    private GenerateFiltersKey(moduleCode: string, sh: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";

        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                //if (e.key != Keys.Enter)
                //    return;
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";



                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition  // + " and " + fltr;
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: sh//$("#SearchControlName").val()
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };


            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);

            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }

    private GenerateFilters(moduleCode: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";

        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                //if (e.key != Keys.Enter)
                //    return;
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";



                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition  // + " and " + fltr;
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: $("#SearchControlName").val()
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };


            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);

            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }

    private GenerateFilterTypes(column: datatableColumn): HTMLSelectElement {
        let source: Array<SelectItem> = new Array<SelectItem>();
        if (column.dataType == "number") {
            source.push({ Text: "Equal", Value: "= {0}" },
                { Text: "Not Equal", Value: "<> {0}" },
                { Text: "Larger Than", Value: "> {0}" },
                { Text: "Larger Than Or Equal", Value: ">= {0}" },
                { Text: "Less Than", Value: "<{0}" },
                { Text: "Less Than Or Equal", Value: "< {0}" });
        }
        else {
            source.push(
                { Text: "Contains", Value: " Like '%{0}%'" },
                { Text: "Equal", Value: "= '{0}'" },
                { Text: "Starts With", Value: " Like '{0}%'" },
                { Text: "Ends With", Value: " Like '%{0}'" });
        }

        let cmbo: HTMLSelectElement = DocumentActions.CreateElement<HTMLSelectElement>("select");
        cmbo.className = "form-control";
        cmbo.id = "FType_" + column.key;
        DocumentActions.FillCombo(source, cmbo, "Value", "Text");
        return cmbo;
    }

    private convertFilterToCondition(cond: string, filter: string) {
        if (cond.toLowerCase() == "contains")
            return " Like '%" + filter + "%'";
        else if (cond.toLowerCase() == "endsWith")
            return " Like '%" + filter + "'";
        if (cond.toLowerCase() == "startswith")
            return " Like '" + filter + "%'";
    }


    public ImgPopup(CompCode: string, Branch: string, moduleCode: string, TrNo: string) {
        let opt: JQueryAjaxSettings = {
            url: Url.Action("ImagePopup", "GeneralReports"),
            success: (d) => {

                let result = d as string;


                $("#btnImgBody").html(result);
                $("#exampleModal2").modal("show");
                $('#exampleModal2').modal({
                    refresh: true
                });

                $("#btnCompCode").val(CompCode);
                $("#btnBranch").val(Branch);
                $("#btnmoduleCode").val(moduleCode);
                $("#btnTrNo").val(TrNo);

                //systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                //var val = $("#rpTitle").text();
                //$("#TitleSpan").html(val);
            }
        };
        Ajax.CallAsync(opt);


    }
}

class SelectItem {
    constructor() {
        this.Value = null;
        this.Text = null;
    }
    public Value: string;
    public Text: string;
}

//class SessionManager {
//    public Me: G_USERS;
//    public PageIndex: number;
//    public ModelCount: number;
//    public SessionRecord: SessionRecord;
//}


