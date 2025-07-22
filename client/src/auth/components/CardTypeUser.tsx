import { useTypeUserStore, useStepCountStore } from '../../store/StepStates';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  typeUser: 'user' | 'seller';
};

const CardTypeUser = ({ title, description, children, typeUser }: Props) => {
  const setTypeUserStore = useTypeUserStore((state) => state.setTypeUser);
  const setStepCountStore = useStepCountStore((state) => state.setStepCount);

  const handleDataTypeUser: (e: React.MouseEvent<HTMLTitleElement>) => void = (
    e
  ) => {
    const typeUser = e.currentTarget.dataset.typeuser;
    if (typeUser === 'user' || typeUser === 'seller') {
      setTypeUserStore(typeUser);
      setStepCountStore();
    }
  };

  return (
    <article
      data-typeuser={typeUser}
      onClick={handleDataTypeUser}
      className={` ${
        typeUser === 'user'
          ? 'text-cyan-600/80  hover:shadow-cyan-600/40 shadow-lg hover:border-cyan-600'
          : 'text-emerald-600/80 hover:shadow-emerald-600/40 shadow-lg hover:border-emerald-600'
      } rounded-2xl border-black/10 shadow-md shadow-black/20 border px-3 py-10 flex flex-col items-center text-center cursor-pointer transition-discrete hover:scale-105 duration-200 `}
    >
      {children}
      <h5 className="text-xl font-medium text-inherit tracking-wider pointer-events-none">
        {title}
      </h5>
      <p className="text-inherit   text-sm mt-1 pointer-events-none w-3/4">
        {description}
      </p>
    </article>
  );
};

export default CardTypeUser;
