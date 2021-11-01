var IgGrid = (function () {
    function IgGrid() {
        this.Features = new Array();
        this.DataSource = new Array();
        this.Columns = new Array();
        this.AutoGenerateColumns = false;
        this.EnableSorting = false;
        this.EnableFiltring = false;
        this.EnablePaging = false;
        this.PageSize = 50;
        this.Initalized = false;
    }
    IgGrid.prototype.InitalizeEvents = function (e) {
        var row = $("#" + this.ElementName).igGrid("selectedRow");
        var currentIndex = row.index;
        var index = 0;
        if (this.EnablePaging == true) {
            var currentPageIndex = $("#" + this.ElementName).igGridPaging('option', 'currentPageIndex');
            var prevPagesCount = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.DataSource[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    };
    IgGrid.prototype.Initalize = function () {
        var _this = this;
        $("#" + this.ElementName).off("click");
        $("#" + this.ElementName).off("dblclick");
        this.Features.push({ name: 'Selection', mode: 'row', multipleSelection: false, activation: true });
        if (this.EnablePaging == true)
            this.Features.push({ name: "Paging", pageSize: this.PageSize });
        if (this.EnableFiltring == true) {
            this.Features.push({
                name: 'Filtering',
                dataFiltering: function (evt, ui) {
                    if (_this.OnFiltering != null)
                        _this.OnFiltering(evt, ui);
                }
            });
        }
        if (this.EnableSorting == true) {
            this.Features.push({ name: "Sorting" });
        }
        $("#" + this.ElementName).on("click", "tr", function (e) {
            _this.InitalizeEvents(e);
            if (_this.OnRowSlected != null)
                _this.OnRowSlected();
        });
        $("#" + this.ElementName).on("dblclick", "tr", function (e) {
            _this.InitalizeEvents(e);
            if (_this.OnDoubleClick != null)
                _this.OnDoubleClick();
        });
        this.Initalized = true;
    };
    IgGrid.prototype.Dispose = function () {
        $("#" + this.ElementName).off();
    };
    IgGrid.prototype.Bind = function () {
        if (this.Initalized == false)
            this.Initalize();
        var fets = new Array();
        fets = this.Features;
        $("#" + this.ElementName).igGrid({
            primaryKey: this.PrimaryKey,
            columns: this.Columns,
            autoGenerateColumns: this.AutoGenerateColumns,
            dataSource: this.DataSource,
            features: fets
        });
    };
    return IgGrid;
}());
//# sourceMappingURL=IgGrid.js.map