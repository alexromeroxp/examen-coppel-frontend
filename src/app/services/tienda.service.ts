import { Injectable } from '@angular/core';
import { Tienda } from '../interfaces/tienda.interface';
import { tiendas } from '../mocks/tiendas';
import { Articulo } from '../interfaces/articulo.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private apiUrl = "http://localhost:5260/api/Tienda";
  private apiUrl2 = "http://localhost:5260/api/Articulo/Articulos-Tiendas";

  constructor(private httpClient: HttpClient) { }


  getTiendas(): Observable<Tienda[]> {
    return this.httpClient.get<Tienda[]>(`${this.apiUrl}`);
  }

  getTienda(id: number): Observable<Tienda | undefined> {
    return this.httpClient.get<Tienda>(`${this.apiUrl}/${id}`);
  }

  crearTienda(tienda: Tienda): Observable<any> {
    return this.httpClient.post(this.apiUrl, tienda);
  }

  editarTienda(tienda: Tienda): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${tienda.tiendaId}`, tienda);
  }

  borrarTienda(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }

  agregarArticuloATienda(tiendaId: number, articuloId: number): Observable<any> {
    const request = {
      tiendaId, articuloId, fecha: new Date()
    }
    return this.httpClient.post(this.apiUrl2, request);
  }
}
