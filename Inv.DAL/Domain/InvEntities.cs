using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


 
namespace Inv.DAL.Domain
{
    public partial class InvEntities
    {
        public InvEntities(string ConnectionString): base(ConnectionString)
        {
           
        }

    }
}