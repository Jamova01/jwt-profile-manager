import api from "@/lib/axios";
import { UserProfile } from "@/types/user";

export interface UpdateProfilePayload {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  telefono: string;
  tipo_usuario: string;
  tipo_naturaleza: string;
  biografia?: string;
  documento: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  sitio_web?: string;
  esta_verificado?: boolean;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile> {
  const { data } = await api.put("/usuario/perfil/", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const profile = data?.data;

  return {
    user: {
      username: profile.user.username,
      first_name: profile.user.first_name,
      last_name: profile.user.last_name,
      email: profile.user.email,
    },
    telefono: profile.telefono,
    tipo_usuario: profile.tipo_usuario,
    tipo_naturaleza: profile.tipo_naturaleza,
    biografia: profile.biografia,
    documento: profile.documento,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    github: profile.github,
    sitio_web: profile.sitio_web,
    esta_verificado: profile.esta_verificado,
  };
}

export async function updateProfilePhoto(foto: File) {
  const formData = new FormData();
  formData.append("foto", foto);

  const { data } = await api.patch("/perfil/foto/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
