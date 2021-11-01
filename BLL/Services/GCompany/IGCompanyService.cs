using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.GCompany
{
    public interface IGCompanyService
    {
        G_COMPANY GetById(int id);
        List<G_COMPANY> GetAll();
        List<G_COMPANY> GetAll(Expression<Func<G_COMPANY, bool>> predicate);
        G_COMPANY Insert(G_COMPANY entity);
        G_COMPANY Update(G_COMPANY entity);
        void Delete(int id);
    }
}
