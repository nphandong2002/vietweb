import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const roomValidate = zodResolver(
  z.object({
    name: z.string().min(1),
    type: z.string().min(1),
  })
);
