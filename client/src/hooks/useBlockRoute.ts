import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserExistStore } from '../store/StepStates';
import { useRouteBlockStore } from '../store/blockedRoute';

export const useBlockAuthRoutes = () => {
  const location = useLocation();
  const userExists = useUserExistStore((state) => state.userExist);
  const blockAuthRoutes = useRouteBlockStore((state) => state.blockAuthRoutes);

  useEffect(() => {
    const isOutsideAuth = !location.pathname.startsWith('/auth');

    
    if (userExists && isOutsideAuth) {
      blockAuthRoutes();
    }
  }, [location.pathname, userExists, blockAuthRoutes]);
};
