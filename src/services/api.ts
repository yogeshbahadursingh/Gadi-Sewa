/**
 * Gadi-Sewa API Client
 * 
 * In production: Connects to real Express/PostgreSQL backend
 * In demo mode: Uses localStorage to simulate backend
 * 
 * Set VITE_API_URL environment variable to use real backend
 */

const API_URL = import.meta.env.VITE_API_URL;
const DEMO_MODE = !API_URL;

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roles: string[];
}

export interface Vehicle {
  id: string;
  sellerId: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SOLD';
  category: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  negotiable: boolean;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  engineCC?: number;
  province: string;
  district: string;
  city: string;
  description?: string;
  condition?: string;
  images: VehicleImage[];
  hasPassport: boolean;
  passportId?: string;
  views: number;
  featured: boolean;
  createdAt: string;
  seller?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface VehicleImage {
  id: string;
  url: string;
  order: number;
  isPrimary: boolean;
}

export interface Favourite {
  id: string;
  userId: string;
  vehicleId: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  vehicleId: string;
  buyerId: string;
  message: string;
  offerAmount?: number;
  status: 'NEW' | 'READ' | 'REPLIED' | 'CLOSED';
  createdAt: string;
  vehicle?: Vehicle;
  buyer?: { id: string; firstName: string; lastName: string; email: string };
}

export interface Inspection {
  id: string;
  vehicleId: string;
  inspectorId?: string;
  status: 'REQUESTED' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  findings?: string;
  photos?: string[];
  createdAt: string;
  completedAt?: string;
}

export interface Passport {
  id: string;
  vehicleId: string;
  passportNumber: string;
  status: 'PENDING' | 'PUBLISHED' | 'EXPIRED' | 'REVOKED';
  inspectionDate?: string;
  publishedAt?: string;
}

// LocalStorage helpers
const STORAGE_KEYS = {
  USERS: 'gadi_sewa_users',
  CURRENT_USER: 'gadi_sewa_current_user',
  TOKEN: 'gadi_sewa_token',
  VEHICLES: 'gadi_sewa_vehicles',
  FAVORITES: 'gadi_sewa_favorites',
  ENQUIRIES: 'gadi_sewa_enquiries',
  INSPECTIONS: 'gadi_sewa_inspections',
  PASSPORTS: 'gadi_sewa_passports',
};

function getStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Demo mode API
const demoAPI = {
  async register(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) {
    const users = getStorage<Array<any>>(STORAGE_KEYS.USERS, []);
    
    if (users.find(u => u.email === data.email)) {
      throw new Error('Email already registered');
    }
    
    const user = {
      id: `user_${Date.now()}`,
      email: data.email,
      password: data.password, // In real app, this would be hashed
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      roles: ['BUYER'],
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    setStorage(STORAGE_KEYS.USERS, users);
    
    const token = `demo_token_${user.id}`;
    setStorage(STORAGE_KEYS.TOKEN, token);
    setStorage(STORAGE_KEYS.CURRENT_USER, { ...user, password: undefined });
    
    return { user: { ...user, password: undefined }, token };
  },
  
  async login(data: { email: string; password: string }) {
    const users = getStorage<Array<any>>(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === data.email && u.password === data.password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = `demo_token_${user.id}`;
    setStorage(STORAGE_KEYS.TOKEN, token);
    setStorage(STORAGE_KEYS.CURRENT_USER, { ...user, password: undefined });
    
    return { user: { ...user, password: undefined }, token };
  },
  
  async logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  
  async getCurrentUser() {
    const user = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!user) throw new Error('Not authenticated');
    return user;
  },
  
  async createVehicle(data: any) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    
    const vehicle: Vehicle = {
      id: `vehicle_${Date.now()}`,
      sellerId: currentUser.id,
      status: 'DRAFT',
      ...data,
      images: data.images || [],
      hasPassport: false,
      views: 0,
      featured: false,
      createdAt: new Date().toISOString(),
      seller: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
      }
    };
    
    vehicles.push(vehicle);
    setStorage(STORAGE_KEYS.VEHICLES, vehicles);
    
    return vehicle;
  },
  
  async updateVehicle(id: string, data: any) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    const index = vehicles.findIndex(v => v.id === id);
    
    if (index === -1) throw new Error('Vehicle not found');
    if (vehicles[index].sellerId !== currentUser.id) throw new Error('Not authorized');
    
    vehicles[index] = { ...vehicles[index], ...data };
    setStorage(STORAGE_KEYS.VEHICLES, vehicles);
    
