using APIBatizoNovato.Context;
using APIBatizoNovato.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIBatizoNovato.Controllers;

[ApiController]
[Route("[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProdutoController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("buscar-todos-produtos")]
    public async Task<ActionResult<IEnumerable<Produto>>> BuscarTodosProdutos(){
        try
        {
            return Ok(await _context.Produtos.ToListAsync());
        }
        catch (Exception)
        {
            
            throw;
        }
    }


    [HttpGet("buscar-produto-por-codigo/{Codigo}")]
    public async Task<ActionResult<Produto>> BuscarProdutoPorCodigo(int Codigo)
    {
        try
        {
            var getProduto = await _context.Produtos.FindAsync(Codigo);

            if (getProduto == null)
                return BadRequest("Cadastro inexistente");

            return Ok(getProduto);
        }
        catch (Exception)
        {

            throw;
        }
    }


    [HttpPost("criar-novo-produto")]
    public async Task<ActionResult<Produto>> CriarNovoProduto([FromBody] Produto produtoModel)
    {
        try
        {
            if (produtoModel == null)
                return BadRequest("Ha informacoes invalidas, tente novamente");
                //Adc mais validacoes dps

            var newProduto = new Produto
            {
                Nome = produtoModel.Nome,
                PrecoDeCusto = produtoModel.PrecoDeCusto,
                Markup = produtoModel.Markup,
                PrecoDeVenda = produtoModel.PrecoDeVenda,
                MargemReal = produtoModel.MargemReal,
                RegraDeImpostoId = produtoModel.RegraDeImpostoId
            };

            _context.Produtos.Add(newProduto);
            await _context.SaveChangesAsync();

            return Ok(newProduto);
        }
        catch (Exception)
        {

            throw;
        }
    }

    [HttpPut("editar-produto-existente/{id:int}")]
    public async Task<ActionResult<Produto>> EditarProdutoExistente([FromBody] Produto produtoModel, int id)
    {
        try
        {
            var getProduto = await _context.Produtos.FindAsync(id);

            if (getProduto == null)
                return BadRequest($"O produto de id {id} é inexistente");

            getProduto.Nome = produtoModel.Nome;
            getProduto.PrecoDeCusto = produtoModel.PrecoDeCusto;
            getProduto.Markup = produtoModel.Markup;
            getProduto.PrecoDeVenda = produtoModel.PrecoDeVenda;
            getProduto.MargemReal = produtoModel.MargemReal;
            getProduto.RegraDeImpostoId = produtoModel.RegraDeImpostoId;



            _context.Produtos.Update(getProduto);
            await _context.SaveChangesAsync();

            return Ok(getProduto);
        }
        catch (Exception)
        {

            throw;
        }
    }
}