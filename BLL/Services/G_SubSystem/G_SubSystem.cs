using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.G_SUB_SYSTEM
{
   public class G_SUB_SYSTEMSService : IG_SUB_SYSTEMSService
    {
        private readonly IUnitOfWork unitOfWork;

        public G_SUB_SYSTEMSService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region VoucherTypeService Service

        public G_SUB_SYSTEMS GetById(int id)
        {
            return unitOfWork.Repository<G_SUB_SYSTEMS>().GetById(id);
        }

        public List<G_SUB_SYSTEMS> GetAll()
        {
            return unitOfWork.Repository<G_SUB_SYSTEMS>().GetAll();
        }

        public List<G_SUB_SYSTEMS> GetAll(Expression<Func<G_SUB_SYSTEMS, bool>> predicate)
        {
            return unitOfWork.Repository<G_SUB_SYSTEMS>().Get(predicate);
        }
        #endregion
    }
}
