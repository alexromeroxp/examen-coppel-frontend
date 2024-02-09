import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';

  constructor(private router: Router, private auth: AuthService) { }

  login(): void {
    if (this.username.trim() !== '') {
      if (this.username.trim() !== '') {
        const result = this.auth.login(this.username);
        if (result) {
          this.router.navigate(['/clientes']);
        } else {
          alert("Usuario no encontrado")
        }

      }
    }
  }
}
