import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  signOut: () => set({ user: null, isAuthenticated: false }),
}));