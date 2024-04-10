export class Login{
    codigo!:string;
    usuario:string;
    senha:string;
    token:any;

    public constructor(){
        this.usuario = '';
        this.senha = '';
        this.token= null;
    }
}