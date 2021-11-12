var normalizePromise = function (promise) {
    var d = $.Deferred();
    if (promise && promise.then) {
        promise.then(function () {
            d.resolve.apply(d, arguments);
        }, function () {
            d.reject.apply(d, arguments);
        });
    }
    else {
        d.resolve(promise);
    }
    return d.promise();
};
var JsGrid = /** @class */ (function () {
    function JsGrid() {
        this.SysSession = GetSystemSession();
        this.autosearch = true;
        this.ConfirmDeleteing = false;
        this.PageSize = 50;
        this.SwitchingLanguageEnabled = true;
        this.SORT_ORDER_ASC = "asc";
        this.Width = "100%";
        this.Height = "auto";
        this.Heading = true;
        this.InsertionMode = JsGridInsertionMode.Internal;
        this.CancelInserting = false;
        this.IsCanceled = false;
    }
    JsGrid.prototype.CancelItemDeleteing = function () {
    };
    JsGrid.prototype.cancelItemDeleting = function (arg) {
        arg.cancel = true;
    };
    JsGrid.prototype.SwitchInsertingRow = function () {
        var value = $('#' + this.ElementName).jsGrid('option', 'inserting');
        $('#' + this.ElementName).jsGrid('option', 'inserting', !value);
    };
    JsGrid.prototype.SwitchEditing = function () {
        var value = $('#' + this.ElementName).jsGrid('option', 'editing');
        $('#' + this.ElementName).jsGrid('option', 'editing', !value);
    };
    JsGrid.prototype.GenerateColumns = function (objType) {
        //let row = this.DataSource[0];
        this.Columns = new Array();
        var fields = Object.getOwnPropertyNames(objType);
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            var col = {
                name: field,
                nameDesc: field,
                title: field,
                type: "label"
            };
            this.Columns.push(col);
        }
    };
    JsGrid.prototype.SwitchColumnsLanguage = function () {
        //for (var col of this.Columns) {
        //    col.title = Language.GetValueByKey(col.name);
        //}
    };
    JsGrid.prototype.Bind = function () {
        var _this = this;
        $(".jsgrid-grid-body").css("max-height", this.Height);
        $(".jsgrid-grid-body").css("height", this.Height);
        if (this.SwitchingLanguageEnabled == true) {
            this.SwitchColumnsLanguage();
        }
        $("#" + this.ElementName).jsGrid({
            width: this.Width,
            height: this.Height,
            heading: this.Heading,
            inserting: this.Inserting,
            editing: this.Editing,
            sorting: this.Sorting,
            paging: this.Paging,
            filtering: this.Filtering,
            autoLoad: true,
            selecting: true,
            pageSize: this.PageSize,
            data: this.DataSource,
            confirmDeleting: true,
            deleteConfirm: this.SysSession.CurrentEnvironment.ScreenLanguage == "ar" ? "هل متأكد من الحذف" : "Are you sure ?",
            fields: this.Columns,
            //controller: {
            //    data : this.DataSource,
            //    loadData: function () {
            //        return data;
            //    }
            //},
            //rowClick: function (args) {
            //    if (this.editing) {
            //        this.editItem($(args.event.target).closest("tr"));
            //    }
            //},
            getFilter: function () {
                var result = {};
                this._eachField(function (field) {
                    if (field.filtering) {
                        this._setItemFieldValue(result, field, field.filterValue());
                    }
                });
                return result;
            },
            filterTemplate: function () {
                if (!this.filtering)
                    return "";
                var grid = this._grid, $result = this.filterControl = this._createTextBox();
                if (this.autosearch) {
                    $result.on("keypress", function (e) {
                        if (e.which === 13) {
                            grid.search();
                            e.preventDefault();
                        }
                    });
                }
                return $result;
            },
            loadData: function (filter) {
                filter = filter || (this.filtering ? this.getFilter() : {});
                $.extend(filter, this._loadStrategy.loadParams(), this._sortingParams());
                var args = this._callEventHandler(this.onDataLoading, {
                    filter: filter
                });
                return this._controllerCall("loadData", filter, args.cancel, function (loadedData) {
                    if (!loadedData)
                        return;
                    this._loadStrategy.finishLoad(loadedData);
                    this._callEventHandler(this.onDataLoaded, {
                        data: loadedData
                    });
                });
            },
            _controllerCall: function (method, param, isCanceled, doneCallback) {
                if (isCanceled)
                    return $.Deferred().reject().promise();
                this._showLoading();
                var controller = this._controller;
                if (!controller || !controller[method]) {
                    throw Error("controller has no method '" + method + "'");
                }
                return normalizePromise(controller[method](param))
                    .done($.proxy(doneCallback, this))
                    .fail($.proxy(this._errorHandler, this))
                    .always($.proxy(this._hideLoading, this));
            },
            _setSortingParams: function (field, order) {
                field = this._normalizeField(field);
                order = order || ((this._sortField === field) ? this._reversedSortOrder(this._sortOrder) : "asc");
                this._sortField = field;
                this._sortOrder = order;
            },
            sort: function (field, order) {
                if ($.isPlainObject(field)) {
                    order = field.order;
                    field = field.field;
                }
                this._clearSortingCss();
                this._setSortingParams(field, order);
                this._setSortingCss();
                return this._loadStrategy.sort();
            },
            _sortData: function () {
                var sortFactor = this._sortFactor(), sortField = this._sortField;
                if (sortField) {
                    this.data.sort(function (item1, item2) {
                        return sortFactor * sortField.sortingFunc(item1[sortField.name], item2[sortField.name]);
                    });
                }
            },
            _sortingParams: function () {
                if (this.sorting && this._sortField) {
                    return {
                        sortField: this._sortField.name,
                        sortOrder: this._sortOrder
                    };
                }
                return {};
            },
            search: function (filter) {
                this._resetSorting();
                this._resetPager();
                return this.loadData(filter);
            },
            _resetSorting: function () {
                this._sortField = null;
                this._sortOrder = "asc";
                this._clearSortingCss();
            },
            _resetPager: function () {
                this._firstDisplayingPage = 1;
                this._setPage(1);
            },
            //filterTemplate: function () {
            //     
            //    if (!this.filtering)
            //        return "";
            //    var grid = this._grid,
            //        $result = this.filterControl = this._createTextBox();
            //    if (this.autosearch) {
            //        $result.on("keypress", function (e) {
            //            if (e.which === 13) {
            //                grid.search();
            //                e.preventDefault();
            //            }
            //        });
            //    }
            //    return $result;
            //},
            //rowClick: (e) => {
            //     
            //    let row = e.event.currentTarget as HTMLTableRowElement;
            //    $(".jsgrid-row").removeClass("SelectedRowF");
            //    $(".jsgrid-alt-row").removeClass("SelectedRowF");
            //    row.className += " SelectedRowF";
            //    this.SelectedIndex = this.DataSource.indexOf(e.item);// e.itemIndex;
            //    this.SelectedItem = e.item;
            //    if (this.OnRowSelected != null)
            //        this.OnRowSelected();
            //    this.OnItemEditing(e);
            //},
            rowClick: function (e) {
                var row = e.event.currentTarget;
                $(".jsgrid-row").removeClass("SelectedRowF");
                $(".jsgrid-alt-row").removeClass("SelectedRowF");
                row.className += " SelectedRowF";
                _this.SelectedIndex = _this.DataSource.indexOf(e.item); // e.itemIndex;
                _this.SelectedItem = e.item;
                if (_this.OnRowSelected != null)
                    _this.OnRowSelected();
                //  this.OnItemEditing(e);
            },
            filterValue: function () {
                return this.filterControl.val();
            },
            onDataLoaded: function () {
                if (_this.OnDataLoaded != null)
                    _this.OnDataLoaded();
            },
            onRefreshed: function () {
                if (_this.OnRefreshed != null)
                    _this.OnRefreshed();
            },
            rowDoubleClick: function (e) {
                _this.SelectedIndex = _this.DataSource.indexOf(e.item); // e.itemIndex;
                _this.SelectedItem = e.item;
                _this.SelectedKey = e.item[_this.PrimaryKey];
                if (_this.OnRowDoubleClicked != null)
                    _this.OnRowDoubleClicked();
            },
            onRefreshing: function (arg) {
            },
            onItemInserting: function (arg) {
                if (_this.OnItemInserting != null) {
                    if (_this.InsertionMode == JsGridInsertionMode.Binding)
                        arg.cancel = true;
                    var e = new JsGridInsertEventArgs();
                    e.Item = arg.item;
                    _this.OnItemInserting(e);
                }
            },
            onItemInserted: function (arg) {
                //$("#" + this.ElementName).jsGrid('option', 'inserting', false);
                //$("#" + this.ElementName).jsGrid("refresh");
                if (_this.OnItemInserted != null)
                    _this.OnItemInserted();
            },
            onItemUpdating: function (arg) {
                if (_this.OnItemUpdating != null) {
                    var e = new JsGridUpdateEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.PreviousItem = arg.previousItem;
                    e.Row = arg.row;
                    _this.OnItemUpdating(e);
                }
            },
            onItemEditing: function (arg) {
                if (_this.OnItemEditing != null) {
                    var e = new JsGridEditEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    _this.OnItemEditing(e);
                }
            },
            onItemDeleting: function (arg) {
                if (_this.OnItemDeleting != null) {
                    var e = new JsGridDeleteEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    //MessageBox.Ask("هل أنت متأكد", "حذف",
                    //    () => {
                    //        this.OnItemDeleting(e);
                    //    },
                    //    () => {
                    //        arg.Cancel = true;
                    //    });
                    _this.OnItemDeleting(e);
                }
                //else
                //    arg.cancel = true;
            },
            onItemDeleted: function (arg) {
            }
        });
    };
    //public paginationGoToPage(i: any) {
    //    //$("#" + this.ElementName).jsGrid._firstDisplayingPage = i;
    //    ////$("#" + this.ElementName)._setPage(i); 
    //    //$("#" + this.ElementName).jsGrid._setPage(i);
    //    //$("#" + this.ElementName).api.paginationGoToNextPage();
    //    var grid = $("#" + this.ElementName);
    //    pages.push(grid._createPagerPageNavButton(grid.pageNavigatorNextText, grid.showNextPages));
    //}
    JsGrid.prototype.InsertItem = function (sender, e) {
        if (e.Canel == true)
            return;
        $("#" + this.ElementName).jsGrid("insertItem", JSON.stringify(sender)).done(function () {
        });
    };
    JsGrid.prototype.AddFunctions = function () {
        var Functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            Functions[_i] = arguments[_i];
        }
        this._functions = Functions;
    };
    JsGrid.prototype.Refresh = function () {
        $("#" + this.ElementName).jsGrid("refresh");
    };
    return JsGrid;
}());
var JsGridInsertEventArgs = /** @class */ (function () {
    function JsGridInsertEventArgs() {
    }
    return JsGridInsertEventArgs;
}());
var JsGridDeleteEventArgs = /** @class */ (function () {
    function JsGridDeleteEventArgs() {
        this.Cancel = false;
    }
    return JsGridDeleteEventArgs;
}());
var JsGridUpdateEventArgs = /** @class */ (function () {
    function JsGridUpdateEventArgs() {
    }
    return JsGridUpdateEventArgs;
}());
var JsGridEditEventArgs = /** @class */ (function () {
    function JsGridEditEventArgs() {
    }
    return JsGridEditEventArgs;
}());
var JsGridInsertionMode;
(function (JsGridInsertionMode) {
    JsGridInsertionMode[JsGridInsertionMode["Internal"] = 0] = "Internal";
    JsGridInsertionMode[JsGridInsertionMode["Binding"] = 1] = "Binding";
})(JsGridInsertionMode || (JsGridInsertionMode = {}));
//# sourceMappingURL=JsGrid.js.map