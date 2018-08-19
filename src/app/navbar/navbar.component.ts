import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  usernameEditMode = false;

  constructor(private authService: AuthService) { }

  get username() {
    return this.authService.currentUserName;
  }

  updateUserName(name: string) {
    this.authService.updateCurrentUserName(name);
    this.usernameEditMode = false;
  }
}
