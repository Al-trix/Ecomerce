import {
  useTypeUserStore,
  useStepCountStore,
  useUserExistStore,
} from '../../store/StepStates';
import { LuCheck } from 'react-icons/lu';
import React, { useState, useEffect } from 'react';
import useInfoUser from '../../hooks/useInfoUser';

type Props = {
  text: string;
  index: number;
  children: React.ReactNode;
};

type state = {
  style: string;
  icon?: React.ReactNode;
};

const Step = ({ text, index, children }: Props) => {
  const typeUserStore = useTypeUserStore((state) => state.typeUser);
  const userExistStore = useUserExistStore((state) => state.userExist);
  const stepCount = useStepCountStore((state) => state.stepCount);
  const [state, setstate] = useState<state>({
    style: '',
    icon: children,
  });

  const { infoUser } = useInfoUser();
  useEffect(() => {
    if (index === 1 && typeUserStore !== '' && !userExistStore) {
      setstate({
        style:
          ' bg-linear-to-r from-cyan-400 to-cyan-700 text-cyan-100 border-none animate-bounce',
        icon: <LuCheck />,
      });
    }
    if (index === 2 && typeUserStore !== '' && userExistStore) {
      setstate({
        style:
          ' bg-linear-to-r from-cyan-400 to-cyan-700 text-cyan-100 border-none animate-bounce',
        icon: <LuCheck />,
      });
    }
    if (index === 3 && typeUserStore !== '' && infoUser && userExistStore) {
      setstate({
        style:
          ' bg-linear-to-r from-cyan-400 to-cyan-700 text-white/90  border-none animate-bounce',
        icon: <LuCheck />,
      });
    }
  }, [stepCount, typeUserStore, index, userExistStore, infoUser]);

  return (
    <>
      <div className="flex w-fit flex-col items-center gap-y-2">
        <span
          className={`${
            stepCount === index
              ? `border-cyan-600 text-cyan-600  ${state.style}`
              : `border-gray-700  ${state.style}`
          } h-10 w-10  flex text-xl transition-colors duration-300 items-center justify-center border font-bold rounded-full`}
        >
          {state.icon}
        </span>
        <p className="text-xs font-bold text-center text-gray-600 ">{text}</p>
      </div>
      {index !== 3 && (
        <span
          className={`w-6 ${
            stepCount === index
              ? `${
                  state.style === ''
                    ? ' bg-linear-to-r from-cyan-600  to-cyan-700 '
                    : state.style
                }  animate-bounce ${
                  index === 1 ? `-translate-x-4 ` : `translate-x-3.5`
                }`
              : `${state.style === '' ? 'bg-gray-600' : state.style}  ${
                  index === 1 ? `-translate-x-4 ` : `translate-x-3.5 `
                }`
          } scale-x-200 h-px relative -top-3 rounded-3xl transition-colors duration-300`}
        ></span>
      )}
    </>
  );
};

export default Step;
