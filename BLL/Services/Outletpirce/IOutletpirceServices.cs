using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Outletpirce
{
    public interface IOutletpirceServices
    {
        Outlet GetById(int id);
        List<Outlet> GetAll();
        List<Outlet> GetAll(Expression<Func<Outlet, bool>> predicate);
        Outlet Insert(Outlet entity);
        Outlet Update(Outlet entity);
        void Delete(int id);
        void UpdateList(List<Outlet> Lstservice);
    }
}
