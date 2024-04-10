import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../../models/model.Produto';
import { ProdutoService } from '../../../services/Produto/produto.service';

@Component({
  selector: 'app-produto-search',
  templateUrl: './produto-search.component.html',
  styleUrl: './produto-search.component.css'
})
export class ProdutoSearchComponent {
  currentPage: number = 0;
  pageSize: number = 50;
  totalItems: number = 0;

  nomeProduto: string = '';
  produtos: Produto[];

  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private _router: Router, private _produtoService: ProdutoService, private _snackBar: MatSnackBar){
    this.produtos = [];
  }

  handlePageEvent(pageEvent: PageEvent){
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.PesquisarPorNome()
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

  PesquisarPorNome(){
    if (this.nomeProduto === '***') {
      this._produtoService.get()
      .pipe(take(1))
      .subscribe({
        next:(JsonProdutos:Produto[])=>{
          this.produtos = JsonProdutos;
          this.totalItems = this.produtos.length;
          this.aplicarPaginacao();
        }
      })
    } else {
      this._produtoService.get()
      .pipe(take(1))
      .subscribe({
        next:(JsonProdutos: Produto[])=>{
          this.produtos = JsonProdutos;
          this.FiltrarProdutos(this.produtos);
          this.totalItems = this.produtos.length;
          this.aplicarPaginacao();
        }
      }) 
    }
  }

  aplicarPaginacao() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.produtos = this.produtos.slice(startIndex, endIndex);
  }

  FiltrarProdutos(produtosParaFiltrar: Produto[]){ 
    const nomeProdutoMinusculo = this.nomeProduto.toLowerCase(); 
    this.produtos = produtosParaFiltrar.filter(e => {
        const nomeProdutoAtualMinusculo = e.nome.toLowerCase();
        return nomeProdutoAtualMinusculo.includes(nomeProdutoMinusculo);
    });

    if (this.produtos.length === 0) {
      this._snackBar.open('Nenhum resultado encontrado.', '', {
        duration: 2000,
      });
    }
  }

  formatarValores(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}