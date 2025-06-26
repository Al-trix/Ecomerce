import CardTypeUser from '../components/CardTypeUser.tsx';
import { CiShop, CiUser } from 'react-icons/ci';
import LayoutSteps from '../components/LayoutSteps.tsx';
import { useState } from 'react';
import ContentStep from '../components/ContentStep.tsx';
import AuthLoginUser from '../components/AuthLoginUser.tsx';
const CreateAcount = () => {
  const [state, setState] = useState(1);
  return (
    <section className="mx-auto  w-full flex flex-col items-center justify-center">
      <h4 className="font-medium tracking-widest text-4xl text-gray-800">
        ¿Aún no tienes cuenta?
      </h4>
      <p className="text-gray-700/50 mt-1.5 text-sm">
        Empecemos creando una cuenta para continuar
      </p>
      <span className="w-1/2 rounded-4xl h-px bg-gray-300 my-4"></span>
      <LayoutSteps index={1} label="">
        <ContentStep index={1} stateIndex={state} titleStep="Elije el tipo de usuario que seas">
          <div className="grid lg:grid-cols-2 gap-15 px-10  mx-auto  mt-6 grid-cols-1 justify-center">
            <CardTypeUser
              title="Usuario"
              description="Busca y compra los productos que busques en un solo lugar."
              typeUser="user"
            >
              <CiUser size={110} className="pointer-events-none" />
            </CardTypeUser>
            <CardTypeUser
              title="Vendedor"
              description="Registra tu tienda y comienza a vender tus productos a los usuarios."
              typeUser="seller"
            >
              <CiShop size={110} className="pointer-events-none" />
            </CardTypeUser>
          </div>
        </ContentStep>
        <ContentStep index={2} stateIndex={state} titleStep="Registrate">
          <AuthLoginUser/>
        </ContentStep>
      </LayoutSteps>
      <button onClick={() => setState(state + 1)}>move</button>
    </section>
  );
};

export default CreateAcount;
