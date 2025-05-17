import type { FC, ReactNode } from 'react';
import Header from "./components/Header.tsx";
const layaout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='container mx-auto '>
      <Header />
      <main>{children}</main>
    </div>

  );
};

export default layaout;
