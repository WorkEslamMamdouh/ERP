using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.DAL.Domain;
using Inv.API.Models;
using Inv.API.Models.CustomEntities;

namespace Inv.API.Models.CustomModel
{
    public class PurchasesMasterDetails : SecurityClass
    {
        public Purchases_Master Purchases_Master { get; set; }
        public List<IQ_Purchases_Details> Purchases_Details { get; set; }
    }
}