import { z } from 'zod';

//? Schema para validar los datos de resgistro del usuario
export const userRegisterSchema = z.object({
  name: z
    .string({
      required_error: 'Nombre requerido',
    })
    .min(1, 'El nombre es demasiado corto')
    .max(50, 'El nombre es muy largo'),
  avatar: z.string({
    required_error: 'Avatar requerido',
  }),
  city: z
    .string({
      required_error: 'Nombre de la ciudad requerido',
    })
    .min(1, 'Nombre de la ciudad es demasiado corto')
    .max(30, 'El nombre es muy largo'),
  email: z
    .string({
      required_error: 'Email requerido',
    })
    .email('Email inválido')
    .max(50, 'El email es muy largo'),
  phone: z
    .string({
      required_error: 'Teléfono requerido',
    })
    .min(1, 'Teléfono demasiado corto')
    .max(15, ' El teléfono es muy largo'),
  address: z
    .string({
      required_error: 'Dirección requerida',
    })
    .min(1, 'Dirección demasiado corta')
    .max(100, 'La dirección es muy larga'),
  password: z
    .string({
      required_error: 'Contraseña requerida',
    })
    .min(8, 'La contraseña debe ser de 8 caracteres o más')
    .max(70, 'La contraseña es muy larga'),
});

//? Schema para validar los datos de resgistro del vendedor
export const sellerRegisterSchema = z.object({
  ...userRegisterSchema.pick({
    name: true,
    avatar: true,
    city: true,
    email: true,
    phone: true,
    address: true,
    password: true,
  }).shape,
  store_name: z
    .string({
      required_error: 'Nombre de la tienda requerido',
    })
    .min(1, 'Nombre de la tienda es demasiado corto')
    .max(50, 'El nombre es muy largo'),
});

//? Schema para validar los datos a editar del vendedor
export const sellerUpdateSchema = sellerRegisterSchema.partial();


//? Schema para validar los datos a editar del usuario
export const userUpdateSchema = userRegisterSchema.partial();

//? Schema para validar los datos de login del usuario y vendedor
export const loginSchema = z.object(
  userRegisterSchema.pick({
    email: true,
    password: true,
  }).shape
);

//! Tipando cada schema
export type UserRegister = z.infer<typeof userRegisterSchema>;
export type SellerRegister = z.infer<typeof sellerRegisterSchema>;
export type SellerUpdate = z.infer<typeof sellerUpdateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type Login = z.infer<typeof loginSchema>;






