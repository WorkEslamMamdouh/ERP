using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.GRole
{
    public class GRoleService : IGRoleService
    {
        private readonly IUnitOfWork unitOfWork;

        public GRoleService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


       
        public G_Role GetById(int id)
        {
            return unitOfWork.Repository<G_Role>().GetById(id);
        }

        public List<G_Role> GetAll()
        {
            return unitOfWork.Repository<G_Role>().GetAll();
        }

        public List<G_Role> GetAll(Expression<Func<G_Role, bool>> predicate)
        {
            return unitOfWork.Repository<G_Role>().Get(predicate);
        }

        public G_Role Insert(G_Role entity)
        {
            var memb = unitOfWork.Repository<G_Role>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public G_Role Update(G_Role entity)
        {

            var memb = unitOfWork.Repository<G_Role>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_Role>().Delete(id);
            unitOfWork.Save();
        }
      

    }



}
