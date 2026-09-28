import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/usuario.model';

const CLAVE_TOKEN = 'reutilizate_token';
const CLAVE_USUARIO = 'reutilizate_usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private esNavegador: boolean;

  // Estado reactivo: Angular repinta el navbar cuando esto cambia
  private logueado = signal(false);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.esNavegador = isPlatformBrowser(platformId);
    if (this.esNavegador) {
      this.logueado.set(!!localStorage.getItem(CLAVE_TOKEN));
    }
  }

  guardarSesion(token: string, usuario: Usuario): void {
    if (!this.esNavegador) return;
    localStorage.setItem(CLAVE_TOKEN, token);
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    this.logueado.set(true);
  }

  estaLogueado(): boolean {
    return this.logueado();
  }

  obtenerToken(): string | null {
    if (!this.esNavegador) return null;
    return localStorage.getItem(CLAVE_TOKEN);
  }

  obtenerUsuario(): Usuario | null {
    if (!this.esNavegador) return null;
    const usuarioGuardado = localStorage.getItem(CLAVE_USUARIO);
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  }

  cerrarSesion(): void {
    if (!this.esNavegador) return;
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
    this.logueado.set(false);
  }
}