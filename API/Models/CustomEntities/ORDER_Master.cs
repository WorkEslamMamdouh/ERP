using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.API.Models.CustomEntities
{
    public class ORDER_Master
    {
        public string UserName { get; set; }
        public int Namber_Order_Delivery { get; set; }
        public decimal Total_All { get; set; }
        public string Date_Order_Delivery { get; set; }
        public int Tax { get; set; }
        public int CUSTOMER_ID { get; set; }
        public string type_order { get; set; }
        public bool Confirmation { get; set; }
         
    }
}
