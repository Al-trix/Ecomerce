import {
  userRegisterSchema,
  type UserRegister,
} from '../schemas/auth.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from './Input';
import { registerUser } from '../users/api/actions.ts';
import { queryClient } from '../../lib/queryClient.ts';
import type { responseAuthUser, PartialAuthUser } from 'src/types/auth';
import type { AxiosError } from 'axios';

interface ErrorAuth {
  error: PartialAuthUser;
  message: string;
}

const AuthRegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema)
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  });

  const errorsBackend: PartialAuthUser | undefined =
    mutationRegister.error?.response?.data.error;

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSumbit)}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4 grid grid-cols-2 gap-10 w-full">
          <Input
            label="Name"
            type="text"
            register={register('name')}
            errorsBack={errorsBackend?.name}
            errorsZod={errors.name}
          />
          <Input
            label="Email"
            type="email"
            register={register('email')}
            errorsBack={errorsBackend?.email}
            errorsZod={errors.email}
          />
          <Input
            label="Password"
            type="password"
            register={register('password')}
            errorsBack={errorsBackend?.password}
            errorsZod={errors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            register={register('confirmPassword')}
            errorsZod={errors.confirmPassword}
          />
          <Input
            label="Avatar"
            type="text"
            register={register('avatar')}
            errorsBack={errorsBackend?.avatar}
            errorsZod={errors.avatar}
          />
          <Input
            label="City"
            type="text"
            register={register('city')}
            errorsBack={errorsBackend?.city}
            errorsZod={errors.city}
          />
          <Input
            label="Phone"
            type="text"
            register={register('phone')}
            errorsBack={errorsBackend?.phone}
            errorsZod={errors.phone}
          />
          <Input
            label="Address"
            type="text"
            register={register('address')}
            errorsBack={errorsBackend?.address}
            errorsZod={errors.address}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default AuthRegisterUser;
