// Contrato con el backend: POST /api/auth/login y /api/auth/register
export interface Usuario {
  id: number;
  name: string;
  email: string;
}

export interface Credenciales {
  email: string;
  password: string;
}

export interface RegistroUsuario extends Credenciales {
  nombre: string;
}

export interface RespuestaAuth {
  message: string;
  token: string;
  user: Usuario;
}
