using Inv.API.Models;
using Inv.API.Tools;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Inv.BLL.Services.CompStatus;
using Inv.BLL.Services.G_Control;
using Inv.API.Models.CustomModel;

namespace Inv.API.Controllers
{
    public class I_VW_GetCompStatusController : BaseController
    {
        private readonly II_VW_GetCompStatusService GetCompStatusService;
        private readonly IG_ControlService G_ControlService;
        
        public I_VW_GetCompStatusController(II_VW_GetCompStatusService _CompStatusService , IG_ControlService _G_ControlService)
        {
            this.GetCompStatusService = _CompStatusService;
            this.G_ControlService = _G_ControlService;
            
        }

        [HttpGet, AllowAnonymous]
           
        public IHttpActionResult GetAll(int Compcode)
        {

           if (ModelState.IsValid )               
            {

                var Control = GetCompStatusService.GetAll(x => x.CompCode == Compcode).FirstOrDefault();
                return Ok(new BaseResponse(Control));
            }
            return BadRequest(ModelState);
        }

        public IHttpActionResult GetStat(int Compcode, int yr)
        {
            CompanyLoginStatus ctr = new CompanyLoginStatus();

            if (ModelState.IsValid)
            {
                var Control = GetCompStatusService.GetAll(x => x.CompCode == Compcode).FirstOrDefault();
                ctr.LoginMsg = Control.LoginMsg;
                ctr.CompStatus = Control.CompStatus;
                ctr.CompCode = Control.CompCode;
                ctr.AddAble = Control.AddAble;
                ctr.Editable = Control.Editable;
                var gc = G_ControlService.GetAll(x => x.COMP_CODE == Compcode && x.FIN_YEAR == yr);
                if (gc.Count > 0)
                {
 
                    ctr.ACC_STATUS = gc[0].ACC_STATUS; 
                    ctr.INV_STATUS = gc[0].INV_STATUS; 
                    ctr.LastDate = gc[0].LastDate; 
                    ctr.FirstDate = gc[0].FirstDate; 
                    ctr.OpenAccVoucheNo = gc[0].OpenAccVoucheNo; 
                    ctr.OpenInvAdjNo = gc[0].OpenInvAdjNo; 
                    ctr.ProfitAcc_Code = gc[0].ProfitAcc_Code; 
                }
                else
                {
                    ctr.CompStatus = 5;
                    ctr.LoginMsg = "لايوجد بيانات للشركة في السنة المطلوبة ";
                }

                return Ok(new BaseResponse(ctr));
            }
            return BadRequest(ModelState);
        }



    }
}