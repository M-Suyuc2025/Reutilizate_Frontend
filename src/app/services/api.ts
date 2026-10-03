import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credenciales, RegistroUsuario, RespuestaAuth } from '../models/usuario.model';
import {
  CanjeResponse,
  ClasificacionResponse,
  HistorialResponse,
  PuntosResponse,
  RecompensasResponse,
} from '../models/api.model';

export const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  login(credenciales: Credenciales): Observable<RespuestaAuth> {
    return this.http.post<RespuestaAuth>(`${API_URL}/auth/login`, credenciales);
  }

  registrar(datos: RegistroUsuario): Observable<RespuestaAuth> {
    return this.http.post<RespuestaAuth>(`${API_URL}/auth/register`, datos);
  }

  // El backend espera multipart con el campo "image". El token es opcional:
  // con sesión guarda el registro, suma puntos y devuelve ideas de reutilización.
  clasificarResiduo(imagen: File): Observable<ClasificacionResponse> {
    const form = new FormData();
    form.append('image', imagen);
    return this.http.post<ClasificacionResponse>(`${API_URL}/waste/classify`, form);
  }

  obtenerHistorial(): Observable<HistorialResponse> {
    return this.http.get<HistorialResponse>(`${API_URL}/waste/history`);
  }

  obtenerPuntos(): Observable<PuntosResponse> {
    return this.http.get<PuntosResponse>(`${API_URL}/points/summary`);
  }

  obtenerRecompensas(): Observable<RecompensasResponse> {
    return this.http.get<RecompensasResponse>(`${API_URL}/rewards`);
  }

  canjearRecompensa(id: number): Observable<CanjeResponse> {
    return this.http.post<CanjeResponse>(`${API_URL}/rewards/${id}/redeem`, {});
  }
}
