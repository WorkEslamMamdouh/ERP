using System;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.CompStatus
{
    public class I_VW_GetCompStatusService : II_VW_GetCompStatusService
    {

        private readonly IUnitOfWork unitOfWork;

        public I_VW_GetCompStatusService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


        #region period Services
        public I_VW_GetCompStatus GetbyID(int id)
        {
            return unitOfWork.Repository<I_VW_GetCompStatus>().GetById(id);
        }

        public List<I_VW_GetCompStatus> GetAll()
        {
            return unitOfWork.Repository<I_VW_GetCompStatus>().GetAll();
        }

        public List<I_VW_GetCompStatus> GetAll(Expression<Func<I_VW_GetCompStatus, bool>> predicate)
        {
            return unitOfWork.Repository<I_VW_GetCompStatus>().Get(predicate);
        }

        public I_VW_GetCompStatus Insert(I_VW_GetCompStatus payroll)
        {
            var pay = unitOfWork.Repository<I_VW_GetCompStatus>().Insert(payroll);
            unitOfWork.Save();
            return pay;
        }

        public I_VW_GetCompStatus Update(I_VW_GetCompStatus payroll)
        {
            var pay = unitOfWork.Repository<I_VW_GetCompStatus>().Update(payroll);
            unitOfWork.Save();
            return pay;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<I_VW_GetCompStatus>().Delete(id);
            unitOfWork.Save();
        }
        #endregion
    }
}