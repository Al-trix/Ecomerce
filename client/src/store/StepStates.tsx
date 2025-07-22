import { create } from 'zustand';

type StateStepCount = {
  stepCount: number;
  setStepCount: () => void;
};

type StateTypeUser = {
  typeUser: 'user' | 'seller' | '';
  setTypeUser: (typeUser: 'user' | 'seller' | '') => void;
};

type StateUserExist = {
  userExist: boolean;
  setUserExist: (userExist: boolean) => void;
};

export const useStepCountStore = create<StateStepCount>((set) => ({
  stepCount: 1,
  setStepCount: () => set((state) => ({ stepCount: state.stepCount + 1 })),
}));

export const useTypeUserStore = create<StateTypeUser>((set) => ({
  typeUser: '',
  setTypeUser: (typeUser) => set({ typeUser }),
}));

export const useUserExistStore = create<StateUserExist>((set) => ({
  userExist: false,
  setUserExist: (userExist) => set({ userExist }),
}));
