import Header from "./components/Header.tsx";
import { Outlet } from 'react-router';

const layaout = () => {
  return (
    <div className='container mx-auto '>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>

  );
};

export default layaout;
