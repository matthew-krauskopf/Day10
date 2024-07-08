import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string = 'testUser';
  password: string = 'testPass';
  router: Router = inject(Router);

  loggedIn: boolean = false;

  checkLogin(username: string, password: string): boolean {
    if (username == this.username && password == this.password) {
      this.loggedIn = true;
    }
    return this.userIsLoggedIn();
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['login']);
  }

  userIsLoggedIn(): boolean {
    return this.loggedIn;
  }
}
