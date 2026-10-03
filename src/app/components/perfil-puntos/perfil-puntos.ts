import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID , inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';
import { materialEs, mensajeError, RegistroHistorial } from '../../models/api.model';

interface ItemHistorial {
  fecha: string;
  material: string;
  puntos: number;
  icono: string;
}

@Component({
  selector: 'app-perfil-puntos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-puntos.html',
  styleUrl: './perfil-puntos.css'
})
export class PerfilPuntos implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  cargando = true;
  errorMensaje = '';

  usuario = { nombre: 'Usuario', nivel: '', puntosTotales: 0, totalReciclajes: 0 };
  historial: ItemHistorial[] = [];
  insignias: { titulo: string; desc: string; icono: string; obtenida: boolean }[] = [];

  constructor(
    private api: ApiService,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // En el render del servidor (SSR) no hay token; cargamos solo en el navegador
    if (!isPlatformBrowser(this.platformId)) return;

    this.usuario.nombre = this.auth.obtenerUsuario()?.name ?? 'Usuario';

    this.api.obtenerPuntos().subscribe({
      next: (r) => {
        this.usuario.puntosTotales = r.totalPoints;
        this.usuario.nivel = this.calcularNivel(r.totalPoints);
        this.actualizarInsignias();
        this.cdr.markForCheck();
      },
      error: (err) => this.fallo(err)
    });

    this.api.obtenerHistorial().subscribe({
      next: (r) => {
        this.historial = r.records.map((x: RegistroHistorial) => {
          const m = materialEs(x.material);
          return {
            fecha: new Date(x.createdAt).toLocaleDateString('es-GT'),
            material: m.nombre,
            puntos: x.pointsEarned,
            icono: m.icono
          };
        });
        this.usuario.totalReciclajes = r.records.length;
        this.actualizarInsignias();
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => this.fallo(err)
    });
  }

  private fallo(err: any): void {
    this.cargando = false;
    this.errorMensaje = mensajeError(err, 'No se pudieron cargar tus datos. Verifica la conexión con el servidor.');
    this.cdr.markForCheck();
  }

  private calcularNivel(puntos: number): string {
    if (puntos >= 500) return 'Eco Master 👑';
    if (puntos >= 200) return 'Reciclador Avanzado 🌿';
    if (puntos >= 50) return 'Reciclador Activo ♻️';
    return 'Reciclador Novato 🌱';
  }

  private actualizarInsignias(): void {
    const { puntosTotales, totalReciclajes } = this.usuario;
    this.insignias = [
      { titulo: 'Primer Escáner', desc: 'Completaste tu primer reciclaje', icono: '🌱', obtenida: totalReciclajes >= 1 },
      { titulo: 'Reciclador Constante', desc: 'Registraste 10 reciclajes', icono: '♻️', obtenida: totalReciclajes >= 10 },
      { titulo: 'Eco Master', desc: 'Alcanza los 500 puntos de reciclaje', icono: '👑', obtenida: puntosTotales >= 500 },
    ];
  }
}
