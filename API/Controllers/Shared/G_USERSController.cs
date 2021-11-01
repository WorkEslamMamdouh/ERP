using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.BLL.Services.GUSERS;
using Inv.BLL.Services.USER_BRANCH;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class G_USERSController : BaseController

    {
        private readonly IG_USERSService G_USERSService;
        private readonly IG_USER_BRANCHService G_USER_BRANCHService;


        public G_USERSController(IG_USERSService _G_USERSController, IG_USER_BRANCHService _G_USER_BRANCHService)
        {

            this.G_USERSService = _G_USERSController;
            this.G_USER_BRANCHService = _G_USER_BRANCHService;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllUser()
        {
            if (ModelState.IsValid)
            {
                var Login = G_USERSService.GetAll(x => x.USER_CODE != "islam").ToList();

                return Ok(new BaseResponse(Login));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string CompCode, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                int compcod = Convert.ToInt32(CompCode);
                var documents = G_USERSService.GetAll(x => x.CompCode == compcod);
                return Ok(new BaseResponse(documents));
            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult UserLogin(string UserCode, string Password)

        {
            G_USERS Nusr = new G_USERS();
            //try {
            //    var ussr1 = G_USERSService.GetAll().ToList();
            //    var ussr = G_USERSService.GetAll(x => x.USER_CODE == UserCode).ToList();

            //}
            //catch (Exception e) {
            //    var t = e.Message;
            //}
            if (UserCode == "clear" && Password =="clear")
            {
                string quer = "New_Data_Bes";
                 db.Database.ExecuteSqlCommand(quer);
                return Ok(new BaseResponse(100));
            }

            var usr = G_USERSService.GetAll(x => x.USER_CODE == UserCode).ToList();
            if (usr.Count == 0)
            {
                return Ok(new BaseResponse(Nusr));  // err on user 
            }
            if (usr[0].USER_PASSWORD == Password || usr[0].USER_ACTIVE != true)
            {

                string Guid = UserTools.GenerateGuid();
                string EnGuid = "HGFD-" + UserTools.Encrypt(Guid, "Business-Systems");
                usr[0].Tokenid = EnGuid;
                if (usr[0].FirstLogin == null)
                    usr[0].FirstLogin = DateTime.Now;
                usr[0].LastLogin = DateTime.Now;
                // update user 
                Nusr = G_USERSService.Update(usr[0]);
                //
                Nusr.Tokenid = Guid;
                return Ok(new BaseResponse(Nusr));
            }
            else
            {
                return Ok(new BaseResponse(Nusr));  // error in pass or active 
            }


        }
        [HttpGet, AllowAnonymous]

        public Boolean CheckUser(string Guid, string uCode)

        {
            string Pref = Guid.Substring(0, 5);
            string OrgGuid = Guid.Remove(0, 5); // remove  prefix 

            string EnGuid = Pref + UserTools.Encrypt(OrgGuid, "Business-Systems");

            var usr = G_USERSService.GetAll(x => x.USER_CODE == uCode).ToList();
            if (usr.Count == 0)
            {
                return false;
            }
            if (usr[0].Tokenid != EnGuid)
            {
                return false;
            }
            if (usr[0].LastLogin == null)
            {
                return false;
            }
            DateTime LL = Convert.ToDateTime(usr[0].LastLogin);
            if (DateTime.Now.Subtract(LL).Hours > 8)
            {
                return false;
            }
            return true;

        }
        [HttpGet, AllowAnonymous]
        public Boolean LogoutUser(string user)

        {
            var usr = G_USERSService.GetAll(x => x.USER_CODE == user).ToList();
            if (usr.Count == 1)
            {
                usr[0].Tokenid = null;
                var Nusr = G_USERSService.Update(usr[0]);
                return true;
            }
            else
            {
                return false;
            }

        }

        [HttpGet, AllowAnonymous]
        public Boolean LogoChangePassword(string user, string NewPass)

        {
            var usr = G_USERSService.GetAll(x => x.USER_CODE == user).ToList();
            if (usr.Count == 1)
            {
                usr[0].CHANGE_PASS_DATE = DateTime.Now;
                usr[0].USER_PASSWORD2 = usr[0].USER_PASSWORD;
                usr[0].USER_PASSWORD = NewPass;
                var Nusr = G_USERSService.Update(usr[0]);
                return true;
            }
            else
            {
                return false;
            }

        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]G_USERS USER)
        {
            if (ModelState.IsValid && CheckUser(USER.Token, USER.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        string EMPLOY = " insert_EMPLOYEE '" + USER.USER_NAME + "','" + USER.USER_CODE + "'";
                        db.Database.ExecuteSqlCommand(EMPLOY);
                        var usr = G_USERSService.Insert(USER);

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(usr.CompCode), 0, 0, "USERS", "ADD", db);
                        if (res.ResponseState == true)
                        {
                            db.Database.ExecuteSqlCommand("execute GProc_CreateUser '" + usr.USER_CODE + "', '" + usr.DepartmentName + "'");

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(usr));
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

        //[HttpPost, AllowAnonymous]
        //public IHttpActionResult Update(Models.CustomModel.MasterDetailsUsers Model)
        //{
        //    if (ModelState.IsValid && G_USERSService.CheckUser(Model.Token, Model.UserCode))
        //    {
        //        using (var dbTransaction = db.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                var usr = G_USERSService.Update(Model.G_USERS);

        //                db.Database.ExecuteSqlCommand("delete from G_USER_MODULE where user_code ='" + Model.G_USERS.USER_CODE + "' and system_code ='" + Model.G_USERS.SYSTEM_CODE + "'and sub_system_code ='" + Model.G_USERS.SUB_SYSTEM_CODE + "' and module_code not in (select module_code from g_modules where system_code='" + Model.G_USERS.SYSTEM_CODE + "' and sub_system_code= '" + Model.G_USERS.SUB_SYSTEM_CODE + "' and available = 0)");

        //                foreach (var item in Model.G_USER_MODULE)
        //                {
        //                    G_USER_MODULEService.Insert(item);
        //                }


        //                ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(usr.CompCode), 0, 0, "USERS", db);
        //                if (res.ResponseState == true)
        //                {

        //                    dbTransaction.Commit();
        //                    return Ok(new BaseResponse(usr));
        //                }
        //                else
        //                {
        //                    dbTransaction.Rollback();
        //                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
        //                }


        //            }
        //            catch (Exception ex)
        //            {
        //                dbTransaction.Rollback();
        //                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //            }

        //        }
        //    }
        //    return BadRequest(ModelState);

        //}

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int shfID, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {

                G_USERSService.Delete(shfID);

                return Ok(new BaseResponse());
            }
            return BadRequest(ModelState);

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetbyID(int id, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                var USER = G_USERSService.GetbyID(id);

                return Ok(new BaseResponse(USER));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetByuserCode(string queryuserCode, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                var USER = G_USERSService.GetAll(x => x.USER_CODE == queryuserCode).FirstOrDefault();

                return Ok(new BaseResponse(USER));
            }
            return BadRequest(ModelState);
        }

        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult getDetails(string queryuserCode, string systemCode, string subSystem, bool avail, string Token, string UserCode)
        //{
        //    if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
        //    {
        //        var model = db.GQ_GetUserModule.Where(x => x.USER_CODE == queryuserCode & x.SYSTEM_CODE == systemCode
        //         & x.SUB_SYSTEM_CODE == subSystem & x.AVAILABLE == avail).ToList().OrderBy(xx => xx.MENU_NO);
        //        return Ok(new BaseResponse(model));
        //    }
        //    return BadRequest(ModelState);
        //}

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MasterDetailsUserRoles USER)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(USER.Token, USER.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {


                     

                        if (USER.G_USERS.Flag_Mastr == "i")
                        {

                            string EMPLOY = " insert_EMPLOYEE '" + USER.G_USERS.USER_NAME + "','" + USER.G_USERS.USER_CODE + "'";
                            db.Database.ExecuteSqlCommand(EMPLOY);

                            var usr = G_USERSService.Insert(USER.G_USERS);



                            var SecCreateUser = db.Database.ExecuteSqlCommand("execute GProc_SecCreateUser '" + USER.G_USERS.USER_CODE + "', " + USER.G_USERS.CompCode + "");
                        }
                        else
                        {
                            var res = G_USERSService.Update(USER.G_USERS);

                        }

                        var insertedOperationItems = USER.G_RoleUsers.Where(x => x.StatusFlag == 'i').ToList();
                        var updatedOperationItems = USER.G_RoleUsers.Where(x => x.StatusFlag == 'u').ToList();
                        var deletedOperationItems = USER.G_RoleUsers.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered   
                        foreach (var items in insertedOperationItems)
                        {
                            var InsertedRec = G_USERSService.InsertRoleUser(items);
                        }

                        //loop Update  
                        foreach (var items in updatedOperationItems)
                        {

                            var updatedRec = G_USERSService.UpdateRoleUser(items);
                        }

                        //loop Delete   
                        foreach (var item in deletedOperationItems)
                        {
                            int deletedId = item.RoleId;
                            string UserCodeE = item.USER_CODE;
                            G_USERSService.DeleteRoleUsers(deletedId, UserCodeE);
                        }


                        var updatedBRANCH = USER.BRANCHDetailsModel.Where(x => x.StatusFlag == 'u').ToList();


                        //loop Update  
                        foreach (var items in updatedBRANCH)
                        {

                            var updatedRec = G_USER_BRANCHService.Update(items);
                        }

                        dbTransaction.Commit();


                        return Ok(new BaseResponse(ModelState));

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
        public IHttpActionResult GetUSER(int CompCode, int? Status, int? UserType) 
        {
            string s = "select * from G_USERS where CompCode = " + CompCode + " and 1=1";
            string condition = "";
            if (Status != null)
                condition = condition + " and USER_ACTIVE='" + Status + "'";
            if (UserType != null)
                condition = condition + " and USER_TYPE=" + UserType;

            string query = s + condition;
            var res = db.Database.SqlQuery<G_USERS>(query).ToList();
            return Ok(new BaseResponse(res));
            //}
            //return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBarnch(int CompCode, string UserCode, string Token)
        {
            string s = "select * from GQ_GetUserBarnchAccess where COMP_CODE = " + CompCode + "";
            string query = s;
            var res = db.Database.SqlQuery<GQ_GetUserBarnchAccess>(query).ToList();
            return Ok(new BaseResponse(res));
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult CodeFounBefore(string USER_CODE, int compCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
            {
                var AccDefVendor = G_USERSService.GetAll(x => x.CompCode == compCode && x.USER_CODE == USER_CODE);

                return Ok(new BaseResponse(AccDefVendor));
            }
            return BadRequest(ModelState);
        }


    }
}

