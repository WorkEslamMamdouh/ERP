function FilterText(str, settings) {
    var result = str;
    if (settings.IsSensitive)
        result = FilterTextFunctions.SensitiveText(str);
    if (settings.IsNumeric)
        result = FilterTextFunctions.ToNumeric(result);
    return result.trim();
}
var FilterTextSettings = (function () {
    function FilterTextSettings() {
    }
    return FilterTextSettings;
}());
var FilterTextFunctions = (function () {
    function FilterTextFunctions() {
    }
    /**
     * Clear arabic text and extend characters
     * @param str
     */
    FilterTextFunctions.SensitiveText = function (str) {
        str = str.trim();
        str = str.replace('أ', 'ا');
        str = str.replace('آ', 'ا');
        str = str.replace('إ', 'ا');
        str = str.replace('ة', 'ه');
        str = this.RemoveExtend(str);
        var names = new Array(); //[] names = str.Split(' ');
        names = str.split(' ');
        str = "";
        for (var i = 0; i < names.length; i++) {
            names[i] = names[i].trim();
            if (names[i].length > 0)
                str += " " + names[i].trim();
        }
        str = str.replace("عبد ", "عبد");
        str = str.replace("ابو ", "ابو");
        return str.trim();
    };
    FilterTextFunctions.RemoveExtend = function (str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
            var char = str[i];
            if (char == 'ـ')
                char = '';
            result += char;
        }
        return result;
    };
    /**
     * Remove a non numeric characters
     * @param str
     */
    FilterTextFunctions.ToNumeric = function (str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
            var char = str[i];
            var value = Number(char);
            if (isNaN(value) == true)
                char = "";
            result += char;
        }
        return result;
    };
    return FilterTextFunctions;
}());
//# sourceMappingURL=ClientGeneralTools.js.map