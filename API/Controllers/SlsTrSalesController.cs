using Inv.API.Models;
using Inv.BLL.Services.SlsTrSales;
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
    public class SlsTrSalesController : BaseController
    {


        public class SlsInvoiceTrNo_Or_ID
        {
            public int TrNo { get; set; }
            public int ID_ORDER { get; set; }
        }


        private readonly ISlsTrSalesServices SlsTrSalesServices;

        public SlsTrSalesController(ISlsTrSalesServices _SlsTrSalesServices)
        {
            this.SlsTrSalesServices = _SlsTrSalesServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserName, string password)
        {
            if (ModelState.IsValid)
            {
                var Login = SlsTrSalesServices.GetAll().ToList();

                return Ok(new BaseResponse(Login));

            }
            return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertInvoiceMasterDetail([FromBody]SlsInvoiceMasterDetails obj)
        {

            try
            {
                SlsInvoiceTrNo_Or_ID TrNo_Or_ID = new SlsInvoiceTrNo_Or_ID();

                string UserName = obj.I_Sls_TR_Invoice.UserName;
                int Namber_Order_Delivery = obj.I_Sls_TR_Invoice.Namber_Order_Delivery;
                decimal Total_All = obj.I_Sls_TR_Invoice.Total_All;
                string Date_Order_Delivery = obj.I_Sls_TR_Invoice.Date_Order_Delivery;
                int Tax = obj.I_Sls_TR_Invoice.Tax;
                int CUSTOMER_ID = obj.I_Sls_TR_Invoice.CUSTOMER_ID;
                string type_order = obj.I_Sls_TR_Invoice.type_order;
                int Confirmation = obj.I_Sls_TR_Invoice.Confirmation == true ? 1 : 0;
                string qury = "insert_ORDER_DELIVERY  '" + UserName + "'," + Namber_Order_Delivery + "," + Total_All + ",'" + Date_Order_Delivery + "'," + Tax + "," + CUSTOMER_ID + ",'" + type_order + "'," + Confirmation + "";

                var Num_Order = db.Database.SqlQuery<int>(qury).FirstOrDefault();

                for (int i = 0; i < obj.I_Sls_TR_InvoiceItems.Count; i++)
                {
                    obj.I_Sls_TR_InvoiceItems[i].FK_ORDER_Delivery = Num_Order;

                    int PRODUCT_ID = Convert.ToInt16(obj.I_Sls_TR_InvoiceItems[i].PRODUCT_ID);
                    int Quantity = Convert.ToInt16(obj.I_Sls_TR_InvoiceItems[i].Quantity_sell);

                    var InvoiceItems = SlsTrSalesServices.Insert(obj.I_Sls_TR_InvoiceItems[i]);

                    string qq = "select TrType from PRODUCT where PRODUCT_ID = " + PRODUCT_ID + "";
                    int TrType = db.Database.SqlQuery<int>(qq).FirstOrDefault();

                    if (TrType != 1)
                    {
                        string update = "update PRODUCT set PRODUCT_QET=(PRODUCT_QET - " + Quantity + ") where PRODUCT_ID='" + PRODUCT_ID + "'";
                        var update_Qy = db.Database.ExecuteSqlCommand(update);
                    }


                }

                string GetTrNo = "select [Namber_Order_Delivery] from [ORDER_DELIVERY] where [ID_ORDER_Delivery] = " + Num_Order + "";
                int TrNo = db.Database.SqlQuery<int>(GetTrNo).FirstOrDefault();

                TrNo_Or_ID.TrNo = TrNo;
                TrNo_Or_ID.ID_ORDER = Num_Order;


                return Ok(new BaseResponse(TrNo_Or_ID));
                ////////
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }


        }



    }
}
