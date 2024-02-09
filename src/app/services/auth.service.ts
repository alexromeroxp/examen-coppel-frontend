import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { clientes } from '../mocks/clientes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedUser: string | null = null;
  private clientes = clientes
  constructor(private router: Router) { }

  login(username: string): any {
    const found = this.clientes.find(cliente => cliente.nombre === username)
    if (found) {
      this.authenticatedUser = username;
      return found
    }
    return null
  }

  logout(): void {
    this.authenticatedUser = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.authenticatedUser;
  }

  getAuthenticatedUser(): string | null {
    return this.authenticatedUser;
  }
}
