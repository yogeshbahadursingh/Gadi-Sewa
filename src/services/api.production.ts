// Production API Service Layer - Connects to real backend
import { 
  User, Vehicle, VehicleImage, Favourite, Enquiry, Inspection, Passport,
  OwnedVehicle, MaintenanceRecord, VehicleDocument, VehicleExpense, VehicleReminder,
  Workshop, Mechanic, ServiceBooking, WorkshopReview,
  RoadsideAssistanceProvider, RoadsideAssistanceRequest,
  FinanceProvider, FinanceProduct, FinanceApplication,
  ChargingStation, BatteryHealthRecord,
  PartsMerchant, PartProduct, PartOrder,
  Auction, Bid,
  Fleet, FleetVehicle, FleetDriver,
  VehicleValuation
} from '../types';

// Re-export types for convenience
export type { User, Vehicle, Workshop, FinanceProvider, FinanceProduct } from '../types';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Storage Keys (for token only)
const STORAGE_KEYS = {
  TOKEN: 'gadi_sewa_token',
  CURRENT_USER: 'gadi_sewa_current_user',
};

// Helper Functions
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

function getCurrentUser(): any {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user: any): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

// HTTP Helper
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (options.headers) {
    Object.assign(headers, options.headers);
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data.data;
}

// API Client
export const api = {
  // ===== AUTHENTICATION =====
  
  async register(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) {
    const result = await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    setToken(result.token);
    setCurrentUser(result.user);
    
    return result;
  },
  
  async login(data: { email: string; password: string }) {
    const result = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    setToken(result.token);
    setCurrentUser(result.user);
    
    return result;
  },
  
  async logout() {
    removeToken();
  },
  
  async getCurrentUser() {
    const user = getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    // Optionally refresh from server
    // const result = await fetchAPI('/auth/me');
    // return result;
    
    return user;
  },
  
  async updateProfile(data: { firstName?: string; lastName?: string; phone?: string }) {
    const result = await fetchAPI('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    setCurrentUser(result);
    return result;
  },
  
  async changePassword(currentPassword: string, newPassword: string) {
    return fetchAPI('/users/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // ===== VEHICLES =====
  
  async createVehicle(data: Partial<Vehicle>) {
    return fetchAPI('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  async updateVehicle(id: string, data: Partial<Vehicle>) {
    return fetchAPI(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  async deleteVehicle(id: string) {
    return fetchAPI(`/vehicles/${id}`, {
      method: 'DELETE',
    });
  },
  
  async getMyVehicles() {
    return fetchAPI('/vehicles/seller/my-vehicles');
  },
  
  async publishVehicle(id: string) {
    return fetchAPI(`/vehicles/${id}/publish`, {
      method: 'POST',
    });
  },
  
  async markAsSold(id: string) {
    return fetchAPI(`/vehicles/${id}/sold`, {
      method: 'POST',
    });
  },
  
  async getAllVehicles(filters: any = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    
    return fetchAPI(`/vehicles?${params.toString()}`);
  },
  
  async getVehicleById(id: string) {
    return fetchAPI(`/vehicles/${id}`);
  },

  // ===== FAVORITES =====
  
  async addFavourite(vehicleId: string) {
    return fetchAPI('/favorites', {
      method: 'POST',
      body: JSON.stringify({ vehicleId }),
    });
  },
  
  async removeFavourite(vehicleId: string) {
    return fetchAPI(`/favorites/${vehicleId}`, {
      method: 'DELETE',
    });
  },
  
  async getMyFavourites() {
    return fetchAPI('/favorites');
  },
  
  async isFavourite(vehicleId: string) {
    try {
      const result = await fetchAPI(`/favorites/check/${vehicleId}`);
      return result.isFavourite;
    } catch {
      return false;
    }
  },

  // ===== ENQUIRIES =====
  
  async createEnquiry(vehicleId: string, message: string, offerAmount?: number) {
    return fetchAPI('/enquiries', {
      method: 'POST',
      body: JSON.stringify({ vehicleId, message, offerAmount }),
    });
  },
  
  async getMyEnquiries() {
    return fetchAPI('/enquiries/buyer');
  },
  
  async getEnquiriesForMyVehicles() {
    return fetchAPI('/enquiries/seller');
  },

  // ===== IMAGE UPLOAD =====
  
  async uploadImage(file: File): Promise<string> {
    const token = getToken();
    
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    
    return data.data.url;
  },

  // ===== PASSPORT STATUS =====
  
  async getPassportStatus(vehicleId: string): Promise<{ hasPassport: boolean; passport?: Passport }> {
    try {
      const passport = await fetchAPI(`/passports/vehicle/${vehicleId}`);
      return { hasPassport: true, passport };
    } catch {
      return { hasPassport: false };
    }
  }
};

export const isDemoMode = false;
