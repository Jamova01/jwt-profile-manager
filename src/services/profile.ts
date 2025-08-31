import api from "@/lib/axios";
import { getSessionAction } from "@/lib/actions";
import {
  ProfileApiResponse,
  UpdateProfileData,
  UpdateProfileResponse,
} from "@/types/profile";

async function buildAuthHeaders(contentType?: string) {
  const session = await getSessionAction();

  if (!session?.access) {
    throw new Error("No session token found");
  }

  return {
    Authorization: `Bearer ${session.access}`,
    ...(contentType && { "Content-Type": contentType }),
  };
}

export async function getProfile(): Promise<ProfileApiResponse> {
  const headers = await buildAuthHeaders();
  const { data } = await api.get<ProfileApiResponse>("/perfil/", { headers });
  return data;
}

export async function updateProfile(
  payload: Partial<UpdateProfileData>
): Promise<UpdateProfileData> {
  const headers = await buildAuthHeaders("application/json");
  const { data } = await api.put<UpdateProfileResponse>(
    "/usuario/perfil/",
    payload,
    { headers }
  );

  return data.data;
}

export async function updateProfilePhoto(
  foto: File
): Promise<{ message: string; status: string }> {
  const headers = await buildAuthHeaders("multipart/form-data");

  const formData = new FormData();
  formData.append("foto", foto);

  const { data } = await api.patch<{ message: string; status: string }>(
    "/perfil/foto/",
    formData,
    { headers }
  );

  return data;
}
