import { create } from 'zustand';

const ADMIN_SESSION_KEY = 'kibo-admin-session';

const getStoredSession = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(ADMIN_SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

export const useAuthStore = create((set) => ({
  admin: getStoredSession(),
  isAuthenticated: !!getStoredSession(),
  isLoading: false,
  setAuth: (admin) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(admin));
    }
    set({ admin, isAuthenticated: !!admin, isLoading: false });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    }
    set({ admin: null, isAuthenticated: false, isLoading: false });
  }
}));
