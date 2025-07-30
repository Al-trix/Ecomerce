import LayoutSteps from '../components/LayoutSteps.tsx';
import ContentStep from '../components/ContentStep.tsx';
import TypeAuth from '../components/TypeAuth.tsx';
import { useStepCountStore } from '../../store/StepStates.tsx';
import WelomeUser from '../components/WelcomeUser.tsx';
import AuthLoginUser from '../users/components/AuthLoginUser.tsx';

const LoginACount = () => {
  const stepCount = useStepCountStore((state) => state.stepCount);
  const steps = useStepCountStore((state) => state.stepCount);
  console.log(steps);
  return (
    <section className="mx-auto  w-full flex flex-col items-center justify-center">
      <h4 className="font-medium tracking-widest text-4xl text-gray-800">
        ¿Ya tienes una cuenta?
      </h4>
      <p className="text-gray-700/50 mt-1.5 text-sm">
        Empecemos iniciando sesión
      </p>
      <span className="w-1/2 rounded-4xl h-px bg-gray-300 mt-4"></span>
      <LayoutSteps isLogin>
        <ContentStep index={1} stateIndex={stepCount}>
          <TypeAuth />
        </ContentStep>
        <ContentStep index={2} stateIndex={stepCount} >
          <AuthLoginUser />
        </ContentStep>
        <ContentStep index={3} stateIndex={stepCount}>
          <WelomeUser />
        </ContentStep>
      </LayoutSteps>
    </section>
  );
};

export default LoginACount;
