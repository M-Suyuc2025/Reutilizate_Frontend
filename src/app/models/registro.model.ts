import { Material } from "./material.model";
export interface RegistroReciclaje {
  id: string;
  usuarioId: string;
  material: Material;
  fecha: string;
  puntosGanados: number;
}