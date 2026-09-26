import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/usuario.model';

const CLAVE_TOKEN = 'reutilizate_token';
const CLAVE_USUARIO = 'reutilizate_usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private esNavegador: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.esNavegador = isPlatformBrowser(platformId);
  }

  // Guarda el token y el usuario en localStorage después de un login/registro exitoso
  guardarSesion(token: string, usuario: Usuario): void {
    if (!this.esNavegador) return;
    localStorage.setItem(CLAVE_TOKEN, token);
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
  }

  // Devuelve true si hay una sesión activa
  estaLogueado(): boolean {
    if (!this.esNavegador) return false;
    return !!localStorage.getItem(CLAVE_TOKEN);
  }

  // Devuelve el token guardado (para enviarlo luego en peticiones protegidas)
  obtenerToken(): string | null {
    if (!this.esNavegador) return null;
    return localStorage.getItem(CLAVE_TOKEN);
  }

  // Devuelve el usuario guardado, o null si no hay sesión
  obtenerUsuario(): Usuario | null {
    if (!this.esNavegador) return null;
    const usuarioGuardado = localStorage.getItem(CLAVE_USUARIO);
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  }

  // Cierra la sesión, eliminando los datos guardados
  cerrarSesion(): void {
    if (!this.esNavegador) return;
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
  }
}