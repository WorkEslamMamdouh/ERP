using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.DAL.Repository
{
    public interface IGenericRepository<T>
    {
        /// <summary>
        /// Get entity by identifier
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>Entity</returns>
        T GetById(int id);

        /// <summary>
        /// Get All Enitites
        /// </summary>
        /// <returns></returns>
        List<T> GetAll(bool _withTracking = true);

        /// <summary>
        /// Get first or default By predicate
        /// </summary>
        /// <param name="predicate"> where clause</param>
        /// <returns>List of Entities</returns>
        T GetFirstOrDefault(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Get By predicate
        /// </summary>
        /// <param name="predicate"> where clause</param>
        /// <returns>List of Entities</returns>
        List<T> Get(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Insert entity
        /// </summary>
        /// <param name="entity">Entity</param>
        T Insert(T entity);

        /// <summary>
        /// Insert Entities
        /// </summary>
        /// <param name="Entities">Entities</param>
        void Insert(IEnumerable<T> Entities);

        /// <summary>
        /// Update entity
        /// </summary>
        /// <param name="entity">Entity</param>
        T Update(T entity);

        /// <summary>
        /// Update Entities
        /// </summary>
        /// <param name="Entities">Entities</param>
        void Update(IEnumerable<T> Entities);

        /// <summary>
        /// Delete entity
        /// </summary>
        /// <param name="id">Id of the Entity to delete</param>
        void Delete(int id);

        /// <summary>
        /// Delete entity
        /// </summary>
        /// <param name="Entity">Entity to delete</param>
        void Delete(T entity);

        /// <summary>
        /// Delete Entities
        /// </summary>
        /// <param name="Entities">Entities</param>
        void Delete(IEnumerable<T> Entities);

        /// <summary>
        /// Gets a table
        /// </summary>
        IQueryable<T> Table { get; }
    }
}
