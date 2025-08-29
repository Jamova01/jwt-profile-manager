import api from "@/lib/axios";
import { UserProfile } from "@/types/user";

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get("/perfil/");
  const data = response.data?.data;

  return {
    user: {
      username: data.basic_info.username,
      first_name: data.basic_info.first_name,
      last_name: data.basic_info.last_name,
      email: data.basic_info.email,
      foto: data.basic_info.foto,
    },
    telefono: data.basic_info.telefono,
    tipo_usuario: data.tipo_usuario,
    tipo_naturaleza: data.tipo_naturaleza,
    biografia: data.basic_info.biografia,
    documento: data.basic_info.documento,
    linkedin: data.basic_info.redes_sociales.linkedin,
    twitter: data.basic_info.redes_sociales.twitter,
    github: data.basic_info.redes_sociales.github,
    sitio_web: data.basic_info.redes_sociales.sitio_web,
    esta_verificado: data.esta_verificado,
  };
}
