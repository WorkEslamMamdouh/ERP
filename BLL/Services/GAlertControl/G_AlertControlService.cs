using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GAlertControl
{
   
    public class G_AlertControlService : IG_AlertControlService
    {
        private readonly IUnitOfWork unitOfWork;

        public G_AlertControlService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


        #region  Services
        public G_AlertControl GetById(int id)
        {
            return unitOfWork.Repository<G_AlertControl>().GetById(id);
        }

        public List<G_AlertControl> GetAll()
        {
            return unitOfWork.Repository<G_AlertControl>().GetAll();
        }

        public List<G_AlertControl> GetAll(Expression<Func<G_AlertControl, bool>> predicate)
        {
            return unitOfWork.Repository<G_AlertControl>().Get(predicate);
        }

        public G_AlertControl Insert(G_AlertControl entity)
        {
            var res = unitOfWork.Repository<G_AlertControl>().Insert(entity);
            unitOfWork.Save();
            return res;
        }

        public G_AlertControl Update(G_AlertControl entity)
        {

            var res = unitOfWork.Repository<G_AlertControl>().Update(entity);
            unitOfWork.Save();
            return res;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_AlertControl>().Delete(id);
            unitOfWork.Save();
        }

        
        #endregion
    }




}
