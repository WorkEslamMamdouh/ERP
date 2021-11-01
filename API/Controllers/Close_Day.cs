using Inv.API.Models;
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
    public class Close_DayController : BaseController
    {
         
   

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Close()
        {
            if (ModelState.IsValid)
            { 
                string Qury_Close = "Close_days";
                db.Database.ExecuteSqlCommand(Qury_Close);
                return Ok(new BaseResponse("ok"));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Check_Close_Day()
        {
            if (ModelState.IsValid)
            {
                string Qury_Close = "select [Date] from Table_two_days  where  Num_Day = (select max(Num_Day) from Table_two_days )";
                db.Database.ExecuteSqlCommand(Qury_Close);
                var Date = db.Database.SqlQuery<DateTime>(Qury_Close).FirstOrDefault();
                return Ok(new BaseResponse(Date));
            }
            return BadRequest(ModelState);
        }


    }
}
