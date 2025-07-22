
import { create } from 'zustand';

type StateRouteBlock = {
  authBlocked: boolean;
  blockAuthRoutes: () => void;
};

export const useRouteBlockStore = create<StateRouteBlock>((set) => ({
  authBlocked: false,
  blockAuthRoutes: () => set({ authBlocked: true }),
}));
