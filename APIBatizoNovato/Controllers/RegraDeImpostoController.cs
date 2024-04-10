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

    public RegraDeImpostoController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet("buscar-todas-regras-imposto")]
    public async Task<ActionResult<IEnumerable<RegraImposto>>> ConsultarRegraTodos()
    {
        try
        {
            var getall = await _context.RegraDeImpostos.Include(e => e.Produto).ToListAsync();
            return Ok(getall);
        }
        catch (Exception)
        {
            
            throw;
        }
    }

    [HttpGet("buscar-regra-por-codigo/{Codigo}")]
    public async Task<ActionResult<RegraImposto>> ConsultarRegraPorCodigo(int Codigo)
    {
        try
        {
            var getRegra = await _context.RegraDeImpostos.FindAsync(Codigo);

            if(getRegra == null)
                return BadRequest("Cadastro inexistente");

            return Ok(getRegra);
        }
        catch (Exception)
        {
            
            throw;
        }
    }

    /*
    [HttpGet("buscar-regra-por-nome/{nome}")]
    public async Task<ActionResult<IEnumerable<RegraImposto>>> ConsultarRegraPorNome(string nome)
    {
        var getRegras = await _context.RegraDeImpostos.

        return Ok();
    }*/



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

            _context.RegraDeImpostos.Add(newRegraImposto);
            await _context.SaveChangesAsync();

            return Ok(newRegraImposto);
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
            var getRegra = await _context.RegraDeImpostos.FindAsync(id);

            if (getRegra == null)
                return BadRequest($"A Regra de id {id} é inexistente");

            getRegra.Nome = regraImpostoModel.Nome;
            getRegra.Taxa = regraImpostoModel.Taxa;



            _context.RegraDeImpostos.Update(getRegra);
            await _context.SaveChangesAsync();

            return Ok(getRegra);
        }
        catch (Exception)
        {

            throw;
        }
    }

    
}
