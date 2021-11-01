using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.IControl
{
    public interface II_ControlService
    {
        I_Control GetById(int id);
        I_Control GetAll();
        List<I_Control> GetAll(Expression<Func<I_Control, bool>> predicate);
        I_Control Insert(I_Control iControl);
        I_Control Update(I_Control iControl);
     

        void Delete(int id);
    }
}
