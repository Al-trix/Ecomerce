import { FaShop } from 'react-icons/fa6';
import { FaUserAlt } from 'react-icons/fa';
import { useState } from "react";
import { Navigate } from 'react-router-dom';

const TypeAuth = () => {
  const [type, setType] = useState<string | null>('');
  const handleDataInfo = (e:React.MouseEvent<HTMLElement>) => {
    const article = e.target
    if (article instanceof HTMLElement) {
      const type = article.getAttribute('data-type');
      setType(type);
    }
  };
  if (type) {
    return <Navigate to={`/auth/${type}/login`} replace/>; 
  }
  return (
      <section  className=" mt-13 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-medium tracking-widest">
          Elije tu tipo de usuario
        </h2>
        <p className="text-xs text-gray-700/70 mt-2">
          Entra a Mercalink para vender o comprar productos de confianza.
        </p>
        <span className="w-1/2 mx-auto mt-7 mb-12 h-px bg-black/50 rounded-full"></span>
        <div className="grid grid-cols-2 w-4/5 relative  items-center justify-center gap-10">
          <article onClick={handleDataInfo} data-type='seller'  className="flex flex-col items-center  text-center border-t-23 border-t-sky-950 border border-black/10 shadow-lg shadow-black/20 rounded-t-xl  cursor-pointer active:scale-100 hover:shadow-sky-950/80 transition-all duration-300 rounded-bl-xl px-8 py-10">
            <div className="pointer-events-none   p-3 absolute -top-4 bg-sky-950 text-white rounded-full">
              <FaShop size={30} />
            </div>
            <h3 className="pointer-events-none  text-2xl -translate-y-2.5  tracking-wider text-sky-950 font-medium">
              Vendedor
            </h3>
            <p className="pointer-events-none  mb-2 text-base text-gray-800">
              Crea, gestiona y habla con clientes para poder vender tus
              productos con una mayor facilidad y sin tener que hacer muchas
              cosas.
            </p>
          </article>
          <article onClick={handleDataInfo}  data-type='user' className="flex flex-col items-center  text-center border-t-15 border-t-emerald-700 border border-black/10 shadow-lg shadow-black/20 rounded-t-xl  cursor-pointer active:scale-100 hover:shadow-emerald-700/80 transition-all duration-300 rounded-bl-xl px-8 py-10">
            <div className="p-3 pointer-events-none absolute -top-4 bg-emerald-700 text-white rounded-full">
              <FaUserAlt size={30} />
            </div>
            <h3 className="text-2xl -translate-y-2.5 pointer-events-none text-emerald-700  tracking-wider text-eborder-t-emerald-700 font-medium">
              Comprador
            </h3>
            <p className="mb-2 text-base pointer-events-none text-gray-800">
              Encuentra los productos que necesitas y compra con confianza.
              Mercalink te ayuda a encontrar los productos que necesitas y te
              ayuda a comprar con confianza.
            </p>
          </article>
        </div>
      </section>
  );
};

export default TypeAuth;
