import { Injectable } from '@angular/core';
import { Articulo } from '../interfaces/articulo.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { clientes } from '../mocks/clientes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private apiUrl = "http://localhost:5260/api/Cliente/Cliente-Articulo";

  constructor(private httpClient: HttpClient) { }

  agregarAlCarrito(compra: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, compra);
  }
}
