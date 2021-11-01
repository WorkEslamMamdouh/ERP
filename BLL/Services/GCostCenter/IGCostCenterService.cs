using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GCostCenter
{
    public interface IGCostCenterService
    {
        
        G_COST_CENTER GetById(int id);
        List<G_COST_CENTER> GetAll();
        List<G_COST_CENTER> GetAll(Expression<Func<G_COST_CENTER, bool>> predicate);
        G_COST_CENTER Insert(G_COST_CENTER entity);
        G_COST_CENTER Update(G_COST_CENTER entity);
        void Delete(int id);
        void UpdateList(List<G_COST_CENTER> Lstservice);
    }
}
