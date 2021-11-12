var SystemTools = /** @class */ (function () {
    function SystemTools() {
        this.orgCondition = "";
        this.SysSession = GetSystemSession();
    }
    SystemTools.prototype.apiUrl = function (controller, action) {
        var apiUrl = $("#GetAPIUrl").val() + controller + "/" + action;
        return (apiUrl);
    };
    SystemTools.prototype.getJsonData = function (model, type) {
        if (type === void 0) { type = ""; }
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
        var res = JSON.stringify(model);
        return res;
    };
    SystemTools.prototype.GetResourceByName = function (callbackfn) {
        var func = callbackfn.toString().split(".")[1].split(";")[0];
        var result = Ajax.Call({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: func }
        });
        return result;
    };
    SystemTools.prototype.GetFavorites = function () {
        var _this = this;
        var data = {
            session: this.SysSession.CurrentEnvironment
        };
        var UserCode = this.SysSession.CurrentEnvironment.UserCode;
        var SystemCode = this.SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;
        $.ajax({
            url: this.apiUrl("SystemTools", "GetFavorites"),
            data: { UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: function (response) {
                var result = response;
                SharedWork.UserFavorits = result;
                _this.SwitchFavoriteIcon();
                var div = DocumentActions.GetElementById("favourite_div"); // document.getElementById("favourite_div") as HTMLDivElement;
                div.innerHTML = "";
                for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                    var fav = result_1[_i];
                    var li = DocumentActions.CreateElement("li");
                    var desc = "";
                    if (_this.SysSession.CurrentEnvironment.ScreenLanguage == "en")
                        desc = fav.MODULE_DESCE;
                    else
                        desc = fav.MODULE_DESCA;
                    li.innerHTML = "\n                        <a href=\"#\" onclick=\"HomeComponent.OpenView('" + fav.MODULE_CODE + "','" + fav.MODULE_CODE + "');\">\n                            <strong>" + desc + "</strong>\n                        </a>";
                    div.appendChild(li);
                }
            }
        });
    };
    SystemTools.prototype.SwitchFavoriteIcon = function () {
        //imgFavUrl
        if (sessionStorage.getItem("MODU_CODE") == null) {
            sessionStorage.setItem("imgFavUrl", "../images/favourit.gif");
            return;
        }
        var favs = SharedWork.UserFavorits.filter(function (f) { return f.MODULE_CODE == sessionStorage.getItem("MODU_CODE"); });
        var favImage = DocumentActions.GetElementById("favImage");
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
    };
    SystemTools.prototype.SwitchUserFavorite = function () {
        var _this = this;
        var UserCode = this.SysSession.CurrentEnvironment.UserCode;
        var Modulecode = this.SysSession.CurrentPrivileges.MODULE_CODE;
        var SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;
        Ajax.CallAsync({
            type: "GET",
            url: this.apiUrl("SystemTools", "SwitchUserFavorite"),
            data: { UserCode: UserCode, Modulecode: Modulecode, SubSystemCode: SubSystemCode },
            success: function (response) {
                _this.GetFavorites();
            }
        });
    };
    SystemTools.prototype.FindKey = function (moduleCode, _SearchControlName, Condition, OnSearchSelected) {
        var _this = this;
        this.orgCondition = Condition;
        var SystemCode = this.SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = this.SysSession.CurrentEnvironment.SubSystemCode;
        var ScreenLanguage = this.SysSession.CurrentEnvironment.ScreenLanguage;
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
            success: function (resp) {
                var response = resp;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                var columns = response.Columns;
                var result = JSON.parse(response.DataResult);
                var settings = response.Settings;
                var TableName = response.TableName;
                var Condition = response.Condition;
                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;
                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize; // < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";
                var boxWidth = settings.Width <= 100 ? "80%" : settings.Width.toString() + "px";
                var boxHeight = settings.Height <= 100 ? "80%" : settings.Height.toString() + "px";
                var boxLeft = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                var boxTop = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";
                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);
                SearchGrid.SearchDataGrid.Bind();
                SearchGrid.SearchDataGrid.OnDoubleClick = function () {
                    console.log(SearchGrid.SearchDataGrid.SelectedKey);
                    $("#SearchBox").modal("hide"); //.css("display", "none");
                    OnSearchSelected();
                };
                try {
                    if (_this.SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (_this.SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                }
                catch (e) {
                    console.log('error in language...');
                }
                $(".ui-igedit-input").keyup(function (e) {
                });
                $("#SearchBox").modal("show"); //.css("display", "");//
                // $("#SearchBox").addClass("in");//.css("display", "");//
                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    };
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
    SystemTools.prototype.FindNotification = function (moduleCode, _SearchControlName, Condition, OnSearchSelected) {
        var _this = this;
        this.orgCondition = Condition;
        Ajax.CallAsync({
            url: this.apiUrl("SystemTools", "Find"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName
            },
            async: true,
            success: function (resp) {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                var columns = response.Columns;
                var result = JSON.parse(response.DataResult);
                var settings = response.Settings;
                var TableName = response.TableName;
                var Condition = response.Condition;
                SearchGrid.SearchDataGrid = new DataTable();
                SearchGrid.SearchDataGrid.Columns = columns;
                SearchGrid.SearchDataGrid.dataScr = result;
                SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
                SearchGrid.SearchDataGrid.PageSize = settings.PageSize; // < 50 ? 50 : settings.PageSize;
                SearchGrid.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";
                var boxWidth = settings.Width <= 100 ? "70%" : settings.Width.toString() + "px";
                var boxHeight = settings.Height <= 100 ? "50%" : settings.Height.toString() + "px";
                var boxLeft = settings.Left <= 50 ? "14%" : settings.Left.toString() + "px";
                var boxTop = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";
                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);
                SearchGrid.SearchDataGrid.Bind();
                try {
                    if (_this.SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (_this.SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                }
                catch (e) {
                    console.log('error in language...');
                }
                $(".ui-igedit-input").keyup(function (e) {
                });
                $("#SearchBox").modal("show"); //.css("display", "");//
                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    };
    //***********************************************//
    SystemTools.prototype.GenerateFiltersKey = function (moduleCode, sh, columns, dataSource, onSuccess) {
        var _this = this;
        var SearchFilters = DocumentActions.GetElementById("SearchFilters");
        var sqlConditions = new Array();
        SearchFilters.innerHTML = "";
        var SearchFilterTypes = DocumentActions.GetElementById("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (column.hidden == true)
                continue;
            var txt = DocumentActions.CreateElement("input");
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
            txt.onkeyup = function (e) {
                //if (e.key != Keys.Enter)
                //    return;
                var currentInput = e.currentTarget;
                var colIndex = currentInput.tabIndex;
                var columnKey = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";
                var filter = "";
                var fltr = "";
                fltr = "";
                var cond = "";
                for (var _i = 0, sqlConditions_1 = sqlConditions; _i < sqlConditions_1.length; _i++) {
                    cond = sqlConditions_1[_i];
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";
                if (_this.orgCondition != "" && fltr != "") {
                    filter = fltr + _this.orgCondition; // + " and " + fltr;
                }
                else if (_this.orgCondition == "")
                    filter = fltr + "0 = 0";
                else
                    filter = _this.orgCondition;
                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: sh //$("#SearchControlName").val()
                    },
                    success: function (d) {
                        onSuccess(d);
                    }
                });
            };
            var td = DocumentActions.CreateElement("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);
            var tdType = DocumentActions.CreateElement("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    };
    SystemTools.prototype.GenerateFilters = function (moduleCode, columns, dataSource, onSuccess) {
        var _this = this;
        var SearchFilters = DocumentActions.GetElementById("SearchFilters");
        var sqlConditions = new Array();
        SearchFilters.innerHTML = "";
        var SearchFilterTypes = DocumentActions.GetElementById("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
            var column = columns_2[_i];
            if (column.hidden == true)
                continue;
            var txt = DocumentActions.CreateElement("input");
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
            txt.onkeyup = function (e) {
                //if (e.key != Keys.Enter)
                //    return;
                var currentInput = e.currentTarget;
                var colIndex = currentInput.tabIndex;
                var columnKey = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";
                var filter = "";
                var fltr = "";
                fltr = "";
                var cond = "";
                for (var _i = 0, sqlConditions_2 = sqlConditions; _i < sqlConditions_2.length; _i++) {
                    cond = sqlConditions_2[_i];
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                //fltr += "0 = 0";
                if (_this.orgCondition != "" && fltr != "") {
                    filter = fltr + _this.orgCondition; // + " and " + fltr;
                }
                else if (_this.orgCondition == "")
                    filter = fltr + "0 = 0";
                else
                    filter = _this.orgCondition;
                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: $("#SearchControlName").val()
                    },
                    success: function (d) {
                        onSuccess(d);
                    }
                });
            };
            var td = DocumentActions.CreateElement("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);
            var tdType = DocumentActions.CreateElement("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    };
    SystemTools.prototype.GenerateFilterTypes = function (column) {
        var source = new Array();
        if (column.dataType == "number") {
            source.push({ Text: "Equal", Value: "= {0}" }, { Text: "Not Equal", Value: "<> {0}" }, { Text: "Larger Than", Value: "> {0}" }, { Text: "Larger Than Or Equal", Value: ">= {0}" }, { Text: "Less Than", Value: "<{0}" }, { Text: "Less Than Or Equal", Value: "< {0}" });
        }
        else {
            source.push({ Text: "Contains", Value: " Like '%{0}%'" }, { Text: "Equal", Value: "= '{0}'" }, { Text: "Starts With", Value: " Like '{0}%'" }, { Text: "Ends With", Value: " Like '%{0}'" });
        }
        var cmbo = DocumentActions.CreateElement("select");
        cmbo.className = "form-control";
        cmbo.id = "FType_" + column.key;
        DocumentActions.FillCombo(source, cmbo, "Value", "Text");
        return cmbo;
    };
    SystemTools.prototype.convertFilterToCondition = function (cond, filter) {
        if (cond.toLowerCase() == "contains")
            return " Like '%" + filter + "%'";
        else if (cond.toLowerCase() == "endsWith")
            return " Like '%" + filter + "'";
        if (cond.toLowerCase() == "startswith")
            return " Like '" + filter + "%'";
    };
    SystemTools.prototype.ImgPopup = function (CompCode, Branch, moduleCode, TrNo) {
        var opt = {
            url: Url.Action("ImagePopup", "GeneralReports"),
            success: function (d) {
                var result = d;
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
    };
    return SystemTools;
}());
var SelectItem = /** @class */ (function () {
    function SelectItem() {
        this.Value = null;
        this.Text = null;
    }
    return SelectItem;
}());
//class SessionManager {
//    public Me: G_USERS;
//    public PageIndex: number;
//    public ModelCount: number;
//    public SessionRecord: SessionRecord;
//}
//# sourceMappingURL=SystemTools.js.map