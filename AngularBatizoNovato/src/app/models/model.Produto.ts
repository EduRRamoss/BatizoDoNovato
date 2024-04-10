export class Produto{
    codigo!:string;
    nome:string;
    precoDeCusto: number;
    markup!: number;
    precoDeVenda!: number;
    margemReal!: number;
    regraDeImpostoId!: string;

    public constructor(){
        this.nome = "";
        this.precoDeCusto = 0;
    }
}