import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'captura', component: Inicio },
  { path: 'resultados', component: Inicio }
];