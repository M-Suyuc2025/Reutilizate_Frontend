import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Captura } from './components/captura/captura';
import { Resultados } from './components/resultados/resultados';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'captura', component: Captura },
  { path: 'resultados', component: Resultados },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: '**', redirectTo: '' }
];