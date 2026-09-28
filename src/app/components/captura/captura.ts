import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captura',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './captura.css',
  templateUrl: './captura.html',
})

export class Captura {
  archivoSeleccionado: File | null = null;
  imagenPreview: string | null = null;
  cargando: boolean = false;

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.procesarArchivo(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.procesarArchivo(event.dataTransfer.files[0]);
    }
  }

  private procesarArchivo(file: File): void {
    this.archivoSeleccionado = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  limpiarImagen(): void {
    this.archivoSeleccionado = null;
    this.imagenPreview = null;
  }

  analizarImagen(): void {
    if (!this.archivoSeleccionado) return;

    this.cargando = true;
    
    //Simulación del backend mientras el equipo conecta el ApiService
    setTimeout(() => {
      this.cargando = false;
      
      const resultadoMock = {
        imagen: this.imagenPreview, // <-- Pasamos la imagen capturada
        material: 'Botella de Plástico PET',
        descripcion: 'Polietileno Tereftalato, comúnmente utilizado en envases de bebidas y agua.',
        proyectos: [
          {
            nombre: 'Maceta Colgante',
            descripcion: 'Corta la botella por la mitad, realiza agujeros en la base para el drenaje y decórala a tu gusto.',
            dificultad: 'Fácil'
          },
          {
            nombre: 'Organizador de Escritorio',
            descripcion: 'Utiliza la base de varias botellas para clasificar lápices, lapiceros y clips.',
            dificultad: 'Fácil'
          }
        ]
      };

      this.router.navigate(['/resultados'], {
        state: { resultado: resultadoMock }
      });
    }, 1200);
  }
}