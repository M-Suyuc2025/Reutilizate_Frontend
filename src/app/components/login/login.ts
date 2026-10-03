import { ChangeDetectorRef, Component , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';
import { mensajeError } from '../../models/api.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private cdr = inject(ChangeDetectorRef);
  loginForm: FormGroup;
  cargando = false;
  errorMensaje = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    this.apiService.login(this.loginForm.value).subscribe({
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

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}