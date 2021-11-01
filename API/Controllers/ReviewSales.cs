using Inv.API.Models;
using Inv.BLL.Services.Stok_ORDER;
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
using API.Models.CustomModel;

namespace Inv.API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ReviewSalesController : BaseController
    {


        private readonly IStok_ORDERServices Stok_ORDERServices;

        public ReviewSalesController(IStok_ORDERServices _Stok_ORDERServices)
        {
            this.Stok_ORDERServices = _Stok_ORDERServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserName, string password)
        {
            if (ModelState.IsValid)
            {
                var Login = Stok_ORDERServices.GetAll().ToList();

                return Ok(new BaseResponse(Login));

            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_IQ_ReviewSalesMaster(string startDate, string endDate, int? CustomerId, string USER_CODE)
        {
            if (ModelState.IsValid)
            {
                string s = "select * from ReviewSalesMaster where [Date] >='" + startDate + "' and [Date] <='" + endDate + "'";

                string condition = "";

                if (CustomerId != 0 && CustomerId != null)
                    condition = condition + " and CUSTOMER_ID =" + CustomerId;

                if (USER_CODE != "null")
                    condition = condition + " and USER_CODE = '" + USER_CODE + "'";




                string query = s + condition;
                var res = db.Database.SqlQuery<ReviewSalesMaster>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult IQ_ReviewSalesItemInfo(int ID_ORDER)
        {
            if (ModelState.IsValid)
            {
                var res = db.ReviewSalesItemInfoes.Where(x => x.FK_ORDER_Delivery == ID_ORDER).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert_Processes([FromBody]SlsMasterDetails Operation)
        {

            try
            {


                var updatedOperationItems = Operation.I_Sls_TR_InvoiceItems.Where(x => x.StatusFlag == 'u').ToList();
                var deletedOperationItems = Operation.I_Sls_TR_InvoiceItems.Where(x => x.StatusFlag == 'd').ToList();


                //loop Update  I_Pur_TR_ReceiveItems
                foreach (var item in updatedOperationItems)
                {
                    db.update_SalesReturn(item.PRODUCT_ID, Convert.ToInt16(item.Quantity_sell), item.Total_Price_One_Part, item.ID_DELIVERY, "u");


                }

                //loop Delete  I_Pur_TR_ReceiveItems
                foreach (var item in deletedOperationItems)
                {
                    db.update_SalesReturn(item.PRODUCT_ID, Convert.ToInt16(item.Quantity_sell), item.Total_Price_One_Part, item.ID_DELIVERY, "d");


                }

                var Master = Operation.I_Sls_TR_Invoice;
                var Items = Operation.I_Sls_TR_InvoiceItems;

                db.update_Sales_Master(Master.Total_All, Items[0].UserCode, Master.ID_ORDER_Delivery);

                //string qury = "update_Sales_Master  "+ Master.Total_All + ",'"+ Items[0].UserCode + "'," + Master.ID_ORDER_Delivery + " ";
                //var Total_All = db.Database.SqlQuery<double>(qury).FirstOrDefault();



                return Ok(new BaseResponse("ok"));

            }
            catch (Exception ex)
            {

                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }


        }



    }
}
