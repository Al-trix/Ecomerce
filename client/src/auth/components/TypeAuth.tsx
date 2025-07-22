import CardTypeUser from "./CardTypeUser";
import { CiShop, CiUser } from "react-icons/ci";

const TypeAuth = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-15 px-10  mx-auto  grid-cols-1 justify-center">
      <CardTypeUser
        title="Usuario"
        description="Busca y compra los productos que busques en un solo lugar."
        typeUser="user"
      >
        <CiUser size={80} className="pointer-events-none" />
      </CardTypeUser>
      <CardTypeUser
        title="Vendedor"
        description="Registra tu tienda y comienza a vender tus productos a los usuarios."
        typeUser="seller"
      >
        <CiShop size={80} className="pointer-events-none" />
      </CardTypeUser>
    </div>
  );
}

export default TypeAuth
