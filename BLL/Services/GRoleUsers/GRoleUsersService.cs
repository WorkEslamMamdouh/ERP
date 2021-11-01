using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace Inv.BLL.Services.GRoleUsers
{
    public class GRoleUsersService : IGRoleUsersService
    {
        private readonly IUnitOfWork unitOfWork;

        public GRoleUsersService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


       
        public G_RoleUsers GetById(int id)
        {
            return unitOfWork.Repository<G_RoleUsers>().GetById(id);
        }

        public List<G_RoleUsers> GetAll()
        {
            return unitOfWork.Repository<G_RoleUsers>().GetAll();
        }

        public List<G_RoleUsers> GetAll(Expression<Func<G_RoleUsers, bool>> predicate)
        {
            return unitOfWork.Repository<G_RoleUsers>().Get(predicate);
        }

        public G_RoleUsers Insert(G_RoleUsers entity)
        {
            var memb = unitOfWork.Repository<G_RoleUsers>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public G_RoleUsers Update(G_RoleUsers entity)
        {

            var memb = unitOfWork.Repository<G_RoleUsers>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_RoleUsers>().Delete(id);
            unitOfWork.Save();
        }
      

    }



}
