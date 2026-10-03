import { ChangeDetectorRef, Component , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';
import { mensajeError } from '../../models/api.model';

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024; // mismo límite que el backend (5 MB)

@Component({
  selector: 'app-captura',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './captura.css',
  templateUrl: './captura.html',
})

export class Captura {
  private cdr = inject(ChangeDetectorRef);
  archivoSeleccionado: File | null = null;
  imagenPreview: string | null = null;
  cargando: boolean = false;
  errorMensaje = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  get logueado(): boolean {
    return this.authService.estaLogueado();
  }

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
    this.errorMensaje = '';

    // Validamos antes de enviar para no gastar una petición que el backend rechazaría
    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      this.errorMensaje = 'Formato no válido. Usa una imagen JPG, PNG o WEBP.';
      this.cdr.markForCheck();
      return;
    }
    if (file.size > MAX_BYTES) {
      this.errorMensaje = 'La imagen supera los 5 MB. Elige una más ligera.';
      this.cdr.markForCheck();
      return;
    }

    this.archivoSeleccionado = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  limpiarImagen(): void {
    this.archivoSeleccionado = null;
    this.imagenPreview = null;
    this.errorMensaje = '';
  }

  analizarImagen(): void {
    if (!this.archivoSeleccionado) return;

    this.cargando = true;
    this.errorMensaje = '';

    this.apiService.clasificarResiduo(this.archivoSeleccionado).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.cdr.markForCheck();
        this.router.navigate(['/resultados'], {
          state: { resultado: { ...respuesta, imagen: this.imagenPreview } }
        });
      },
      error: (err) => {
        this.cargando = false;
        this.cdr.markForCheck();
        if (err.status === 422) {
          this.errorMensaje = 'No pudimos reconocer el objeto. Prueba con una foto más clara y cercana.';
        } else if (err.status === 0) {
          this.errorMensaje = 'No hay conexión con el servidor. Verifica que el backend esté encendido.';
        } else if (err.status === 502 || err.status === 504) {
          this.errorMensaje = 'El servicio de clasificación no respondió. Intenta de nuevo en unos segundos.';
        } else {
          this.errorMensaje = mensajeError(err, 'No se pudo clasificar la imagen.');
        }
        this.cdr.markForCheck();
      }
    });
  }
}
