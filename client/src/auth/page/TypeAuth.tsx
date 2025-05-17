import Layout from '../../layaout/Layaout.tsx';
import { FaShop } from 'react-icons/fa6';
import { FaUserAlt } from 'react-icons/fa';
const TypeAuth = () => {
  return (
    <Layout>
      <section className=" mt-13 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-medium tracking-widest">
          Elije tu tipo de usuario
        </h2>
        <p className="text-xs text-gray-700/70 mt-2">
          Entra a Mercalink para vender o comprar productos de confianza.
        </p>
        <span className="w-1/2 mx-auto mt-7 mb-12 h-px bg-black/50 rounded-full"></span>
        <div className="grid grid-cols-2 w-4/5 relative  items-center justify-center gap-10">
          <article className="flex flex-col items-center  text-center border-t-15 border-t-sky-950 border border-black/10 shadow-lg shadow-black/20 rounded-t-xl  cursor-pointer active:scale-100 hover:shadow-sky-950/80 transition-all duration-300 rounded-bl-xl px-8 py-10">
            <div className=" p-3 absolute -top-4 bg-sky-950 text-white rounded-full">
              <FaShop size={30} />
            </div>
            <h3 className="text-2xl -translate-y-1  tracking-wider text-sky-950 font-medium">
              Vendedor
            </h3>
            <p className="mb-2 text-base text-gray-600">
              Crea, gestiona y habla con clientes para poder vender tus
              productos con una mayor facilidad y sin tener que hacer muchas
              cosas.
            </p>
          </article>
          <article className="flex flex-col items-center  text-center border-t-15 border-t-emerald-700 border border-black/10 shadow-lg shadow-black/20 rounded-t-xl  cursor-pointer active:scale-100 hover:shadow-emerald-700/80 transition-all duration-300 rounded-bl-xl px-8 py-10">
            <div className="p-3 absolute -top-4 bg-emerald-700 text-white rounded-full">
              <FaUserAlt size={30} />
            </div>
            <h3 className="text-2xl -translate-y-1  tracking-wider text-eborder-t-emerald-700 font-medium">
              Comprador
            </h3>
            <p className="mb-2 text-base text-gray-600">
              Encuentra los productos que necesitas y compra con confianza.
              Mercalink te ayuda a encontrar los productos que necesitas y te
              ayuda a comprar con confianza.
            </p>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default TypeAuth;
