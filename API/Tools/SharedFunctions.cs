//using System;
//using System.Collections.Generic;
//using System.Text;
//using Sercurity;
//using System.Reflection;
//using System.Resources;
//using System.Globalization;
//using System.Data;
//using System.Data.Common;
//using System.Threading;
//using RealState.Helper;
//using BSEREALESTATE2010.Data;
//using BSEREALESTATE2010.Entities;
//using BSEREALESTATE2010.Services;
//using BSEREALESTATE2010.Data.SqlClient;
//using System.Windows.Forms;
//using System.ComponentModel;

//namespace RealState.Business
//{
//    #region Fixed
//    public enum GetDataMode
//    {
//        First,
//        Next,
//        Previous,
//        Last,
//        RefreshMe,
//        Undo,
//        GetByCode
//    }

//    public static class EntityTableInfo
//    {
//        private static List<TableInfo> lstTableInfo = new List<TableInfo>();
//        public static void Add(EntityTypes entityType, string tableName, string baseColumn, string counterTrType)
//        {
//            lstTableInfo.Add(new TableInfo(entityType, tableName, baseColumn, counterTrType));
//        }
//        public static void Add(EntityTypes entityType, string tableName, string baseColumn, string counterTrType, string extraOrderBy, string extraPositionFilterString)
//        {
//            lstTableInfo.Add(new TableInfo(entityType, tableName, baseColumn, counterTrType, extraOrderBy, extraPositionFilterString));
//        }
//        public static string GetTableName(EntityTypes entityType)
//        {
//            TableInfo ti = GetTableInfo(entityType);
//            return ti.TableName;
//        }
//        public static string GetCounterTrType(EntityTypes entityType)
//        {
//            TableInfo ti = GetTableInfo(entityType);
//            return ti.CounterTrType;
//        }
//        public static string GetBaseColumn(EntityTypes entityType)
//        {
//            TableInfo ti = GetTableInfo(entityType);
//            return ti.BaseColumn;
//        }
//        public static string GetExtraOrderBy(EntityTypes entityType)
//        {
//            TableInfo ti = GetTableInfo(entityType);
//            return ti.ExtraOrderBy;
//        }
//        public static string GetExtraPositionFilterString(EntityTypes entityType)
//        {
//            TableInfo ti = GetTableInfo(entityType);
//            return ti.ExtraRowPositionFilterString;
//        }
//        private static TableInfo GetTableInfo(EntityTypes entityType)
//        {
//            foreach (TableInfo ti in lstTableInfo)
//            {
//                if (ti.EntityType == entityType)
//                    return ti;
//            }
//            return null;
//        }
//        private class TableInfo
//        {
//            public EntityTypes EntityType;
//            public string TableName;
//            public string CounterTrType;
//            public string BaseColumn;
//            public string ExtraOrderBy = null;
//            public string ExtraRowPositionFilterString = null;//to be user with getrowscount and getrowposition in case primary is based on more than column like trno and release
//            private TableInfo() { }
//            public TableInfo(EntityTypes entityType, string tableName, string baseColumn, string counterTrType)
//            {
//                this.EntityType = entityType;
//                this.CounterTrType = counterTrType;
//                this.TableName = tableName;
//                this.BaseColumn = baseColumn;
//            }
//            public TableInfo(EntityTypes entityType, string tableName, string baseColumn, string counterTrType, string extraOrderBy, string extraPositionFilterString)
//                : this(entityType, tableName, baseColumn, counterTrType)
//            {
//                this.ExtraOrderBy = extraOrderBy;
//                this.ExtraRowPositionFilterString = extraPositionFilterString;
//            }

//        }
//    }

//    #endregion

//    #region Enums
//    public enum EntityTypes
//    {
//        Nationality,
//        City,
//        Region,
//        RealEstateType,
//        Usage,
//        Expenses,
//        Owner,
//        Addition,
//        Asset,
//        RealEstate,
//        UnitReserve,
//        Customer,
//        OwnerDef,
//        ContractRent,
//        District,
//        ContractSell,
//        ContVacate,
//        ContractAmendment,
//        ContractQuittance,
//        PaymentCash,
//        PaymentCheck,
//        PaymentTransfer,
//        ReceiptNoteCash,
//        Collectors,
//        NonRenewalVnd,
//        Note_PayRemainder,
//        NonRenewalCst,
//        Note_PaymentDefer,
//        RentAmountChange,
//        PoliceComplaint,
//        SalesRep,
//        ReceiptCheck,
//        ReceiptTransfer,
//        DebitAdjust,
//        BankDepositCash,
//        BankDepositCheck,
//        CreditAdjust,
//        Activity
//    }

//    public enum DateTypes
//    {
//        Before,
//        Exact,
//        After
//    }

//    #endregion

//    public static class SharedFunctions 
//    {
//        #region Fixed

//        public static string GetDataFilterString(GetDataMode mode, string mainFilterString, string primaryKey, string currentKeyValue, bool isBaseColumnNumeric, string extraOrderBy, out string orderBy)
//        {
//            if (!isBaseColumnNumeric)
//                currentKeyValue = string.Format("'{0}'", currentKeyValue);

