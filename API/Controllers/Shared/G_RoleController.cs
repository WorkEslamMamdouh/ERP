using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.BLL.Services.GRole;
using Inv.BLL.Services.GUSERS;

namespace Inv.API.Controllers
{
    public class G_RoleController : BaseController
    {
       private readonly IG_USERSService G_USERSService;
       private readonly IGRoleService GRoleService;

        public G_RoleController(IGRoleService GRoleService, IG_USERSService _G_USERSController) //, IG_USER_MODULEService _G_USER_MODULEService)
        {
           this.G_USERSService = _G_USERSController;
           this.GRoleService = GRoleService;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string Token, string UserCode)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
            {
                var Roles = GRoleService.GetAll().ToList();
                return Ok(new BaseResponse(Roles));
            }
            return BadRequest(ModelState);
        }

    }
}

