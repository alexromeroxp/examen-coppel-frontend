import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService,private comprasService: ComprasService) { }
  numeroArticulosEnCarrito = 0; // Variable para el contador de artículos en el carrito

  ngOnInit(): void {
    // Actualizar el contador al inicializar el componente
    this.actualizarContadorCarrito();
  }

  logout(): void {
    this.authService.logout();
  }

  private actualizarContadorCarrito(): void {
    // Sumar la cantidad de artículos distintos en el carrito de todos los clientes
    this.numeroArticulosEnCarrito = this.comprasService
      .getClientes()
      .reduce((total, cliente) => total + cliente.carrito.length, 0);
  }
}
