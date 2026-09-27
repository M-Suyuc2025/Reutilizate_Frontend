import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
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
    
    if (!this.resultado && history.state?.resultado) {
      this.resultado = history.state.resultado;
    }

    if (!this.resultado) {
      this.router.navigate(['/captura']);
    }
  }

  volverACapturar(): void {
    this.router.navigate(['/captura']);
  }
}