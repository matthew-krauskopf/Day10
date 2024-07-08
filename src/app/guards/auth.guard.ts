import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  if (authService.userIsLoggedIn()) {
    return true;
  } else {
    return inject(Router).navigate(['/login']);
  }
};
