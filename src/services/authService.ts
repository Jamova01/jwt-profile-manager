import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://46.202.88.87:8010/usuarios/api",
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginResponse = {
  data: {
    access: string;
    refresh: string;
  };
};

export async function loginRequest(
  username: string,
  password: string
): Promise<{ access: string; refresh: string }> {
  try {
    const response = await api.post<LoginResponse>("/login/", {
      username,
      password,
    });

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail?: string }>;

    const message =
      axiosError.response?.data?.detail ||
      axiosError.message ||
      "Error desconocido en login";

    throw new Error(message);
  }
}
