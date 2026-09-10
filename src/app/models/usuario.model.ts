export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  puntos: number;
  fechaRegistro?: string;
}

export interface Credenciales {
  email: string;
  password: string;
}

export interface RegistroUsuario extends Credenciales {
  nombre: string;
}

export interface RespuestaAuth {
  token: string;
  usuario: Usuario;
}