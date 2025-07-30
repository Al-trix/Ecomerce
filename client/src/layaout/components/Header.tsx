import Link from './Link.tsx';
import { IoCartOutline, IoPersonOutline  } from 'react-icons/io5';
import { useLocation } from 'react-router';
import { Avatar } from '@ark-ui/react/avatar';
import { MdOutlineFactCheck } from 'react-icons/md';
import { GiShoppingCart } from 'react-icons/gi';
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md';




import { Menu } from '@ark-ui/react/menu';

import {useInfoUser, useInfoSeller} from '../../hooks/useInfoUser.ts';
import '../../styles/style.css';

const Header = () => {
  const { infoUser } = useInfoUser();
  const { infoSeller } = useInfoSeller();
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
            {infoUser || infoSeller ? (
              <>
                <li>
                  <Link to="/cart" content="Carrito">
                    <IoCartOutline size={20} />
                  </Link>
                </li>
                <li>
                  <Menu.Root>
                    <Menu.Trigger className="w-7 cursor-pointer h-7 ml-2  outline-none shadow-sm shadow-black  p-px rounded-full hover:shadow-black/70  transition-shadow duration-200 active:scale-95">
                      <Avatar.Root>
                        <Avatar.Fallback className="text-gray-600 text-xs flex justify-center items-center w-full h-full">
                          {infoUser?.user?.name?.slice(0, 2).toUpperCase() || infoSeller?.seller?.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                        <Avatar.Image
                          className="object-cover rounded-full"
                          src={infoUser?.user?.avatar || ''}
                          alt="avatar"
                        />
                      </Avatar.Root>
                    </Menu.Trigger>

                    <Menu.Positioner>
                      <Menu.Content className="bg-white/80 backdrop-blur-4xl outline-none shadow-lg  rounded-lg  animate-in zoom-in-50 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-50 text-sm shadow-black/30">
                        <Menu.Item
                          value="options"
                          className=" pointer-events-none border-b-[1px] border-gray-400 px-4 py-2"
                        >
                          Mis opciones
                        </Menu.Item>
                        <Menu.Item
                          value="options"
                          className=" rounded cursor-pointer  transition-transform duration-200 ease-in hover:translate-x-1 transform px-4 py-2 flex items-center gap-1"
                        >
                          <MdOutlineFactCheck
                            size={17}
                            className="font-extralight"
                          />
                          Ordenes
                        </Menu.Item>
                        <Menu.Item
                          value="carrito"
                          className=" rounded cursor-pointer  transition-transform duration-200 ease-in hover:translate-x-1 transform px-4 py-2 flex items-center gap-1"
                        >
                          <GiShoppingCart
                            size={17}
                            className="font-extralight"
                          />
                          Carrito
                        </Menu.Item>
                        <Menu.Item
                          value="options"
                          className=" rounded cursor-pointer  transition-transform duration-200 ease-in hover:translate-x-1 transform px-4 py-2 flex items-center gap-1"
                        >
                          <IoPersonOutline
                            size={17}
                            className="font-extralight"
                          />
                          Perfil
                        </Menu.Item>
                        <Menu.Item
                          value="options"
                          className="cursor-pointer bg-linear-to-l from-red-300 to-red-400 hover:from-red-400 hover:to-red-300 transition-all duration-200 px-4 py-2 flex items-center gap-1"
                        >
                          <MdOutlineSubdirectoryArrowRight
                            size={17}
                            className="font-extralight"
                          />
                          Cerrar sesión
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Menu.Root>
                </li>
              </>
            ) : (
              <></>
            )}
            {!infoUser ? (
              <li className="flex gap-2">
                <Link to="/auth/login" content="Iniciar sesion" />
                <Link to="/auth/register" content="Registrarse" />
              </li>
            ) : (
              <></>
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
