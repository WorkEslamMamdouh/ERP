using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.ServSlsInvoiceItems
{
    public interface IServSlsInvoiceItemsService
    {
        AVAT_TR_SlsInvoiceItem GetById(int id);
        List<AVAT_TR_SlsInvoiceItem> GetAll(Expression<Func<AVAT_TR_SlsInvoiceItem, bool>> predicate);
        void InsertLst(List<AVAT_TR_SlsInvoiceItem> obj);
        AVAT_TR_SlsInvoiceItem Insert(AVAT_TR_SlsInvoiceItem entity);
        AVAT_TR_SlsInvoiceItem Update(AVAT_TR_SlsInvoiceItem entity);
        void Delete(int id);
    }
}
