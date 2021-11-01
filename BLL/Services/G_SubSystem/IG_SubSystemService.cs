using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.G_SUB_SYSTEM
{
    public interface IG_SUB_SYSTEMSService
    {
        G_SUB_SYSTEMS GetById(int id);
        List<G_SUB_SYSTEMS> GetAll();
        List<G_SUB_SYSTEMS> GetAll(Expression<Func<G_SUB_SYSTEMS, bool>> predicate);
    }
}
