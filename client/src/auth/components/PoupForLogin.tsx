// src/components/RegisterDialog.tsx
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { CiLogin } from 'react-icons/ci';

import { AiOutlineClose } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import ImgLogin from '../../../public/login.png';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLogin?: boolean;
}

const PoupForLogin = ({ isOpen, onClose, isLogin }: Props) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop className="bg-black/30 fixed inset-0 z-40" />
        <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Content className="bg-white/70 border-white border backdrop-blur-3xl   flex flex-col w-[500px] items-center justify-center relative rounded-xl shadow-black/40  shadow-xl max-w-md  py-8 z-50 transition duration-300 ease-in-out transform">
            <Dialog.Title className="text-2xl text-shadow-lg text-shadow-color-black text-center tracking-wider  font-semibold">
              {isLogin
                ? 'Parece que aún no tienes '
                : '¡Ups! parece que ya tienes '}
              <br /> 
              <span className="text-emerald-500">una cuenta</span>
            </Dialog.Title>
            <Dialog.Description className="flex flex-col items-center justify-center text-gray-600 mb-4">
              <img src={ImgLogin} alt="login" className="w-80 h-80" />
              {isLogin ? (
                <NavLink
                  to="/auth/register"
                  className="text-xl rounded-r-3xl rounded-l-sm hover:bg-linear-to-r from-emerald-500 to-emerald-400 hover:text-white font-semibold text-emerald-500 border px-4 py-2 flex items-center gap-x-2 transition-all duration-400 hover:scale-110"
                >
                  {' '}
                  <CiLogin size={27} /> Registrate
                </NavLink>
              ) : (
                <NavLink
                  to="/auth/login"
                  className="text-xl rounded-r-3xl rounded-l-sm hover:bg-linear-to-r from-emerald-500 to-emerald-400 hover:text-white font-semibold text-emerald-500 border px-4 py-2 flex items-center gap-x-2 transition-all duration-400 hover:scale-110"
                >
                  {' '}
                  <CiLogin size={27} /> Iniciar sesión
                </NavLink>
              )}
            </Dialog.Description>
            <Dialog.CloseTrigger asChild>
              <button className="absolute text-xl bg-linear-to-r from-red-500 to-red-400 text-white top-0 right-0 hover:text-red-400 hover:from-red-200 hover:to-red-300 cursor-pointer rounded-tr-xl rounded-bl-xl p-3 transition-all duration-300">
                <AiOutlineClose />
              </button>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PoupForLogin;
