import { z } from 'zod';

//? Schema para validar los datos de resgistro del usuario
export const userRegisterSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(50, 'El nombre es muy largo'),
  email: z.string().email('Email inválido').max(50, 'El email es muy largo'),
  phone: z
    .string()
    .min(1, 'Teléfono requerido')
    .max(15, ' El teléfono es muy largo'),
  address: z
    .string()
    .min(1, 'Dirección requerida')
    .max(100, 'La dirección es muy larga'),
  password: z
    .string()
    .min(8, 'Contraseña requerida')
    .max(70, 'La contraseña es muy larga'),
});

//? Schema para validar los datos de resgistro del vendedor
export const sellerRegisterSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(50, 'El nombre es muy largo'),
  email: z.string().email('Email inválido').max(50, 'El email es muy largo'),
  phone: z
    .string()
    .min(1, 'Teléfono requerido')
    .max(15, ' El teléfono es muy largo'),
  store_name: z
    .string()
    .min(1, 'Nombre de la tienda requerido')
    .max(50, 'El nombre de la tienda es muy largo'),
  password: z
    .string()
    .min(8, 'Contraseña requerida')
    .max(70, 'La contraseña es muy larga'),
});

//? Schema para validar los datos a editar del vendedor
export const sellerUpdateSchema = sellerRegisterSchema.partial();

//? Schema para validar los datos de login del usuario y vendedor
export const loginSchema = z.object({
  email: z.string().email('Email inválido').max(50, 'El email es muy largo'),
  password: z
    .string()
    .min(8, 'Contraseña requerida')
    .max(70, 'La contraseña es muy larga'),
});

//? Schema para validar los datos a editar del usuario
export const userUpdateSchema = userRegisterSchema.partial();
