import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth';

// Agrega el token JWT a cada petición y, si el backend responde 401
// estando logueado (token vencido: dura 2 h), cierra la sesión.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.obtenerToken();

  const peticion = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(peticion).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && token) {
        auth.cerrarSesion();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
