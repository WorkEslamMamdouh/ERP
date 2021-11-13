 using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.ServiceTRInvoice;
using Inv.BLL.Services.ServSlsInvoiceItems;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;
using System.Data.SqlClient;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class ServTrSalesController : BaseController
    {
        private readonly IServSlsInvoiceItemsService IServSlsInvoiceItemsService;
        private readonly IServiceTRInvoiceService IServiceTRInvoiceService;
        private readonly G_USERSController UserControl;

        public ServTrSalesController(IServiceTRInvoiceService _IServiceTRInvoiceService, G_USERSController _Control, IServSlsInvoiceItemsService _IServSlsInvoiceItemsService)
        {
            this.IServiceTRInvoiceService = _IServiceTRInvoiceService;
            this.IServSlsInvoiceItemsService = _IServSlsInvoiceItemsService;
            this.UserControl = _Control;
        }

        #region Invoices
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllServSalesInvoice(int CompCode, int trtype, int BranchCode, int IsCash, string StartDate, string EndDate, int Status, int? CustId,  string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                string s = "select * from AQVAT_GetSlsInvoiceList where  BranchCode = " + BranchCode + " and CompCode = " + CompCode + "and TrDate >=' " + StartDate + "' and TrDate <= ' " + EndDate + " ' and  TrType = " + trtype;
                string condition = "";
                if (CustId != 0 && CustId != null)
                    condition = condition + " and CustomerId =" + CustId;
         
                if (Status == 2)
                    condition = condition + "";
                else
                {
                    condition = condition + " and Status = " + Status;
                }
                if (IsCash == 2)
                    condition = condition + "";
                else if (IsCash == 0)
                {
                    condition = condition + " and IsCash = 'False' ";
                }
                else if (IsCash == 1)
                {
                    condition = condition + " and IsCash = 'True' ";
                }
                string query = s + condition;
                var res = db.Database.SqlQuery<AQVAT_GetSlsInvoiceList>(query).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllServSalesInvoice(int CompCode, int invoiceid, int BranchCode, string UserCode, string Token)
        {
            if ( UserControl.CheckUser(Token, UserCode))
            {
               var res= db.AQVAT_GetSlsInvoiceList.Where(x=>x.CompCode== CompCode && x.BranchCode== BranchCode && x.InvoiceID==invoiceid).ToList();
               
                return Ok(new BaseResponse(res));
            }
            return Ok(new BaseResponse());
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllServSalesInvoicebyTrNo(int CompCode, int TrNo, int BranchCode, string UserCode, string Token)
        {
            if (UserControl.CheckUser(Token, UserCode))
            {
                var res = db.AQVAT_GetSlsInvoiceList.Where(x => x.CompCode == CompCode && x.BranchCode == BranchCode && x.TrNo == TrNo).ToList();

                return Ok(new BaseResponse(res));
            }
            return Ok(new BaseResponse());
        }






        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertInvoiceMasterDetail([FromBody]ServSlsInvoiceMasterDetails obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        string st = SystemToolsController.GenerateGuid();
                        obj.AVAT_TR_SlsInvoice.DocUUID = st;

                        var tm = DateTime.Now.ToString("HH:mm:ss");
                        obj.AVAT_TR_SlsInvoice.TrTime = TimeSpan.Parse(tm);

                        var Sls_TR_Invoice = IServiceTRInvoiceService.Insert(obj.AVAT_TR_SlsInvoice);

                        for (int i = 0; i < obj.AVAT_TR_SlsInvoiceItem.Count; i++)
                        {
                            obj.AVAT_TR_SlsInvoiceItem[i].InvoiceID = Sls_TR_Invoice.InvoiceID;
                        }
                        IServSlsInvoiceItemsService.InsertLst(obj.AVAT_TR_SlsInvoiceItem);
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(obj.AVAT_TR_SlsInvoice.CompCode), Convert.ToInt32(obj.AVAT_TR_SlsInvoice.BranchCode), Sls_TR_Invoice.InvoiceID, "ServSlsInv", "Add", db);
                        if (res.ResponseState == true)
                        {
                            obj.AVAT_TR_SlsInvoice.TrNo = int.Parse(res.ResponseData.ToString());
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(obj.AVAT_TR_SlsInvoice));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult updateInvoiceMasterDetail([FromBody]ServSlsInvoiceMasterDetails updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj.Token, updatedObj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        //update Master
                        var Sls_TR_Invoice = IServiceTRInvoiceService.Update(updatedObj.AVAT_TR_SlsInvoice);

                        //update Details
                        var insertedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  
                        foreach (var item in insertedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var InsertedRec = IServSlsInvoiceItemsService.Insert(item);
                        }

                        //loop Update  
                        foreach (var item in updatedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var updatedRec = IServSlsInvoiceItemsService.Update(item);
                        }

                        //loop Delete  
                        foreach (var item in deletedInvoiceItems)
                        {
                            int deletedId = item.InvoiceItemID;
                            IServSlsInvoiceItemsService.Delete(deletedId);
                        }
                        // call process trans 

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.CompCode), Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.BranchCode), Sls_TR_Invoice.InvoiceID, "ServSlsInv", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(updatedObj.AVAT_TR_SlsInvoice));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult OpenSrvSlsInv([FromBody]ServSlsInvoiceMasterDetails updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj.Token, updatedObj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        //update Master
                        var Sls_TR_Invoice = IServiceTRInvoiceService.Update(updatedObj.AVAT_TR_SlsInvoice);

                        //update Details
                        var insertedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  
                        foreach (var item in insertedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var InsertedRec = IServSlsInvoiceItemsService.Insert(item);
                        }

                        //loop Update  
                        foreach (var item in updatedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var updatedRec = IServSlsInvoiceItemsService.Update(item);
                        }

                        //loop Delete  
                        foreach (var item in deletedInvoiceItems)
                        {
                            int deletedId = item.InvoiceItemID;
                            IServSlsInvoiceItemsService.Delete(deletedId);
                        }
                        // call process trans 

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.CompCode), Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.BranchCode), Sls_TR_Invoice.InvoiceID, "ServSlsInv", "Open", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(updatedObj.AVAT_TR_SlsInvoice));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetServSalesInvByID(int InvoiceID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {

                var Query = "select * from AVAT_TR_SlsInvoiceItem where InvoiceID = " + InvoiceID + "";
                var res = db.Database.SqlQuery<AVAT_TR_SlsInvoiceItem> (Query).ToList();
                //var res2 = db.AQVAT_GetSlsInvoiceItem.Where(s => s.InvoiceID == InvoiceID).ToList();
                //var res = db.AQVAT_GetSlsInvoiceList.Where(s => s.InvoiceID == InvoiceID).ToList();

                //AQ_ServSlsInvoiceMasterDetails model = new AQ_ServSlsInvoiceMasterDetails();
                //model.AQVAT_GetSlsInvoiceList = res;
                //model.AQVAT_GetSlsInvoiceItem = res2;
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }


        #endregion

        #region Return
        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertRetInvoiceMasterDetail([FromBody]ServSlsInvoiceMasterDetails obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        string st = SystemToolsController.GenerateGuid();
                        obj.AVAT_TR_SlsInvoice.DocUUID = st;

                        var tm = DateTime.Now.ToString("HH:mm:ss");
                        obj.AVAT_TR_SlsInvoice.TrTime = TimeSpan.Parse(tm);

                        var Sls_TR_Invoice = IServiceTRInvoiceService.Insert(obj.AVAT_TR_SlsInvoice);

                        for (int i = 0; i < obj.AVAT_TR_SlsInvoiceItem.Count; i++)
                        {
                            obj.AVAT_TR_SlsInvoiceItem[i].InvoiceID = Sls_TR_Invoice.InvoiceID;
                            //IServSlsInvoiceItemsService.Update(Invoiceheaderdet[j]);

                            //if (obj.AVAT_TR_SlsInvoice.Status == 1)
                            //{
                            //        var Invoiceheaderdet = IServSlsInvoiceItemsService.GetAll(s=>s.InvoiceID==obj.AVAT_TR_SlsInvoice.RefTrID);
                            //    for (int j = 0; j < Invoiceheaderdet.Count; j++)
                            //    {
                            //        if (obj.AVAT_TR_SlsInvoiceItem[i].Serial == Invoiceheaderdet[j].Serial)
                            //        {
                            //            Invoiceheaderdet[j].TotRetQty += obj.AVAT_TR_SlsInvoiceItem[i].TotRetQty;
                            //            IServSlsInvoiceItemsService.Update(Invoiceheaderdet[j]);
                            //        }
                            //    }
                            //}
                        }
                       IServSlsInvoiceItemsService.InsertLst(obj.AVAT_TR_SlsInvoiceItem);
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(obj.AVAT_TR_SlsInvoice.CompCode), Convert.ToInt32(obj.AVAT_TR_SlsInvoice.BranchCode), Sls_TR_Invoice.InvoiceID, "servSlsRet", "Add", db);
                        if (res.ResponseState == true)
                        {
                            obj.AVAT_TR_SlsInvoice.TrNo = int.Parse(res.ResponseData.ToString());
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(obj.AVAT_TR_SlsInvoice));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult updateRetInvoiceMasterDetail([FromBody]ServSlsInvoiceMasterDetails updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj.Token, updatedObj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        //update Master
                        var Sls_TR_Invoice = IServiceTRInvoiceService.Update(updatedObj.AVAT_TR_SlsInvoice);

                        //update Details
                        var insertedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  
                        foreach (var item in insertedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var InsertedRec = IServSlsInvoiceItemsService.Insert(item);
                        }

                        //loop Update  
                        foreach (var item in updatedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var updatedRec = IServSlsInvoiceItemsService.Update(item);
                        }

                        //loop Delete  
                        foreach (var item in deletedInvoiceItems)
                        {
                            int deletedId = item.InvoiceItemID;
                            IServSlsInvoiceItemsService.Delete(deletedId);
                        }
                        //for (int i = 0; i < updatedObj.AVAT_TR_SlsInvoiceItem.Count; i++)
                        //{
                        //    if (updatedObj.AVAT_TR_SlsInvoice.Status == 1)
                        //    {
                        //        var Invoiceheaderdet = IServSlsInvoiceItemsService.GetAll(s => s.InvoiceID == updatedObj.AVAT_TR_SlsInvoice.RefTrID);
                        //        for (int j = 0; j < Invoiceheaderdet.Count; j++)
                        //        {
                        //            if (updatedObj.AVAT_TR_SlsInvoiceItem[i].Serial == Invoiceheaderdet[j].Serial)
                        //            {
                        //                Invoiceheaderdet[j].TotRetQty += updatedObj.AVAT_TR_SlsInvoiceItem[i].TotRetQty;
                        //                IServSlsInvoiceItemsService.Update(Invoiceheaderdet[j]);
                        //            }
                        //        }
                        //    }
                        //}
                        // call process trans 
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.CompCode), Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.BranchCode), Sls_TR_Invoice.InvoiceID, "servSlsRet", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(updatedObj.AVAT_TR_SlsInvoice));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult OpenRetSrvSlsInv([FromBody]ServSlsInvoiceMasterDetails updatedObj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(updatedObj.Token, updatedObj.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        //update Master
                        var Sls_TR_Invoice = IServiceTRInvoiceService.Update(updatedObj.AVAT_TR_SlsInvoice);

                        //update Details
                        var insertedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedInvoiceItems = updatedObj.AVAT_TR_SlsInvoiceItem.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered  
                        foreach (var item in insertedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var InsertedRec = IServSlsInvoiceItemsService.Insert(item);
                        }

                        //loop Update  
                        foreach (var item in updatedInvoiceItems)
                        {
                            item.InvoiceID = updatedObj.AVAT_TR_SlsInvoice.InvoiceID;
                            var updatedRec = IServSlsInvoiceItemsService.Update(item);
                        }

                        //loop Delete  
                        foreach (var item in deletedInvoiceItems)
                        {
                            int deletedId = item.InvoiceItemID;
                            IServSlsInvoiceItemsService.Delete(deletedId);
                        }

                        for (int i = 0; i < updatedObj.AVAT_TR_SlsInvoiceItem.Count; i++)
                        {
                            if (updatedObj.AVAT_TR_SlsInvoice.Status == 1)
                            {
                                var Invoiceheaderdet = IServSlsInvoiceItemsService.GetAll(s => s.InvoiceID == updatedObj.AVAT_TR_SlsInvoice.RefTrID);
                                for (int j = 0; j < Invoiceheaderdet.Count; j++)
                                {
                                    if (updatedObj.AVAT_TR_SlsInvoiceItem[i].Serial == Invoiceheaderdet[j].Serial)
                                    {
                                        Invoiceheaderdet[j].TotRetQty -= updatedObj.AVAT_TR_SlsInvoiceItem[i].TotRetQty;
                                        IServSlsInvoiceItemsService.Update(Invoiceheaderdet[j]);
                                    }
                                }
                            }
                        }
                        // call process trans 

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.CompCode), Convert.ToInt32(updatedObj.AVAT_TR_SlsInvoice.BranchCode), Sls_TR_Invoice.InvoiceID, "servSlsRet", "Open", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(updatedObj.AVAT_TR_SlsInvoice));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }
        #endregion



    }
}