//            orderBy = primaryKey;
//            switch (mode)
//            {
//                case GetDataMode.First:
//                    //mainFilterString will remain the same
//                    break;
//                case GetDataMode.Next:
//                    mainFilterString = string.Format("{0} {1} > {2}", mainFilterString == "" ? "" : mainFilterString + " AND ", primaryKey, currentKeyValue);
//                    break;
//                case GetDataMode.Previous:
//                    mainFilterString = string.Format("{0} {1} < {2}", mainFilterString == "" ? "" : mainFilterString + " AND ", primaryKey, currentKeyValue);
//                    orderBy = string.Format("{0} desc", primaryKey);
//                    break;
//                case GetDataMode.Last:
//                    //mainFilterString will remain the same
//                    orderBy = string.Format("{0} desc", orderBy);
//                    break;
//                case GetDataMode.RefreshMe:
//                    mainFilterString = string.Format("{0} {1} = {2}", mainFilterString == "" ? "" : mainFilterString + " AND ", primaryKey, currentKeyValue);
//                    break;
//                case GetDataMode.GetByCode:
//                    mainFilterString = string.Format("{0} {1} = {2}", mainFilterString == "" ? "" : mainFilterString + " AND ", primaryKey, currentKeyValue);
//                    break;
//                case GetDataMode.Undo:
//                    mainFilterString = string.Format("{0} {1} = {2}", mainFilterString == "" ? "" : mainFilterString + " AND ", primaryKey, currentKeyValue);
//                    break;
//            }
//            if (!string.IsNullOrEmpty(extraOrderBy))
//                orderBy = string.IsNullOrEmpty(orderBy) ? extraOrderBy : string.Format("{0} , {1}", orderBy, extraOrderBy);
//            return mainFilterString;
//        }
//        public static string GetResourceString(string key)
//        {
//            return HelperResources.GetString(key);
//        }
//        public static int GetPositionByTrNo(string dbTableName, string baseColumnName, string trNo, string filterString)
//        {
//            string sqlString;
//            sqlString = "CS_GetPositionByTrNo";
//            DbCommand comm = GenericDataAccess.CreateCommand();
//            comm.CommandText = sqlString;
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@TableName", dbTableName, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@TrColumnName", baseColumnName, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@TrNo", trNo, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@FilterString", filterString, DbType.String);
//            return int.Parse(GenericDataAccess.ExecuteScalar(comm).ToString());
//        }
//        public static int GetPositionByTrCode(string tableName, string baseColumnName, string trCode, string filterString)
//        {
//            string sqlString;
//            sqlString = "CS_GetPositionByTrCode";
//            DbCommand comm = GenericDataAccess.CreateCommand();
//            comm.CommandText = sqlString;
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@TableName", tableName, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@TrColumnName", baseColumnName, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@TrCode", trCode, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@FilterString", filterString, DbType.String);
//            return int.Parse(GenericDataAccess.ExecuteScalar(comm).ToString());
//        }
//        public static object GetPaged(object instance, string whereClause, string orderBy)
//        {
//            int count = 0;
//            return instance.GetType().InvokeMember("GetPaged", BindingFlags.InvokeMethod, Type.DefaultBinder, instance, new object[] { whereClause, orderBy, 0, 1, count });
//        }

//        public static bool ExecuteIntegrationSP(TransactionManager tran, int trID, string trType)
//        {
//            bool succeed = false;
//            try
//            {
//                string sqlString = "CS_RS_AuthorizeIntegration";
//                DbCommand comm = GenericDataAccess.CreateCommand();
//                comm.CommandText = sqlString;
//                GenericDataAccess.AddStoredProcedureParameter(comm, "@TrID", trID, DbType.Int32);
//                GenericDataAccess.AddStoredProcedureParameter(comm, "@TrType", trType, DbType.String);
//                DbParameter param = comm.CreateParameter();
//                param.Direction = ParameterDirection.Output;
//                param.ParameterName = "@Succeed";
//                param.DbType = DbType.Boolean;
//                comm.Parameters.Add(param);
//                DataRepository.Provider.ExecuteNonQuery(tran, comm);
//                succeed = bool.Parse(param.Value + "");
//            }
//            catch { }
//            return succeed;
//        }

//        #endregion

//        #region Standard

//        #region Initialize

