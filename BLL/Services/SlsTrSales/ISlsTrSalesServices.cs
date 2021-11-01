using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.SlsTrSales
{
    public interface ISlsTrSalesServices
    {
        Stok_ORDER_DELIVERY GetById(int id);
        List<Stok_ORDER_DELIVERY> GetAll();
        List<Stok_ORDER_DELIVERY> GetAll(Expression<Func<Stok_ORDER_DELIVERY, bool>> predicate);
        Stok_ORDER_DELIVERY Insert(Stok_ORDER_DELIVERY entity);
        Stok_ORDER_DELIVERY Update(Stok_ORDER_DELIVERY entity);
        void Delete(int id);
        void UpdateList(List<Stok_ORDER_DELIVERY> Lstservice);
    }
}
