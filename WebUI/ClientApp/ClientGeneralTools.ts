function FilterText(str: string, settings: FilterTextSettings): string
{
    let result: string = str;
    if (settings.IsSensitive)
        result = FilterTextFunctions.SensitiveText(str);
    if (settings.IsNumeric)
        result = FilterTextFunctions.ToNumeric(result);
    return result.trim();
}

class FilterTextSettings
{
    public IsSensitive: boolean;
    public IsNumeric: boolean;
   
}


class FilterTextFunctions
{
    /**
     * Clear arabic text and extend characters
     * @param str
     */
    public static SensitiveText(str: string): string
    {
        
        str = str.trim();

        
        str = str.replace('أ', 'ا');
        str = str.replace('آ', 'ا');
        str = str.replace('إ', 'ا');
        str = str.replace('ة', 'ه');
        str = this.RemoveExtend(str);

        let names: Array<string> = new Array<string>();//[] names = str.Split(' ');
        
        names = str.split(' ');
        str = "";
        for (let i: number = 0; i < names.length; i++) {
            names[i] = names[i].trim();
            if (names[i].length > 0)
                str += " " + names[i].trim();
        }
        str = str.replace("عبد ", "عبد");
        str = str.replace("ابو ", "ابو");
        

        return str.trim();
    }

    private static RemoveExtend(str: string): string
    {
        let result: string = "";
        for (let i: number = 0; i < str.length; i++) {
            let char: string = str[i];
            if (char == 'ـ')
                char = '';
            result += char;
        }
        return result;
    }
    /**
     * Remove a non numeric characters
     * @param str
     */
    public static ToNumeric(str: string): string
    {
        
        let result: string = "";
        for (let i: number = 0; i < str.length; i++) {
            let char: string = str[i];
            let value = Number(char);
            if (isNaN(value) == true)
                char = "";

            result += char;
        }
        return result;
    }
}