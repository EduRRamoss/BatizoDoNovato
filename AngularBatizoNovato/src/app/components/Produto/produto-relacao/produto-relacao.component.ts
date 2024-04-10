import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../../models/model.Produto';
import { take } from 'rxjs';
import { ProdutoService } from '../../../services/Produto/produto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-produto-relacao',
  templateUrl: './produto-relacao.component.html',
  styleUrl: './produto-relacao.component.css'
})
export class ProdutoRelacaoComponent {
  produtos: Produto[];

  currentPage: number = 0;
  pageSize: number = 50;
  totalItems: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private _router: Router, private _produtoService: ProdutoService
    ) {
    this.produtos = [];
  }

  EditarProdutoRedirecionar(produto: Produto){
    this._router.navigate(
      ['/produto'],
      { queryParams: { 
        codigo: produto.codigo,
        nome: produto.nome,
        precoDeCusto: produto.precoDeCusto,
        markup: produto.markup,
        precoDeVenda: produto.precoDeVenda,
        margemReal: produto.margemReal
      }}
    );
  }

  handlePageEvent(pageEvent: PageEvent){
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.Gerar()
  }

  Gerar() {
    this._produtoService.get()
      .pipe(take(1))
      .subscribe({
        next:(JsonProdutos: Produto[])=>{
          this.produtos = JsonProdutos;
          this.totalItems = this.produtos.length;
          this.aplicarPaginacao();
        }
      }) 
  }

  formatarValores(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  aplicarPaginacao() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.produtos = this.produtos.slice(startIndex, endIndex);
  }

}