using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.CompStatus
{
    public interface II_VW_GetCompStatusService
    {
        I_VW_GetCompStatus GetbyID(int id);
        List<I_VW_GetCompStatus> GetAll();
        List<I_VW_GetCompStatus> GetAll(Expression<Func<I_VW_GetCompStatus, bool>> predicate);
        I_VW_GetCompStatus Insert(I_VW_GetCompStatus CompStatus);
        I_VW_GetCompStatus Update(I_VW_GetCompStatus CompStatus);
        void Delete(int id);
    }
}
