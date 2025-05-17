import Link from './Link.tsx';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const Header = () => {
  return (
    <header className="w-full  mb-10 py-6 shadow-xl shadow-black/5 border border-black/10 px-8 rounded-bl-2xl rounded-br-2xl">
      <nav className="w-full">
        <ul className="w-full text-gray-800 flex justify-between items-center">
          <div>
            <li>
              <Link to="/" content="Inicio" />
            </li>
          </div>
          <div className="flex gap-5">
            <li>
              <Link to="/products" content="Productos" />
            </li>
            <li>
              <Link to="/sellers" content="Tiendas" />
            </li>
            <li>
              <Link to="/ordenes" content="Contacto" />
            </li>
          </div>
          <div className="flex gap-3 items-center justify-around">
            <li>
              <Link to="/cart" content="Carrito">
                <AiOutlineShoppingCart size={26} />
              </Link>
            </li>
            <li>
              <Link to="/auth/register" content="Registrarse" />
            </li>
            <li>
              <Link to="/auth/login" content="Iniciar Sesión" />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
