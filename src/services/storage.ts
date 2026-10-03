// Local Storage Service for data persistence

const STORAGE_KEYS = {
  FAVORITES: 'gadibazar_favorites',
  RECENTLY_VIEWED: 'gadibazar_recently_viewed',
  USER_PREFERENCES: 'gadibazar_user_preferences',
  AUTH_TOKEN: 'gadibazar_auth_token',
  SEARCH_HISTORY: 'gadibazar_search_history',
} as const;

export const storageService = {
  // Favorites
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading favorites from storage:', error);
      return [];
    }
  },

  setFavorites(favorites: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  },

  addFavorite(listingId: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(listingId)) {
      favorites.push(listingId);
      this.setFavorites(favorites);
    }
  },

  removeFavorite(listingId: string): void {
    const favorites = this.getFavorites().filter(id => id !== listingId);
    this.setFavorites(favorites);
  },

  // Recently Viewed
  getRecentlyViewed(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading recently viewed from storage:', error);
      return [];
    }
  },

  setRecentlyViewed(items: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving recently viewed to storage:', error);
    }
  },

  addRecentlyViewed(listingId: string, maxItems: number = 10): void {
    const items = this.getRecentlyViewed();
    const filtered = items.filter(id => id !== listingId);
    filtered.unshift(listingId);
    this.setRecentlyViewed(filtered.slice(0, maxItems));
  },

  // User Preferences
  getUserPreferences(): Record<string, any> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading user preferences from storage:', error);
      return {};
    }
  },

  setUserPreferences(preferences: Record<string, any>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving user preferences to storage:', error);
    }
  },

  updatePreference(key: string, value: any): void {
    const preferences = this.getUserPreferences();
    preferences[key] = value;
    this.setUserPreferences(preferences);
  },

  // Search History
  getSearchHistory(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading search history from storage:', error);
      return [];
    }
  },

  addSearchHistory(query: string, maxItems: number = 20): void {
    const history = this.getSearchHistory();
    const filtered = history.filter(q => q !== query);
    filtered.unshift(query);
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(filtered.slice(0, maxItems)));
    } catch (error) {
      console.error('Error saving search history to storage:', error);
    }
  },

  clearSearchHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  },

  // Auth Token (for future backend integration)
  getAuthToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error reading auth token from storage:', error);
      return null;
    }
  },

  setAuthToken(token: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving auth token to storage:', error);
    }
  },

  clearAuthToken(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error clearing auth token:', error);
    }
  },

  // Clear all data
  clearAll(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing all storage:', error);
    }
  },

  // Check storage availability
  isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },
};
