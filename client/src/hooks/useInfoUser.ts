import { getUserForToken } from '../auth/users/api/actions.ts';
import { getSellerForToken } from '../auth/sellers/api/actions.ts';
import { useQuery } from '@tanstack/react-query';
import { useUserExistStore } from '../store/StepStates';
import { useEffect } from 'react';
import type {AxiosResponse} from 'axios';
import type { responseAuthSeller, responseAuthUser } from 'src/types/auth';

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

const useInfoSeller = () => {
  const setUserExist = useUserExistStore(state => state.setUserExist);
  const { data, error, status } = useQuery<AxiosResponse<responseAuthSeller>>({
    queryKey: ['seller'],
    queryFn: getSellerForToken,
    retry: false,
  });

  useEffect(() => {
    if (status === 'success') {
      setUserExist(true);
    }
  }, [status, setUserExist])

  const infoSeller = data?.data?.body;

  return { error, infoSeller, status };
};

export {useInfoUser, useInfoSeller};
