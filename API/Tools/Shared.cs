using Inv.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Data.Entity;
using Inv.DAL.Domain;

namespace Inv.API.Tools
{
    public class Shared
    {
        
        public static SessionRecord Session = new SessionRecord();
        public const string SessionKey = "Session";
        public const string IdKey = "id";
        public const string IndexKey = "index";
        public const string EntityKey = "Entity";
        public const string FieldsKey = "Fields";
        public const string ConditionKey = "Condition";
        public const string MasterKey = "Master";
        public const string DetailsKey = "Details";
        public static bool IsValidDate(DateTime? date)
        {
            if (date == null)
                return false;
            return true;
        }
        public static ResponseResult TransactionProcess(int CompCode, int BranchCode, int id, string type, string OpMode, InvEntities _db)
        {

            ResponseResult result = new ResponseResult();
            try
            {
                ObjectParameter objParameterOk = new ObjectParameter("ok", typeof(Int32));
                ObjectParameter objParameterTrNo = new ObjectParameter("trNo", typeof(Int32));
                var ok = _db.G_ProcessTrans(CompCode, BranchCode, type, OpMode, id, objParameterTrNo, objParameterOk);
                if ((int)objParameterOk.Value == 0)
                {
                    result.ResponseData = objParameterTrNo.Value;
                    result.ResponseState = true;
                }
                else if ((int)objParameterOk.Value == 1)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Error generating number";
                }
                else if ((int)objParameterOk.Value == 2)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Execution error";
                }
                else if ((int)objParameterOk.Value == 3)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Processing error";
                }
            }
            catch (Exception ex)
            {
                result.ResponseState = false;
                result.ResponseMessage = ex.Message;
            }
            return result;

        }

        public static DateTime GetCurrentDate(int DiffHours)
        {
            DateTime utc = DateTime.UtcNow;
            DateTime res = utc.AddHours(DiffHours);
            return res;
        }

        public static void changeDateFormate()
        {
            System.Globalization.CultureInfo customCulture = new System.Globalization.CultureInfo("en-GB", true);

            customCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";

            System.Threading.Thread.CurrentThread.CurrentCulture = customCulture;
            System.Threading.Thread.CurrentThread.CurrentUICulture = customCulture;
        }


    }
}