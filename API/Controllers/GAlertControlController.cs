using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.GAlertControl;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;


namespace Inv.API.Controllers
{
  

    public class GAlertControlController : BaseController

    {
        private readonly IG_AlertControlService G_AlertControlService;
        private readonly G_USERSController UserControl;
        public GAlertControlController(IG_AlertControlService _G_AlertControlService, G_USERSController _Control)
                                       
        {
            this.G_AlertControlService = _G_AlertControlService;
            this.UserControl = _Control;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var res = G_AlertControlService.GetAll().ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }
      
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var res = G_AlertControlService.GetById(id);

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]G_AlertControl obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
                
                {
                try
                {
                    var res = G_AlertControlService.Insert(obj);
                    return Ok(new BaseResponse(res));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
           
        }



        

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int ID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                try
                {
                    G_AlertControlService.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception ex)
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
        public IHttpActionResult Update([FromBody]G_AlertControl obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                try
                {
                    var res = G_AlertControlService.Update(obj);
                    return Ok(new BaseResponse(res));
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