//        public static void InitializeEntityTableInfo()
//        {
//            EntityTableInfo.Add(EntityTypes.Nationality, "G_Nationality", "NationalityCode", "");
//            EntityTableInfo.Add(EntityTypes.City, "RS_D_City", "Code", "");
//            EntityTableInfo.Add(EntityTypes.Region, "RS_D_Region", "Code", "");
//            EntityTableInfo.Add(EntityTypes.RealEstateType, "RS_RealEstateType", "Code", "");
//            EntityTableInfo.Add(EntityTypes.Usage, "RS_D_Usage", "Code", "");
//            EntityTableInfo.Add(EntityTypes.Expenses, "RS_D_Expenses", "Code", "");
//            EntityTableInfo.Add(EntityTypes.Owner, "RS_D_Owner", "Code", "");
//            EntityTableInfo.Add(EntityTypes.Addition, "RS_D_Additions", "Code", "");
//            EntityTableInfo.Add(EntityTypes.Asset, "RS_D_Asset", "Code", "");
//            EntityTableInfo.Add(EntityTypes.RealEstate, "RS_RealEstate", "Code", "");
//            EntityTableInfo.Add(EntityTypes.UnitReserve, "RS_TR_Reserve", "TrID", "UNRes");
//            EntityTableInfo.Add(EntityTypes.Customer, "A_REC_CUSTOMER", "CST_CODE", "");
//            EntityTableInfo.Add(EntityTypes.OwnerDef, "A_PAY_VENDOR", "VND_CODE", "");
//            EntityTableInfo.Add(EntityTypes.ContractRent, "RS_TR_ContractRent", "TrID", "ConRn", "ReleaseNo ASC", "ISNULL(ReleaseNo,0) <=1");
//            EntityTableInfo.Add(EntityTypes.District, "RS_D_District", "Code", "");
//            EntityTableInfo.Add(EntityTypes.ContractSell, "RS_TR_ContractSell", "TrID", "ConSe");
//            EntityTableInfo.Add(EntityTypes.ContVacate, "RS_TR_ContractVacate", "TrID", "ConCa");
//            EntityTableInfo.Add(EntityTypes.ContractAmendment, "RS_TR_ContractAmendment", "TrID", "EdCon");
//            EntityTableInfo.Add(EntityTypes.ContractQuittance, "RS_TR_ContractQuittance", "TrID", "ConDi");
//            EntityTableInfo.Add(EntityTypes.PaymentCash, "RS_TR_Payment", "TrID", "PayNo");
//            EntityTableInfo.Add(EntityTypes.ReceiptNoteCash, "RS_TR_Receipt", "TrID", "RecNo");
//            EntityTableInfo.Add(EntityTypes.Collectors, "RS_D_Collector", "Code", "");
//            EntityTableInfo.Add(EntityTypes.NonRenewalVnd, "RS_TRNOTE_NonRenewalVnd", "TrID", "NoVnd");
//            EntityTableInfo.Add(EntityTypes.Note_PayRemainder, "RS_TRNOTE_InstallPayReminder", "TrID", "NoRem");
//            EntityTableInfo.Add(EntityTypes.NonRenewalCst, "RS_TRNOTE_NonRenewalCst", "TrID", "NoCst");
//            EntityTableInfo.Add(EntityTypes.Note_PaymentDefer, "RS_TRNOTE_InstallPaymentDefer", "TrID", "NoPay");
//            EntityTableInfo.Add(EntityTypes.RentAmountChange, "RS_TRNOTE_RentAmountChange", "TrID", "RtChg");
//            EntityTableInfo.Add(EntityTypes.PoliceComplaint, "RS_TRNOTE_PoliceComplaint", "TrID", "NoPol");
//            EntityTableInfo.Add(EntityTypes.SalesRep, "RS_D_Rep", "Code", "");
//            EntityTableInfo.Add(EntityTypes.ReceiptCheck, "RS_TR_Receipt", "TrID", "RecCh");
//            EntityTableInfo.Add(EntityTypes.ReceiptTransfer, "RS_TR_Receipt", "TrID", "RecTn");
//            EntityTableInfo.Add(EntityTypes.DebitAdjust, "RS_TR_Adjustment", "TrID", "DbAdj");
//            EntityTableInfo.Add(EntityTypes.CreditAdjust, "RS_TR_Adjustment", "TrID", "CrAdj");

//            EntityTableInfo.Add(EntityTypes.PaymentCheck, "RS_TR_Payment", "TrID", "PayCh");
//            EntityTableInfo.Add(EntityTypes.PaymentTransfer, "RS_TR_Payment", "TrID", "PayTn");
//            EntityTableInfo.Add(EntityTypes.BankDepositCash, "RS_TR_BankDeposit", "TrID", "BDcsh");
//            EntityTableInfo.Add(EntityTypes.BankDepositCheck, "RS_TR_BankDeposit", "TrID", "BDChk");

//            EntityTableInfo.Add(EntityTypes.Activity, "RS_D_UsageActivity", "Code", "");
//        }

//        #endregion

//        #region Misc Methods
//        public static string GetEntityFilterString(EntityTypes entityType)
//        {
//            return GetEntityFilterString(entityType, SharedParams.CompanyCode, SharedParams.BranchCode);
//        }
//        public static string GetEntityFilterString(EntityTypes entityType, string companyCode, string branchCode)
//        {
//            switch (entityType)
//            {
//                case EntityTypes.Nationality:
//                    return string.Format("COMP_CODE = {0}", companyCode);
                 
//                case EntityTypes.City:
//                    return string.Format("COMP_CODE = {0}", companyCode);
        
//                case EntityTypes.Region:
//                    return string.Format("COMP_CODE = {0}", companyCode);

//                case EntityTypes.RealEstateType:
//                    return string.Format("COMP_CODE = {0}", companyCode);

//                case EntityTypes.Usage:
//                    return string.Format("COMP_CODE = {0}", companyCode);

//                case EntityTypes.Expenses:
//                    return string.Format("COMP_CODE = {0}", companyCode);

//                case EntityTypes.Owner:
//                    return string.Format("COMP_CODE = {0}", companyCode);
                  
//                case EntityTypes.Addition:
//                    return string.Format("COMP_CODE = {0}", companyCode);
                  
//                case EntityTypes.Asset:
//                    return string.Format("COMP_CODE = {0}", companyCode);
                   
//                case EntityTypes.UnitReserve:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
                   
