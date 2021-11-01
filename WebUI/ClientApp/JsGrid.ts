var normalizePromise = function (promise) {

    var d = $.Deferred();

    if (promise && promise.then) {
        promise.then(function () {
            d.resolve.apply(d, arguments);
        }, function () {
            d.reject.apply(d, arguments);
        });
    } else {
        d.resolve(promise);
    }

    return d.promise();
};
class JsGrid {
    public SysSession = GetSystemSession();
    public ElementName: string;

    public Inserting: boolean;
    public Editing: boolean;
    public Paging: boolean;
    public Sorting: boolean;
    public Filtering: boolean;
    autosearch = true;
    public ConfirmDeleteing: boolean = false;
    public PageSize: number = 50;
    public SwitchingLanguageEnabled: boolean = true;
    public SORT_ORDER_ASC = "asc";
    public Width: string = "100%";
    public Height: string = "auto";
    public DataSource: Array<any>;
    public Columns: Array<IJsGridColumn>;
    public Heading: boolean = true;
    public SelectedItem: any;
    public SelectedIndex: number;
    public OnDataLoaded: () => void;
    public OnRefreshed: () => void;
    public OnRowSelected: () => void;
    public OnRowDoubleClicked: () => void;
    public OnRowClicked: () => void;
    public InsertionMode: JsGridInsertionMode = JsGridInsertionMode.Internal;
    public OnItemInserting: (args: JsGridInsertEventArgs) => void;
    public OnItemInserted: () => void;
    public OnItemUpdating: (args: JsGridUpdateEventArgs) => void;
    public OnItemEditing: (args: JsGridEditEventArgs) => void;
    public OnItemDeleting: (args: JsGridDeleteEventArgs) => void;
    public CancelInserting: boolean = false;
    public CancelItemDeleteing(): void {

    }
    private cancelItemDeleting(arg): void {
        arg.cancel = true;
    }

    public PrimaryKey: string;
    public SelectedKey: string;

    public Controller: any;
    public IsCanceled: boolean = false;


    public SwitchInsertingRow() {
        let value: boolean = <boolean>$('#' + this.ElementName).jsGrid('option', 'inserting');

        $('#' + this.ElementName).jsGrid('option', 'inserting', !value);
    }
    public SwitchEditing() {
        let value: boolean = <boolean>$('#' + this.ElementName).jsGrid('option', 'editing');
        $('#' + this.ElementName).jsGrid('option', 'editing', !value);
    }
    public GenerateColumns(objType: any) {
        //let row = this.DataSource[0];
         
        this.Columns = new Array<IJsGridColumn>();
        let fields = Object.getOwnPropertyNames(objType);
        for (var field of fields) {
            let col: IJsGridColumn = {
                name: field,
                nameDesc: field,
                title: field,
                type: "label"
            };
            this.Columns.push(col);
        }
    }

    public SwitchColumnsLanguage(): void {
        //for (var col of this.Columns) {
        //    col.title = Language.GetValueByKey(col.name);
        //}
    }
    public Bind() {
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
            confirmDeleting: true,//this.ConfirmDeleteing,
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

                var grid = this._grid,
                    $result = this.filterControl = this._createTextBox();

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

                var sortFactor = this._sortFactor(),
                    sortField = this._sortField;

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
            rowClick: (e) => {
                 let row = e.event.currentTarget as HTMLTableRowElement;
                $(".jsgrid-row").removeClass("SelectedRowF");
                $(".jsgrid-alt-row").removeClass("SelectedRowF");

                row.className += " SelectedRowF";

                this.SelectedIndex = this.DataSource.indexOf(e.item);// e.itemIndex;
                this.SelectedItem = e.item;
                if (this.OnRowSelected != null)
                    this.OnRowSelected();
              //  this.OnItemEditing(e);

            },

            filterValue: function () {

                return this.filterControl.val();
            },
            onDataLoaded: () => {
                if (this.OnDataLoaded != null)
                    this.OnDataLoaded();
            },
            onRefreshed: () => {
                if (this.OnRefreshed != null)
                    this.OnRefreshed();
            },
            rowDoubleClick: (e) => {
                this.SelectedIndex = this.DataSource.indexOf(e.item);// e.itemIndex;
                this.SelectedItem = e.item;
                this.SelectedKey = e.item[this.PrimaryKey];
                if (this.OnRowDoubleClicked != null)
                    this.OnRowDoubleClicked();
            },

            onRefreshing: (arg) => {

            },



            onItemInserting: (arg) => {
                if (this.OnItemInserting != null) {
                    if (this.InsertionMode == JsGridInsertionMode.Binding)
                        arg.cancel = true;

                    let e: JsGridInsertEventArgs = new JsGridInsertEventArgs();
                    e.Item = arg.item;
                    this.OnItemInserting(e);


                }
            },
            onItemInserted: (arg) => {
                //$("#" + this.ElementName).jsGrid('option', 'inserting', false);
                //$("#" + this.ElementName).jsGrid("refresh");
                if (this.OnItemInserted != null)
                    this.OnItemInserted();
            },

            onItemUpdating: (arg) => {
                if (this.OnItemUpdating != null) {
                    let e: JsGridUpdateEventArgs = new JsGridUpdateEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.PreviousItem = arg.previousItem;
                    e.Row = arg.row;
                    this.OnItemUpdating(e);
                }
            },

            onItemEditing: (arg) => {

                if (this.OnItemEditing != null) {
                    let e: JsGridEditEventArgs = new JsGridEditEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    this.OnItemEditing(e);
                }
            },

            onItemDeleting: (arg) => {
                if (this.OnItemDeleting != null) {
                    let e: JsGridDeleteEventArgs = new JsGridDeleteEventArgs();
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
                    this.OnItemDeleting(e);

                }
                //else
                //    arg.cancel = true;
            },
            onItemDeleted: (arg) => {


            }
        });


    }
     

    //public paginationGoToPage(i: any) {
    //    //$("#" + this.ElementName).jsGrid._firstDisplayingPage = i;
    //    ////$("#" + this.ElementName)._setPage(i); 
    //    //$("#" + this.ElementName).jsGrid._setPage(i);
        
    //    //$("#" + this.ElementName).api.paginationGoToNextPage();

    //    var grid = $("#" + this.ElementName);

    //    pages.push(grid._createPagerPageNavButton(grid.pageNavigatorNextText, grid.showNextPages));
    //}


    public InsertItem(sender: any, e: JsGridInsertEventArgs) {
        if (e.Canel == true)
            return;
        $("#" + this.ElementName).jsGrid("insertItem", JSON.stringify(sender)).done(() => {

        });
    }
    private _functions: Array<() => void>;
    public AddFunctions(...Functions: Array<() => void>) {
        this._functions = Functions;
    }

    public Refresh(): void {
        $("#" + this.ElementName).jsGrid("refresh");
    }
}

class JsGridInsertEventArgs {
    Item: any;
    Canel: boolean;
}

class JsGridDeleteEventArgs {
    public Row: HTMLTableRowElement;                 // deleting row jQuery element
    public Item: any;                // deleting item
    public ItemIndex: number;
    public Cancel: boolean = false;
}

class JsGridUpdateEventArgs {

    public Row: HTMLTableRowElement;
    public Item: any;
    public ItemIndex: number;
    public PreviousItem: any;
}

class JsGridEditEventArgs {

    public Row: HTMLTableRowElement;
    public Item: any;
    public ItemIndex: number;
    public PreviousItem: any;
}

enum JsGridInsertionMode {
    Internal,
    Binding
}



