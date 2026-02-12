import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from '../types/types';

interface UserSlice {
  user: IUser | null;
  setUser: (user: UserSlice['user']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserSlice>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'userInfo',
    }
  )
);
