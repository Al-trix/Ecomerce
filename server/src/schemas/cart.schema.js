import {z} from 'zod';

export const createCartSchema = z.object({
  product_id: z.string(),
  quantity: z.number().int().positive(),
  status: z.enum(['active', 'inactive']).optional(),
})

export const updateCartSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive(),
})

