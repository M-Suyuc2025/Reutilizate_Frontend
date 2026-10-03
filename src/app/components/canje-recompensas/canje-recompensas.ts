import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID , inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api';
import { mensajeError, Recompensa } from '../../models/api.model';

@Component({
  selector: 'app-canje-recompensas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canje-recompensas.html',
  styleUrl: './canje-recompensas.css'
})
export class CanjeRecompensas implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  puntosUsuario = 0;
  recompensas: Recompensa[] = [];
  cargando = true;
  canjeandoId: number | null = null;
  errorMensaje = '';
  exitoMensaje = '';

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.api.obtenerRecompensas().subscribe({
      next: (r) => {
        this.recompensas = r.rewards;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = mensajeError(err, 'No se pudo cargar el catálogo de recompensas.');
        this.cdr.markForCheck();
      }
    });

    this.api.obtenerPuntos().subscribe({
      next: (r) => {
        this.puntosUsuario = r.totalPoints;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMensaje = mensajeError(err, 'No se pudieron cargar tus puntos.');
        this.cdr.markForCheck();
      }
    });
  }

  canjearPremio(recompensa: Recompensa): void {
    if (this.canjeandoId !== null || this.puntosUsuario < recompensa.costPoints) return;

    this.canjeandoId = recompensa.id;
    this.errorMensaje = '';
    this.exitoMensaje = '';

    this.api.canjearRecompensa(recompensa.id).subscribe({
      next: (r) => {
        this.puntosUsuario = r.remainingPoints;
        this.exitoMensaje =
          `¡Canjeaste "${recompensa.name}"! Tu código de confirmación es ${r.confirmationCode}. ` +
          `Te quedan ${r.remainingPoints} puntos.`;
        this.canjeandoId = null;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMensaje = mensajeError(err, 'No se pudo completar el canje.');
        this.canjeandoId = null;
        this.cdr.markForCheck();
      }
    });
  }
}
