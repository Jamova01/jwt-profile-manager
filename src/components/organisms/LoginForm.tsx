"use client";

import { useLoginSubmit } from "@/hooks/auth/useLoginSubmit";

import { Form } from "@/components/atoms/form";
import { Button } from "@/components/atoms/button";
import { FormTextField } from "../molecules/FormTextField";

export function LoginForm() {
  const { form, onSubmit, isLoading } = useLoginSubmit();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
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
