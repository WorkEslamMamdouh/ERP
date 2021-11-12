using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ServSlsInvoiceItems
{
   public class ServSlsInvoiceItemsService : IServSlsInvoiceItemsService
    {
        private readonly IUnitOfWork unitOfWork;

        public ServSlsInvoiceItemsService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        public List<AVAT_TR_SlsInvoiceItem> GetAll(Expression<Func<AVAT_TR_SlsInvoiceItem, bool>> predicate)
        {
            return unitOfWork.Repository<AVAT_TR_SlsInvoiceItem>().Get(predicate);
        }
        public AVAT_TR_SlsInvoiceItem GetById(int id)
        {
            return unitOfWork.Repository<AVAT_TR_SlsInvoiceItem>().GetById(id);
        }
        public void InsertLst(List<AVAT_TR_SlsInvoiceItem> obj)
        {
            unitOfWork.Repository<AVAT_TR_SlsInvoiceItem>().Insert(obj);
            unitOfWork.Save();
            return;
        }

        public AVAT_TR_SlsInvoiceItem Insert(AVAT_TR_SlsInvoiceItem entity)
        {
            var AccDefAccount = unitOfWork.Repository<AVAT_TR_SlsInvoiceItem>().Insert(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }

        public AVAT_TR_SlsInvoiceItem Update(AVAT_TR_SlsInvoiceItem entity)
        {

            var AccDefAccount = unitOfWork.Repository<AVAT_TR_SlsInvoiceItem>().Update(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<AVAT_TR_SlsInvoiceItem>().Delete(id);
            unitOfWork.Save();
        }
    }
}
