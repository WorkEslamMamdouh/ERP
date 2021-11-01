using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.Purchases
{
   public class Purchases_MasterServices : IPurchases_MasterServices
    {
        private readonly IUnitOfWork unitOfWork;

        public Purchases_MasterServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public Purchases_Master GetById(int id)
        {

            return unitOfWork.Repository<Purchases_Master>().GetById(id);

        }

        public List<Purchases_Master> GetAll()
        {
            return unitOfWork.Repository<Purchases_Master>().GetAll();
        }

        public List<Purchases_Master> GetAll(Expression<Func<Purchases_Master, bool>> predicate)
        {
            return unitOfWork.Repository<Purchases_Master>().Get(predicate);
        }

        public Purchases_Master Insert(Purchases_Master entity)
        {
            var memb = unitOfWork.Repository<Purchases_Master>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public Purchases_Master Update(Purchases_Master entity)
        {

            var memb = unitOfWork.Repository<Purchases_Master>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<Purchases_Master>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<Purchases_Master> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Purchases_Master>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Purchases_Master>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Purchases_Master>().Delete(entity.TrNo);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
