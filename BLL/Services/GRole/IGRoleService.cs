using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GRole
{
   
    public interface IGRoleService
    {
        G_Role GetById(int id);
        List<G_Role> GetAll();
        List<G_Role> GetAll(Expression<Func<G_Role, bool>> predicate);
        G_Role Insert(G_Role entity);
        G_Role Update(G_Role entity);
        void Delete(int id);
       
    }
}