    return vehicles[index];
  },
  
  async deleteVehicle(id: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    const vehicle = vehicles.find(v => v.id === id);
    
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.sellerId !== currentUser.id) throw new Error('Not authorized');
    
    const filtered = vehicles.filter(v => v.id !== id);
    setStorage(STORAGE_KEYS.VEHICLES, filtered);
    
    return { message: 'Vehicle deleted' };
  },
  
  async getMyVehicles() {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    return vehicles.filter(v => v.sellerId === currentUser.id);
  },
  
  async publishVehicle(id: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    const index = vehicles.findIndex(v => v.id === id);
    
    if (index === -1) throw new Error('Vehicle not found');
    if (vehicles[index].sellerId !== currentUser.id) throw new Error('Not authorized');
    
    vehicles[index].status = 'PUBLISHED';
    setStorage(STORAGE_KEYS.VEHICLES, vehicles);
    
    return vehicles[index];
  },
  
  async markAsSold(id: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    const index = vehicles.findIndex(v => v.id === id);
    
    if (index === -1) throw new Error('Vehicle not found');
    if (vehicles[index].sellerId !== currentUser.id) throw new Error('Not authorized');
    
    vehicles[index].status = 'SOLD';
    setStorage(STORAGE_KEYS.VEHICLES, vehicles);
    
    return vehicles[index];
  },
  
  async getAllVehicles(filters: any = {}) {
    let vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    
    // Only show published vehicles
    vehicles = vehicles.filter(v => v.status === 'PUBLISHED');
    
    // Apply filters
    if (filters.category) {
      vehicles = vehicles.filter(v => v.category === filters.category);
    }
    if (filters.province) {
      vehicles = vehicles.filter(v => v.province === filters.province);
    }
    if (filters.minPrice) {
      vehicles = vehicles.filter(v => v.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      vehicles = vehicles.filter(v => v.price <= filters.maxPrice);
    }
    if (filters.hasPassport) {
      vehicles = vehicles.filter(v => v.hasPassport);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      vehicles = vehicles.filter(v => 
        v.make.toLowerCase().includes(search) ||
        v.model.toLowerCase().includes(search) ||
        v.description?.toLowerCase().includes(search)
      );
    }
    
    // Sort
    switch (filters.sortBy) {
      case 'price_asc':
        vehicles.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        vehicles.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        vehicles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    return { vehicles, total: vehicles.length };
  },
  
  async getVehicleById(id: string) {
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    const vehicle = vehicles.find(v => v.id === id);
    
    if (!vehicle) throw new Error('Vehicle not found');
    
    // Increment views
    vehicle.views = (vehicle.views || 0) + 1;
    setStorage(STORAGE_KEYS.VEHICLES, vehicles);
    
    // Compute passport status from inspections
    const passports = getStorage<Passport[]>(STORAGE_KEYS.PASSPORTS, []);
    const passport = passports.find(p => p.vehicleId === id && p.status === 'PUBLISHED');
    vehicle.hasPassport = !!passport;
    vehicle.passportId = passport?.id;
    
    return vehicle;
  },
  
  // Favorites
  async addFavourite(vehicleId: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const favourites = getStorage<Favourite[]>(STORAGE_KEYS.FAVORITES, []);
    
    // Check if already favourited
    if (favourites.find(f => f.userId === currentUser.id && f.vehicleId === vehicleId)) {
      return { message: 'Already in favourites' };
    }
    
    const favourite: Favourite = {
      id: `fav_${Date.now()}`,
      userId: currentUser.id,
      vehicleId,
      createdAt: new Date().toISOString()
    };
    
    favourites.push(favourite);
    setStorage(STORAGE_KEYS.FAVORITES, favourites);
    
    return favourite;
  },
  
  async removeFavourite(vehicleId: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const favourites = getStorage<Favourite[]>(STORAGE_KEYS.FAVORITES, []);
    const filtered = favourites.filter(f => !(f.userId === currentUser.id && f.vehicleId === vehicleId));
    setStorage(STORAGE_KEYS.FAVORITES, filtered);
    
    return { message: 'Removed from favourites' };
  },
  
  async getMyFavourites() {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const favourites = getStorage<Favourite[]>(STORAGE_KEYS.FAVORITES, []);
    const userFavourites = favourites.filter(f => f.userId === currentUser.id);
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    const favouriteVehicles = userFavourites.map(fav => {
      const vehicle = vehicles.find(v => v.id === fav.vehicleId);
      return vehicle ? { ...vehicle, favouriteId: fav.id } : null;
    }).filter(Boolean);
    
    return favouriteVehicles;
  },
  
  async isFavourite(vehicleId: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) return false;
    
    const favourites = getStorage<Favourite[]>(STORAGE_KEYS.FAVORITES, []);
    return !!favourites.find(f => f.userId === currentUser.id && f.vehicleId === vehicleId);
  },
  
  // Enquiries
  async createEnquiry(vehicleId: string, message: string, offerAmount?: number) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const enquiries = getStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    
    const enquiry: Enquiry = {
      id: `enq_${Date.now()}`,
      vehicleId,
      buyerId: currentUser.id,
      message,
      offerAmount,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      buyer: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
      }
    };
    
    enquiries.push(enquiry);
    setStorage(STORAGE_KEYS.ENQUIRIES, enquiries);
    
    return enquiry;
  },
  
  async getMyEnquiries() {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const enquiries = getStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    
    const userEnquiries = enquiries.filter(e => e.buyerId === currentUser.id);
    return userEnquiries.map(enq => ({
      ...enq,
      vehicle: vehicles.find(v => v.id === enq.vehicleId)
    }));
  },
  
  async getEnquiriesForMyVehicles() {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    const myVehicleIds = vehicles.filter(v => v.sellerId === currentUser.id).map(v => v.id);
    
    const enquiries = getStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const relevantEnquiries = enquiries.filter(e => myVehicleIds.includes(e.vehicleId));
    
    return relevantEnquiries.map(enq => ({
      ...enq,
      vehicle: vehicles.find(v => v.id === enq.vehicleId)
    }));
  },
  
  // Profile
  async updateProfile(data: { firstName?: string; lastName?: string; phone?: string }) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const users = getStorage<any[]>(STORAGE_KEYS.USERS, []);
    const index = users.findIndex(u => u.id === currentUser.id);
    
    if (index === -1) throw new Error('User not found');
    
    users[index] = { ...users[index], ...data };
    setStorage(STORAGE_KEYS.USERS, users);
    
    const updatedUser = { ...users[index], password: undefined };
    setStorage(STORAGE_KEYS.CURRENT_USER, updatedUser);
    
    return updatedUser;
  },
  
  async changePassword(currentPassword: string, newPassword: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const users = getStorage<any[]>(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.id === currentUser.id);
    
    if (!user) throw new Error('User not found');
    if (user.password !== currentPassword) throw new Error('Current password is incorrect');
    if (newPassword.length < 8) throw new Error('New password must be at least 8 characters');
    
    const index = users.findIndex(u => u.id === currentUser.id);
    users[index].password = newPassword;
    setStorage(STORAGE_KEYS.USERS, users);
    
    return { message: 'Password changed successfully' };
  },
  
  // Image upload (base64 for demo mode)
  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },
  
  // Passport status (computed from inspections)
  async getPassportStatus(vehicleId: string): Promise<{ hasPassport: boolean; passport?: Passport }> {
    const passports = getStorage<Passport[]>(STORAGE_KEYS.PASSPORTS, []);
    const passport = passports.find(p => p.vehicleId === vehicleId && p.status === 'PUBLISHED');
    return { hasPassport: !!passport, passport };
  }
};

