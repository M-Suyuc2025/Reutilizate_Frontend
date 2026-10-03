import { ChangeDetectorRef, Component , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';
import { mensajeError } from '../../models/api.model';

function passwordsIgualesValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmarPassword = control.get('confirmarPassword')?.value;
  return password === confirmarPassword ? null : { passwordsNoCoinciden: true };
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  private cdr = inject(ChangeDetectorRef);
  registroForm: FormGroup;
  cargando = false;
  errorMensaje = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]]
    }, { validators: passwordsIgualesValidator });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    const { nombre, email, password } = this.registroForm.value;

    this.apiService.registrar({ nombre, email, password }).subscribe({
      next: (respuesta) => {
        this.authService.guardarSesion(respuesta.token, respuesta.user);
        this.cargando = false;
        this.cdr.markForCheck();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMensaje = mensajeError(err, 'No se pudo conectar con el servidor.');
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  get nombre() {
    return this.registroForm.get('nombre');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  get confirmarPassword() {
    return this.registroForm.get('confirmarPassword');
  }
}