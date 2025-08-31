"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/schemas/profile";

import { updateProfile } from "@/services/profile";
import { initials } from "@/lib/helpers";
import { toast } from "sonner";

import { ProfileApiResponse } from "@/types/profile";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { ProfilePhotoForm } from "@/components/molecules/ProfilePhotoForm";

export function ProfileForm({ profile }: { profile: ProfileApiResponse }) {
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
        description: "No pudimos actualizar tu perfil. Intenta de nuevo.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
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
            <FormField
              control={form.control}
              name="documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Número de documento" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+1 234 567 890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="user.first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="john.doe@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo_naturaleza"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naturaleza</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Biografía</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="biografia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuéntanos sobre ti</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Escribe una breve bio..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://twitter.com/..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://github.com/..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sitio_web"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="px-6 py-2" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
