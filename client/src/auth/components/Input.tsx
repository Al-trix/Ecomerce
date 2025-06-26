import { Field } from '@ark-ui/react/field';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface PropsInput {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  errorsBack?: string | undefined | null;
  errorsZod?: FieldError | undefined | null;
}

const Input = ({ label, type, register, errorsBack, errorsZod }: PropsInput) => {
  return (
    <Field.Root className="flex flex-col gap-2 " invalid={!!errorsBack || !!errorsZod}>
      <Field.Label>{label}</Field.Label>
      <Field.Input
        placeholder={label}
        className="bg-gray-400 border-2 border-gray-900 rounded-1xl p-2"
        {...register}
        type={type}
      />
      {errorsBack || errorsZod ? (
        <Field.ErrorText className=" text-xs text-red-500">
          {errorsBack || errorsZod?.message}
        </Field.ErrorText>
      ) : (
        <Field.HelperText>escribe tu nombre</Field.HelperText>
      )}
    </Field.Root>
  );
};

export default Input;
