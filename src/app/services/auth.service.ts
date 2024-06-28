import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string = 'testUser';
  password: string = 'testPass';

  checkLogin(username: string, password: string): boolean {
    return username == this.username && password == this.password;
  }
}
