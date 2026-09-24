import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './resultados.css',
  templateUrl: './resultados.html',
})

export class Resultados implements OnInit {
  resultado: any = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['resultado']) {
      this.resultado = navigation.extras.state['resultado'];
    }
  }

  ngOnInit(): void {
    // Lee el estado enviado desde la pantalla de Captura
    if (!this.resultado && history.state?.resultado) {
      this.resultado = history.state.resultado;
    }

    // Si alguien entra a /resultados directamente sin haber subido foto, lo redirige a /captura
    if (!this.resultado) {
      this.router.navigate(['/captura']);
    }
  }

  volverACapturar(): void {
    this.router.navigate(['/captura']);
  }
}