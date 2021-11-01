var DataTable = (function () {
    function DataTable() {
        this.dataScr = new Array();
        this.Columns = new Array();
        this.column_defs = new Array();
        this.EnableSorting = false;
        this.EnableFiltring = false;
        this.EnablePaging = false;
        this.PageSize = 50;
        this.Initalized = false;
        this.Env = GetSystemEnvironment();
    }
    DataTable.prototype.InitalizeEvents = function (e) {
        var row = $("#SearchDataTable tbody tr td").DataTable();
        var currentIndex = row.index;
        var index = 0;
        if (this.EnablePaging == true) {
            var currentPageIndex = $("#SearchDataTable").DataTable('option', 'currentPageIndex');
            var prevPagesCount = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    };
    DataTable.prototype.Initalize = function () {
    };
    DataTable.prototype.Dispose = function () {
        $("#" + this.ElementName).off();
    };
    DataTable.prototype.Bind = function () {
        this.Initalize();
        var selectionCloumn = SearchGrid.SearchDataGrid.PrimaryKey;
        this.Columns = this.Columns.filter(function (row) { return row.hidden != true; });
        for (var index = 0; index < this.Columns.length; index++) {
            var ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                for (var _i = 0, _a = this.dataScr; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    itm[ss] = DateFormat(itm[ss]);
                }
            }
            var newColumn = {
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
        this.dataScr = this.dataScr.filter(function (row) { return row.hidden != true; });
        var tableHeaders;
        this.column_defs.forEach(function (col) {
            var _width = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
            tableHeaders += "<th " + _width + ">" + col.title + "</th>";
        });
        if (this.Env.ScreenLanguage == "ar") {
            this.language_app =
                {
                    "sProcessing": "جارٍ التحميل...",
                    "sLengthMenu": "أظهر _MENU_ مدخلات",
                    "sZeroRecords": "لم يعثر على أية سجلات",
                    "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                    "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                    "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                    "sInfoPostFix": "",
                    "sSearch": "ابحث:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "الأول",
                        "sPrevious": "السابق",
                        "sNext": "التالي",
                        "sLast": "الأخير"
                    }
                };
        }
        else {
            this.language_app = {
                "sProcessing": "Processing",
                "sLengthMenu": "Show _MENU_ Enties",
                "sZeroRecords": "Not Found",
                "sInfo": "Show _START_ To _END_ From _TOTAL_ Enties",
                "sInfoEmpty": "View 0 To 0 From 0 Record",
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": "Search:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "First",
                    "sPrevious": "Previous",
                    "sNext": "Next",
                    "sLast": "Last"
                }
            };
        }
        $("#tableDiv").empty();
        $("#tableDiv").append('<table id="SearchDataTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
        var table = $('#SearchDataTable').DataTable({
            "destroy": true,
            "data": this.dataScr,
            "columns": this.column_defs,
            language: this.language_app
        });
        table.on('click', 'tr', function () {
            //console.log(table.row(this).data());
            //console.log("SelectedKey: " + SearchGrid.SearchDataGrid.PrimaryKey);
            //console.log(SearchGrid.SearchDataGrid.SelectedKey);
            try {
                SearchGrid.SearchDataGrid.SelectedKey = table.row(this).data()[SearchGrid.SearchDataGrid.PrimaryKey];
                SearchGrid.SearchDataGrid.OnDoubleClick();
            }
            catch (e) {
            }
        });
    };
    DataTable.prototype.closeSearch = function () {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    };
    return DataTable;
}());
//# sourceMappingURL=DataTable.js.map