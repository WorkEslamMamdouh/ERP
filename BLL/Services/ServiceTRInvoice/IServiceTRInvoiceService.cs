using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ServiceTRInvoice
{
    public interface IServiceTRInvoiceService
    {
        AVAT_TR_SlsInvoice Insert(AVAT_TR_SlsInvoice entity);
        AVAT_TR_SlsInvoice Update(AVAT_TR_SlsInvoice entity);
        void UpdateList(List<AVAT_TR_SlsInvoice> Lstservice);
        AVAT_TR_SlsInvoice GetById(int id);
    }
}
