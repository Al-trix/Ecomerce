import {
  userRegisterSchema,
  type UserRegister,
} from '../../schemas/auth.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../../components/Input.tsx';
import { registerUser } from '../api/actions.ts';
import { queryClient } from '../../../lib/queryClient.ts';
import { ClockLoader } from 'react-spinners';
import type {
  responseAuthUser,
  PartialAuthUser,
  PartialAuthUserError,
} from 'src/types/auth';
import type { AxiosError } from 'axios';
import Poup from '../../components/Poup';
import { useState, useEffect } from 'react';
import { useStepCountStore, useUserExistStore } from '../../../store/StepStates.tsx';
import { Link } from 'react-router';

interface ErrorAuth {
  error: PartialAuthUserError;
  message: string;
}

const AuthRegisterUser = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setStepCountStore = useStepCountStore((state) => state.setStepCount);
  const setUserExistStore = useUserExistStore((state) => state.setUserExist);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSumbit: SubmitHandler<UserRegister> = (data) => {
    const dataSend = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      city: data.city,
      phone: data.phone,
      address: data.address,
    };

    mutationRegister.mutate(dataSend);
  };
  const mutationRegister = useMutation<
    responseAuthUser,
    AxiosError<ErrorAuth>,
    PartialAuthUser
  >({
    mutationKey: ['user'],
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setStepCountStore();
      setUserExistStore(true);
    },
  });

  const errorsBackend: PartialAuthUser | undefined =
    mutationRegister.error?.response?.data.error;

  const TYPE_DUPLICATE: string | null | undefined =
    mutationRegister.error?.response?.data.error.typeError;

  useEffect(() => {
    if (TYPE_DUPLICATE === 'DATE_DUPLICATE') {
      setIsOpen(true);
    }
  }, [TYPE_DUPLICATE]);

  return (
    <section className="relative">
      <div
        className={`bg-black/40 backdrop-blur-xs border border-black/10 rounded-xl absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col transition-all duration-300 gap-y-2 ${
          mutationRegister.isPending ? 'opacity-100 z-50' : 'opacity-0 -z-10'
        }`}
      >
        <h4 className="text-2xl font-bold">Enviando...</h4>
        <ClockLoader loading size={100} speedMultiplier={1} className="z-50" />
      </div>
      <Poup
        isOpen={isOpen}
        onClose={() => {
          console.log('cerrado');
          setIsOpen(false);
        }}
      />
      <form
        onSubmit={handleSubmit(onSumbit)}
        className="mx-auto w-180  p-6 pt-0 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4 relative grid grid-cols-2 max-w-3xl gap-x-9 gap-y-4 w-full">
          <span className="absolute -bottom-7 h-px w-4/5 translate-x-1/2 right-1/2 bg-gray-400"></span>
          <Input
            label="Nombre"
            placeholder="Escribe tu nombre"
            type="text"
            register={register('name')}
            errorsBack={errorsBackend?.name}
            errorsZod={errors.name}
          />
          <Input
            label="Correo"
            placeholder="Escribe tu correo"
            type="email"
            register={register('email')}
            errorsBack={errorsBackend?.email}
            errorsZod={errors.email}
          />
          <Input
            label="Ciudad"
            placeholder="Escribe tu ciudad"
            type="text"
            register={register('city')}
            errorsBack={errorsBackend?.city}
            errorsZod={errors.city}
          />

          <Input
            label="Avatar"
            placeholder="Escribe la URL de tu avatar"
            type="text"
            register={register('avatar')}
            errorsBack={errorsBackend?.avatar}
            errorsZod={errors.avatar}
          />
          <Input
            label="Telefono"
            placeholder="Escribe tu telefono"
            type="text"
            register={register('phone')}
            errorsBack={errorsBackend?.phone}
            errorsZod={errors.phone}
          />
          <Input
            label="Direccion"
            placeholder="Escribe tu direccion"
            type="text"
            register={register('address')}
            errorsBack={errorsBackend?.address}
            errorsZod={errors.address}
          />
          <Input
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            type="password"
            register={register('password')}
            errorsBack={errorsBackend?.password}
            errorsZod={errors.password}
          />
          <Input
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            type="password"
            register={register('confirmPassword')}
            errorsZod={errors.confirmPassword}
          />
        </div>
        <div className="flex pt-7 justify-between items-center">
          <button
            type="submit"
            className={`w-1/4  ${
              mutationRegister.isPending
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            } bg-linear-to-r from-cyan-400  to-cyan-700 tracking-widest text-white  py-2 cursor-pointer rounded-lg transition-all duration-300 hover:to-cyan-400 hover:from-cyan-700 hover:scale-105 hover:-translate-y-1 font-medium text-sm `}
          >
            Enviar
          </button>
          <Link
            to="/auth/login"
            className="text-sm underline-offset-2 cursor-pointer hover:text-cyan-900   underline"
          >
            ¿Ya tienes una cuenta?
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AuthRegisterUser;
