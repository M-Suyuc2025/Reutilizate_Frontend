import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil-puntos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-puntos.html',
  styleUrl: './perfil-puntos.css'
})
export class PerfilPuntos {
  
  usuario = {
    nombre: 'Usuario',
    nivel: 'Reciclador Avanzado 🌿',
    puntosTotales: 350,
    impactoKg: 12.5
  };

  insignias = [
    { titulo: 'Primer Escáner', desc: 'Completaste tu primer análisis de residuos', icono: '🌱', obtenida: true },
    { titulo: 'Plástico Cero', desc: 'Reciclaste más de 5 botellas PET', icono: '🍾', obtenida: true },
    { titulo: 'Eco Master', desc: 'Alcanza los 500 puntos de reciclaje', icono: '👑', obtenida: false }
  ];

  historial = [
    { fecha: '2026-09-27', material: 'Botella de Plástico PET', puntos: 50, icono: '🍾' },
    { fecha: '2026-09-25', material: 'Lata de Aluminio', puntos: 30, icono: '🥫' },
    { fecha: '2026-09-20', material: 'Caja de Cartón', puntos: 20, icono: '📦' },
    { fecha: '2026-09-18', material: 'Botella de Vidrio', puntos: 40, icono: '🍾' }
  ];
}