import { z } from 'zod';

export const passwordSchema = z.string()
  .min(8, { message: "Debe ser de al menos 8 caracteres" })
  .regex(/[A-Z]+/, "Debe de tener al menos una letra mayúscula")
  .regex(/[0-9]+/, "Debe de tener al menos un número")
  .regex(/[!@#$%^&*]+/, "Debe tener al menos un caracter especial (!@#$%^&*)");