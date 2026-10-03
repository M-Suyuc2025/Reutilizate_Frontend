// Contrato con el backend (Reutil-zate). Los nombres vienen tal cual de la API.

export interface IdeaReutilizacion {
  title: string;
  description: string;
  difficulty: string;
  steps: string[];
}

// POST /api/waste/classify
export interface ClasificacionResponse {
  material: string;
  confidence: number;
  pointsEarned: number;
  saved: boolean;
  reuseIdeas: IdeaReutilizacion[];
}

// GET /api/waste/history
export interface RegistroHistorial {
  id: number;
  material: string;
  pointsEarned: number;
  createdAt: string;
}
export interface HistorialResponse {
  records: RegistroHistorial[];
}

// GET /api/points/summary
export interface ActividadPuntos {
  type: 'earn' | 'redeem';
  label: string;
  points: number;
  createdAt: string;
}
export interface PuntosResponse {
  totalPoints: number;
  activities: ActividadPuntos[];
}

// GET /api/rewards
export interface Recompensa {
  id: number;
  name: string;
  description: string | null;
  costPoints: number;
}
export interface RecompensasResponse {
  rewards: Recompensa[];
}

// POST /api/rewards/:id/redeem
export interface CanjeResponse {
  confirmationCode: string;
  pointsSpent: number;
  remainingPoints: number;
}

// Los materiales llegan en inglés (clases de Roboflow)
export const MATERIALES_ES: Record<string, { nombre: string; icono: string }> = {
  biodegradable: { nombre: 'Biodegradable', icono: '🍃' },
  cardboard: { nombre: 'Cartón', icono: '📦' },
  glass: { nombre: 'Vidrio', icono: '🍾' },
  metal: { nombre: 'Metal', icono: '🥫' },
  paper: { nombre: 'Papel', icono: '📄' },
  plastic: { nombre: 'Plástico', icono: '🧴' },
};

export function materialEs(clave: string): { nombre: string; icono: string } {
  return MATERIALES_ES[clave?.toLowerCase()] ?? { nombre: clave, icono: '♻️' };
}

// Extrae el mensaje de error que manda el backend ({ message } o { error })
export function mensajeError(err: any, porDefecto: string): string {
  return err?.error?.message || err?.error?.error || porDefecto;
}
