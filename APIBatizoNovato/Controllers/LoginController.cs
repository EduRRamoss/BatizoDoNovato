using APIBatizoNovato.Context;
using APIBatizoNovato.Entities;
using APIBatizoNovato.Model;
using APIBatizoNovato.Services;
using BatizadoDoNovato.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIBatizoNovato.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly TokenService _tokenService;

    public LoginController(ApplicationDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;

    }

    [HttpGet("gerar-token")]
    public async Task<ActionResult<string>> GetToken(){
        try
        {
            return Ok(_tokenService.GenerateToken());
        }
        catch (Exception)
        {
            
            throw;
        }
    }

    [HttpGet("obter-todos-logins")]
    public async Task<ActionResult<IEnumerable<Login>>> ObterLogins(){
        try
        {
            return Ok(await _context.Logins.ToListAsync());
        }
        catch (Exception)
        {
            
            throw;
        }
    }

    [HttpPost("fazer-login")]
    public async Task<ActionResult<Login>> Autentificar([FromBody] Login loginModel)
    {
        try
        {
            LoginViewerModel login = new LoginViewerModel();
            login.User = new LoginRepository().Get(loginModel);

            var user = await _context.Logins.FirstOrDefaultAsync(e => e.Usuario == loginModel.Usuario);

            if (user == null)
                return BadRequest("Usuário ou Senha incorretos!");
            if (user.Senha != loginModel.Senha)
                return BadRequest("Usuário ou Senha incorretos!");

            login.Token = _tokenService.GenerateToken();
            login.User.Senha = string.Empty;

            return Ok(login);
        }
        catch (Exception)
        {
            throw;
        }
    }


    [HttpPost("criar-novo-login")]
    public async Task<ActionResult<Login>> CriarNovoLogin([FromBody] Login loginModel)
    {
        try
        {
            if(loginModel == null)
                return BadRequest("Ha infos invalidas no login, tente novamente.");
            //Adicionar mais Validacoes depois//

            var newLogin = new Login
            {
                Usuario = loginModel.Usuario,
                Senha = loginModel.Senha
            };

            _context.Logins.Add(newLogin);
            await _context.SaveChangesAsync();

            return Ok(newLogin);
        }
        catch (Exception)
        {
            
            throw;
        }
    }
    
}
