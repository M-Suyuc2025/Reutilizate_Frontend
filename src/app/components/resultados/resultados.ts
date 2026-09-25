import { Component } from '@angular/core';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class Resultados {

  resultado = {
    material: 'Botella de Plástico (PET)',
    descripcion: 'El plástico PET es altamente reciclable. Reutilizarlo reduce la contaminación ambiental y permite crear objetos funcionales para el hogar.'
  };
}