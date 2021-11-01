using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Purchases
{
    public interface IPurchases_MasterServices
    {
        Purchases_Master GetById(int id);
        List<Purchases_Master> GetAll();
        List<Purchases_Master> GetAll(Expression<Func<Purchases_Master, bool>> predicate);
        Purchases_Master Insert(Purchases_Master entity);
        Purchases_Master Update(Purchases_Master entity);
        void Delete(int id);
        void UpdateList(List<Purchases_Master> Lstservice);
    }
}
