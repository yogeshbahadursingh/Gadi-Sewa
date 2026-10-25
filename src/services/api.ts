// API Service Layer - Demo Mode with localStorage
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

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'gadi_sewa_users',
  CURRENT_USER: 'gadi_sewa_current_user',
  TOKEN: 'gadi_sewa_token',
  VEHICLES: 'gadi_sewa_vehicles',
  FAVORITES: 'gadi_sewa_favorites',
  ENQUIRIES: 'gadi_sewa_enquiries',
  INSPECTIONS: 'gadi_sewa_inspections',
  PASSPORTS: 'gadi_sewa_passports',
  OWNED_VEHICLES: 'gadi_sewa_owned_vehicles',
  MAINTENANCE_RECORDS: 'gadi_sewa_maintenance_records',
  VEHICLE_DOCUMENTS: 'gadi_sewa_vehicle_documents',
  VEHICLE_EXPENSES: 'gadi_sewa_vehicle_expenses',
  VEHICLE_REMINDERS: 'gadi_sewa_vehicle_reminders',
  WORKSHOPS: 'gadi_sewa_workshops',
  MECHANICS: 'gadi_sewa_mechanics',
  SERVICE_BOOKINGS: 'gadi_sewa_service_bookings',
  WORKSHOP_REVIEWS: 'gadi_sewa_workshop_reviews',
  ASSISTANCE_PROVIDERS: 'gadi_sewa_assistance_providers',
  ASSISTANCE_REQUESTS: 'gadi_sewa_assistance_requests',
  FINANCE_PROVIDERS: 'gadi_sewa_finance_providers',
  FINANCE_PRODUCTS: 'gadi_sewa_finance_products',
  FINANCE_APPLICATIONS: 'gadi_sewa_finance_applications',
  CHARGING_STATIONS: 'gadi_sewa_charging_stations',
  BATTERY_HEALTH_RECORDS: 'gadi_sewa_battery_health_records',
  PARTS_MERCHANTS: 'gadi_sewa_parts_merchants',
  PART_PRODUCTS: 'gadi_sewa_part_products',
  PART_ORDERS: 'gadi_sewa_part_orders',
  AUCTIONS: 'gadi_sewa_auctions',
  BIDS: 'gadi_sewa_bids',
  FLEETS: 'gadi_sewa_fleets',
  FLEET_VEHICLES: 'gadi_sewa_fleet_vehicles',
  FLEET_DRIVERS: 'gadi_sewa_fleet_drivers',
  VEHICLE_VALUATIONS: 'gadi_sewa_vehicle_valuations',
};

// Helper Functions
function getStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// API Client
export const api = {
  // ===== AUTHENTICATION =====
  
  async register(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) {
    const users = getStorage<any[]>(STORAGE_KEYS.USERS, []);
    
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
    const users = getStorage<any[]>(STORAGE_KEYS.USERS, []);
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

  // ===== VEHICLES =====
  
  async createVehicle(data: Partial<Vehicle>) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const vehicles = getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, []);
    
    const vehicle: Vehicle = {
      id: `vehicle_${Date.now()}`,
      sellerId: currentUser.id,
      status: 'DRAFT',
      ...data as any,
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
  
  async updateVehicle(id: string, data: Partial<Vehicle>) {
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

  // ===== FAVORITES =====
  
  async addFavourite(vehicleId: string) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const favourites = getStorage<Favourite[]>(STORAGE_KEYS.FAVORITES, []);
    
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

  // ===== ENQUIRIES =====
  
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

  // ===== IMAGE UPLOAD =====
  
  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  // ===== PASSPORT STATUS =====
  
  async getPassportStatus(vehicleId: string): Promise<{ hasPassport: boolean; passport?: Passport }> {
    const passports = getStorage<Passport[]>(STORAGE_KEYS.PASSPORTS, []);
    const passport = passports.find(p => p.vehicleId === vehicleId && p.status === 'PUBLISHED');
    return { hasPassport: !!passport, passport };
  },

  // ===== MY GARAGE =====
  
  async getMyOwnedVehicles() {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const ownedVehicles = getStorage<OwnedVehicle[]>(STORAGE_KEYS.OWNED_VEHICLES, []);
    const maintenanceRecords = getStorage<MaintenanceRecord[]>(STORAGE_KEYS.MAINTENANCE_RECORDS, []);
    const documents = getStorage<VehicleDocument[]>(STORAGE_KEYS.VEHICLE_DOCUMENTS, []);
    const expenses = getStorage<VehicleExpense[]>(STORAGE_KEYS.VEHICLE_EXPENSES, []);
    const reminders = getStorage<VehicleReminder[]>(STORAGE_KEYS.VEHICLE_REMINDERS, []);
    
    return ownedVehicles
      .filter(v => v.userId === currentUser.id)
      .map(v => ({
        ...v,
        maintenanceRecords: maintenanceRecords.filter(r => r.ownedVehicleId === v.id),
        documents: documents.filter(d => d.ownedVehicleId === v.id),
        expenses: expenses.filter(e => e.ownedVehicleId === v.id),
        reminders: reminders.filter(r => r.ownedVehicleId === v.id)
      }));
  },

  async addOwnedVehicle(data: Partial<OwnedVehicle>) {
    const currentUser = getStorage<any>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) throw new Error('Not authenticated');
    
    const ownedVehicles = getStorage<OwnedVehicle[]>(STORAGE_KEYS.OWNED_VEHICLES, []);
    
    const newVehicle: OwnedVehicle = {
      id: `owned_${Date.now()}`,
      userId: currentUser.id,
      make: data.make,
      model: data.model,
      year: data.year,
      registrationNumber: data.registrationNumber,
      vin: data.vin,
      purchaseDate: data.purchaseDate,
      purchasePrice: data.purchasePrice,
      currentMileage: data.currentMileage || 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    ownedVehicles.push(newVehicle);
    setStorage(STORAGE_KEYS.OWNED_VEHICLES, ownedVehicles);
    
    return newVehicle;
  },

  // ===== WORKSHOPS =====
  
  async getWorkshops() {
    return getStorage<Workshop[]>(STORAGE_KEYS.WORKSHOPS, []);
  },

  // ===== FINANCE =====
  
  async getFinanceProviders() {
    return getStorage<FinanceProvider[]>(STORAGE_KEYS.FINANCE_PROVIDERS, []);
  },

  async getFinanceProducts() {
    return getStorage<FinanceProduct[]>(STORAGE_KEYS.FINANCE_PRODUCTS, []);
  }
};

export const isDemoMode = true;
