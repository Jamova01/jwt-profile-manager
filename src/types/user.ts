export type UserProfile = {
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    foto?: string;
  };
  telefono: string;
  tipo_usuario: string;
  tipo_naturaleza: string;
  biografia: string;
  documento: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  sitio_web?: string;
  esta_verificado: boolean;
};
