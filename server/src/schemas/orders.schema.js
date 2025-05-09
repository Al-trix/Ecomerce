import {z} from 'zod';

export const orderSchema = z.object({
  status: z.enum(['pending', 'completed', 'canceled',]),
})