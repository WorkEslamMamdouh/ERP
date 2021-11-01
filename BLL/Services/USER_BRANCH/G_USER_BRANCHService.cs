using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.USER_BRANCH
{
   public class G_USER_BRANCHService : IG_USER_BRANCHService
    {
        private readonly IUnitOfWork unitOfWork;

        public G_USER_BRANCHService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region G_USER_BRANCHService Services

        public G_USER_BRANCH GetById(int id)
        {
            return unitOfWork.Repository<G_USER_BRANCH>().GetById(id);
        }
        public G_USER_BRANCH GetByIdFromIItem(int id)
        {
            return unitOfWork.Repository<G_USER_BRANCH>().GetById(id);
        }

        public List<G_USER_BRANCH> GetAll()
        {
            return unitOfWork.Repository<G_USER_BRANCH>().GetAll();
        }

        public List<G_USER_BRANCH> GetAll(Expression<Func<G_USER_BRANCH, bool>> predicate)
        {
            return unitOfWork.Repository<G_USER_BRANCH>().Get(predicate);
        }

        public G_USER_BRANCH Insert(G_USER_BRANCH entity)
        {
            var Item = unitOfWork.Repository<G_USER_BRANCH>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }

        public G_USER_BRANCH Update(G_USER_BRANCH entity)
        {

            var Item = unitOfWork.Repository<G_USER_BRANCH>().Update(entity);
            unitOfWork.Save();
            return Item;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_USER_BRANCH>().Delete(id);
            unitOfWork.Save();
        }

        public void InsertLst(List<G_USER_BRANCH> obj)
        {
            unitOfWork.Repository<G_USER_BRANCH>().Insert(obj);
            unitOfWork.Save();
            return;
        }
         
        #endregion
    }
}
