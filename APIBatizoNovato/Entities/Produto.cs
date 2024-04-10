namespace APIBatizoNovato.Entities;

public class Produto
{
    public int Codigo { get; set; }

    public string Nome { get; set; }
    public decimal PrecoDeCusto { get; set; }
    public decimal? Markup { get; set; }
    public decimal? PrecoDeVenda { get; set; }
    public decimal? MargemReal { get; set; }

    public virtual int? RegraDeImpostoId { get; set;}
    public virtual RegraImposto? RegraImposto { get; set; }
}
