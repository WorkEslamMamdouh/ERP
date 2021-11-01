using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Vendor
{
    public interface IVendorServices
    {
        Supplier GetById(int id);
        List<Supplier> GetAll();
        List<Supplier> GetAll(Expression<Func<Supplier, bool>> predicate);
        Supplier Insert(Supplier entity);
        Supplier Update(Supplier entity);
        void Delete(int id);
        void UpdateList(List<Supplier> Lstservice);
    }
}
