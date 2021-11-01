class AjaxCaller {
    public Url: string;
    public Data: any;
    //public OnSuccess: (d) => void;
    public ControllerName: string;
    public ActionName: string;
    private get _url(): string {
        if (this.Url == null)
            return Url.Action(this.ActionName, this.ControllerName);
        else
            return this.Url;
    }
    public CallAsync<T>(OnSuccess?: (d:T) => void) {
        Ajax.CallAsync({
            url: this._url,
            data: this.Data,
            success: (d) => {
                let result = d.result as T;
                if (OnSuccess != null)
                    OnSuccess(result);
            }
        });
    }

    public Call<T>(): T {
        let result = Ajax.Call<T>({
            url: this._url,
            data: this.Data
        });
        return result;
    }

    public Execute<T>(actionName: string, entity: T, callBack?: (Result: ResponseResult) => void) {
        Ajax.CallAsync({
            url: Url.Action(actionName, this.ControllerName),
            data: entity,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    SharedWork.SwitchModes(ScreenModes.Query);
                }
                else {
                    setTimeout(function () { MessageBox.Show(result.ResponseMessage, actionName); }, 300);
                    
                }
                if (callBack != null)
                    callBack(result);
            }
        })
    }

    public Insert<T>(entity: T, callBack: (Result: ResponseResult) => void) {
        this.Execute<T>("Insert", entity, callBack);
    }
    public Update<T>(entity: T, callBack: (Result: ResponseResult) => void) {
        this.Execute<T>("Update", entity, callBack);
    }
    public Delete<T>(entity: T, callBack: (Result: ResponseResult) => void) {
        this.Execute<T>("Delete", entity, callBack);
    }

    public GetByID<T>(id: number): T {
        let result: T = Ajax.Call<T>({
            url: Url.Action("GetByID", this.ControllerName),
            data: { id: id }
        });
        return result;
    }
}


