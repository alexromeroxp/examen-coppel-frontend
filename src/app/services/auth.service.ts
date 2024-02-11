import { Injectable } from '@angular/core';
import { clientes } from '../mocks/clientes';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Cliente } from '../interfaces/cliente.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authenticatedUser: string | null = null;
  private apiUrl = "http://localhost:5260/api/Cliente/auth";
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string): void {
    const requestBody = { nombre: username };
    this.httpClient.post(this.apiUrl, requestBody).subscribe(
      (result: any) => {
        if (result) {
          localStorage.setItem('authenticatedUser', JSON.stringify(result));
          localStorage.setItem("carrito", result.carrito.length.toString())
          this.setUserInfo(result);
          this.router.navigate(['/clientes']);
        }
      },
      (error) => {
        console.error("Error en la autenticación:", error);
        alert("Error en la autenticación.");
      }
    );
  }

  logout(): void {
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem("carrito");
    this.clearUserInfo();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authenticatedUser') ? true : false;
  }

  getAuthenticatedUser(): any {
    let storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      return JSON.parse(storedUser) as Cliente
    }
    this.router.navigate(["./login"]);
  }
  setUserInfo(user: any): void {
    this.currentUserSubject.next(user);
  }
  getUserInfo(): Cliente {
    return this.currentUserSubject.value;
  }
  clearUserInfo(): void {
    this.currentUserSubject.next(null);
  }
}
