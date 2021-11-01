using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.IGCodes;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;
using System.Data.SqlClient;
using Inv.BLL.Services.GUSERS;

namespace Inv.API.Controllers
{
    public class GCodesController : BaseController
    {
        private readonly IIGCodesService GCodesService;
        private readonly IG_USERSService G_USERSServ;

        private readonly G_USERSController UserControl;

        
        public GCodesController(IIGCodesService _GCodesService, IG_USERSService _G_USERSServ, G_USERSController _Control)
        {
            this.GCodesService = _GCodesService;
            this.G_USERSServ = _G_USERSServ;
            this.UserControl = _Control;
        }
        
       //G_Code : Def = 1 : شراء محلي 
       [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string codeType, string UserCode, string Token)
        {
            if (ModelState.IsValid/* && UserControl.CheckUser(Token, UserCode)*/)
            {
                var AccDefCustomerList = GCodesService.GetAll(x => x.CodeType == codeType).ToList();

                return Ok(new BaseResponse(AccDefCustomerList));
            }
            return BadRequest(ModelState);
        }
        
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_GCodes(string UserCode, string Token)
        {
            //if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            //{

                
                var AccDefCustomerList = GCodesService.GetAll().ToList();

                return Ok(new BaseResponse(AccDefCustomerList));
            //}
            //return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetbycodeTp(string CodeType, string UserCode, string Token)
        {
            if (ModelState.IsValid && G_USERSServ.CheckUser(Token, UserCode))
            {
                var obj = GCodesService.GetAll(x => x.CodeType == CodeType).ToList();

                return Ok(new BaseResponse(obj));
            }
            return BadRequest(ModelState);
        }
    }
}
