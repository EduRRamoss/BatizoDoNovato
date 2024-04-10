import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../models/model.Produto';
import { take } from 'rxjs';
import { ProdutoService } from '../../../services/Produto/produto.service';
import { RegraImposto } from '../../../models/model.RegraImposto';
import { RegraImpostoService } from '../../../services/RegraImposto/regra-imposto.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrl: './produto-create.component.css'
})
export class ProdutoCreateComponent implements OnInit  {
  Produtos: Produto[];
  Produto: Produto = new Produto();

  RegrasDisponiveis: RegraImposto[];
  RegraSelecionada: RegraImposto = new RegraImposto;

  id: string;
  nome: string;
  precoDeCusto: number;
  markup: number;
  precoDeVenda: number;
  margemReal: number;

  constructor(private _router: Router, private _route: ActivatedRoute, private _produtoService: ProdutoService, private _RegraImpostoService: RegraImpostoService, private _snackBar: MatSnackBar
    ) {
    this.Produtos = [];
    this.id = '';
    this.nome = '';
    this.precoDeCusto = 0;
    this.markup = 0;
    this.precoDeVenda = 0;
    this.margemReal = 0;

    this.RegrasDisponiveis = [];
    this.RegraSelecionada.codigo = '';
    this.RegraSelecionada.nome = '';
    this.RegraSelecionada.taxa = 0;
  }

  AutoPreencherMarkup(){
    let formulaMarkup = (this.precoDeVenda - this.precoDeCusto) / this.precoDeCusto;
    let markup = formulaMarkup * 100
    this.markup = markup;
  }

  AutoPreencherPrecoVenda(){
    let markupPercent = this.markup / 100;
    let formulaPrecoVenda = (markupPercent * this.precoDeCusto) + this.precoDeCusto;
    this.precoDeVenda = formulaPrecoVenda;
  }

  AutoPreencherMargemReal(){
    let lucro = (this.precoDeVenda - this.precoDeCusto) / (this.precoDeVenda) * 100;
    let margemReal = lucro
    this.margemReal = margemReal
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.id = params['codigo'];
      this.nome = params['nome'];
      this.precoDeCusto = params['precoDeCusto'];
      this.markup = params['markup'];
      this.precoDeVenda = params['precoDeVenda'];;
      this.margemReal = params['margemReal'];

      this.carregarRegrasImpostoDisponiveis();
    });
  }

  carregarRegrasImpostoDisponiveis() {
    this._RegraImpostoService.get()
      .pipe(take(1))
      .subscribe({
        next: (regras: RegraImposto[]) => {
          this.RegrasDisponiveis = regras;
        },
        error: () => {
          this.PopUPMensagem("Erro ao carregar as regras de imposto.");
        }
      });
  }

  @HostListener('document:keydown', ['$event'])
  verificarTecla(event: KeyboardEvent) {
    if (event.key === 'F2')
      this._router.navigate(['/produtosearch']);
  }

  Pesquisar() {
    if (this.id === '' || this.id === null)
      this.PesquisarTodos();
    else
      this.PesquisarPorId(this.id);
  }

  PesquisarTodos() {
    this._produtoService.get()
      .pipe(take(1))
      .subscribe({
        next: (JsonProdutos: Produto[]) => { this.Produtos = JsonProdutos, console.log(JsonProdutos) }
      })
  }

  PesquisarPorId(id: string) {
    this._produtoService.getById(id)
      .pipe(take(1))
      .subscribe({
        next: (JsonProduto: Produto) => {
          this.Produtos = JsonProduto ? [JsonProduto] : []
        },
        error: () => {
          this.PopUPMensagem("ERRO: Cadastro Inexistente!")
        }
      })
  }

  CriarNovoProduto() {

    if (this.nome == '' || this.nome == null) {
      return this.PopUPMensagem("O nome da Taxa nao deve ser enviado em branco!")
    }
    if (!this.RegraSelecionada) {
      return this.PopUPMensagem("Selecione uma regra de imposto para associar ao produto.");
    }

    this.Produto.nome = this.nome;
    this.Produto.precoDeCusto = this.precoDeCusto;
    this.Produto.markup = this.markup;
    this.Produto.precoDeVenda = this.precoDeVenda;
    this.Produto.margemReal = this.margemReal;
    this.Produto.regraDeImpostoId = this.RegraSelecionada.codigo;
    if (this.id != null) {
      this.Produto.codigo = this.id;
      return this.AtualizarRegraImposto();
    }

    this._produtoService.post(this.Produto)
      .pipe(take(1))
      .subscribe({
        next: () => { },
        error: () => {
          this.PopUPMensagem("ERRO desconhecido!")
        }
      })
    this.PopUPMensagem("Regra criada com sucesso!");
  }

  AtualizarRegraImposto() {
    this._produtoService.update(this.Produto.codigo, this.Produto)
    .pipe(take(1))
    .subscribe({
      next: () => {},
      error: () => {
        this.PopUPMensagem("ERRO desconhecido!")
      }
    })
    this.PopUPMensagem("Regra atualizada com sucesso!");
  }

  RedirecionarParaPesquisa() {
    this._router.navigate(['/produtosearch'])
  }

  formatarValores(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  PopUPMensagem(mensagem: string){
    this._snackBar.open(mensagem, '', {
      duration: 2000,
    });
  }
}