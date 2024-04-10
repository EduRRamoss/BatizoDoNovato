import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Autentificacao/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  const _authService = new AuthService
  const _router = inject(Router);


  const checkToken = _authService.getToken();
  if(checkToken != null){
    return true;
  } else {
    _router.navigate(['/login']);
    return false;
  }
};
