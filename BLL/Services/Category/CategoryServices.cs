using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.Category
{
   public class CategoryServices : ICategoryServices
    {
        private readonly IUnitOfWork unitOfWork;

        public CategoryServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public CATEGRE GetById(int id)
        {

            return unitOfWork.Repository<CATEGRE>().GetById(id);

        }

        public List<CATEGRE> GetAll()
        {
            return unitOfWork.Repository<CATEGRE>().GetAll();
        }

        public List<CATEGRE> GetAll(Expression<Func<CATEGRE, bool>> predicate)
        {
            return unitOfWork.Repository<CATEGRE>().Get(predicate);
        }

        public CATEGRE Insert(CATEGRE entity)
        {
            var memb = unitOfWork.Repository<CATEGRE>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public CATEGRE Update(CATEGRE entity)
        {

            var memb = unitOfWork.Repository<CATEGRE>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<CATEGRE>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<CATEGRE> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<CATEGRE>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<CATEGRE>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<CATEGRE>().Delete(entity.ID_CAT);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
