using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.BLL.Services.GRoleUsers;
using Inv.BLL.Services.GUSERS;

namespace Inv.API.Controllers
{
    public class G_RoleUsersController : BaseController
    {
       private readonly IG_USERSService G_USERSService;
       private readonly IGRoleUsersService GRoleUsersService;

        public G_RoleUsersController(IGRoleUsersService GRoleUsersService,IG_USERSService _G_USERSController) //, IG_USER_MODULEService _G_USER_MODULEService)
        {
           this.G_USERSService = _G_USERSController;
           this.GRoleUsersService = GRoleUsersService;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string Token, string UserCode)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
            {
                var Roles = GRoleUsersService.GetAll().ToList();
                return Ok(new BaseResponse(Roles));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]G_RoleUsers USER)
        {
            //if (ModelState.IsValid && G_USERSService.CheckUser(USER.USER_CODE,USER.Token))
            //{
            using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        var usr = GRoleUsersService.Insert(USER);

                        //  ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(usr.CompCode), 0, 0,  "USERS", "Add", db);
                        // if (res.ResponseState == true)
                        // {
                           
                            dbTransaction.Commit();
                            return Ok(new BaseResponse(usr));
                       // }
                       // else
                      //{
                          //  dbTransaction.Rollback();
                          //  return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                     // }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            //}
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int shfID, string Token, string UserCode)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
            {

                GRoleUsersService.Delete(shfID);

                return Ok(new BaseResponse());
            }
            return BadRequest(ModelState);

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult search(string UserCode, string Token ,string User)
        {
            string s = "select * from GQ_GetUserRole where 1=1";
            string condition = "";
            //if (Status != null)
            //    condition = condition + " and USER_ACTIVE='" + Status + "'";
            if (User != null)
                condition = condition + " and USER_CODE='" + User + "'";

            string query = s + condition;
            var res = db.Database.SqlQuery<GQ_GetUserRole>(query).ToList();
            return Ok(new BaseResponse(res));
            //}
            //return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] G_RoleUsers USER)
        {
            //if (ModelState.IsValid && G_USERSService.CheckUser(USER.Token, USER.USER_CODE))
            //{
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var res = GRoleUsersService.Update(USER);
                        //ResponseResult result = Shared.TransactionProcess(Convert.ToInt32(res.CompCode), 0, 0, "USERS", "Update", db);
                       // ResponseResult result = Shared.TransactionProcess(res.COMP_CODE, int.Parse(res.BRA_CODE.ToString()), res.PaymentID, "Payment", "Update", db);
                        //if (result.ResponseState == true)
                        //{
                            dbTransaction.Commit();
                           // res.UserCode = res.ResponseData.ToString();
                            return Ok(new BaseResponse(res));
                       // }
                       // else
                        //{
                        //    dbTransaction.Rollback();
                        //    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, result.ResponseMessage));
                        //}

                    }
                    catch (Exception ex)
                    {
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
           // }

            return BadRequest(ModelState);
        }

    }
}

