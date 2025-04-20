import { z } from 'zod';

//? Schema para validar los datos de creación de un producto
export const productCreateSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(50, 'El nombre es muy largo'),
  description: z
    .string()
    .min(1, 'Descripción requerida')
    .max(200, 'La descripción es muy larga'),
  price: z
    .number()
    .min(0, 'Precio requerido')
    .max(99999999, 'El precio es muy alto'),
  image_url: z.string().url('URL inválida'),
  stock: z
    .number()
    .min(0, 'Stock requerido')
    .max(99999999, 'El stock es muy alto'),
  category: z
    .string()
    .min(1, 'Categoría requerida')
    .max(20, 'La categoría es muy larga'),
  discountPorcentage: z
    .number()
    .min(0, 'Descuento requerido')
    .max(100, 'El descuento es muy alto'),
  rating: z.number().min(0).max(5),
});

//? Schema para validar los datos a editar de un producto
export const productUpdateSchema = productCreateSchema.partial();