import { loginSchema } from '../schemas/auth.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AuthLogin as AuthLoginType } from '../../types/auth.d.ts';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router';

const AuthLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthLoginType>({
    resolver: zodResolver(loginSchema),
  });

  const location = useLocation();

  console.log(location.pathname.includes('seller'));
  const onSumbit: SubmitHandler<AuthLoginType> = (data: unknown) => {
    console.log(data);
  };

  console.log(errors);
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSumbit)}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && errors.email?.type === 'required' && (
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          )}
          {errors.email && errors.email?.type === 'invalid_string' && (
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && errors.password?.type === 'too_small' && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          )}
          {errors.password && errors.password?.type === 'invalid_string' && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          )}
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

export default AuthLogin;
