export class RegraImposto{
    codigo!:string;
    nome:string;
    taxa:Number;

    public constructor(){
        this.nome = '';
        this.taxa = 0;
    }
}