import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions";

export function useLogout() {
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutAction();
      router.push("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return { loggingOut, handleLogout };
}
