using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inv.DAL.Repository;

namespace Inv.BLL.Services.Outletpirce
{
   public class OutletpirceServices : IOutletpirceServices
    {
        private readonly IUnitOfWork unitOfWork;

        public OutletpirceServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public Outlet GetById(int id)
        {

            return unitOfWork.Repository<Outlet>().GetById(id);

        }

        public List<Outlet> GetAll()
        {
            return unitOfWork.Repository<Outlet>().GetAll();
        }

        public List<Outlet> GetAll(Expression<Func<Outlet, bool>> predicate)
        {
            return unitOfWork.Repository<Outlet>().Get(predicate);
        }

        public Outlet Insert(Outlet entity)
        {
            var memb = unitOfWork.Repository<Outlet>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public Outlet Update(Outlet entity)
        {

            var memb = unitOfWork.Repository<Outlet>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<Outlet>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<Outlet> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == 'i');
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == 'u');
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == 'd');

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<Outlet>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<Outlet>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<Outlet>().Delete(entity.id);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
