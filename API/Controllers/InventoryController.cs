using Inv.API.Models;
using Inv.BLL.Services.Category;
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
    public class InventoryController : BaseController
    {
 
     

        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult GetAll(string EMPLOYEE_NAME, string FromDate, string ToDate)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {

        //            string que = "all_The_Gard  N'" + EMPLOYEE_NAME + "','" + FromDate + "','" + ToDate + "'";
        //            var companies = db.Database.SqlQuery<all_The_Gard_Result>(que).ToList();
                   
        //            return Ok(new BaseResponse(companies));


        //        }
        //        catch (Exception ex)
        //        {
        //            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //        }
        //    }
        //    return BadRequest(ModelState);
        //}
       
   
    }
}
