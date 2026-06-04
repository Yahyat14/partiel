import { create } from 'zustand';
import api from '../utils/api';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  isAuthenticated: () => !!get().token,
  isAdmin: () => get().user?.role === 'admin',

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, loading: false });
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Une erreur est survenue lors de la connexion';
      set({ error: errMsg, loading: false });
      return { success: false, error: errMsg };
    }
  },

  adminLogin: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/admin-login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, loading: false });
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Identifiants administrateur invalides';
      set({ error: errMsg, loading: false });
      return { success: false, error: errMsg };
    }
  },

  register: async (firstName, lastName, email, password, confirmPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, loading: false });
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Une erreur est survenue lors de l’inscription';
      set({ error: errMsg, loading: false });
      return { success: false, error: errMsg };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout request failed on backend:', err.message);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
