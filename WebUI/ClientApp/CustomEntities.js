var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Custom_AlertLog = (function (_super) {
    __extends(Custom_AlertLog, _super);
    function Custom_AlertLog() {
        var _this = _super.call(this) || this;
        _this.AlertSubTypeID = "";
        _this.AlertTypeID = "";
        _this.CompCode = "";
        _this.MsgBody = "";
        _this.SystemCode = "";
        return _this;
        //this.MemberIDs;
    }
    return Custom_AlertLog;
}(SecurityClass));
var MasterDetailsUserRoles = (function (_super) {
    __extends(MasterDetailsUserRoles, _super);
    function MasterDetailsUserRoles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MasterDetailsUserRoles;
}(SecurityClass));
//# sourceMappingURL=CustomEntities.js.map