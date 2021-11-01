using System;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.IControl
{
    public class I_ControlService : II_ControlService
    {
        private readonly IUnitOfWork unitOfWork;

        public I_ControlService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public I_Control GetById(int id)
        {
            return unitOfWork.Repository<I_Control>().GetById(id);
        }

        public I_Control GetAll()
        {
            var x = unitOfWork.Repository<I_Control>().GetAll();
            return x.FirstOrDefault();
        }

        public List<I_Control> GetAll(Expression<Func<I_Control, bool>> predicate)
        {
            return unitOfWork.Repository<I_Control>().Get(predicate);
        }
       
        public I_Control Insert(I_Control KControl)
        {
            var Control = unitOfWork.Repository<I_Control>().Insert(KControl);
            unitOfWork.Save();
            return Control;
        }

        public I_Control Update(I_Control KControl)
        {
            var Control = unitOfWork.Repository<I_Control>().Update(KControl);
            unitOfWork.Save();
            return Control;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<I_Control>().Delete(id);
            unitOfWork.Save();
        }
    }
}
