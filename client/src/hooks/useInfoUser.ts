import { getUserForToken } from '../auth/users/api/actions.ts';
import { useQuery } from '@tanstack/react-query';
import { useUserExistStore } from '../store/StepStates';
import { useEffect } from 'react';
import type {AxiosResponse} from 'axios';
import type { responseAuthUser } from 'src/types/auth';

const useInfoUser = () => {
  const setUserExist = useUserExistStore(state => state.setUserExist);
  const { data, error, status } = useQuery<AxiosResponse<responseAuthUser>>({
    queryKey: ['user'],
    queryFn: getUserForToken,
    retry: false,
  });

  useEffect(() => {
    if (status === 'success') {
      setUserExist(true);
    }
  }, [status, setUserExist])

  const infoUser = data?.data?.body;

  return { error, infoUser, status };
};

export default useInfoUser;
