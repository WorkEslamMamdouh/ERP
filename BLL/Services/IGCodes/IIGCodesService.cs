using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.IGCodes
{
  public interface IIGCodesService
    {
        G_Codes GetById(int id);
        List<G_Codes> GetAll();
        List<G_Codes> GetAll(Expression<Func<G_Codes, bool>> predicate);
    }
}
