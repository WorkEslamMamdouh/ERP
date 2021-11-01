using Inv.API.Models;
using Inv.BLL.Services.Outletpirce;
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

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class OutletpirceController : BaseController
    {
         
        private readonly IOutletpirceServices OutletpirceServices;

        public OutletpirceController(IOutletpirceServices _IOutletpirceServices)
        {
            OutletpirceServices = _IOutletpirceServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode)
        {
            if (ModelState.IsValid)
            {
                var Cust = OutletpirceServices.GetAll().ToList();
                
                    return Ok(new BaseResponse(Cust));
              
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Get_Balance()
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //var Outlet = db.insert_Outlet(Dasc_Name, pirce, UserName).ToString();
                    string quer = "Get_Balance";
                    var Outlet = db.Database.SqlQuery<decimal>(quer); 
                    return Ok(new BaseResponse(Outlet));

                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Insert(string Dasc_Name, decimal pirce, string UserName , string Tr_Type)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //var Outlet = db.insert_Outlet(Dasc_Name, pirce, UserName).ToString();
                    string quer = "insert_Outlet '" + Dasc_Name + "', " + pirce + ", '" + UserName + "', '"+ Tr_Type + "'";
                    var Outlet = db.Database.SqlQuery<decimal>(quer);

                    return Ok(new BaseResponse(Outlet));

                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Insert_Enter_Money(string Dasc_Name , decimal pirce , string UserName, string Tr_Type)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //var Outlet = db.insert_Outlet(Dasc_Name, pirce, UserName).ToString();
                    string quer = "Insert_Enter_Money '" + Dasc_Name + "', " + pirce + ", '" + UserName + "' , '"+ Tr_Type + "'";
                    var Outlet = db.Database.SqlQuery<decimal>(quer);
                     
                    return Ok(new BaseResponse(Outlet));

                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int ID)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    OutletpirceServices.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception  )
                {
                    return Ok(new BaseResponse(0, "Error"));
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]Outlet Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = OutletpirceServices.Update(Nation);
                    return Ok(new BaseResponse(Nationality));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }



        //***************asmaa********************//
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateCustlist(List<Outlet> OutletpirceList)
        {

            if (ModelState.IsValid)
            {
                 
                    try
                    {
                        var insertedRecords = OutletpirceList.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedRecords = OutletpirceList.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedRecords = OutletpirceList.Where(x => x.StatusFlag == 'd').ToList();
                        ResponseResult res = new ResponseResult();
                    //loop insered 
                    if (insertedRecords.Count > 0)
                    {
                        foreach (var item in insertedRecords)
                        {
                            var InsertedRec = OutletpirceServices.Insert(item);
                            return Ok(new BaseResponse(InsertedRec.id));
                        }
                       
                    }


                    //loop Update 
                    if (updatedRecords.Count > 0)
                    {
                        foreach (var item in updatedRecords)
                        {
                            var updatedRec = OutletpirceServices.Update(item);
                            return Ok(new BaseResponse(updatedRec.id));
                        }
                       
                    }

                    //var ID_Outletpirce = OutletpirceServices.GetAll(x => x.PHONE == OutletpirceList[0].PHONE).ToList();

                    //return Ok(new BaseResponse(ID_Outletpirce[0].Outletpirce_ID));
                     
                    }
                    catch (Exception ex)
                    { 
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                
            }
            return BadRequest(ModelState);
        }

    }
}
