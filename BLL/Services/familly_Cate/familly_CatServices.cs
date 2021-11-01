using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.familly_Cate
{
   public class familly_CatServices : Ifamilly_CatServices
    {
        private readonly IUnitOfWork unitOfWork;

        public familly_CatServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public familly_Cat GetById(int id)
        {

            return unitOfWork.Repository<familly_Cat>().GetById(id);

        }

        public List<familly_Cat> GetAll()
        {
            return unitOfWork.Repository<familly_Cat>().GetAll();
        }

        public List<familly_Cat> GetAll(Expression<Func<familly_Cat, bool>> predicate)
        {
            return unitOfWork.Repository<familly_Cat>().Get(predicate);
        }

        public familly_Cat Insert(familly_Cat entity)
        {
            var memb = unitOfWork.Repository<familly_Cat>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public familly_Cat Update(familly_Cat entity)
        {

            var memb = unitOfWork.Repository<familly_Cat>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<familly_Cat>().Delete(id);
            unitOfWork.Save();
        }


        public void UpdateList(List<familly_Cat> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<familly_Cat>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<familly_Cat>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<familly_Cat>().Delete(entity.ID_familly_Cat);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
