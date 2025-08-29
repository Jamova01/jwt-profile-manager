"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/auth";
import { loginRequest } from "@/services/authService";
import { loginAction } from "@/lib/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: LoginSchema) => {
    setIsLoading(true);
    try {
      const { access, refresh } = await loginRequest(
        values.username,
        values.password
      );

      await loginAction(access, refresh);

      form.reset();

      toast.success("¡Bienvenido!", {
        description: "Has iniciado sesión correctamente",
        duration: 3000,
      });

      router.push("/profile");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("¡Upps! Error al iniciar sesión", {
          description: error.message,
          duration: 4000,
        });
      }
      form.setValue("password", "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </Form>
  );
}
