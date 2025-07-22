import useInfoUser from '../../hooks/useInfoUser.ts';
import { Link } from 'react-router-dom';
import { FaBagShopping } from 'react-icons/fa6';
import { FaUserCog } from 'react-icons/fa';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { HiMiniClipboardDocumentList } from 'react-icons/hi2';

const WelcomeUser = () => {
  const { infoUser } = useInfoUser();

 

  return (
    <div className="flex flex-col items-center  shadow-xl shadow-black/30  border border-t-transparent border-black/10 px-15  py-10 rounded-2xl justify-center">
      <h1 className="font-medium tracking-widest text-4xl text-gray-800">
        Bienvenido{' '}
        <span className="text-cyan-500 font-semibold">
          {infoUser?.user?.name}
        </span>
      </h1>
      <p className="text-gray-700 mt-1.5 text-xs">
        Ahora que ya tienes una cuenta, puedes continuar con la compra
      </p>
      <span className="w-4/5 rounded-4xl h-px bg-gray-300 my-4"></span>
      <div className="flex gap-5 items-center">
        <Link
          to="/products"
          className="flex gap-x-2 font-bold items-center cursor pointer border border-cyan-700 text-cyan-700  rounded-lg hover:bg-cyan-700 hover:text-white hover:shadow-cyan-600/50 shadow-lg shadow-black/30 px-6 py-3  transition-all duration-300"
        >
          <FaBagShopping size={20} />
          Tienda
        </Link>
        <Link
          to="/auth/login"
          className="flex gap-x-2 font-bold items-center cursor pointer border border-cyan-700 text-cyan-700  rounded-lg hover:bg-cyan-700 hover:text-white hover:shadow-cyan-600/50 shadow-lg shadow-black/30 px-6 py-3  transition-all duration-300"
        >
          <FaUserCog size={25} />
          Perfil
        </Link>
        <Link
          to="/orders"
          className="flex gap-x-2 font-bold items-center cursor pointer border border-cyan-700 text-cyan-700  rounded-lg hover:bg-cyan-700 hover:text-white hover:shadow-cyan-600/50 shadow-lg shadow-black/30 px-6 py-3  transition-all duration-300"
        >
          <HiMiniClipboardDocumentList size={25} />
          Ordenes
        </Link>
        <Link
          to="/cart"
          className="flex gap-x-2 font-bold items-center cursor pointer border border-cyan-700 text-cyan-700  rounded-lg hover:bg-cyan-700 hover:text-white hover:shadow-cyan-600/50 shadow-lg shadow-black/30 px-6 py-3  transition-all duration-300"
        >
          <MdShoppingCartCheckout size={25} />
          Carrito
        </Link>
      </div>
    </div>
  );
};

export default WelcomeUser;
