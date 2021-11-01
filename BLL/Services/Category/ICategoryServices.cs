using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.Category
{
    public interface ICategoryServices
    {
        CATEGRE GetById(int id);
        List<CATEGRE> GetAll();
        List<CATEGRE> GetAll(Expression<Func<CATEGRE, bool>> predicate);
        CATEGRE Insert(CATEGRE entity);
        CATEGRE Update(CATEGRE entity);
        void Delete(int id);
        void UpdateList(List<CATEGRE> Lstservice);
    }
}
