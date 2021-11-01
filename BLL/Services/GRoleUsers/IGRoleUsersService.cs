using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GRoleUsers
{
   
    public interface IGRoleUsersService
    {
        G_RoleUsers GetById(int id);
        List<G_RoleUsers> GetAll();
        List<G_RoleUsers> GetAll(Expression<Func<G_RoleUsers, bool>> predicate);
        G_RoleUsers Insert(G_RoleUsers entity);
        G_RoleUsers Update(G_RoleUsers entity);
        void Delete(int id);
       
    }
}
