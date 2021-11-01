using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.Vendor
{
   public class VendorServices : IVendorServices
    {
        private readonly IUnitOfWork unitOfWork;

        public VendorServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public Supplier GetById(int id)
        {

            return unitOfWork.Repository<Supplier>().GetById(id);

        }

        public List<Supplier> GetAll()
        {
            return unitOfWork.Repository<Supplier>().GetAll();
        }

        public List<Supplier> GetAll(Expression<Func<Supplier, bool>> predicate)
        {
            return unitOfWork.Repository<Supplier>().Get(predicate);
        }

        public Supplier Insert(Supplier entity)
        {
            var memb = unitOfWork.Repository<Supplier>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public Supplier Update(Supplier entity)
        {

            var memb = unitOfWork.Repository<Supplier>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<Supplier>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<Supplier> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Supplier>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Supplier>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Supplier>().Delete(entity.ID_Supplier);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
