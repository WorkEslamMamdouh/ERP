using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Customer
{
    public interface ICustomerServices
    {
        CUSTOMER GetById(int id);
        List<CUSTOMER> GetAll();
        List<CUSTOMER> GetAll(Expression<Func<CUSTOMER, bool>> predicate);
        CUSTOMER Insert(CUSTOMER entity);
        CUSTOMER Update(CUSTOMER entity);
        void Delete(int id);
        void UpdateList(List<CUSTOMER> Lstservice);
    }
}
