using System.ComponentModel.DataAnnotations;

namespace APIBatizoNovato.Entities;

public class RegraImposto
{
    public int Codigo { get; set; }

    [MaxLength(50)]
    public string Nome { get; set; }

    public decimal Taxa { get; set; }

        
    public virtual IEnumerable<Produto>? Produto { get; set; }
}
