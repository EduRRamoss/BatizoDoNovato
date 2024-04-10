import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/model.Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url="http://localhost:5048"
  }

  
  get():Observable<Produto[]>
   {
    const url = `${this.url}/Produto/buscar-todos-produtos`;
     return this.httpClient.get<Produto[]>(url);
  }

  getById(id:string):Observable<Produto>{
    const url = `${this.url}/Produto/buscar-produto-por-codigo/${id}`;
    return this.httpClient.get<Produto>(url);
  }

  post(produto: Produto): Observable<Produto> {
    const url = `${this.url}/Produto/criar-novo-produto/`;
    return this.httpClient.post<Produto>(url, produto);
  }

  update(id:string, produto: Produto): Observable<Produto> {
    const url = `${this.url}/Produto/editar-produto-existente/${id}`;
    return this.httpClient.put<Produto>(url, produto);
  }
}

