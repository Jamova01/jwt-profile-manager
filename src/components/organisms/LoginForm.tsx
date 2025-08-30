"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { loginSchema, LoginSchema } from "@/schemas/auth";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "@/components/atoms/form";
import { Button } from "@/components/atoms/button";
import { FormTextField } from "../molecules/FormTextField";

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const result = await login(values.username, values.password);

    if (result.success) {
      toast.success("¡Bienvenido!", {
        description: "Has iniciado sesión correctamente",
        duration: 3000,
      });
      router.push("/profile");
    } else {
      toast.error("Error al iniciar sesión", {
        description:
          result.error instanceof Error
            ? result.error.message
            : "Ocurrió un error",
        duration: 4000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormTextField
          name="username"
          label="Usuario"
          placeholder="Nombre de usuario"
          control={form.control}
          type="text"
        />

        <FormTextField
          name="password"
          label="Contraseña"
          placeholder="********"
          control={form.control}
          type="password"
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </Form>
  );
}
