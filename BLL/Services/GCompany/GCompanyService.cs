using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GCompany
{
   public class GCompanyService : IGCompanyService
    {
        private readonly IUnitOfWork unitOfWork;

        public GCompanyService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region VoucherTypeService Service

        public G_COMPANY GetById(int id)
        {
            return unitOfWork.Repository<G_COMPANY>().GetById(id);
        }

        public List<G_COMPANY> GetAll()
        {
            return unitOfWork.Repository<G_COMPANY>().GetAll();
        }

        public List<G_COMPANY> GetAll(Expression<Func<G_COMPANY, bool>> predicate)
        {
            return unitOfWork.Repository<G_COMPANY>().Get(predicate);
        }
        public G_COMPANY Insert(G_COMPANY entity)
        {
            var AccDefAccount = unitOfWork.Repository<G_COMPANY>().Insert(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }

        public G_COMPANY Update(G_COMPANY entity)
        {

            var AccDefAccount = unitOfWork.Repository<G_COMPANY>().Update(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_COMPANY>().Delete(id);
            unitOfWork.Save();
        }
        #endregion
    }
}
