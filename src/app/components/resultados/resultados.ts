import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { materialEs } from '../../models/api.model';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class Resultados implements OnInit {
  resultado: any = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['resultado']) {
      this.resultado = navigation.extras.state['resultado'];
    }
  }

  ngOnInit(): void {
    if (!this.resultado && isPlatformBrowser(this.platformId)) {
      if (history.state?.resultado) {
        this.resultado = history.state.resultado;
      }
    }

    if (!this.resultado) {
      this.router.navigate(['/captura']);
    }
  }

  get material(): { nombre: string; icono: string } {
    return materialEs(this.resultado?.material);
  }

  get confianza(): number {
    return Math.round((this.resultado?.confidence ?? 0) * 100);
  }

  volverACapturar(): void {
    this.router.navigate(['/captura']);
  }
}