using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.DAL.Domain;
using Inv.API.Models;

namespace Inv.API.Models.CustomModel
{
    public class AQ_ServSlsInvoiceMasterDetails : SecurityandUpdateFlagClass
    {
        public List<AQVAT_GetSlsInvoiceList> AQVAT_GetSlsInvoiceList { get; set; }
        public List<AQVAT_GetSlsInvoiceItem> AQVAT_GetSlsInvoiceItem { get; set; }
    }
}