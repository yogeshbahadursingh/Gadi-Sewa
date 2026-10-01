import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '../types';
import { users } from '../store/data';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => false,
  logout: () => {},
  switchRole: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]); // Default: admin for demo

  const login = useCallback(async (email: string, password: string) => {
    // Mock authentication - in production, this would call the backend API
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const switchRole = useCallback((role: string) => {
    const user = users.find((u) => u.role === role);
    if (user) setCurrentUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        switchRole,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// App State Context
interface AppState {
  favorites: string[];
  recentlyViewed: string[];
  searchAlerts: any[];
}

interface AppContextType {
  state: AppState;
  toggleFavorite: (listingId: string) => void;
  addRecentlyViewed: (listingId: string) => void;
}

const AppContext = createContext<AppContextType>({
  state: { favorites: [], recentlyViewed: [], searchAlerts: [] },
  toggleFavorite: () => {},
  addRecentlyViewed: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    favorites: ['l1', 'l3'],
    recentlyViewed: ['l1', 'l2', 'l3'],
    searchAlerts: [],
  });

  const toggleFavorite = useCallback((listingId: string) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(listingId)
        ? prev.favorites.filter((id) => id !== listingId)
        : [...prev.favorites, listingId],
    }));
  }, []);

  const addRecentlyViewed = useCallback((listingId: string) => {
    setState((prev) => ({
      ...prev,
      recentlyViewed: [listingId, ...prev.recentlyViewed.filter((id) => id !== listingId)].slice(0, 10),
    }));
  }, []);

  return (
    <AppContext.Provider value={{ state, toggleFavorite, addRecentlyViewed }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
