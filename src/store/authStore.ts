import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  accessToken: string | null;
  // refreshToken: string | null;
  setUser: (user: any) => void;
  // setTokens: (access: string, refresh: string) => void;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: user => set({ user }),
      // setTokens: (access, refresh) => set({ accessToken: access, refreshToken: refresh }),
      setTokens: (access, refresh) => set({ accessToken: access }),
      // logout: () => set({ user: null, accessToken: null, refreshToken: null }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    { name: 'auth-storage' }
  )
);
