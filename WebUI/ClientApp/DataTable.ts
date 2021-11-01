
class DataTable {

    public ElementName: string;
    public dataScr: Array<any> = new Array<any>();
    public Columns: Array<datatableColumn> = new Array<datatableColumn>();
    public column_defs: Array<datatableColumn> = new Array<datatableColumn>();

    public OnRowSlected: () => void;
    public OnDoubleClick: () => void;

    public SelectedIndex: number;
    public SelectedKey: any;
    public SelectedItem: any;

    public EnableSorting: boolean = false;
    public EnableFiltring: boolean = false;
    public EnablePaging: boolean = false;
    public PageSize: number = 50;
    public language_app:any;

    public PrimaryKey: string;
    public OnFiltering: (evt, ui) => void;

    private Initalized: boolean = false;
    public Env = GetSystemEnvironment();
    private InitalizeEvents(e: JQueryEventObject) {
         
        let row = $("#SearchDataTable tbody tr td").DataTable();

        let currentIndex: number = row.index;
        let index: number = 0;
        if (this.EnablePaging == true) {
            let currentPageIndex: number = $("#SearchDataTable").DataTable('option', 'currentPageIndex');
            let prevPagesCount: number = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    }

    private Initalize() {

    }

    public Dispose() {
        $("#" + this.ElementName).off();
    }

    public Bind() {
         

       

        this.Initalize();

        var selectionCloumn: string = SearchGrid.SearchDataGrid.PrimaryKey;

        this.Columns = this.Columns.filter(row => row.hidden != true);

        for (var index = 0; index < this.Columns.length; index++) {
            let ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                for (var itm of this.dataScr) {
                    itm[ss] = DateFormat(itm[ss]);
                }
            }
            var newColumn: datatableColumn = {
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
         

        this.dataScr = this.dataScr.filter(row => row.hidden != true);

        var tableHeaders;
        this.column_defs.forEach(col => {
            var _width: string = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
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
                }
        } else {
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
            }
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
            } catch (e) {
            }
        });

    }

    public closeSearch() {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    }
}


