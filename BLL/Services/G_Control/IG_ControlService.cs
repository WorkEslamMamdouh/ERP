using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.G_Control
{
    public interface IG_ControlService
    {
        
        G_CONTROL GetById(int id);
        List<G_CONTROL> GetAll();
        List<G_CONTROL> GetAll(Expression<Func<G_CONTROL, bool>> predicate);
        G_CONTROL Insert(G_CONTROL entity);
        G_CONTROL Update(G_CONTROL entity);
        void Delete(int id);
        void UpdateList(List<G_CONTROL> Lstservice);
    }
}
