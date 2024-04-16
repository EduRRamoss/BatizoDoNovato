using APIBatizoNovato.Context;
using APIBatizoNovato.Entities;

namespace APIBatizoNovato.Repositories;

public class RegraImpostoRepository : GenericRepository<RegraImposto>, IRegraImpostoRepository
{
    public RegraImpostoRepository(ApplicationDbContext context) : base(context)
    {   }




}
