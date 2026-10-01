// API Service Layer - Abstracts data access for future backend integration

import { 
  users, 
  vehicles, 
  listings, 
  inspections, 
  vehiclePassports, 
  offers, 
  reservations,
  payments,
  dealers 
} from '../store/data';
import type { 
  User, 
  Vehicle, 
  Listing, 
  Inspection, 
  VehiclePassport, 
  Offer, 
  Reservation,
  Payment,
  Dealer 
} from '../types';

// Simulate API delay for realistic behavior
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

const createResponse = <T>(data: T, success: boolean = true, error?: string): ApiResponse<T> => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : error,
  timestamp: new Date().toISOString(),
});

// ============ USER API ============
export const userApi = {
  async getAll(): Promise<ApiResponse<User[]>> {
    await simulateDelay();
    return createResponse(users);
  },

  async getById(id: string): Promise<ApiResponse<User | null>> {
    await simulateDelay();
    const user = users.find(u => u.id === id);
    return createResponse(user || null, !!user, user ? undefined : 'User not found');
  },

  async getByEmail(email: string): Promise<ApiResponse<User | null>> {
    await simulateDelay();
    const user = users.find(u => u.email === email);
    return createResponse(user || null, !!user, user ? undefined : 'User not found');
  },

  async getByRole(role: string): Promise<ApiResponse<User[]>> {
    await simulateDelay();
    const filtered = users.filter(u => u.role === role);
    return createResponse(filtered);
  },
};

// ============ VEHICLE API ============
export const vehicleApi = {
  async getAll(): Promise<ApiResponse<Vehicle[]>> {
    await simulateDelay();
    return createResponse(vehicles);
  },

  async getById(id: string): Promise<ApiResponse<Vehicle | null>> {
    await simulateDelay();
    const vehicle = vehicles.find(v => v.id === id);
    return createResponse(vehicle || null, !!vehicle, vehicle ? undefined : 'Vehicle not found');
  },

  async getByPassportId(passportId: string): Promise<ApiResponse<Vehicle | null>> {
    await simulateDelay();
    const vehicle = vehicles.find(v => v.passportId === passportId);
    return createResponse(vehicle || null, !!vehicle, vehicle ? undefined : 'Vehicle not found');
  },

  async getByType(type: string): Promise<ApiResponse<Vehicle[]>> {
    await simulateDelay();
    const filtered = vehicles.filter(v => v.type === type);
    return createResponse(filtered);
  },

  async getByMake(make: string): Promise<ApiResponse<Vehicle[]>> {
    await simulateDelay();
    const filtered = vehicles.filter(v => v.make.toLowerCase() === make.toLowerCase());
    return createResponse(filtered);
  },

  async search(query: string): Promise<ApiResponse<Vehicle[]>> {
    await simulateDelay();
    const q = query.toLowerCase();
    const filtered = vehicles.filter(v => 
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.variant.toLowerCase().includes(q)
    );
    return createResponse(filtered);
  },
};

// ============ LISTING API ============
export const listingApi = {
  async getAll(): Promise<ApiResponse<Listing[]>> {
    await simulateDelay();
    return createResponse(listings);
  },

  async getActive(): Promise<ApiResponse<Listing[]>> {
    await simulateDelay();
    const filtered = listings.filter(l => l.status === 'ACTIVE');
    return createResponse(filtered);
  },

  async getById(id: string): Promise<ApiResponse<Listing | null>> {
    await simulateDelay();
    const listing = listings.find(l => l.id === id);
    return createResponse(listing || null, !!listing, listing ? undefined : 'Listing not found');
  },

  async getBySeller(sellerId: string): Promise<ApiResponse<Listing[]>> {
    await simulateDelay();
    const filtered = listings.filter(l => l.sellerId === sellerId);
    return createResponse(filtered);
  },

  async getByVehicle(vehicleId: string): Promise<ApiResponse<Listing | null>> {
    await simulateDelay();
    const listing = listings.find(l => l.vehicleId === vehicleId);
    return createResponse(listing || null, !!listing, listing ? undefined : 'Listing not found');
  },

  async getByDistrict(district: string): Promise<ApiResponse<Listing[]>> {
    await simulateDelay();
    const filtered = listings.filter(l => l.district.toLowerCase() === district.toLowerCase());
    return createResponse(filtered);
  },

  async getFeatured(): Promise<ApiResponse<Listing[]>> {
    await simulateDelay();
    const filtered = listings.filter(l => l.isFeatured && l.status === 'ACTIVE');
    return createResponse(filtered);
  },

  async search(filters: {
    query?: string;
    make?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    district?: string;
    fuelType?: string;
    isEV?: boolean;
  }): Promise<ApiResponse<Listing[]>> {
    await simulateDelay();
    
    let filtered = listings.filter(l => l.status === 'ACTIVE');

    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(l => {
        const vehicle = vehicles.find(v => v.id === l.vehicleId);
        return vehicle && (
          vehicle.make.toLowerCase().includes(q) ||
          vehicle.model.toLowerCase().includes(q) ||
          l.title.toLowerCase().includes(q)
        );
      });
    }

    if (filters.make) {
      filtered = filtered.filter(l => {
        const vehicle = vehicles.find(v => v.id === l.vehicleId);
        return vehicle && vehicle.make.toLowerCase() === filters.make!.toLowerCase();
      });
    }

    if (filters.minPrice) {
      filtered = filtered.filter(l => l.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(l => l.price <= filters.maxPrice!);
    }

    if (filters.district) {
      filtered = filtered.filter(l => l.district.toLowerCase() === filters.district!.toLowerCase());
    }

    if (filters.isEV !== undefined) {
      filtered = filtered.filter(l => {
        const vehicle = vehicles.find(v => v.id === l.vehicleId);
        return vehicle && vehicle.isEV === filters.isEV;
      });
    }

    return createResponse(filtered);
  },
};

