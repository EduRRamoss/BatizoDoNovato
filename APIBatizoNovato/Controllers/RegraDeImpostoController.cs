using APIBatizoNovato.Context;
using APIBatizoNovato.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIBatizoNovato.Controllers;

[ApiController]
[Route("[controller]")]
public class RegraDeImpostoController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IGenericRepository<RegraImposto> _genericRepo

    public RegraDeImpostoController(ApplicationDbContext context, IGenericRepository<RegraImposto> genericRepo)
    {
        _context = context;
        _genericRepo = genericRepo;
    }


    [HttpGet("buscar-todas-regras-imposto")]
    public async Task<ActionResult<IEnumerable<RegraImposto>>> ConsultarRegraTodos() =>
        Ok(await _genericRepo.GetAll()
    );
    //var getall = await _context.RegraDeImpostos.Include(e => e.Produto).ToListAsync();

    [HttpGet("buscar-regra-por-codigo/{Codigo}")]
    public async Task<ActionResult<RegraImposto>> ConsultarRegraPorCodigo(int Codigo)
    {
        try
        {
            var getRegra = await _genericRepo.GetByID(Codigo);

            if(getRegra == null)
                return BadRequest("Cadastro inexistente");

            return Ok(getRegra);
        }
        catch (Exception)
        {
            
            throw;
        }
    }

    [HttpPost("criar-nova-regradeimposto")]
    public async Task<ActionResult<RegraImposto>> CriarNovaRegraDeImposto([FromBody] RegraImposto regraImpostoModel)
    {
        try
        {
            if(regraImpostoModel == null)
                return BadRequest("Ha infos invalidas! Tente novamente");
            if(regraImpostoModel.Taxa == 0)
                return BadRequest("Taxa nao pode ser zero, tente novamente!");
            //Adicionar mais Validacoes depois//

            var newRegraImposto = new RegraImposto
            {
                Nome = regraImpostoModel.Nome,
                Taxa = regraImpostoModel.Taxa
            };

            return Ok(_genericRepo.Add(newRegraImposto));
        }
        catch (Exception)
        {
            
            throw;
        }
    }

    [HttpPut("editar-regra-imposto-existente/{id:int}")]
    public async Task<ActionResult<RegraImposto>> EditarRegraImpostoExistente([FromBody] RegraImposto regraImpostoModel, int id)
    {
        try
        {
            var getRegra = await _genericRepo.GetByID(id);

            if (getRegra == null)
                return BadRequest($"A Regra de id {id} é inexistente");

            getRegra.Nome = regraImpostoModel.Nome;
            getRegra.Taxa = regraImpostoModel.Taxa;

            return Ok(_genericRepo.Update(getRegra));
        }
        catch (Exception)
        {

            throw;
        }
    }
}