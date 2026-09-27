export interface Material {
  id: string;
  nombre: string;          
  confianza?: number;      
  puntosOtorgados: number;
}

export interface ResultadoClasificacion {
  material: Material;
  imagenUrl?: string;
  exito: boolean;
  mensajeError?: string;
}