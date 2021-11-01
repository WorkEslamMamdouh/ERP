using Inv.API.Models;
using Inv.BLL.Services.Purchases;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Controllers;
using Inv.API.Tools;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Data.Entity;
using Inv.DAL.Repository;
using Newtonsoft.Json;
using Inv.API.Models.CustomModel;

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class PurchasesController : BaseController
    {


        private readonly IPurchases_MasterServices Purchases_MasterServices;

        public PurchasesController(IPurchases_MasterServices _Purchases_MasterServices)
        {
            this.Purchases_MasterServices = _Purchases_MasterServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserName, string password)
        {
            if (ModelState.IsValid)
            {
                var Login = Purchases_MasterServices.GetAll().ToList();

                return Ok(new BaseResponse(Login));

            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_IQ_PurchasesMaster(string startDate, string endDate, int? ID_Supplier, int Type_Debit)
        {
            if (ModelState.IsValid)
            {
                string s = "select * from IQ_Purchases_Master where Tr_Date >='" + startDate + "' and Tr_Date <='" + endDate + "'";

                string condition = "";

                if (ID_Supplier != 0 && ID_Supplier != null)
                    condition = condition + " and ID_Supplier =" + ID_Supplier;

                if (Type_Debit != 2)
                    condition = condition + " and Type_Debit =" + Type_Debit;


                string query = s + condition;
                var res = db.Database.SqlQuery<IQ_Purchases_Master>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_IQ_Purchases_Details(int TrNo)
        {
            if (ModelState.IsValid)
            {
                string s = "select * from IQ_Purchases_Details where TrNo = " + TrNo + "";

                string query = s;
                var res = db.Database.SqlQuery<IQ_Purchases_Details>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult IQ_PurchasesItemInfo(int TrNo)
        {
            if (ModelState.IsValid)
            {
                var res = db.IQ_Purchases_Details.Where(x => x.TrNo == TrNo).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdatePurchases_Master(List<Purchases_Master> Purc_Master)
        {

            try
            {

                //loop Insert  I_Pur_TR_ReceiveItems
                foreach (var item in Purc_Master)
                {

                    var updated = Purchases_MasterServices.Update(item);


                }



                return Ok(new BaseResponse("ok"));
            }
            catch (Exception)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "الصنف مستخدم بافعل لا يمكنك تغيره"));
            }

        }




        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert_Purchases([FromBody]PurchasesMasterDetails Operation)
        {

            try
            {
                var TrNo = 0;

                var insertOperationItems = Operation.Purchases_Details.Where(x => x.StatusFlag == 'i').ToList();
                var updatedOperationItems = Operation.Purchases_Details.Where(x => x.StatusFlag == 'u').ToList();
                var deletedOperationItems = Operation.Purchases_Details.Where(x => x.StatusFlag == 'd').ToList();


                if (Operation.Purchases_Master.TrNo != 0)
                {
                    string Tr_Date = Operation.Purchases_Master.Tr_Date;
                    int ID_Supplier = Convert.ToInt16(Operation.Purchases_Master.ID_Supplier);
                    bool Type_Debit = Convert.ToBoolean(Operation.Purchases_Master.Type_Debit);
                    decimal Total_Amount = Convert.ToDecimal(Operation.Purchases_Master.Total_Amount);
                    decimal Paid_Up = Convert.ToDecimal(Operation.Purchases_Master.Paid_Up);
                    decimal To_be_Paid = Convert.ToDecimal(Operation.Purchases_Master.To_be_Paid);
                    string REMARKS = Operation.Purchases_Master.REMARKS;

                    string update_qury = "update_Purchases_Master " + Operation.Purchases_Master.TrNo + " ,'" + Tr_Date + "'," + ID_Supplier + "," + Type_Debit + ", " + Total_Amount + " ," + Paid_Up + "," + To_be_Paid + ",'" + REMARKS + "'";
                    db.Database.ExecuteSqlCommand(update_qury);

                    TrNo = Operation.Purchases_Master.TrNo;

                }


                if (insertOperationItems.Count > 0)
                {

                    if (insertOperationItems[0].TrNo == 0)
                    {
                        string Tr_Date = Operation.Purchases_Master.Tr_Date;
                        int ID_Supplier = Convert.ToInt16(Operation.Purchases_Master.ID_Supplier);
                        bool Type_Debit = Convert.ToBoolean(Operation.Purchases_Master.Type_Debit);
                        decimal Total_Amount = Convert.ToDecimal(Operation.Purchases_Master.Total_Amount);
                        decimal Paid_Up = Convert.ToDecimal(Operation.Purchases_Master.Paid_Up);
                        decimal To_be_Paid = Convert.ToDecimal(Operation.Purchases_Master.To_be_Paid);
                        string REMARKS = Operation.Purchases_Master.REMARKS;

                        string qury = "insert_Purchases_Master  '" + Tr_Date + "'," + ID_Supplier + "," + Type_Debit + ", " + Total_Amount + " ," + Paid_Up + "," + To_be_Paid + ",'" + REMARKS + "'";

                        TrNo = db.Database.SqlQuery<int>(qury).FirstOrDefault();

                        foreach (var item in insertOperationItems)
                        {

                            //db.Processes_Purchases(item.PRODUCT_NAME, Convert.ToInt16(item.Purchases_Quantity), Convert.ToDecimal(item.Purchases_Price), Convert.ToDecimal(item.Sales_Price), Convert.ToDecimal(item.MinUnitPrice), item.Name_CAT, Convert.ToInt16(TrNo), Convert.ToInt16(item.ID), "i");

                            string Pro_qury = "Processes_Purchases  '" + item.PRODUCT_NAME + "'," + Convert.ToInt16(item.Purchases_Quantity) + "," + Convert.ToDecimal(item.Purchases_Price) + ", " + Convert.ToDecimal(item.Sales_Price) + " ," + Convert.ToDecimal(item.MinUnitPrice) + ",'" + item.Name_CAT + "'," + Convert.ToInt16(TrNo) + "," + Convert.ToInt16(item.ID) + "," + Convert.ToInt16(item.ID_familly_Cat) + ",'i'";
                            db.Database.ExecuteSqlCommand(Pro_qury);

                        }
                    }
                    else
                    {
                        //loop insert  I_Pur_TR_ReceiveItems
                        foreach (var item in insertOperationItems)
                        {
                            //db.Processes_Purchases(item.PRODUCT_NAME, Convert.ToInt16(item.Purchases_Quantity), Convert.ToDecimal(item.Purchases_Price), Convert.ToDecimal(item.Sales_Price), Convert.ToDecimal(item.MinUnitPrice), item.Name_CAT, Convert.ToInt16(item.TrNo), Convert.ToInt16(item.ID), "i");

                            string Pro_qury = "Processes_Purchases  '" + item.PRODUCT_NAME + "'," + Convert.ToInt16(item.Purchases_Quantity) + "," + Convert.ToDecimal(item.Purchases_Price) + ", " + Convert.ToDecimal(item.Sales_Price) + " ," + Convert.ToDecimal(item.MinUnitPrice) + ",'" + item.Name_CAT + "'," + Convert.ToInt16(item.TrNo) + "," + Convert.ToInt16(item.ID) + "," + Convert.ToInt16(item.ID_familly_Cat) + ",'i'";
                            db.Database.ExecuteSqlCommand(Pro_qury);
                            TrNo = item.TrNo;
                        }
                    }

                }

                if (updatedOperationItems.Count > 0)
                {



                    //loop Update  I_Pur_TR_ReceiveItems
                    foreach (var item in updatedOperationItems)
                    {
                        //[Processes_Purchases] 'نتاناتاتييع',11,15,10,30,'NEW MOBILES',2,4,'u'
                        //db.Processes_Purchases(item.PRODUCT_NAME, Convert.ToInt16(item.Purchases_Quantity), Convert.ToDecimal(item.Purchases_Price), Convert.ToDecimal(item.Sales_Price), Convert.ToDecimal(item.MinUnitPrice), item.Name_CAT, Convert.ToInt16(item.TrNo), Convert.ToInt16(item.ID), "u");

                        string Pro_qury = "Processes_Purchases  '" + item.PRODUCT_NAME + "'," + Convert.ToInt16(item.Purchases_Quantity) + "," + Convert.ToDecimal(item.Purchases_Price) + ", " + Convert.ToDecimal(item.Sales_Price) + " ," + Convert.ToDecimal(item.MinUnitPrice) + ",'" + item.Name_CAT + "'," + Convert.ToInt16(item.TrNo) + "," + Convert.ToInt16(item.ID) + "," + Convert.ToInt16(item.ID_familly_Cat) + ",'u'";
                        db.Database.ExecuteSqlCommand(Pro_qury);
                        TrNo = item.TrNo;
                    }
                }
                //loop Delete  I_Pur_TR_ReceiveItems
                foreach (var item in deletedOperationItems)
                {
                    //db.Processes_Purchases(item.PRODUCT_NAME, Convert.ToInt16(item.Purchases_Quantity), Convert.ToDecimal(item.Purchases_Price), Convert.ToDecimal(item.Sales_Price), Convert.ToDecimal(item.MinUnitPrice), item.Name_CAT, Convert.ToInt16(item.TrNo), Convert.ToInt16(item.ID), "d");

                    string Pro_qury = "Processes_Purchases  '" + item.PRODUCT_NAME + "'," + Convert.ToInt16(item.Purchases_Quantity) + "," + Convert.ToDecimal(item.Purchases_Price) + ", " + Convert.ToDecimal(item.Sales_Price) + " ," + Convert.ToDecimal(item.MinUnitPrice) + ",'" + item.Name_CAT + "'," + Convert.ToInt16(item.TrNo) + "," + Convert.ToInt16(item.ID) + "," + Convert.ToInt16(item.ID_familly_Cat) + ",'d'";
                    db.Database.ExecuteSqlCommand(Pro_qury);
                    TrNo = item.TrNo;

                }


                return Ok(new BaseResponse(TrNo));

            }
            catch (Exception ex)
            {

                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }


        }



    }
}
