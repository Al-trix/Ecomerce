import { z } from 'zod';

//? Schema para validar los datos de creacion de un carrito
export const createCartSchema = z.object({
  product_id: z.string({
    required_error: 'El producto es requerido',
    invalid_type_error: 'Product id no es un string valido',
  }),
  quantity: z
    .number({
      required_error: 'La cantidad es requerida',
    })
    .int('La cantidad no es un numero valido')
    .positive('La cantidad debe ser positiva'),
  status: z
    .enum(['active', 'inactive'], {
      required_error: 'El estado es requerido',
      invalid_type_error: 'El estado no es un string valido',
    })
    .optional(),
});

//? Schema para validar los datos de actualizacion de un carrito
export const updateCartSchema = z.object({
  id: z.string({
    required_error: 'El id es requerido',
    invalid_type_error: 'El id no es un string valido',
  }),
  ...createCartSchema.pick({
    quantity: true,
  }).shape,
});

//! tipado de los shcemas
export type CreateCartInput = z.TypeOf<typeof createCartSchema>;
export type UpdateCartInput = z.TypeOf<typeof updateCartSchema>;

