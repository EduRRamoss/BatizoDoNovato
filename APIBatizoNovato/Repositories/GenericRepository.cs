using APIBatizoNovato.Context;
using Microsoft.EntityFrameworkCore;

namespace APIBatizoNovato.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    public readonly ApplicationDbContext _context;
    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
    }



    public virtual async Task<IEnumerable<T>> GetAll()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public virtual async Task<T> GetByID(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T> Add(T entity)
    {
        _context.Set<T>().Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> Update(T entity)
    {
       _context.Set<T>().Update(entity);
       await _context.SaveChangesAsync();
       return entity;
    }

    public Task<T> Delete(int id)
    {
        throw new NotImplementedException();
    }
}
