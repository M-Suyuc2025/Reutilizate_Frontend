import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Necesario para el *ngFor

export interface Recompensa {
  id: number;
  titulo: string;
  descripcion: string;
  puntos: number;
  categoria: string;
}

@Component({
  selector: 'app-canje-recompensas',
  standalone: true,
  imports: [CommonModule], // <-- Agregado aquí
  templateUrl: './canje-recompensas.html',
  styleUrl: './canje-recompensas.css'
})
export class CanjeRecompensas { // <-- El nombre exacto que importas en app.routes.ts
  puntosUsuario: number = 150;

  recompensas: Recompensa[] = [
    {
      id: 1,
      titulo: 'Café Americano Gratis',
      descripcion: 'Canjeable en la cafetería principal presentando tu código de confirmación.',
      puntos: 50,
      categoria: 'Alimentos'
    },
    {
      id: 2,
      titulo: 'Descuento Eco-Tienda',
      descripcion: '15% de descuento en la compra de artículos reciclables seleccionados.',
      puntos: 100,
      categoria: 'Descuentos'
    },
    {
      id: 3,
      titulo: 'Kit de Semillas Orgánicas',
      descripcion: 'Un paquete completo de semillas para iniciar tu propio huerto urbano.',
      puntos: 200,
      categoria: 'Ecológico'
    }
  ];

  canjearPremio(recompensa: Recompensa): void {
    if (this.puntosUsuario >= recompensa.puntos) {
      this.puntosUsuario -= recompensa.puntos;
      alert(`¡Has canjeado "${recompensa.titulo}" con éxito! Te quedan ${this.puntosUsuario} puntos.`);
    } else {
      alert('No tienes suficientes puntos acumulados para este premio.');
    }
  }
}