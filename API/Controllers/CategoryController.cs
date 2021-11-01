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
    public class CategoryController : BaseController
    {
         
        private readonly ICategoryServices CategoryServices;

        public CategoryController(ICategoryServices _ICategoryServices)
        {
            CategoryServices = _ICategoryServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode)
        {
            if (ModelState.IsValid)
            {
                var Cat = CategoryServices.GetAll().ToList();
                
                    return Ok(new BaseResponse(Cat));
              
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_Item_by_Cat(int Cat)
        {
            if (ModelState.IsValid)
            {
                var Item = CategoryServices.GetAll(x => x.ID_CAT == Cat ).ToList();
               
                return Ok(new BaseResponse(Item));

            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_Item_by_Familly_Cat(int ID_familly_Cat)
        {
            if (ModelState.IsValid)
            {
                var Item = CategoryServices.GetAll(x => x.ID_familly_Cat == ID_familly_Cat).ToList();

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
        public IHttpActionResult Insert([FromBody]CATEGRE Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = CategoryServices.Insert(Nation);
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
                    CategoryServices.Delete(ID);
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
        public IHttpActionResult Update([FromBody]CATEGRE Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = CategoryServices.Update(Nation);
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
        public IHttpActionResult UpdateLst(List<CATEGRE> CATEGRES)
        {
            try
            {
                CategoryServices.UpdateList(CATEGRES);
                return Ok(new BaseResponse());
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

    }
}
