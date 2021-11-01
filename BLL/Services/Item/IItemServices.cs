using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Item
{
    public interface IItemServices
    {
        PRODUCT GetById(int id);
        List<PRODUCT> GetAll();
        List<PRODUCT> GetAll(Expression<Func<PRODUCT, bool>> predicate);
        PRODUCT Insert(PRODUCT entity);
        PRODUCT Update(PRODUCT entity);
        void Delete(int id);
        void UpdateList(List<PRODUCT> Lstservice);
    }
}
