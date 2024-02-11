import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { clientes } from '../mocks/clientes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = "http://localhost:5260/api/Cliente";

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}`);
  }

  getCliente(id: number): Observable<Cliente | undefined> {
    return this.httpClient.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    const request = {
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      direccion: cliente.direccion
    }
    return this.httpClient.post(this.apiUrl, request);
  }

  editarCliente(cliente: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${cliente.clienteId}`, cliente);
  }

  borrarCliente(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }
}
