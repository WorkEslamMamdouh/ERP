using System;
using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Inv.BLL.Services.GUSERS
{
    public class G_USERSService : IG_USERSService
    {

        private readonly IUnitOfWork unitOfWork;

        public G_USERSService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


        #region G_USERS Services
        public G_USERS GetbyID(int id)
        {
            return unitOfWork.Repository<G_USERS>().GetById(id);
        }
       
        public List<G_USERS> GetAll()
        {
            return unitOfWork.Repository<G_USERS>().GetAll();
        }

        public List<G_USERS> GetAll(Expression<Func<G_USERS, bool>> predicate)
        {
            return unitOfWork.Repository<G_USERS>().Get(predicate);
        }

        public G_USERS Insert(G_USERS USER)
        {
            var pay = unitOfWork.Repository<G_USERS>().Insert(USER);
            unitOfWork.Save();
            return pay;
        }

        public G_USERS Update(G_USERS USER)
        {
            var pay = unitOfWork.Repository<G_USERS>().Update(USER);
            unitOfWork.Save();
            return pay;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<G_USERS>().Delete(id);
            unitOfWork.Save();
        }

        public Boolean CheckUser(string Guid, string uCode)

        {
            string Pref = Guid.Substring(0, 5);
            string OrgGuid = Guid.Remove(0, 5); // remove  prefix 

            string EnGuid = Pref + Encrypt(OrgGuid, "Business-Systems");

            var usr = GetAll(x => x.USER_CODE == uCode).ToList();
            if (usr.Count == 0)
            {
                return false;
            }
            if (usr[0].Tokenid != EnGuid)
            {
                return false;
            }
            if (usr[0].LastLogin == null)
            {
                return false;
            }
            DateTime LL = Convert.ToDateTime(usr[0].LastLogin);
            if (DateTime.Now.Subtract(LL).Hours > 8)
            {
                return false;
            }
            return true;

        }
        public static string Encrypt(string input, string key)
        {
            byte[] inputArray = UTF8Encoding.UTF8.GetBytes(input);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tripleDES.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(inputArray, 0, inputArray.Length);
            tripleDES.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        public G_RoleUsers InsertRoleUser(G_RoleUsers USER)
        {
            var pay = unitOfWork.Repository<G_RoleUsers>().Insert(USER);
            unitOfWork.Save();
            return pay;
        }

        public G_RoleUsers UpdateRoleUser(G_RoleUsers USER)
        {
            var pay = unitOfWork.Repository<G_RoleUsers>().Update(USER);
            unitOfWork.Save();
            return pay;
        }

        public void DeleteRoleUsers(int roleId, string UserCodeE)
        {
            var role = unitOfWork.Repository<G_RoleUsers>().Get(x => x.RoleId == roleId && x.USER_CODE == UserCodeE);
            unitOfWork.Repository<G_RoleUsers>().Delete(role);

            unitOfWork.Save();
        }
        #endregion
    }
}