using System.ComponentModel.DataAnnotations;

namespace APIBatizoNovato.Entities;

public class Login
{
    public int Id { get; set; }

    [Required]
    [MaxLength(10)]
    [MinLength(1)]
    [RegularExpression(@"^[A-Z]+$", 
    ErrorMessage = "Apenas sao permitidos letras e devem ser em CAIXA ALTA!")]
    public string Usuario { get; set; }

    [Required]
    [MaxLength(15)]
    [MinLength(8)]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$",
    ErrorMessage = "A senha deve ser COMPLEXA!")]
    public string Senha { get; set; }

    internal bool Any()
    {
        throw new NotImplementedException();
    }
}
