import { getUserForToken } from '../auth/users/api/actions.ts';
import { useQuery } from '@tanstack/react-query';
import type { responseAuthUser } from 'src/types/auth';

const useInfoUser = () => {
  const { data, isLoading, error } = useQuery<responseAuthUser>({
    queryKey: ['user'],
    queryFn: getUserForToken,
    retry: false,
  });

  const infoUser = data?.body; 

  return { infoUser, isLoading, error };
};

export default useInfoUser;