// ============ INSPECTION API ============
export const inspectionApi = {
  async getAll(): Promise<ApiResponse<Inspection[]>> {
    await simulateDelay();
    return createResponse(inspections);
  },

  async getById(id: string): Promise<ApiResponse<Inspection | null>> {
    await simulateDelay();
    const inspection = inspections.find(i => i.id === id);
    return createResponse(inspection || null, !!inspection, inspection ? undefined : 'Inspection not found');
  },

  async getByVehicle(vehicleId: string): Promise<ApiResponse<Inspection[]>> {
    await simulateDelay();
    const filtered = inspections.filter(i => i.vehicleId === vehicleId);
    return createResponse(filtered);
  },

  async getByInspector(inspectorId: string): Promise<ApiResponse<Inspection[]>> {
    await simulateDelay();
    const filtered = inspections.filter(i => i.inspectorId === inspectorId);
    return createResponse(filtered);
  },
};

// ============ PASSPORT API ============
export const passportApi = {
  async getAll(): Promise<ApiResponse<VehiclePassport[]>> {
    await simulateDelay();
    return createResponse(vehiclePassports);
  },

  async getById(id: string): Promise<ApiResponse<VehiclePassport | null>> {
    await simulateDelay();
    const passport = vehiclePassports.find(p => p.id === id);
    return createResponse(passport || null, !!passport, passport ? undefined : 'Passport not found');
  },

  async getByPassportId(passportId: string): Promise<ApiResponse<VehiclePassport | null>> {
    await simulateDelay();
    const passport = vehiclePassports.find(p => p.passportId === passportId);
    return createResponse(passport || null, !!passport, passport ? undefined : 'Passport not found');
  },

  async getByVehicle(vehicleId: string): Promise<ApiResponse<VehiclePassport | null>> {
    await simulateDelay();
    const passport = vehiclePassports.find(p => p.vehicleId === vehicleId);
    return createResponse(passport || null, !!passport, passport ? undefined : 'Passport not found');
  },
};

// ============ OFFER API ============
export const offerApi = {
  async getAll(): Promise<ApiResponse<Offer[]>> {
    await simulateDelay();
    return createResponse(offers);
  },

  async getById(id: string): Promise<ApiResponse<Offer | null>> {
    await simulateDelay();
    const offer = offers.find(o => o.id === id);
    return createResponse(offer || null, !!offer, offer ? undefined : 'Offer not found');
  },

  async getByListing(listingId: string): Promise<ApiResponse<Offer[]>> {
    await simulateDelay();
    const filtered = offers.filter(o => o.listingId === listingId);
    return createResponse(filtered);
  },

  async getByBuyer(buyerId: string): Promise<ApiResponse<Offer[]>> {
    await simulateDelay();
    const filtered = offers.filter(o => o.buyerId === buyerId);
    return createResponse(filtered);
  },

  async getBySeller(sellerId: string): Promise<ApiResponse<Offer[]>> {
    await simulateDelay();
    const filtered = offers.filter(o => o.sellerId === sellerId);
    return createResponse(filtered);
  },
};

// ============ RESERVATION API ============
export const reservationApi = {
  async getAll(): Promise<ApiResponse<Reservation[]>> {
    await simulateDelay();
    return createResponse(reservations);
  },

  async getById(id: string): Promise<ApiResponse<Reservation | null>> {
    await simulateDelay();
    const reservation = reservations.find(r => r.id === id);
    return createResponse(reservation || null, !!reservation, reservation ? undefined : 'Reservation not found');
  },

  async getByBuyer(buyerId: string): Promise<ApiResponse<Reservation[]>> {
    await simulateDelay();
    const filtered = reservations.filter(r => r.buyerId === buyerId);
    return createResponse(filtered);
  },
};

// ============ DEALER API ============
export const dealerApi = {
  async getAll(): Promise<ApiResponse<Dealer[]>> {
    await simulateDelay();
    return createResponse(dealers);
  },

  async getById(id: string): Promise<ApiResponse<Dealer | null>> {
    await simulateDelay();
    const dealer = dealers.find(d => d.id === id);
    return createResponse(dealer || null, !!dealer, dealer ? undefined : 'Dealer not found');
  },

  async getByUserId(userId: string): Promise<ApiResponse<Dealer | null>> {
    await simulateDelay();
    const dealer = dealers.find(d => d.userId === userId);
    return createResponse(dealer || null, !!dealer, dealer ? undefined : 'Dealer not found');
  },
};

// ============ HELPER FUNCTIONS ============
export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(v => v.id === id);
};

export const getListingById = (id: string): Listing | undefined => {
  return listings.find(l => l.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};

export const formatPrice = (price: number): string => {
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(2)} Lakh`;
  }
  return `Rs. ${price.toLocaleString('en-NP')}`;
};

export const formatMileage = (km: number): string => {
  return `${km.toLocaleString('en-NP')} km`;
};
