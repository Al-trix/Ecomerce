import Link from './Link.tsx';
import { FaCartShopping } from 'react-icons/fa6';
import { useUserExistStore } from '../../store/StepStates.tsx';
import '../../styles/style.css';
import { useLocation } from 'react-router';
const Header = () => {
  const userExist = useUserExistStore((state) => state.userExist);
  const { pathname } = useLocation();
  return (
    <>
      <nav className="w-4/5 bg-white/60 mx-auto mb-10 py-3 backdrop-blur-lg shadow-xl shadow-black/5 border border-black/10 px-8 rounded-bl-2xl rounded-br-2xl z-20 sticky top-0 ">
        <ul className="w-full text-gray-800 flex justify-between items-center">
          <div>
            <li>
              <Link to="/" content="Inicio" />
            </li>
          </div>
          <div className="flex gap-5">
            <li>
              <Link to="/sellers" content="Tiendas" />
            </li>
            <li>
              <Link to="/ordenes" content="Contacto" />
            </li>
          </div>
          <div className="flex gap-3  items-center justify-end">
            {userExist ? (
              <li>
                <Link to="/cart" content="Carrito">
                  <FaCartShopping size={26} />
                </Link>
              </li>
            ) : (
              <li className="flex gap-2">
                <Link to="/auth/login" content="Iniciar sesion" />
                <Link to="/auth/register" content="Registrarse" />
              </li>
            )}
          </div>
        </ul>
      </nav>
      <header
        className={
          pathname === '/'
            ? 'w-full h-[80dvh] bg-cover -top-28 bg-fixed bg-hero bg-clip-content rounded-b-lg  bg-center z-0 relative'
            : 'w-full z-0 relative'
        }
      >
        {pathname === '/' && (
          <>
            <div className="h-full w-full rounded-b-lg bg-linear-to-b from-black/10  to-black/50 z absolute top-0 left-0"></div>
            <h1 className="text-[12rem] tracking-wider font-bold text-white absolute translate-y-1/2  text-shadow-lg text-shadow-black/40 z-10 left-2/4 bottom-48 -translate-x-1/2">
              Bienvenido
            </h1>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
