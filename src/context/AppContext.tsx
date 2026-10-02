import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { users } from '../store/data';
import { authService } from '../services/dataService';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { email: string; phone: string; fullName: string; password: string; role?: string }) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  switchRole: () => {},
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const response = await authService.getMe();
          if (response.success && response.data) {
            setCurrentUser(response.data);
          }
        } catch (error) {
          console.error('Failed to get user:', error);
          authService.logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response.success && response.data?.user) {
        setCurrentUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (userData: { email: string; phone: string; fullName: string; password: string; role?: string }) => {
    try {
      const response = await authService.register(userData);
      if (response.success && response.data?.user) {
        setCurrentUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
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
        register,
        logout,
        switchRole,
        isAuthenticated: !!currentUser,
        isLoading,
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
