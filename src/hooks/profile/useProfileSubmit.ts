import { useState } from "react";
import { toast } from "sonner";
import { updateProfile } from "@/services/profile";
import { ProfileFormValues } from "@/schemas/profile";

export function useProfileSubmit() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    try {
      await updateProfile(values);

      toast.success("Perfil actualizado 🎉", {
        description: "Tus cambios se guardaron correctamente.",
        duration: 3000,
      });
    } catch {
      toast.error("Algo salió mal ❌", {
        description: "No pudimos actualizar tu perfil.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
}
