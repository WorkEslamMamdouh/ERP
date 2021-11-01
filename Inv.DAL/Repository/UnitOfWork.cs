using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inv.DAL.Repository
{

    public class UnitOfWork : IUnitOfWork
    {

        private static InvEntities _context;

        public static InvEntities context(string connectionString)
        {

            _context = new InvEntities(connectionString);
            return _context;


        }

        public static InvEntities context()
        {

            _context = new InvEntities();
            return _context;


        }

        public UnitOfWork(InvEntities context)
        {
            _context = context;
        }
        public GenericRepository<T> Repository<T>() where T : class, new()
        {
            return new GenericRepository<T>(_context);
        }
        public void Save()
        {
            try
            {
                _context.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                throw ex;
            }
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
                if (disposing)
                {
                    _context.Dispose();
                }
            _disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
