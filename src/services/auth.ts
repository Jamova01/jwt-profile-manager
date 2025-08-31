import { AxiosError } from "axios";
import api from "@/lib/axios";
import { LoginApiResponse, LoginPayload, LoginResponse } from "@/types/auth";

export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginApiResponse>("/login/", payload);
    return data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.detail ??
        error.message ??
        "Error desconocido en login";
      throw new Error(message);
    }
    throw new Error("Error inesperado en login");
  }
}
