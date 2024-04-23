import * as z from 'zod';

export const loginValidate = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  code: z.optional(z.string()),
});
export const registerValidate = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});
