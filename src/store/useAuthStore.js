import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (admin) => set({ admin, isAuthenticated: !!admin, isLoading: false }),
  logout: () => set({ admin: null, isAuthenticated: false, isLoading: false })
}));
