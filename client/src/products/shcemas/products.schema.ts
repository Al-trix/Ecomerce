import { z } from 'zod';

//? Schema para validar los datos de creación de un producto
export const productCreateSchema = z.object({
  name: z
    .string({
      required_error: 'Nombre requerido',
    })
    .min(1, 'El nombre es demasiado corto')
    .max(50, 'El nombre es muy largo'),
  description: z
    .string({
      required_error: 'Descripción requerida',
    })
    .min(10, 'Descripción demasiado corta')
    .max(600, 'La descripción es muy larga'),
  price: z
    .number({
      required_error: 'Precio requerido',
    })
    .min(0, 'Debe ser un precio real')
    .max(9999999, 'El precio es muy alto'),
  image_url: z.string({
    required_error: 'Imagen requerida',
  }),
  stock: z
    .number({
      required_error: 'Cantidad requerida',
    })
    .min(0, 'Debes tener mas de un articulo en stock')
    .max(99999999, 'El stock es muy alto'),
  category: z
    .string({
      required_error: 'Categoría requerida',
    })
    .min(3, 'La categorai es muy corta')
    .max(10, 'La categoría es muy larga'),
  discountPorcentage: z
    .number({
      required_error: 'Descuento requerido',
    })
    .min(0, 'Ingresa un descuento real')
    .max(100, 'El descuento es muy alto'),
  rating: z
    .number({
      required_error: 'Calificación requerida',
    })
    .min(0)
    .max(5)
    .positive({
      message: 'La calificación debe ser positiva',
    }),
});

//? Schema para validar los datos a editar de un producto
export const productUpdateSchema = productCreateSchema.partial();

//! tipado de los shcemas
export type productCreateSchema = z.infer<typeof productCreateSchema>;
export type productUpdateSchema = z.infer<typeof productUpdateSchema>;
