using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.API.Controllers;
using System.Data.SqlClient;
using Inv.API.Models.CustomModel;
using Inv.BLL.Services.GCompany;

namespace Inv.API.Controllers
{
    public class GCompController : BaseController
    {
        private readonly IGCompanyService IGCompanyService;
        private readonly G_USERSController UserControl;

        public GCompController(IGCompanyService _IGCompanyService, G_USERSController _Control)
        {
            this.IGCompanyService = _IGCompanyService;
            this.UserControl = _Control;
        }
        
       [HttpGet, AllowAnonymous]


        public IHttpActionResult GetAll( string UserCode, string Token)
        {
            
             var CompList = IGCompanyService.GetAll().ToList();
            for (int i = 0; i < CompList.Count; i++)    // decrypt names 
            {
                CompList[i].NameA = SecuritySystem.Decrypt(CompList[i].NameA);
                CompList[i].NameE = SecuritySystem.Decrypt(CompList[i].NameE);
            }
           
                return Ok(new BaseResponse(CompList));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var GenVatType = IGCompanyService.GetById(id);

                return Ok(new BaseResponse(GenVatType));
            }
            return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]G_COMPANY comp)
        {    // encrypt  names
            comp.NameA=SecuritySystem.Encrypt(comp.NameA); 
            comp.NameE = SecuritySystem.Encrypt(comp.NameE);

            var AccDefAcc = IGCompanyService.Insert(comp);


            string query = "IProc_CreateCompany "+ comp.COMP_CODE+" ";
            db.Database.ExecuteSqlCommand(query);
        
            return Ok(new BaseResponse(AccDefAcc.COMP_CODE));


        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]G_COMPANY comp)
        {   // encrypt names
            comp.NameA = SecuritySystem.Encrypt(comp.NameA);
            comp.NameE = SecuritySystem.Encrypt(comp.NameE);
            var AccDefAcc = IGCompanyService.Update(comp);
            return Ok(new BaseResponse(AccDefAcc));
        }

    }
}
