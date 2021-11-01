using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.GBRANCH;
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
    public class GBranchController : BaseController
    {
        private readonly IGBRANCHService IGBRANCHService;
        private readonly G_USERSController UserControl;

        public GBranchController(IGBRANCHService _IGBRANCHService, G_USERSController _Control)
        {
            this.IGBRANCHService = _IGBRANCHService;
            this.UserControl = _Control;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var GenVatTypeList = IGBRANCHService.GetAll(x => x.COMP_CODE == CompCode).ToList();

                return Ok(new BaseResponse(GenVatTypeList));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAllByCode(int CompCode, string UserCode, string Token,int BRA_CODE)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var GenVatTypeList = IGBRANCHService.GetAll(x => x.COMP_CODE == CompCode && x.BRA_CODE== BRA_CODE).FirstOrDefault();

                return Ok(new BaseResponse(GenVatTypeList));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {

            string Query = "select * from G_BRANCH where COMP_CODE ="+ id; 
            List<G_BRANCH> res = db.Database.SqlQuery<G_BRANCH>(Query).ToList();
            return Ok(new BaseResponse(res));

          
           
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]G_BRANCH G_BRANCH)
        {
             
                    var AccDefAcc = IGBRANCHService.Insert(G_BRANCH);
            string query = "GProc_CreateBranch " + G_BRANCH.BRA_CODE + " , " + G_BRANCH.COMP_CODE + " ";
            db.Database.ExecuteSqlCommand(query);

            return Ok(new BaseResponse(AccDefAcc.BRA_CODE));
             
            
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]G_BRANCH COSTCENTER)
        {

            var AccDefAcc = IGBRANCHService.Update(COSTCENTER);
            return Ok(new BaseResponse(AccDefAcc));
        }

    }
}