//                case EntityTypes.RealEstate:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.ContractAmendment:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.ContractRent:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.Customer:
//                    {
//                        if (!SharedParams.IsCstDebendOnBranch)
//                            return string.Format("COMP_CODE = {0}", companyCode);
//                        else
//                            return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                    }
//                case EntityTypes.OwnerDef:
//                    return string.Format("COMP_CODE = {0}", companyCode);

//                case EntityTypes.District:
//                    return string.Format("COMP_CODE = {0}", companyCode);

//                case EntityTypes.ContractSell:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.ContVacate:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.ContractQuittance:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.PaymentCash:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.PaymentCheck:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                case EntityTypes.PaymentTransfer:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.ReceiptNoteCash:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                case EntityTypes.ReceiptCheck:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                case EntityTypes.ReceiptTransfer:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);

//                case EntityTypes.Note_PayRemainder:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                case EntityTypes.Note_PaymentDefer:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                case EntityTypes.PoliceComplaint:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                case EntityTypes.SalesRep:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1}", companyCode, branchCode);
//                case EntityTypes.DebitAdjust:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1} ", companyCode, branchCode);
//                case EntityTypes.CreditAdjust:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1} ", companyCode, branchCode);
//                case EntityTypes.BankDepositCash:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1} ", companyCode, branchCode);
//                case EntityTypes.BankDepositCheck:
//                    return string.Format("COMP_CODE = {0} AND BRA_CODE = {1} ", companyCode, branchCode);
//                default:
//                    return string.Format("COMP_CODE = {0} ", companyCode);
//            }
//        }
//        #endregion

//        #region Generate Serial

//        public static int GenerateSerial(TransactionManager tran, EntityTypes entityType, DateTime date, out string warningMessage)
//        {
//            return GenerateSerial(tran, DataRepository.Provider.Name, entityType, date, SharedParams.CompanyCode, SharedParams.BranchCode, SharedParams.UserCode, out warningMessage);
//        }
//        public static int GenerateSerial(TransactionManager tran, string providerName, EntityTypes entityType, DateTime date, string companyCode, string branchCode, string userCode, out string warningMessage)
//        {
//            //company code must be passed as in yearly closing u may have in table rows different companies not default company user has loged by
//            return GenerateSerial(tran, providerName, entityType, date, companyCode, branchCode, SharedParams.CounterTableName, SharedParams.ControlTableName, userCode, out warningMessage);
//        }
//        public static int GenerateSerial(TransactionManager tran, EntityTypes entityType, DateTime date, string companyCode, string branchCode, string counterTableName, string controlTableName, string userCode, out string warningMessage)
//        {
//            return GenerateSerial(tran, DataRepository.Provider.Name, entityType, date, companyCode, branchCode, counterTableName, controlTableName, userCode, out warningMessage);
//        }
//        public static int GenerateSerial(TransactionManager tran, string providerName, EntityTypes entityType, DateTime date, string companyCode, string branchCode, string counterTableName, string controlTableName, string userCode, out string warningMessage)
//        {
//            //                ds = DataRepository.Providers[providerName].ExecuteDataSet(tran, comm);

//            //if is not branch level means it's region level
//            warningMessage = "";
//            string serial = "0";
//            try
//            {
//                int trWidth = 5;
//                string trTypeCode = EntityTableInfo.GetCounterTrType(entityType);
//                int lastSerial = 0;
//                string sqlString;

//                GetIsMothlyTrNoAndTrWidth(tran, providerName, companyCode, controlTableName, "TrNoWidth", false, out trWidth);
//                try
//                {
//                    sqlString = string.Format(@"SELECT LAST_SERIAL AS LAST_SERIAL
//                                    FROM {0}
//                                    WHERE (TR_TYPE = @trType) AND {1}", counterTableName, GetEntityFilterString(entityType, companyCode, branchCode));

//                    DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//                    GenericDataAccess.AddStoredProcedureParameter(comm, "@TrType", trTypeCode, DbType.String);
//                    //if trtype not found, exception will be raised, in catch new row will be inserted
//                    lastSerial = int.Parse(DataRepository.Provider.ExecuteScalar(tran, comm).ToString());

//                    sqlString = string.Format(@"UPDATE {0}
//                                    SET LAST_SERIAL = @lastSerial
//                                    WHERE TR_TYPE=@trType AND {1} ", counterTableName, GetEntityFilterString(entityType, companyCode, branchCode));
//                    comm = GenericDataAccess.CreateTextCommand(sqlString);
//                    GenericDataAccess.AddStoredProcedureParameter(comm, "@lastSerial", lastSerial + 1 + "", DbType.Int32);
//                    GenericDataAccess.AddStoredProcedureParameter(comm, "@trType", trTypeCode, DbType.String);
//                    DataRepository.Providers[providerName].ExecuteNonQuery(tran, comm);
//                }
//                catch
//                {
//                    sqlString = string.Format(@"INSERT INTO {0}([TR_TYPE], [LAST_SERIAL], [REMARK], {1})
//                                    VALUES(@TrType ,1, @TrType,{2})", counterTableName,
//                                        GetCounterInsertColumns(entityType), GetCounterInsertValues(entityType));
//                    DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//                    GenericDataAccess.AddStoredProcedureParameter(comm, "@trType", trTypeCode, DbType.String);
//                    DataRepository.Providers[providerName].ExecuteNonQuery(tran, comm);
//                }
//                string Manul_VC = "1";
//                try
//                {
//                    sqlString = string.Format(@"SELECT manual_vc
//                                    FROM G_USERS
//                                    WHERE (USER_CODE = '" + userCode + "')");

