using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.Item
{
   public class ItemServices : IItemServices
    {
        private readonly IUnitOfWork unitOfWork;

        public ItemServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public PRODUCT GetById(int id)
        {

            return unitOfWork.Repository<PRODUCT>().GetById(id);

        }

        public List<PRODUCT> GetAll()
        {
            return unitOfWork.Repository<PRODUCT>().GetAll();
        }

        public List<PRODUCT> GetAll(Expression<Func<PRODUCT, bool>> predicate)
        {
            return unitOfWork.Repository<PRODUCT>().Get(predicate);
        }

        public PRODUCT Insert(PRODUCT entity)
        {
            var memb = unitOfWork.Repository<PRODUCT>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public PRODUCT Update(PRODUCT entity)
        {

            var memb = unitOfWork.Repository<PRODUCT>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<PRODUCT>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<PRODUCT> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<PRODUCT>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<PRODUCT>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<PRODUCT>().Delete(entity.PRODUCT_ID);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
