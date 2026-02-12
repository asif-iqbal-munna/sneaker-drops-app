import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserSlice {
  user: { id: string; name: string } | null;
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
