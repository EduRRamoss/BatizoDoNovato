import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegraImposto } from '../../../models/model.RegraImposto';
import { RegraImpostoService } from '../../../services/RegraImposto/regra-imposto.service';
import { take } from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-regra-search',
  templateUrl: './regra-search.component.html',
  styleUrl: './regra-search.component.css',
})
export class RegraSearchComponent {
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;

  nomeRegra: string = '';
  RegraImposto: RegraImposto[];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private regraImpostoService: RegraImpostoService, private _snackBar: MatSnackBar){
    this.RegraImposto = [];
  }

  handlePageEvent(pageEvent: PageEvent){
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.PesquisarPorNome()
  }

  EditarRegraRedirecionar(regraImposto: RegraImposto){
    this.router.navigate(
      ['/regraimposto'],
      { queryParams: { codigo: regraImposto.codigo, nome: regraImposto.nome, taxa: regraImposto.taxa }}
    );
  }

  PesquisarPorNome(){
    if (this.nomeRegra === '***') {
      this.regraImpostoService.get()
      .pipe(take(1))
      .subscribe({
        next:(JsonRegras:RegraImposto[])=>{
          this.RegraImposto = JsonRegras;
          this.totalItems = this.RegraImposto.length;
          this.aplicarPaginacao();
        }
      })
    } else {
      this.regraImpostoService.get()
      .pipe(take(1))
      .subscribe({
        next:(JsonRegras: RegraImposto[])=>{
          this.RegraImposto = JsonRegras;
          this.FiltrarRegraImposto(this.RegraImposto);
          this.totalItems = this.RegraImposto.length;
          this.aplicarPaginacao();
        }
      }) 
    }
  }

  aplicarPaginacao() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.RegraImposto = this.RegraImposto.slice(startIndex, endIndex);
  }

  FiltrarRegraImposto(regrasParaFiltrar: RegraImposto[]){ 
    const nomeRegraMinusculo = this.nomeRegra.toLowerCase(); 
    this.RegraImposto = regrasParaFiltrar.filter(e => {
        const nomeRegraAtualMinusculo = e.nome.toLowerCase();
        return nomeRegraAtualMinusculo.includes(nomeRegraMinusculo);
    });

    if (this.RegraImposto.length === 0) {
      this.PopUPMensagem('Nenhum resultado encontrado.');
    }
  }

  PopUPMensagem(mensagem: string){
    this._snackBar.open(mensagem, '', {
      duration: 2000,
    });
  }
}