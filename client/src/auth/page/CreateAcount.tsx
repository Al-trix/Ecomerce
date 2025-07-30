import LayoutSteps from '../components/LayoutSteps.tsx';
import ContentStep from '../components/ContentStep.tsx';
import AuthRegisterUser from '../users/components/AuthRegisterUser.tsx';
import TypeAuth from '../components/TypeAuth.tsx';
import { useStepCountStore, useTypeUserStore } from '../../store/StepStates.tsx';
import WelomeUser from '../components/WelcomeUser.tsx';
import AuthRegisterSeller from '../sellers/components/AuthRegisterSeller.tsx';

const CreateAcount = () => {
  const stepCount = useStepCountStore((state) => state.stepCount);
  const typeUser = useTypeUserStore((state) => state.typeUser);

  return (
    <section className="mx-auto  w-full flex flex-col items-center justify-center">
      <h4 className="font-medium tracking-widest text-4xl text-gray-800">
        ¿Aún no tienes cuenta?
      </h4>
      <p className="text-gray-700/50 mt-1.5 text-sm">
        Empecemos creando una cuenta para continuar
      </p>
      <span className="w-1/2 rounded-4xl h-px bg-gray-300 my-4"></span>
      <LayoutSteps>
        <ContentStep index={1} stateIndex={stepCount}>
          <TypeAuth />
        </ContentStep>
        <ContentStep index={2} stateIndex={stepCount}>
          {
            typeUser === 'user' ? <AuthRegisterUser /> : <AuthRegisterSeller />
          }
        </ContentStep>
        <ContentStep index={3} stateIndex={stepCount}>
          <WelomeUser />
        </ContentStep>
      </LayoutSteps>
    </section>
  );
};

export default CreateAcount;
