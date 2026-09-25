import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario, Credenciales, RegistroUsuario, RespuestaAuth } from '../models/usuario.model';
import { ResultadoClasificacion, Material } from '../models/material.model';
import { RegistroReciclaje } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  login(credenciales: Credenciales): Observable<RespuestaAuth> {
    const respuestaMock: RespuestaAuth = {
      token: 'mock-token-123',
      usuario: {
        id: '1',
        nombre: 'Usuario de Prueba',
        email: credenciales.email,
        puntos: 120
      }
    };
    return of(respuestaMock).pipe(delay(500));
  }

  registrar(datos: RegistroUsuario): Observable<RespuestaAuth> {
    const respuestaMock: RespuestaAuth = {
      token: 'mock-token-456',
      usuario: {
        id: '2',
        nombre: datos.nombre,
        email: datos.email,
        puntos: 0
      }
    };
    return of(respuestaMock).pipe(delay(500));
  }

  clasificarResiduo(imagen: File): Observable<ResultadoClasificacion> {
    const materialMock: Material = {
      id: 'm1',
      nombre: 'Plástico',
      confianza: 0.92,
      puntosOtorgados: 10
    };
    const resultadoMock: ResultadoClasificacion = {
      material: materialMock,
      exito: true
    };
    return of(resultadoMock).pipe(delay(1000));
  }

  obtenerHistorial(usuarioId: string): Observable<RegistroReciclaje[]> {
    const historialMock: RegistroReciclaje[] = [
      {
        id: 'r1',
        usuarioId,
        material: { id: 'm1', nombre: 'Plástico', puntosOtorgados: 10 },
        fecha: '2026-09-01',
        puntosGanados: 10
      },
      {
        id: 'r2',
        usuarioId,
        material: { id: 'm2', nombre: 'Vidrio', puntosOtorgados: 15 },
        fecha: '2026-09-05',
        puntosGanados: 15
      }
    ];
    return of(historialMock).pipe(delay(500));
  }
}