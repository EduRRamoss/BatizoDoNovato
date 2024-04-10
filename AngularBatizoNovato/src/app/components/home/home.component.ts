import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Autentificacao/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private _router: Router, private _authService: AuthService ) {
  }

  RedirecionarParaProduto() {
    this._router.navigate(['/produto'])
  }

  RedirecionarParaRegraImposto() {
    this._router.navigate(['/regraimposto'])
  }

  RedirecionarParaProdutoRelacao() {
    this._router.navigate(['/produtorelacao'])
  }

  RedirecionarParaLogin() {
    this._authService.removeToken();
    this._router.navigate(['/login'])
  }

}
