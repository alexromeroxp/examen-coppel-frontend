import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clientes-front';

  constructor(private authService: AuthService) {
    const currentUser = localStorage.getItem("authenticatedUser");
    if (currentUser)
      this.authService.setUserInfo(JSON.parse(currentUser))
  }

}
