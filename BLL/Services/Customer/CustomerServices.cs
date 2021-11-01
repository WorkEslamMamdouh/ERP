using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.Customer
{
   public class CustomerServices : ICustomerServices
    {
        private readonly IUnitOfWork unitOfWork;

        public CustomerServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public CUSTOMER GetById(int id)
        {

            return unitOfWork.Repository<CUSTOMER>().GetById(id);

        }

        public List<CUSTOMER> GetAll()
        {
            return unitOfWork.Repository<CUSTOMER>().GetAll();
        }

        public List<CUSTOMER> GetAll(Expression<Func<CUSTOMER, bool>> predicate)
        {
            return unitOfWork.Repository<CUSTOMER>().Get(predicate);
        }

        public CUSTOMER Insert(CUSTOMER entity)
        {
            var memb = unitOfWork.Repository<CUSTOMER>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public CUSTOMER Update(CUSTOMER entity)
        {

            var memb = unitOfWork.Repository<CUSTOMER>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<CUSTOMER>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<CUSTOMER> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag =='u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<CUSTOMER>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<CUSTOMER>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<CUSTOMER>().Delete(entity.CUSTOMER_ID);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
