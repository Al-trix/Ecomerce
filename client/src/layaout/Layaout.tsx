import Header from "./components/Header.tsx";
import { Outlet } from 'react-router';
import { useBlockAuthRoutes } from '../hooks/useBlockRoute.ts';
const Layaout = () => {
  useBlockAuthRoutes();

  return (
    <>
    <Header />
    <div className="container mx-auto">
      <main>
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default Layaout;
