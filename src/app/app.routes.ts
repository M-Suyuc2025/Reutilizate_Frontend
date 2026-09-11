import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Captura } from './components/captura/captura';
import { Resultados } from './components/resultados/resultados';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'captura', component: Captura },
  { path: 'resultados', component: Resultados },
  { path: '**', redirectTo: '' }
];