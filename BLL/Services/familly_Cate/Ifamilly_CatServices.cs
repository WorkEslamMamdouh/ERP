using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.familly_Cate
{
    public interface Ifamilly_CatServices
    {
        familly_Cat GetById(int id);
        List<familly_Cat> GetAll();
        List<familly_Cat> GetAll(Expression<Func<familly_Cat, bool>> predicate);
        familly_Cat Insert(familly_Cat entity);
        familly_Cat Update(familly_Cat entity);
        void Delete(int id);
        void UpdateList(List<familly_Cat> Lstservice);
    }
}
