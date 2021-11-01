using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GBRANCH
{
   public class GBRANCHService : IGBRANCHService
    {
        private readonly IUnitOfWork unitOfWork;

        public GBRANCHService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region VoucherTypeService Service

        public G_BRANCH GetById(int id)
        {
            return unitOfWork.Repository<G_BRANCH>().GetById(id);
        }

        public List<G_BRANCH> GetAll()
        {
            return unitOfWork.Repository<G_BRANCH>().GetAll();
        }

        public List<G_BRANCH> GetAll(Expression<Func<G_BRANCH, bool>> predicate)
        {
            return unitOfWork.Repository<G_BRANCH>().Get(predicate);
        }
        public G_BRANCH Insert(G_BRANCH entity)
        {
            var AccDefAccount = unitOfWork.Repository<G_BRANCH>().Insert(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }

        public G_BRANCH Update(G_BRANCH entity)
        {

            var AccDefAccount = unitOfWork.Repository<G_BRANCH>().Update(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }
        #endregion
    }
}
