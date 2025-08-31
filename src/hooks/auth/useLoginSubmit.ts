import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginRequest } from "@/services/auth";
import { loginAction } from "@/lib/actions";
import type { LoginResponse } from "@/types/auth";
import type { LoginSchema } from "@/schemas/auth";

export function useLoginSubmit() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: LoginSchema): Promise<void> => {
    setIsLoading(true);

    try {
      const { access, refresh }: LoginResponse = await loginRequest(values);

      await loginAction(access, refresh);

      toast.success("¡Bienvenido!", {
        description: "Has iniciado sesión correctamente",
        duration: 3000,
      });

      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Error al iniciar sesión", {
        description: "No se pudo iniciar sesión, intenta más tarde.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
}
