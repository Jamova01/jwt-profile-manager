"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { logoutAction } from "@/lib/actions";
import { updateProfile } from "@/services/profile";
import { initials } from "@/lib/helpers";

import { profileSchema, ProfileFormValues } from "@/schemas/profile";
import { ProfileApiResponse } from "@/types/profile";

import { Form } from "@/components/atoms/form";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { ProfilePhotoForm } from "@/components/molecules/ProfilePhotoForm";
import { FormTextField } from "../molecules/FormTextField";
import { FormTextareaField } from "../molecules/FormTextareaField";

export function ProfileForm({ profile }: { profile: ProfileApiResponse }) {
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

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
        description: "No pudimos actualizar tu perfil. Intenta de nuevo.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutAction();
      router.push("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <Card className="shadow-lg lg:col-span-1">
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32 border-2 border-indigo-500">
              <AvatarImage
                src={form.watch("user.foto")}
                alt={form.watch("user.first_name")}
              />
              <AvatarFallback className="text-xl font-semibold">
                {initials(
                  profile.data.basic_info?.first_name,
                  profile.data.basic_info?.last_name
                )}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg font-semibold">
              {form.watch("user.first_name")} {form.watch("user.last_name")}
            </CardTitle>
            <ProfilePhotoForm />
          </CardHeader>

          <CardContent className="space-y-4">
            <FormTextField
              control={form.control}
              name="documento"
              placeholder="Número de documento"
              label="Documento"
            />

            <FormTextField
              control={form.control}
              name="telefono"
              placeholder="Teléfono"
              label="Teléfono"
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormTextField
                control={form.control}
                name="user.first_name"
                label="Nombre"
                placeholder="John"
              />
              <FormTextField
                control={form.control}
                name="user.last_name"
                label="Apellido"
                placeholder="Doe"
              />

              <FormTextField
                control={form.control}
                name="user.email"
                label="Email"
                placeholder="john.doe@example.com"
              />

              <FormTextField
                control={form.control}
                name="tipo_naturaleza"
                label="Naturaleza"
                placeholder="natural"
                disabled={true}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Biografía</CardTitle>
            </CardHeader>
            <CardContent>
              <FormTextareaField
                control={form.control}
                name="biografia"
                label="Cuéntanos sobre ti"
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormTextField
                control={form.control}
                name="linkedin"
                label="LinkedIn"
                placeholder="https://linkedin.com/in/..."
              />
              <FormTextField
                control={form.control}
                name="twitter"
                label="Twitter"
                placeholder="https://twitter.com/..."
              />
              <FormTextField
                control={form.control}
                name="github"
                label="GitHub"
                placeholder="https://github.com/..."
              />
              <FormTextField
                control={form.control}
                name="sitio_web"
                label="Website"
                placeholder="https://example.com"
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="destructive"
              className="px-6 py-2"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </Button>
            <Button type="submit" className="px-6 py-2" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
