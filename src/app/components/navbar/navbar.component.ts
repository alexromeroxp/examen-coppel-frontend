import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ComprasService } from '../../services/compras.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) { }
  numeroArticulosEnCarrito = 0;

  ngOnInit(): void {
    this.numeroArticulosEnCarrito = this.authService.getUserInfo().carrito.length;
  }

  logout(): void {
    this.authService.logout();
  }
}