// Export API client
export const api = DEMO_MODE ? demoAPI : {
  async register(data: any) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },
  
  async login(data: any) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },
  
  async logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  
  async getCurrentUser() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) throw new Error('Not authenticated');
    
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },
  
  async createVehicle(data: any) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create vehicle');
    return res.json();
  },
  
  async updateVehicle(id: string, data: any) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update vehicle');
    return res.json();
  },
  
  async deleteVehicle(id: string) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/vehicles/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete vehicle');
    return res.json();
  },
  
  async getMyVehicles() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/vehicles/seller/my-vehicles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
  },
  
  async publishVehicle(id: string) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/vehicles/${id}/publish`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to publish vehicle');
    return res.json();
  },
  
  async markAsSold(id: string) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/vehicles/${id}/sold`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to mark as sold');
    return res.json();
  },
  
  async getAllVehicles(filters: any = {}) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/api/vehicles?${params}`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
  },
  
  async getVehicleById(id: string) {
    const res = await fetch(`${API_URL}/api/vehicles/${id}`);
    if (!res.ok) throw new Error('Vehicle not found');
    return res.json();
  },
  
  async addFavourite(vehicleId: string) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ vehicleId })
    });
    if (!res.ok) throw new Error('Failed to add favourite');
    return res.json();
  },
  
  async removeFavourite(vehicleId: string) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/favourites/${vehicleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to remove favourite');
    return res.json();
  },
  
  async getMyFavourites() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/favourites`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch favourites');
    return res.json();
  },
  
  async isFavourite(vehicleId: string) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/favourites/check/${vehicleId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.isFavourite;
  },
  
  async createEnquiry(vehicleId: string, message: string, offerAmount?: number) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ vehicleId, message, offerAmount })
    });
    if (!res.ok) throw new Error('Failed to create enquiry');
    return res.json();
  },
  
  async getMyEnquiries() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/enquiries/buyer`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return res.json();
  },
  
  async getEnquiriesForMyVehicles() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/enquiries/seller`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return res.json();
  },
  
  async updateProfile(data: { firstName?: string; lastName?: string; phone?: string }) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },
  
  async changePassword(currentPassword: string, newPassword: string) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const res = await fetch(`${API_URL}/api/users/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    if (!res.ok) throw new Error('Failed to change password');
    return res.json();
  },
  
  async uploadImage(file: File): Promise<string> {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const formData = new FormData();
    formData.append('image', file);
    
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload image');
    const data = await res.json();
    return data.url;
  },
  
  async getPassportStatus(vehicleId: string) {
    const res = await fetch(`${API_URL}/api/passports/vehicle/${vehicleId}`);
    if (!res.ok) return { hasPassport: false };
    const data = await res.json();
    return { hasPassport: true, passport: data.passport };
  }
};

export const isDemoMode = DEMO_MODE;
