import * as z from "zod";



export const loginValidate = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });

