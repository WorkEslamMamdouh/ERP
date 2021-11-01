using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.G_Control
{
    public class G_ControlService : IG_ControlService
    {
        private readonly IUnitOfWork unitOfWork;

        public G_ControlService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region IGenDefCategory Services

        public G_CONTROL GetById(int id)
        {
            return unitOfWork.Repository<G_CONTROL>().GetById(id);
        }

        public List<G_CONTROL> GetAll()
        {
            return unitOfWork.Repository<G_CONTROL>().GetAll();
        }

        public List<G_CONTROL> GetAll(Expression<Func<G_CONTROL, bool>> predicate)
        {
            return unitOfWork.Repository<G_CONTROL>().Get(predicate);
        }

        public G_CONTROL Insert(G_CONTROL entity)
        {
            var memb = unitOfWork.Repository<G_CONTROL>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public G_CONTROL Update(G_CONTROL entity)
        {

            var memb = unitOfWork.Repository<G_CONTROL>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_CONTROL>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<G_CONTROL> Lstservice)
        {
             
            foreach (var entity in Lstservice)
            {
                if (entity.StatusFlag == 'd')
                    unitOfWork.Repository<G_CONTROL>().Delete(entity.COMP_CODE);
                if (entity.StatusFlag == 'u')
                {
                    
                    unitOfWork.Repository<G_CONTROL>().Update(entity);
                }
                if (entity.StatusFlag == 'i')
                {
                    
                    unitOfWork.Repository<G_CONTROL>().Insert(entity);
                }

            }
            unitOfWork.Save();

        }
        #endregion

    }
}
