import { loginSchema, type Login } from '../schemas/auth.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from './Input';
import { loginUser } from '../users/api/actions.ts';
import { queryClient } from '../../lib/queryClient.ts';
import type { responseAuthUser, AuthPartialLogin } from 'src/types/auth';
import type { AxiosError } from 'axios';

interface ErrorAuth {
  error: AuthPartialLogin;
  message: string;
}

const AuthLoginUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const onSumbit: SubmitHandler<Login> = (data) => {
    const dataSend = {
      email: data.email,
      password: data.password,
    };
    mutationRegister.mutate(dataSend);
  };

  const mutationRegister = useMutation<
    responseAuthUser,
    AxiosError<ErrorAuth>,
    AuthPartialLogin
  >({
    mutationKey: ['user'],
    mutationFn: loginUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  });

  const errorsBackend: AuthPartialLogin | undefined =
    mutationRegister.error?.response?.data.error;

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSumbit)}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4 grid grid-cols-2 gap-10 w-full">
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
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default AuthLoginUser;
