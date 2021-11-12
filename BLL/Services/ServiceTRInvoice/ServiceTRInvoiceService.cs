using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ServiceTRInvoice
{
 public  class ServiceTRInvoiceService : IServiceTRInvoiceService
    {
        private readonly IUnitOfWork unitOfWork;

        public ServiceTRInvoiceService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        public AVAT_TR_SlsInvoice GetById(int id)
        {
            return unitOfWork.Repository<AVAT_TR_SlsInvoice>().GetById(id);
        }


        public AVAT_TR_SlsInvoice Insert(AVAT_TR_SlsInvoice entity)
        {
            var Item = unitOfWork.Repository<AVAT_TR_SlsInvoice>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }
        public AVAT_TR_SlsInvoice Update(AVAT_TR_SlsInvoice entity)
        {

            var Item = unitOfWork.Repository<AVAT_TR_SlsInvoice>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
        public void UpdateList(List<AVAT_TR_SlsInvoice> entityList)
        {
            unitOfWork.Repository<AVAT_TR_SlsInvoice>().Update(entityList);
            unitOfWork.Save();

        }
    }
}
