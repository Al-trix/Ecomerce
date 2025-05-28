import {z} from 'zod';

//? Schema para validar los datos de registro de un pedido
export const orderSchema = z.object({
  status: z.enum(['pending', 'completed', 'canceled',], {
    required_error: 'Estado es requerido',
    invalid_type_error: 'Estado no es un string valido',
  }),
})

//! tipado de los shcemas
export type orderSchema = z.infer<typeof orderSchema>;