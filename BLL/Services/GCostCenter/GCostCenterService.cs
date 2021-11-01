using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.GCostCenter
{
    public class GCostCenterService : IGCostCenterService
    {
        private readonly IUnitOfWork unitOfWork;

        public GCostCenterService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region IGenDefCategory Services

        public G_COST_CENTER GetById(int id)
        {
            return unitOfWork.Repository<G_COST_CENTER>().GetById(id);
        }

        public List<G_COST_CENTER> GetAll()
        {
            return unitOfWork.Repository<G_COST_CENTER>().GetAll();
        }

        public List<G_COST_CENTER> GetAll(Expression<Func<G_COST_CENTER, bool>> predicate)
        {
            return unitOfWork.Repository<G_COST_CENTER>().Get(predicate);
        }

        public G_COST_CENTER Insert(G_COST_CENTER entity)
        {
            var memb = unitOfWork.Repository<G_COST_CENTER>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public G_COST_CENTER Update(G_COST_CENTER entity)
        {

            var memb = unitOfWork.Repository<G_COST_CENTER>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_COST_CENTER>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<G_COST_CENTER> Lstservice)
        {
             
            foreach (var entity in Lstservice)
            {
           
                if (entity.StatusFlag == 'u')
                {
                    
                    unitOfWork.Repository<G_COST_CENTER>().Update(entity);
                }
                if (entity.StatusFlag == 'i')
                {
                    
                    unitOfWork.Repository<G_COST_CENTER>().Insert(entity);
                }

            }
            unitOfWork.Save();

        }
        #endregion

    }
}
