using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.SlsTrSales
{
   public class SlsTrSalesServices : ISlsTrSalesServices
    {
        private readonly IUnitOfWork unitOfWork;

        public SlsTrSalesServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public Stok_ORDER_DELIVERY GetById(int id)
        {

            return unitOfWork.Repository<Stok_ORDER_DELIVERY>().GetById(id);

        }

        public List<Stok_ORDER_DELIVERY> GetAll()
        {
            return unitOfWork.Repository<Stok_ORDER_DELIVERY>().GetAll();
        }

        public List<Stok_ORDER_DELIVERY> GetAll(Expression<Func<Stok_ORDER_DELIVERY, bool>> predicate)
        {
            return unitOfWork.Repository<Stok_ORDER_DELIVERY>().Get(predicate);
        }

        public Stok_ORDER_DELIVERY Insert(Stok_ORDER_DELIVERY entity)
        {
            var memb = unitOfWork.Repository<Stok_ORDER_DELIVERY>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public Stok_ORDER_DELIVERY Update(Stok_ORDER_DELIVERY entity)
        {

            var memb = unitOfWork.Repository<Stok_ORDER_DELIVERY>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<Stok_ORDER_DELIVERY>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<Stok_ORDER_DELIVERY> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Stok_ORDER_DELIVERY>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Stok_ORDER_DELIVERY>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Stok_ORDER_DELIVERY>().Delete(entity.ID_DELIVERY);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
