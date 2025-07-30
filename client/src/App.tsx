import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import {useInfoUser, useInfoSeller} from './hooks/useInfoUser.ts';
import router from '../router/routes.tsx';

const App = () => {
  

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
