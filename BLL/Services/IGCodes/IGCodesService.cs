using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.IGCodes
{
   public class IGCodesService: IIGCodesService
    {
        private readonly IUnitOfWork unitOfWork;

        public IGCodesService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region 
        public G_Codes GetById(int id)
        {
            return unitOfWork.Repository<G_Codes>().GetById(id);
        }

        public List<G_Codes> GetAll()
        {
            return unitOfWork.Repository<G_Codes>().GetAll();
        }

        public List<G_Codes> GetAll(Expression<Func<G_Codes, bool>> predicate)
        {
            return unitOfWork.Repository<G_Codes>().Get(predicate);
        }


        #endregion
    }
}
