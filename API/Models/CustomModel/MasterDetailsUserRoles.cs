using System;
using Inv.DAL.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Web;

 
namespace Inv.API.Models.CustomModel
{
    public class MasterDetailsUserRoles
    {
        public G_USERS G_USERS  { get; set; }
        public List<G_RoleUsers> G_RoleUsers { get; set; }
        public List<G_USER_BRANCH> BRANCHDetailsModel { get; set; }
 

        public string UserCode { get; set; }
        public string Token { get; set; }

    }
}
