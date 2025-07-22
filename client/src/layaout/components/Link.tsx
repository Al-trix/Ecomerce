import { NavLink } from 'react-router-dom';
import type { FC, ReactNode } from 'react';

const Link: FC<LinkProps> = ({
  to,
  content,
  isAuth = false,
  children = undefined,
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? 'text-gray-950 font-medium relative before:absolute before:w-full before:h-px before:bg-gray-600 before:translate-y-7 before:opacity-0 hover:before:opacity-100 text-sm  hover:before:translate-y-6 before:transition-all before:duration-300'
          : 'text-gray-800  relative before:absolute before:w-full before:h-px before:bg-gray-600 before:translate-y-7 before:opacity-0 hover:before:opacity-100 text-sm hover:before:translate-y-6 before:transition-all before:duration-300'
      }
      to={to}
    >
      {children ? children : content}
    </NavLink>
  );
};

interface LinkProps {
  to: string;
  content: string;
  isAuth?: boolean;
  children?: ReactNode;
}

export default Link;
