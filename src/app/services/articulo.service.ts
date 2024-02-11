import { Injectable } from '@angular/core';
import { Articulo } from '../interfaces/articulo.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private apiUrl = "http://localhost:5260/api/Articulo";

  constructor(private httpClient: HttpClient) { }

  getArticulos(): Observable<Articulo[]> {
    return this.httpClient.get<Articulo[]>(`${this.apiUrl}`);
  }

  getArticulo(id: number): Observable<Articulo | undefined> {
    return this.httpClient.get<Articulo>(`${this.apiUrl}/${id}`);
  }

  crearArticulo(articulo: Articulo): Observable<Articulo> {
    const request = { ...articulo, articuloId: undefined }
    return this.httpClient.post<Articulo>(`${this.apiUrl}`, articulo);
  }

  editarArticulo(articulo: Articulo): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${articulo.articuloId}`, articulo);
  }

  borrarArticulo(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }
}
