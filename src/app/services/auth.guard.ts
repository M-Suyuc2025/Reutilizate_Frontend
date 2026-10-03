import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth';

// Protege las rutas que requieren sesión (puntos y canje).
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.estaLogueado() ? true : inject(Router).createUrlTree(['/login']);
};
