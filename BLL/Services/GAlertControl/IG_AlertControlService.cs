using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GAlertControl
{
   

    public interface IG_AlertControlService
    {
        G_AlertControl GetById(int id);
        List<G_AlertControl> GetAll();
        List<G_AlertControl> GetAll(Expression<Func<G_AlertControl, bool>> predicate);
        G_AlertControl Insert(G_AlertControl entity);
        G_AlertControl Update(G_AlertControl entity);
        void Delete(int id);
      
    }


}
