import { useState } from "react";
import { loginRequest } from "@/services/authService";
import { loginAction } from "@/lib/actions";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const { access, refresh } = await loginRequest(username, password);
      await loginAction(access, refresh);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
