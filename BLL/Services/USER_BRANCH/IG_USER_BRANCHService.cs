using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.USER_BRANCH
{
    public interface IG_USER_BRANCHService
    { 
        G_USER_BRANCH GetById(int id);
        G_USER_BRANCH GetByIdFromIItem(int id);
        List<G_USER_BRANCH> GetAll();
        List<G_USER_BRANCH> GetAll(Expression<Func<G_USER_BRANCH, bool>> predicate);
        G_USER_BRANCH Insert(G_USER_BRANCH entity);
        G_USER_BRANCH Update(G_USER_BRANCH entity);
        void InsertLst(List<G_USER_BRANCH> obj);
        void Delete(int id);
    }
}
