using Inv.API.Models;
using Inv.BLL.Services.familly_Cate;
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
    public class familly_CatController : BaseController
    {
         
        private readonly Ifamilly_CatServices familly_CatServices;

        public familly_CatController(Ifamilly_CatServices _Ifamilly_CatServices)
        {
            familly_CatServices = _Ifamilly_CatServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            if (ModelState.IsValid)
            {
                var Cat = familly_CatServices.GetAll().ToList();
                
                    return Ok(new BaseResponse(Cat));
              
            }
            return BadRequest(ModelState);
        }
    

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_Item_by_Cat(int Cat)
        {
            if (ModelState.IsValid)
            {
                var Item = familly_CatServices.GetAll(x => x.ID_familly_Cat == Cat ).ToList();
               
                return Ok(new BaseResponse(Item));

            }
            return BadRequest(ModelState);
        }

      
       
        

       
        public string ExecuteScalar(string SqlStatement)
        {
            string connectionString = db.Database.Connection.ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();

                    string result = string.Empty;

                    result = command.ExecuteScalar().ToString();
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();


                    return result;
                }
            }

        }

     


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]familly_Cat Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = familly_CatServices.Insert(Nation);
                    return Ok(new BaseResponse(Nationality));
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
                    familly_CatServices.Delete(ID);
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
        public IHttpActionResult Update([FromBody]familly_Cat Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = familly_CatServices.Update(Nation);
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
        public IHttpActionResult UpdateLst(List<familly_Cat> familly_Cat)
        {
            try
            {
                familly_CatServices.UpdateList(familly_Cat);
                return Ok(new BaseResponse());
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

    }
}
