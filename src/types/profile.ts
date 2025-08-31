export interface SocialLinks {
  github?: string;
  linkedin?: string;
  sitio_web?: string;
  twitter?: string;
}

export interface BasicInfo {
  id_usuario: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  telefono: string;
  foto?: string;
  biografia: string;
  documento: string;
  redes_sociales: SocialLinks;
}

export interface Educacion {
  id: number;
  usuario_id: number;
  institucion: string;
  titulo: string;
  campo_estudio: string;
  completado: boolean;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface ExperienciaLaboral {
  id: number;
  empresa: string;
  posicion: string;
  actualmente: boolean;
  fecha_inicio: string;
  fecha_fin: string | null;
  funciones: string;
  habilidades: { id: number; nombre: string }[];
}

export interface Habilidad {
  id: number;
  habilidad_id: number;
  habilidad__nombre: string;
  empresa_adquisicion: string;
  tiempo_experiencia: number;
  esta_verificado: boolean;
}

export interface Portafolio {
  id: number;
  usuario_id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  fecha: string;
  archivo: string;
  imagen: string;
  url: string | null;
}

export interface CursoImpartido {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface ProfileData {
  basic_info: BasicInfo;
  cursos_impartidos: CursoImpartido[];
  educacion: Educacion[];
  experiencia_laboral: ExperienciaLaboral[];
  habilidades: Habilidad[];
  portafolio: Portafolio[];
  tipo_usuario: string;
  esta_verificado: boolean;
}

export interface ProfileApiResponse {
  data: ProfileData;
  message: string;
  status: string;
}

export interface UpdateProfileUser {
  first_name: string;
  last_name: string;
}

export interface UpdateProfileData {
  biografia: string;
  documento: string;
  esta_verificado: boolean;
  telefono: string;
  tipo_usuario: string;
  tipo_naturaleza: string;

  // Redes sociales
  github?: string;
  linkedin?: string;
  sitio_web?: string;
  twitter?: string;

  user: UpdateProfileUser;
}

export interface UpdateProfileResponse {
  data: UpdateProfileData;
  message: string;
  status: string;
}
