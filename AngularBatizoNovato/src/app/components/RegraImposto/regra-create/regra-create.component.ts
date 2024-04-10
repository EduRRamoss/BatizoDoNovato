import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegraImposto } from '../../../models/model.RegraImposto';
import { RegraImpostoService } from '../../../services/RegraImposto/regra-imposto.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-regra-create',
  templateUrl: './regra-create.component.html',
  styleUrls: ['./regra-create.component.css']
})
export class RegraCreateComponent implements OnInit {
  RegrasImposto: RegraImposto[];
  RegraImposto: RegraImposto = new RegraImposto();
  
  id: string;
  nome: string;
  taxa: number;

  constructor( private router: Router, private route: ActivatedRoute, private regraImpostoService: RegraImpostoService, private _snackBar: MatSnackBar){
    this.RegrasImposto = [];
    this.id = '';
    this.nome = '';
    this.taxa = 0;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['codigo'];
      this.nome = params['nome'];
      this.taxa = +params['taxa'];
    });
  }

  RedirecionarParaPesquisa() {
    this.router.navigate(['/regrasearch']);
  }
  
  @HostListener('document:keydown', ['$event'])
  verificarTecla(event: KeyboardEvent) {
    if (event.key === 'F2')
      this.router.navigate(['/regrasearch']);
  }

  Pesquisar() {
    if (this.id === '' || this.id === null)
      this.PesquisarTodos();
    else
      this.PesquisarPorId(this.id);
  }

  PesquisarTodos() {
    this.regraImpostoService.get()
      .pipe(take(1))
      .subscribe({
        next: (JsonClientes: RegraImposto[]) => { this.RegrasImposto = JsonClientes, console.log(JsonClientes) }
      })
  }

  PesquisarPorId(id: string) {
    this.regraImpostoService.getById(id)
      .pipe(take(1))
      .subscribe({
        next: (JsonCliente: RegraImposto) => {
          this.RegrasImposto = JsonCliente ? [JsonCliente] : []
        },
        error: () => {
          this.PopUPMensagem("ERRO: Cadastro Inexistente!");
        }
      })
  }

  CriarNovaRegraImposto() {
    if (this.nome == '' || this.nome == null) {
      return this.PopUPMensagem("O nome da Taxa nao deve ser enviado em branco!");
    }
    this.RegraImposto.nome = this.nome;
    this.RegraImposto.taxa = this.taxa;
    if (this.id != null) {
      this.RegraImposto.codigo = this.id;
      return this.AtualizarRegraImposto();
    }
    this.regraImpostoService.post(this.RegraImposto)
      .pipe(take(1))
      .subscribe({
        next: () => {},
        error: () => {
          this.PopUPMensagem("ERRO desconhecido!");
        }
      })
      this.PopUPMensagem("Regra criada com sucesso!");
  }

  AtualizarRegraImposto() {

    this.regraImpostoService.update(this.RegraImposto.codigo, this.RegraImposto)
    .pipe(take(1))
    .subscribe({
      next: () => {},
      error: () => {
        this.PopUPMensagem("ERRO desconhecido!")
      }
    })
    this.PopUPMensagem("Regra atualizada com sucesso!");
  }

  PopUPMensagem(mensagem: string){
    this._snackBar.open(mensagem, '', {
      duration: 2000,
    });
  }
}