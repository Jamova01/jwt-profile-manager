"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateProfile } from "@/services/profile";
import { ProfileFormValues, profileSchema } from "@/schemas/profile";
import { ProfileApiResponse } from "@/types/profile";

export function useProfileSubmit(profile: ProfileApiResponse) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      user: {
        first_name: profile.data.basic_info?.first_name ?? "",
        last_name: profile.data.basic_info?.last_name ?? "",
        email: profile.data.basic_info?.email ?? "",
      },
      telefono: profile.data.basic_info.telefono ?? "",
      tipo_usuario: profile.data.tipo_usuario ?? "",
      tipo_naturaleza: "natural",
      biografia: profile.data.basic_info.biografia ?? "",
      documento: profile.data.basic_info.documento ?? "",
      linkedin: profile.data.basic_info.redes_sociales.linkedin ?? "",
      twitter: profile.data.basic_info.redes_sociales.twitter ?? "",
      github: profile.data.basic_info.redes_sociales.github ?? "",
      sitio_web: profile.data.basic_info.redes_sociales.sitio_web ?? "",
      esta_verificado: profile.data.esta_verificado ?? false,
    },
  });

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

  return { form, onSubmit, loading };
}
