import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string = 'testUser';
  password: string = 'testPass';
  router: Router = inject(Router);

  checkLogin(username: string, password: string): boolean {
    if (username == this.username && password == this.password) {
      localStorage.setItem('logged_in', 'true');
    }
    return this.userIsLoggedIn();
  }

  logout() {
    localStorage.removeItem('logged_in');
    this.router.navigate(['login']);
  }

  userIsLoggedIn(): boolean {
    return localStorage.getItem('logged_in') == 'true';
  }
}
