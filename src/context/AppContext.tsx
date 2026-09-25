import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { User } from '../types';
import { users } from '../store/data';
import { storageService } from '../services/storage';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  switchRole: (role: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => false,
  logout: () => {},
  switchRole: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]); // Default: admin for demo

  const login = useCallback((email: string) => {
    const user = users.find(u => u.email === email);
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
    const user = users.find(u => u.role === role);
    if (user) setCurrentUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, switchRole, isAuthenticated: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// App State Context with persistence
interface AppState {
  favorites: string[];
  recentlyViewed: string[];
  searchAlerts: any[];
}

interface AppContextType {
  state: AppState;
  toggleFavorite: (listingId: string) => void;
  addRecentlyViewed: (listingId: string) => void;
  clearRecentlyViewed: () => void;
}

const AppContext = createContext<AppContextType>({
  state: { favorites: [], recentlyViewed: [], searchAlerts: [] },
  toggleFavorite: () => {},
  addRecentlyViewed: () => {},
  clearRecentlyViewed: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage
  const [state, setState] = useState<AppState>(() => {
    const favorites = storageService.getFavorites();
    const recentlyViewed = storageService.getRecentlyViewed();
    
    return {
      favorites: favorites.length > 0 ? favorites : ['l1', 'l3'], // Default favorites if none
      recentlyViewed: recentlyViewed.length > 0 ? recentlyViewed : ['l1', 'l2', 'l3'], // Default if none
      searchAlerts: [],
    };
  });

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    storageService.setFavorites(state.favorites);
  }, [state.favorites]);

  // Persist recently viewed to localStorage whenever they change
  useEffect(() => {
    storageService.setRecentlyViewed(state.recentlyViewed);
  }, [state.recentlyViewed]);

  const toggleFavorite = useCallback((listingId: string) => {
    setState(prev => {
      const isFavorite = prev.favorites.includes(listingId);
      const newFavorites = isFavorite
        ? prev.favorites.filter(id => id !== listingId)
        : [...prev.favorites, listingId];
      
      return {
        ...prev,
        favorites: newFavorites,
      };
    });
  }, []);

  const addRecentlyViewed = useCallback((listingId: string) => {
    setState(prev => ({
      ...prev,
      recentlyViewed: [
        listingId,
        ...prev.recentlyViewed.filter(id => id !== listingId)
      ].slice(0, 10),
    }));
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setState(prev => ({
      ...prev,
      recentlyViewed: [],
    }));
  }, []);

  return (
    <AppContext.Provider value={{ state, toggleFavorite, addRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