//                    DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//                    Manul_VC = DataRepository.Provider.ExecuteScalar(tran, comm).ToString();

//                }
//                catch
//                {
//                    warningMessage = HelperResources.GetString("_ManualVCError");
//                }
//                //End

//                lastSerial += 1;
//                serial = Manul_VC + lastSerial.ToString().PadLeft(trWidth, '0');
//            }
//            catch
//            {
//                throw new Exception(HelperResources.GetString("_GenerateSerialError"));
//            }
//            return int.Parse(serial);
//        }

//        #region Helper Methods
//        private static string GetCounterInsertColumns(EntityTypes entityType)
//        {
//            string[] condition = GetEntityFilterString(entityType).ToUpper().Split(new string[] { " AND " }, StringSplitOptions.RemoveEmptyEntries);
//            string insertColumns = "";
//            string column;
//            foreach (string str in condition)
//            {
//                column = str.Substring(0, str.IndexOf("=") - 1);
//                insertColumns = string.Format("{0} {1} {2}", insertColumns, string.IsNullOrEmpty(insertColumns) ? "" : " , ", column);
//            }
//            return insertColumns;
//        }
//        private static string GetCounterInsertValues(EntityTypes entityType)
//        {
//            string[] condition = GetEntityFilterString(entityType).ToUpper().Split(new string[] { " AND " }, StringSplitOptions.RemoveEmptyEntries);
//            string insertValues = "";
//            string value;
//            foreach (string str in condition)
//            {
//                value = str.Substring(str.IndexOf("=") + 1, str.Length - (str.IndexOf("=") + 1));
//                insertValues = string.Format("{0} {1} {2}", insertValues, string.IsNullOrEmpty(insertValues) ? "" : " , ", value);
//            }
//            return insertValues;
//        }
//        private static void GetIsMothlyTrNoAndTrWidth(TransactionManager tran, string providerName, string companyCode, string controlTable, string trWidthColumn, bool useLenToGetSerialWidth, out int trNoWidth)
//        {
//            trNoWidth = 5;
//            string sqlString;
//            sqlString = string.Format(@"SELECT  {0} AS TrNoWidth
//                        FROM {1}
//                        WHERE (COMP_CODE = @CompCode)", trWidthColumn, controlTable);
//            try
//            {
//                DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//                GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", companyCode, DbType.Int32);
//                DataTable table = DataRepository.Providers[providerName].ExecuteDataSet(comm).Tables[0];
//                //DataTable table = GenericDataAccess.ExecuteSelectCommand(comm);
//                if (table.Rows.Count > 0)
//                {
//                    if (useLenToGetSerialWidth)
//                        trNoWidth = table.Rows[0].ItemArray[0].ToString().Length;
//                    else
//                        trNoWidth = int.Parse(table.Rows[0].ItemArray[0].ToString());

//                }
//            }
//            catch { }
//        }
//        #endregion

//        #endregion

//        #endregion

//        #region fields



//        #endregion

//        #region  Specific System Methods

//        public static DataTable GetRealEstates(bool isArabicDesc, string whereCondition)
//        {
//            string sqlString = string.Format(@"SELECT dbo.RS_RealEstate.Code, dbo.RS_RealEstate.Code + ' - ' + ISNULL(dbo.RS_RealEstate.{0}, '') AS [Desc], 
//                            RS_RealEstate_1.Code AS ParentCode, 0 Level, 
//                            CASE WHEN dbo.RS_RealEstate.IsParentContainer = 0 THEN
//	                            CASE WHEN dbo.RS_RealEstate.[Type] = 0 THEN --SELL
//		                            CASE WHEN dbo.RS_RealEstate.SellStatus = 2 THEN --Sold Unit
//			                            5
//		                            ELSE --Free Unit
//			                            4
//		                            END
//	                            ELSE--RENT
//                                    CASE WHEN ISNULL(dbo.RS_RealEstate.IsReserved,0) = 1 THEN
//                                        6
//                                    ELSE
//		                                CASE WHEN dbo.RS_RealEstate.RentStatus = 3 THEN --Rented Unit
//			                                1
//		                                ELSE --Free Unit
//			                                0
//		                                END
//                                    END
//	                            END
//                            ELSE --Parent Container
//	                            2
//                            END  AS ImageIndex,
//                            CASE WHEN dbo.RS_RealEstate.IsParentContainer = 0 THEN
//	                            CASE WHEN dbo.RS_RealEstate.[Type] = 0 THEN --SELL
//		                            CASE WHEN dbo.RS_RealEstate.SellStatus = 2 THEN --Sold Unit
//			                            5 + 7
//		                            ELSE --Free Unit
//			                            4 + 7
//		                            END
//	                            ELSE--RENT
//                                    CASE WHEN ISNULL(dbo.RS_RealEstate.IsReserved,0) = 1 THEN
//                                        6 + 7
//                                    ELSE
//		                                CASE WHEN dbo.RS_RealEstate.RentStatus = 3 THEN --Rented Unit
//			                                1 + 7 
//		                                ELSE --Free Unit
//			                                0 + 7
//		                                END
//                                    END
//	                            END
//                            ELSE --Parent Container
//	                            2 + 7
//                            END  AS SelectedImageIndex
//                            FROM dbo.RS_RealEstate LEFT OUTER JOIN
//                            dbo.RS_RealEstate AS RS_RealEstate_1 ON dbo.RS_RealEstate.ParentRealEstateID = RS_RealEstate_1.RealEstateID
//                            WHERE dbo.RS_RealEstate.COMP_CODE = {1} AND dbo.RS_RealEstate.BRA_CODE = {2} {3} 
//                            ORDER BY dbo.RS_RealEstate.Code", (isArabicDesc ? "DescA" : "DescE"), SharedParams.CompanyCode
//                                                            , SharedParams.BranchCode
//                                                            , (string.IsNullOrEmpty(whereCondition) ? "" : " AND " + whereCondition));
//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            return GenericDataAccess.ExecuteSelectCommand(comm);
//        }

