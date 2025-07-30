import { Field } from '@ark-ui/react/field';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { CgDanger } from 'react-icons/cg';

interface PropsInput {
  label: string;
  placeholder: string;
  type: string;
  register: UseFormRegisterReturn;
  errorsBack?: string | undefined | null;
  errorsZod?: FieldError | undefined | null;
  isSeller?: boolean;
}

const Input = ({
  label,
  placeholder,
  type,
  register,
  errorsBack,
  errorsZod,
  isSeller = false,
}: PropsInput) => {
  return (
    <Field.Root
      className="flex flex-col max-w-xl transition-all duration-300"
      invalid={!!errorsBack || !!errorsZod}
    >
      <Field.Label className="text-xs pl-1 text-gray-800 tracking-wider mb-1  font-medium ">
        {label}
      </Field.Label>
      <Field.Input
        placeholder={placeholder}
        className={`border rounded-lg pl-3  ${
          errorsBack || errorsZod
            ? 'border-red-500 placeholder:text-red-500 hover:placeholder:text-red-700 hover:border-red-700 focus:border-red-700'
            : 'border-gray-600'
        } p-1 ${
          isSeller
            ? 'focus:border-emerald-600 hover:border-emerald-600 hover:placeholder:text-emerald-800'
            : 'focus:border-cyan-600 hover:border-cyan-600 hover:placeholder:text-cyan-800'
        } focus:outline-none `}
        {...register}
        type={type}
      />
      {errorsBack && (
        <Field.ErrorText className=" flex items-center gap-1 text-xs pl-1 pt-1 text-red-500">
          <CgDanger />

          {errorsBack}
        </Field.ErrorText>
      )}
      {errorsZod && (
        <Field.ErrorText className=" flex items-center gap-1 text-xs pl-1 pt-1 text-red-500">
          <CgDanger />

          {errorsZod?.message}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default Input;
