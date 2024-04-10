import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegraImposto } from '../../models/model.RegraImposto';

@Injectable({
  providedIn: 'root'
})
export class RegraImpostoService {
  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url="http://localhost:5048"
  }

  
  get():Observable<RegraImposto[]>
   {
    const url = `${this.url}/RegraDeImposto/buscar-todas-regras-imposto`;
     return this.httpClient.get<RegraImposto[]>(url);
  }

  getById(id:string):Observable<RegraImposto>{
    const url = `${this.url}/RegraDeImposto/buscar-regra-por-codigo/${id}`;
    return this.httpClient.get<RegraImposto>(url);
  }

  post(regraImposto: RegraImposto): Observable<RegraImposto> {
    const url = `${this.url}/RegraDeImposto/criar-nova-regradeimposto`;
    return this.httpClient.post<RegraImposto>(url, regraImposto);
  }

  update(id:string, regraImposto: RegraImposto): Observable<RegraImposto> {
    const url = `${this.url}/RegraDeImposto/editar-regra-imposto-existente/${id}`;
    return this.httpClient.put<RegraImposto>(url, regraImposto);
  }
}