//        public static bool IsValidAccountCode(string accountCode)
//        {
//            string sqlString;
//            sqlString = @"SELECT ACC_CODE  FROM dbo.A_ACCOUNT
//                        WHERE COMP_CODE=@CompCode AND ACC_CODE = @AccountCode
//                        And detail = 1 AND HOLD=0";
//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@AccountCode", accountCode, DbType.String);
//            DataTable table = GenericDataAccess.ExecuteSelectCommand(comm);
//            return table.Rows.Count > 0 ? true : false;
//        }

//        public static bool IsAccountCodeExist(string accountCode)
//        {
//            string sqlString;
//            sqlString = @"SELECT ACC_CODE  FROM dbo.A_ACCOUNT
//                        WHERE COMP_CODE=@CompCode AND ACC_CODE = @AccountCode
//                        And detail = 1";
//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@AccountCode", accountCode, DbType.String);
//            DataTable table = GenericDataAccess.ExecuteSelectCommand(comm);
//            return table.Rows.Count > 0 ? true : false;
//        }

//        public static bool IsNonCustomerCategory(string categoryCode)
//        {
//            if (string.IsNullOrEmpty(categoryCode))
//                return false;
//            string sqlString;
//            sqlString = @"SELECT IsCustomerCategory
//                        FROM dbo.A_REC_CUSTOMER_CATEGORY
//                        WHERE (COMP_CODE = @CompCode) AND (CST_CAT = @CatCode)";
//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CatCode", categoryCode, DbType.String);
//            DataTable table = GenericDataAccess.ExecuteSelectCommand(comm);
//            bool nonCustomerCategory = false;
//            if (table.Rows.Count > 0 && bool.Parse(table.Rows[0].ItemArray[0].ToString()) == false)
//                nonCustomerCategory = true;
//            return nonCustomerCategory;
//        }

//        public static void CreateCustomerUnderCOA(TransactionManager tran, string vendorCode)
//        {
//            //note customer should have been assigned a category before using this method
//            string sqlString;
//            sqlString = @"Declare @CustomerNameA nvarchar(50),
//	                    @CustomerNameE nvarchar(50),
//	                    @CategoryAccCode nvarchar(25),
//	                    @ParentAccLevel smallint,
//                        @ParentAccGroup smallint

//                        SELECT @CustomerNameA = dbo.A_REC_CUSTOMER.NAMEA, @CustomerNameE = dbo.A_REC_CUSTOMER.NAMEE, 
//                        @CategoryAccCode = dbo.A_REC_CUSTOMER_CATEGORY.ACC_CODE, 
//                        @ParentAccLevel = dbo.A_ACCOUNT.ACC_LEVEL ,
//                        @ParentAccGroup = dbo.A_ACCOUNT.ACC_GROUP
//                        FROM dbo.A_REC_CUSTOMER INNER JOIN
//                        dbo.A_REC_CUSTOMER_CATEGORY ON dbo.A_REC_CUSTOMER.COMP_CODE = dbo.A_REC_CUSTOMER_CATEGORY.COMP_CODE 
//                        AND dbo.A_REC_CUSTOMER.CST_CAT = dbo.A_REC_CUSTOMER_CATEGORY.CST_CAT INNER JOIN
//                        dbo.A_ACCOUNT ON dbo.A_REC_CUSTOMER_CATEGORY.COMP_CODE = dbo.A_ACCOUNT.COMP_CODE AND 
//                        dbo.A_REC_CUSTOMER_CATEGORY.ACC_CODE = dbo.A_ACCOUNT.ACC_CODE 
//                        COLLATE Arabic_CI_AS
//                        WHERE 
//                        (dbo.A_REC_CUSTOMER.CST_CODE = @CustomerCode) AND (dbo.A_REC_CUSTOMER.COMP_CODE = @CompCode)
                        
//                        INSERT INTO [A_ACCOUNT]
//                        ([COMP_CODE], [ACC_CODE], [ACC_DESCA], [ACC_DESCL], [ACC_GROUP], [ACC_TYPE], 
//                        [ACC_LEVEL], [ACC_ACTIVE], [GEN_LADGER], [OPENING_BALANCE], [CREDIT], [DEBIT], [PARENT_ACC], [DETAIL], [HOLD], 
//                        [BRA_CODE], [ACT_CODE], [CREATED_BY], [CREATED_AT], [ACC_LIMIT])
//                        VALUES
//                        (@CompCode, @CustomerCode, @CustomerNameA, @CustomerNameE, @ParentAccGroup, 4, 
//                        @ParentAccLevel + 1 ,1, 0, Null, Null, Null, @CategoryAccCode, 1, 0,
//                        Null, Null, @UserCode, Getdate(), 0)";

