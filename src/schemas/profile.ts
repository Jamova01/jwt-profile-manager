import * as z from "zod";

export const profileSchema = z.object({
  user: z.object({
    first_name: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
      .max(50, { message: "El nombre no puede superar los 50 caracteres" }),
    last_name: z
      .string()
      .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
      .max(50, { message: "El apellido no puede superar los 50 caracteres" }),
    email: z.email({ message: "Debe ser un correo válido" }),
    foto: z.url({ message: "Debe ser una URL válida" }).optional(),
  }),

  telefono: z
    .string()
    .regex(/^[0-9+\- ]+$/, { message: "Número de teléfono inválido" }),

  tipo_usuario: z.string().min(1, { message: "Selecciona un tipo de usuario" }),
  tipo_naturaleza: z.string().min(1, { message: "Selecciona una naturaleza" }),

  biografia: z
    .string()
    .max(500, { message: "La biografía no puede superar los 500 caracteres" })
    .optional(),

  documento: z
    .string()
    .min(5, { message: "El documento debe tener al menos 5 caracteres" }),

  linkedin: z.string().url({ message: "Debe ser una URL válida" }).optional(),
  twitter: z.string().url({ message: "Debe ser una URL válida" }).optional(),
  github: z.string().url({ message: "Debe ser una URL válida" }).optional(),
  sitio_web: z.string().url({ message: "Debe ser una URL válida" }).optional(),

  esta_verificado: z.boolean().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
