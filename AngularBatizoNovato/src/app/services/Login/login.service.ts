import { Injectable } from '@angular/core';
import { Login } from '../../models/model.Login';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url: string;

  constructor(private _httpClient: HttpClient) {
    this.url="http://localhost:5048"
  }

  getToken():Observable<string> {
    const url = `${this.url}/Login/gerar-token`;
    return this._httpClient.get<string>(url);
  }

  getLogins():Observable<Login[]> {
    const url = `${this.url}/Login/obter-todos-logins`;
    return this._httpClient.get<Login[]>(url);
  }

  postValidarLogin(login: Login):Observable<Login> {
    const url = `${this.url}/Login/fazer-login`;
    return this._httpClient.post<Login>(url, login);
  }
}