//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CustomerCode", vendorCode, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@UserCode", SharedParams.UserCode, DbType.String);

//            DataRepository.Provider.ExecuteNonQuery(tran, comm);
//        }

//        public static void UpdateAccountName(TransactionManager tran, string accCode, string nameE, string nameA)
//        {
//            string sqlString;
//            sqlString = @"UPDATE [A_ACCOUNT]
//                        SET   [ACC_DESCA] = @NameA ,  [ACC_DESCL] = @NameE
//                        Where  [COMP_CODE] = @CompCode AND  [ACC_CODE] = @AccountCode";

//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@AccountCode", accCode, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@NameA", nameA, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@NameE", nameE, DbType.String);
//            DataRepository.Provider.ExecuteNonQuery(tran, comm);
//        }
//        public static void UpdateRentContractStatusAfterQuittance(TransactionManager tran, int ContractRentID)
//        {
//            string sqlString;
//            sqlString = @"UPDATE RS_TR_ContractRent
//                        SET   [Status] = 4  Where  [TrId] in (Select TRID from RS_TR_ContractRent where ContractRentID= @ContractRentID) ";

//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@ContractRentID", ContractRentID, DbType.Int32);
//            DataRepository.Provider.ExecuteNonQuery(tran, comm);
//        }

//        public static DataTable GetCustomerPaymentTypeDataTable()
//        {
//            DataTable table = new DataTable();
//            table.Columns.Add("ID", typeof(byte));
//            table.Columns.Add("Item", typeof(string));
//            table.Rows.Add(0, "");
//            table.Rows.Add(1, HelperResources.GetString("cmboOnAccount"));
//            table.Rows.Add(2, HelperResources.GetString("cmboByInvoice"));
//            return table;
//        }

//        public static bool IsNonvendorCategory(string categoryCode)
//        {
//            if (string.IsNullOrEmpty(categoryCode))
//                return false;
//            string sqlString;
//            sqlString = @"SELECT IsVendorCategory
//                        FROM dbo.A_PAY_VENDOR_CATEGORY
//                        WHERE (COMP_CODE = @CompCode) AND (VND_CAT = @VndCat)";
//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@VndCat", categoryCode, DbType.String);
//            DataTable table = GenericDataAccess.ExecuteSelectCommand(comm);
//            bool nonCustomerCategory = false;
//            if (table.Rows.Count > 0 && bool.Parse(table.Rows[0].ItemArray[0].ToString()) == false)
//                nonCustomerCategory = true;
//            return nonCustomerCategory;
//        }

//        public static void CreatevendorUnderCOA(TransactionManager tran, string vendorCode)
//        {
//            //note customer should have been assigned a category before using this method
//            string sqlString;
//            sqlString = @"Declare @vendorNameA nvarchar(50),
//	                    @vendorNameE nvarchar(50),
//	                    @CategoryAccCode nvarchar(25),
//	                    @ParentAccLevel smallint,
//                        @ParentAccGroup smallint

//                        SELECT @vendorNameA = dbo.A_PAY_VENDOR.NAMEA, @vendorNameE = dbo.A_PAY_VENDOR.NAMEE, 
//                        @CategoryAccCode = dbo.A_PAY_VENDOR_CATEGORY.ACC_CODE, 
//                        @ParentAccLevel = dbo.A_ACCOUNT.ACC_LEVEL ,
//                        @ParentAccGroup = dbo.A_ACCOUNT.ACC_GROUP
//                        FROM dbo.A_PAY_VENDOR INNER JOIN
//                        dbo.A_PAY_VENDOR_CATEGORY ON dbo.A_PAY_VENDOR.COMP_CODE = dbo.A_PAY_VENDOR_CATEGORY.COMP_CODE 
//                        AND dbo.A_PAY_VENDOR.VND_CAT = dbo.A_PAY_VENDOR_CATEGORY.VND_CAT INNER JOIN
//                        dbo.A_ACCOUNT ON dbo.A_PAY_VENDOR_CATEGORY.COMP_CODE = dbo.A_ACCOUNT.COMP_CODE AND 
//                        dbo.A_PAY_VENDOR_CATEGORY.ACC_CODE = dbo.A_ACCOUNT.ACC_CODE 
//                        COLLATE Arabic_CI_AS
//                        WHERE 
//                        (dbo.A_PAY_VENDOR.VND_CODE = @VendorCode) AND (dbo.A_PAY_VENDOR.COMP_CODE = @CompCode)
                        
//                        INSERT INTO [A_ACCOUNT]
//                        ([COMP_CODE], [ACC_CODE], [ACC_DESCA], [ACC_DESCL], [ACC_GROUP], [ACC_TYPE], 
//                        [ACC_LEVEL], [ACC_ACTIVE], [GEN_LADGER], [OPENING_BALANCE], [CREDIT], [DEBIT], [PARENT_ACC], [DETAIL], [HOLD], 
//                        [BRA_CODE], [ACT_CODE], [CREATED_BY], [CREATED_AT], [ACC_LIMIT])
//                        VALUES
//                        (@CompCode, @VendorCode, @vendorNameA, @vendorNameE, @ParentAccGroup, 4, 
//                        @ParentAccLevel + 1 ,1, 0, Null, Null, Null, @CategoryAccCode, 1, 0,
//                        Null, Null, @UserCode, Getdate(), 0)";

