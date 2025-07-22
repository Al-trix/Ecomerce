import { LuUsersRound, LuUser, LuMail } from 'react-icons/lu';
import Step from './Step';

const LayoutSteps = ({ children, isLogin }: { children: React.ReactNode, isLogin?: boolean }) => {

  return (
    <div className="w-max flex flex-col  justify-center items-center  rounded-br-none mb-3">
      <div className="flex  items-center justify-center  transition-all duration-500 w-250 relative mx-10 overflow-hidden py-10 scroll-smooth ">
        {children}
      </div>
      <div className="flex mt-3 items-center w-full justify-center">
        <Step
          text="Selecciona tu usuario"
          index={1}
          children={<LuUsersRound />}
        />
        <Step
          text={!isLogin ? 'Registrate' : 'Inicia sesión'}
          index={2}
          children={<LuUser />}
        />
        <Step text="Accede a las tiendas" index={3} children={<LuMail />} />
      </div>
    </div>
  );
};



export default LayoutSteps;
