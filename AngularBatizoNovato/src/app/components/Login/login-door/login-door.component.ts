import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/Autentificacao/auth.service';
import { Login } from '../../../models/model.Login';
import { take } from 'rxjs';

@Component({
  selector: 'app-login-door',
  templateUrl: './login-door.component.html',
  styleUrls: ['./login-door.component.css']
})
export class LoginDoorComponent {
  login = new Login

  usuario: string = '';
  senha: string = '';

  token: string = '';


  constructor(private router: Router, private _loginService: LoginService, private _snackBar: MatSnackBar, private _authService: AuthService) {
    this.login.usuario = '';
    this.login.senha = '';
  }

  Validar() {
    console.log("Validando...");
    if (this.usuario == '' || this.senha == '') {
      return this.PopUPMensagem("Usuário ou Senha em branco!");
    }
    this.login.usuario = this.usuario;
    this.login.senha = this.senha;

    this._loginService.postValidarLogin(this.login)
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          console.log("Logado com sucesso!");
          console.log(value);

          this._authService.saveToken(value.token);
          this.router.navigate(['/produto']);
        },
        error: (error) => {
          console.log("Erro:", error);
          this.PopUPMensagem('Usuário ou Senha inválidos.');
        }
      });
  }

  PopUPMensagem(mensagem: string) {
    this._snackBar.open(mensagem, '', {
      duration: 2000,
    });
  }
}
