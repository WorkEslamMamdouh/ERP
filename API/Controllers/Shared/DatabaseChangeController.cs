using Inv.API.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class DatabaseChangeController : ApiController
    {
        

        [HttpGet]
        public void SetSelectedYear(string year)
        {
            Shared.Session.SelectedYear = year;
                        
        }
    }
}
