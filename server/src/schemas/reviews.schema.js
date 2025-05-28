import { z } from 'zod';

//? Schema para validar los datos de creación de una reseña
export const reviewSchema = z.object({
  rating: z
    .number({
      required_error: 'Rating is required',
    })
    .min(1)
    .max(5)
    .positive({
      message: 'La calificación debe ser un número positivo',
    }),
  comment: z
    .string({
      required_error: 'Comentario requerido',
    })
    .min(1, 'El comentario es demasiado corto')
    .max(500, 'el comentario es muy largo'),
});

export const updateReviewSchema = reviewSchema.partial();

