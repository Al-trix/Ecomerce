import { LuUsersRound, LuUser, LuMailCheck } from 'react-icons/lu';
import Step from './Step';

const LayoutSteps = ({
  label,
  children,
}: {
  index: number;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-max flex flex-col py-7 justify-center items-center border-1 border-gray-300 shadow-gray-500 shadow-lg rounded-2xl rounded-br-none mb-8">
      <div className="flex items-center justify-center transition-all duration-500 w-250 relative mx-10 overflow-hidden py-10  ">{children}</div>
      <div className="flex mt-4 items-center w-full justify-center">
        <Step text="Selecciona tu usuario" children={<LuUsersRound />} />
        <span className="w-13 scale-x-130 h-px -translate-x-4 relative -top-3 rounded-3xl border-transparent border  bg-gray-900"></span>
        <Step text="Registrate" children={<LuUser />} />
        <span className="w-13  h-px relative scale-x-130 translate-x-3.5 -top-3 rounded-3xl border-transparent border  bg-gray-900"></span>
        <Step text="Accede a las tiendas" children={<LuMailCheck />} />
      </div>
    </div>
  );
};

export default LayoutSteps;
