"use client";

import { useState } from "react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/atoms/form";
import { updateProfilePhoto } from "@/services/profile";
import { toast } from "sonner";

export function ProfilePhotoForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await updateProfilePhoto(file);
      console.log("Foto actualizada ✅");
      toast.success("Foto actualizada 🎉", {
        description: "Tus cambios se guardaron correctamente.",
        duration: 3000,
      });
    } catch {
      toast.error("Algo salió mal ❌", {
        description: "No pudimos actualizar tu perfil. Intenta de nuevo.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      <FormItem>
        <FormLabel>Actualizar foto</FormLabel>
        <FormControl>
          <Input
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <Button
        type="button"
        onClick={handleUpdate}
        disabled={loading || !file}
        className="w-full"
      >
        {loading ? "Guardando..." : "Subir nueva foto"}
      </Button>
    </div>
  );
}
