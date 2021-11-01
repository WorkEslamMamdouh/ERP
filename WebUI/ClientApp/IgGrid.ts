
class IgGrid {

    public Features: Array<{}> = new Array<{}>();

    public ElementName: string;
    public DataSource: Array<any> = new Array<any>();
    public Columns: Array<IIgGridColumn> = new Array<IIgGridColumn>();
    public AutoGenerateColumns: boolean = false;

    public OnRowSlected: () => void;
    public OnDoubleClick: () => void;

    public SelectedIndex: number;
    public SelectedKey: any;
    public SelectedItem: any;

    public EnableSorting: boolean = false;
    public EnableFiltring: boolean = false;
    public EnablePaging: boolean = false;
    public PageSize: number = 50;

    public PrimaryKey: string;
    public OnFiltering: (evt, ui) => void;

    private Initalized: boolean = false;

    private InitalizeEvents(e: JQueryEventObject) {

        let row = $("#" + this.ElementName).igGrid("selectedRow");

        let currentIndex: number = row.index;
        let index: number = 0;
        if (this.EnablePaging == true) {
            let currentPageIndex: number = $("#" + this.ElementName).igGridPaging('option', 'currentPageIndex');
            let prevPagesCount: number = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.DataSource[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;

    }

    private Initalize() {
        $("#" + this.ElementName).off("click");
        $("#" + this.ElementName).off("dblclick");

        this.Features.push({ name: 'Selection', mode: 'row', multipleSelection: false, activation: true });

        if (this.EnablePaging == true)
            this.Features.push({ name: "Paging", pageSize: this.PageSize });
        if (this.EnableFiltring == true) {
            this.Features.push({
                name: 'Filtering',
                dataFiltering: (evt, ui) => {
                    if (this.OnFiltering != null)
                        this.OnFiltering(evt, ui);

                }
            });
        }
        if (this.EnableSorting == true) {
            this.Features.push({ name: "Sorting" });
        }

        $("#" + this.ElementName).on("click", "tr", (e) => {
            this.InitalizeEvents(e);
            if (this.OnRowSlected != null)
                this.OnRowSlected();
        });

        $("#" + this.ElementName).on("dblclick", "tr", (e) => {
            this.InitalizeEvents(e);
            if (this.OnDoubleClick != null)
                this.OnDoubleClick();

        });

        this.Initalized = true;
    }

    public Dispose() {
        $("#" + this.ElementName).off();
    }

    public Bind() {

        if (this.Initalized == false)
            this.Initalize();

        let fets: Array<{}> = new Array<{}>();
        fets = this.Features;

        $("#" + this.ElementName).igGrid({
            primaryKey: this.PrimaryKey,
            columns: this.Columns,
            autoGenerateColumns: this.AutoGenerateColumns,
            dataSource: this.DataSource,
            features: fets
        });
    }



}