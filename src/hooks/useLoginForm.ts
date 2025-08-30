import { useState } from "react";
import { loginRequest } from "@/services/authService";
import { loginAction } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginResponse {
  access: string;
  refresh: string;
}

export function useLoginForm(): {
  login: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
} {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const { access, refresh }: LoginResponse = await loginRequest(
        username,
        password
      );
      await loginAction(access, refresh);
      toast.success("¡Bienvenido!", {
        description: "Has iniciado sesión correctamente",
        duration: 3000,
      });
      router.push("/profile");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocurrió un error";
      toast.error("Error al iniciar sesión", {
        description: message,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