//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@VendorCode", vendorCode, DbType.String);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@UserCode", SharedParams.UserCode, DbType.String);

//            DataRepository.Provider.ExecuteNonQuery(tran, comm);
//        }

//        public static bool IsLatestReleaseOfContract(int releaseNo, int trID)
//        {
//            if (releaseNo == 0 || trID == 0)
//                return true;

//            string sqlString = @"SELECT MAX(ReleaseNo) FROM RS_TR_ContractRent where COMP_CODE = @CompCode AND BRA_CODE = @BraCode AND TrID = @TrID  ";
//            DbCommand Comm = GenericDataAccess.CreateTextCommand(sqlString);

//            GenericDataAccess.AddStoredProcedureParameter(Comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(Comm, "@BraCode", SharedParams.BranchCode, DbType.Int32);
//            GenericDataAccess.AddStoredProcedureParameter(Comm, "@TrID", trID, DbType.Int32);

//            DataTable table = GenericDataAccess.ExecuteSelectCommand(Comm);
//            if (table.Rows.Count > 0)
//            {
//                return int.Parse(table.Rows[0].ItemArray[0].ToString()) == releaseNo;
//            }
//            else
//                return false;
//        }

//        public static bool checkShowVndFinancials()
//        {
//            string sqlString = @"SELECT ShowVndFinancials FROM A_PAY_CONTROL
//                                 WHERE COMP_CODE = @CompCode";

//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            string value = GenericDataAccess.ExecuteScalar(comm);
//            return bool.Parse(value);

//        }

//        public static bool checkShowCstFinancials()
//        {
//            string sqlString = @"SELECT ShowCstFinancials FROM A_REC_CONTROL
//                                 WHERE COMP_CODE = @CompCode";

//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            string value = GenericDataAccess.ExecuteScalar(comm);
//            return bool.Parse(value);

//        }

//        public static int GetMaxReleaseNo(int trId)
//        {
//            if (trId == 0)
//                return 0;
//            else
//            {
//                string sqlString = @"select Max(ReleaseNo) from dbo.RS_TR_ContractRent where TrID = @trId and COMP_CODE =@compCode and BRA_CODE =@BranchCode";
//                DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//                GenericDataAccess.AddStoredProcedureParameter(comm, "@trId", trId, DbType.Int32);
//                GenericDataAccess.AddStoredProcedureParameter(comm, "@compCode", SharedParams.CompanyCode, DbType.Int32);
//                GenericDataAccess.AddStoredProcedureParameter(comm, "@BranchCode", SharedParams.BranchCode, DbType.Int32);
//                int Value = int.Parse(GenericDataAccess.ExecuteScalar(comm));
//                return Value;
//            }
//        }

//        public static DataTable GetReminderStatusDataTable()
//        {
//            string sqlString;
//            sqlString = "SELECT    ReminderStatus as ReminderStatusID, " + (Thread.CurrentThread.CurrentUICulture.ThreeLetterISOLanguageName == CultureInfo.GetCultureInfo("ar").ThreeLetterISOLanguageName ? " DescA " : " DescE ") + " as ReminderStatusName , FilePath" +
//            "  FROM         RS_D_ReminderStatus WHERE (COMP_CODE = @CompCode) ";
//            DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
//            GenericDataAccess.AddStoredProcedureParameter(comm, "@CompCode", SharedParams.CompanyCode, DbType.Int32);
//            return GenericDataAccess.ExecuteSelectCommand(comm);
//        }
//        //public static string DateDiff(DateTime startDate, DateTime endDate)
//        //{
//        //    string timeStr = string.Empty;
//        //    int yr = 0;
//        //    int mth = 0;
//        //    int days = 0;

//        //    TimeSpan ts = new TimeSpan();
//        //    ts = endDate.Subtract(startDate);
//        //    yr = (ts.Days / 365);

//        //    do
//        //    {
//        //        for (int i = 0; i <= 12; i++)
//        //        {
//        //            if (endDate.Subtract(startDate.AddYears(yr).AddMonths(i)).Days > 0)
//        //            {
//        //                mth = i;
//        //            }
//        //            else
//        //            {
//        //                break;
//        //            }
//        //        }

//        //        if (mth > 12)
//        //            yr = yr + 1;
//        //    } while (mth > 12);

//        //    days = endDate.Subtract(startDate.AddYears(yr).AddMonths(mth)).Days;

//        //    if (yr > 0)
//        //        timeStr += yr.ToString() + "y";
//        //    if (mth > 0)
//        //        timeStr += mth.ToString() + "m";
//        //    if (days > 0)
//        //        timeStr += days.ToString() + "d";


//        //    return (timeStr);
//        //}

//        #endregion

//        #region Constructor
//        //static SystemFunctions()
//        //{
//        //    objResourceManager = new ResourceManager(string.Format("{0}.Resources.messages", Assembly.GetExecutingAssembly().GetName().Name), Assembly.GetExecutingAssembly());
//        //}
//        #endregion

//    }
//}
