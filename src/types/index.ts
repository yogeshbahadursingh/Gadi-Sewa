// Core Types for Gadi-Sewa Platform

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roles: string[];
  createdAt: string;
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
  buyerId?: string;
  inspectorId?: string;
  status: 'REQUESTED' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  preferredDate?: string;
  notes?: string;
  checklist?: any;
  findings?: string;
  photos?: string[];
  overallRating?: string;
  estimatedValue?: number;
  issues?: string[];
  createdAt: string;
  assignedAt?: string;
  vehicle?: Vehicle;
  completedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface Passport {
  id: string;
  vehicleId: string;
  inspectionId?: string;
  passportNumber: string;
  status: 'PENDING' | 'PUBLISHED' | 'EXPIRED' | 'REVOKED';
  inspectionDate?: string;
  publishedAt?: string;
  checklist?: any;
  findings?: string;
  photos?: string[];
  overallRating?: string;
  estimatedValue?: number;
  issues?: string[];
}

// Phase 4: My Garage
export interface OwnedVehicle {
  id: string;
  userId: string;
  vehicleId?: string;
  passportId?: string;
  make?: string;
  model?: string;
  year?: number;
  registrationNumber?: string;
  vin?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currentMileage: number;
  status: 'ACTIVE' | 'SOLD' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  maintenanceRecords?: MaintenanceRecord[];
  documents?: VehicleDocument[];
  expenses?: VehicleExpense[];
  reminders?: VehicleReminder[];
}

export interface MaintenanceRecord {
  id: string;
  ownedVehicleId: string;
  workshopId?: string;
  serviceType: string;
  serviceDate: string;
  mileageAtService?: number;
  cost?: number;
  description?: string;
  notes?: string;
  photos?: string[];
  invoices?: string[];
  verifiedByWorkshop: boolean;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleDocument {
  id: string;
  ownedVehicleId: string;
  documentType: 'BLUEBOOK' | 'INSURANCE' | 'TAX_RECEIPT' | 'REGISTRATION' | 'POLLUTION_CERTIFICATE' | 'SERVICE_RECORD' | 'INVOICE' | 'OTHER';
  title: string;
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  fileUrl: string;
  fileSize?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleExpense {
  id: string;
  ownedVehicleId: string;
  expenseType: 'FUEL' | 'MAINTENANCE' | 'REPAIR' | 'INSURANCE' | 'TAX' | 'PARKING' | 'TOLL' | 'ACCESSORIES' | 'OTHER';
  amount: number;
  date: string;
  description?: string;
  vendor?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleReminder {
  id: string;
  ownedVehicleId: string;
  userId: string;
  reminderType: 'SERVICE' | 'INSURANCE' | 'TAX' | 'BLUEBOOK_RENEWAL' | 'POLLUTION_CERTIFICATE' | 'CUSTOM';
  title: string;
  description?: string;
  dueDate?: string;
  mileageDue?: number;
  status: 'PENDING' | 'COMPLETED' | 'OVERDUE' | 'CANCELLED';
  completedAt?: string;
  notified: boolean;
  notifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Phase 4: Workshops
export interface Workshop {
  id: string;
  organisationId?: string;
  name: string;
  description?: string;
  logo?: string;
  phone: string;
  email?: string;
  website?: string;
  province: string;
  district: string;
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  services: string[];
  specializations: string[];
  openingHours?: any;
  verified: boolean;
  verifiedAt?: string;
  averageRating?: number;
  totalReviews: number;
  createdAt: string;
}

export interface Mechanic {
  id: string;
  userId?: string;
  workshopId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  profileImage?: string;
  specializations: string[];
  experience?: number;
  certification?: string;
  available: boolean;
  averageRating?: number;
  totalJobs: number;
  createdAt: string;
}

export interface ServiceBooking {
  id: string;
  ownedVehicleId: string;
  workshopId: string;
  mechanicId?: string;
  userId: string;
  serviceType: string;
  description?: string;
  scheduledDate: string;
  scheduledTime?: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  estimatedCost?: number;
  finalCost?: number;
  customerNotes?: string;
  workshopNotes?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  ownedVehicle?: OwnedVehicle;
  workshop?: Workshop;
  mechanic?: Mechanic;
}

export interface WorkshopReview {
  id: string;
  workshopId: string;
  userId: string;
  serviceBookingId?: string;
  rating: number;
  title?: string;
  comment: string;
  serviceType?: string;
  serviceDate?: string;
  verified: boolean;
  createdAt: string;
}

// Phase 4: Roadside Assistance
export interface RoadsideAssistanceProvider {
  id: string;
  organisationId?: string;
  name: string;
  description?: string;
  logo?: string;
  phone: string;
  email?: string;
  emergencyPhone?: string;
  province: string;
  district: string;
  city: string;
  coverageAreas: string[];
  services: string[];
  operatingHours?: any;
  verified: boolean;
  verifiedAt?: string;
  averageRating?: number;
  totalRequests: number;
  createdAt: string;
}

export interface RoadsideAssistanceRequest {
  id: string;
  ownedVehicleId: string;
  providerId?: string;
  userId: string;
  requestType: 'TOWING' | 'BATTERY_JUMP_START' | 'TYRE_CHANGE' | 'FUEL_DELIVERY' | 'LOCKOUT_SERVICE' | 'MECHANICAL_BREAKDOWN' | 'ACCIDENT_RECOVERY' | 'OTHER';
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  status: 'PENDING' | 'ASSIGNED' | 'EN_ROUTE' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedAt?: string;
  estimatedArrival?: string;
  serviceNotes?: string;
  estimatedCost?: number;
  finalCost?: number;
  completedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  provider?: RoadsideAssistanceProvider;
  ownedVehicle?: OwnedVehicle;
}

// Phase 5: Finance & Insurance
export interface FinanceProvider {
  id: string;
  organisationId?: string;
  name: string;
  type: 'BANK' | 'FINANCIAL_INSTITUTION' | 'INSURANCE_COMPANY';
  description?: string;
  logo?: string;
  licenseNumber?: string;
  verified: boolean;
  verifiedAt?: string;
  phone: string;
  email: string;
  website?: string;
  address?: string;
  products?: FinanceProduct[];
  createdAt: string;
}

export interface FinanceProduct {
  id: string;
  providerId: string;
  type: 'VEHICLE_LOAN' | 'INSURANCE' | 'EXTENDED_WARRANTY';
  name: string;
  description?: string;
  minAmount?: number;
  maxAmount?: number;
  minTenure?: number;
  maxTenure?: number;
  interestRateMin?: number;
  interestRateMax?: number;
  processingFee?: number;
  minIncome?: number;
  minAge?: number;
  maxAge?: number;
  maxVehicleAge?: number;
  active: boolean;
  provider?: FinanceProvider;
  createdAt: string;
}

export interface FinanceApplication {
  id: string;
  userId: string;
  productId: string;
  vehicleId?: string;
  requestedAmount: number;
  tenure: number;
  purpose?: string;
  annualIncome?: number;
  employmentType?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  vehiclePrice?: number;
  documents: string[];
  status: 'PENDING' | 'UNDER_REVIEW' | 'DOCUMENTS_REQUIRED' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'CANCELLED';
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  approvedAt?: string;
  disbursedAt?: string;
  providerNotes?: string;
  applicantNotes?: string;
  product?: FinanceProduct;
  vehicle?: Vehicle;
  createdAt: string;
}

// Phase 5: Electric Vehicle
export interface ChargingStation {
  id: string;
  name: string;
  operatorId?: string;
  address: string;
  province: string;
  district: string;
  city: string;
  latitude?: number;
  longitude?: number;
  totalConnectors: number;
  connectorTypes: string[];
  powerOutput?: number;
  amenities: string[];
  operatingHours?: any;
  pricingModel?: string;
  pricePerKwh?: number;
  verified: boolean;
  active: boolean;
  averageRating?: number;
  totalReviews: number;
  createdAt: string;
}

export interface BatteryHealthRecord {
  id: string;
  ownedVehicleId: string;
  testDate: string;
  testedBy?: string;
  stateOfHealth: number;
  capacityKwh?: number;
  originalCapacityKwh?: number;
  cycleCount?: number;
  maxRange?: number;
  chargingSpeed?: string;
  issues: string[];
  recommendations?: string;
  reportUrl?: string;
  photos: string[];
  createdAt: string;
}

// Phase 5: Parts Marketplace
export interface PartsMerchant {
  id: string;
  userId?: string;
  businessName: string;
  businessType: string;
  description?: string;
  logo?: string;
  phone: string;
  email: string;
  website?: string;
  province: string;
  district: string;
  city: string;
  address: string;
  gstNumber?: string;
  establishedYear?: number;
  verified: boolean;
  verifiedAt?: string;
  active: boolean;
  averageRating?: number;
  totalReviews: number;
  products?: PartProduct[];
  createdAt: string;
}

export interface PartProduct {
  id: string;
  merchantId: string;
  name: string;
  description?: string;
  category: 'ENGINE' | 'TRANSMISSION' | 'BRAKES' | 'SUSPENSION' | 'ELECTRICAL' | 'BODY' | 'INTERIOR' | 'TYRES' | 'BATTERY' | 'OIL_FLUIDS' | 'ACCESSORIES' | 'OTHER';
  subcategory?: string;
  compatibleMakes: string[];
  compatibleModels: string[];
  compatibleYears?: string;
  partNumber?: string;
  brand?: string;
  condition: 'NEW' | 'USED' | 'REFURBISHED' | 'AFTERMARKET';
  isGenuine: boolean;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  specifications?: any;
  active: boolean;
  averageRating?: number;
  totalReviews: number;
  merchant?: PartsMerchant;
  createdAt: string;
}

export interface PartOrder {
  id: string;
  userId: string;
  merchantId: string;
  items: PartOrderItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  shippingAddress: string;
  shippingCity: string;
  shippingDistrict: string;
  shippingProvince: string;
  shippingPhone: string;
  paymentMethod?: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
  trackingNumber?: string;
  orderedAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  customerNotes?: string;
  merchantNotes?: string;
  merchant?: PartsMerchant;
  createdAt: string;
}

export interface PartOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: PartProduct;
  createdAt: string;
}

// Phase 5: Auctions
export interface Auction {
  id: string;
  sellerId: string;
  title: string;
  description?: string;
  vehicleId?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleDetails?: any;
  images: string[];
  startingBid: number;
  reservePrice?: number;
  buyNowPrice?: number;
  startDate: string;
  endDate: string;
  status: 'SCHEDULED' | 'ACTIVE' | 'ENDED' | 'SOLD' | 'UNSOLD' | 'CANCELLED';
  winningBidId?: string;
  winningBidAmount?: number;
  totalBids: number;
  totalViews: number;
  totalWatchers: number;
  bids?: Bid[];
  seller?: User;
  createdAt: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  amount: number;
  isWinning: boolean;
  user?: User;
  createdAt: string;
}

// Phase 5: Fleet Management
export interface Fleet {
  id: string;
  userId: string;
  name: string;
  description?: string;
  company?: string;
  totalVehicles: number;
  activeVehicles: number;
  vehicles?: FleetVehicle[];
  drivers?: FleetDriver[];
  createdAt: string;
}

export interface FleetVehicle {
  id: string;
  fleetId: string;
  ownedVehicleId?: string;
  driverId?: string;
  status: 'ACTIVE' | 'IN_SERVICE' | 'RETIRED' | 'SOLD';
  totalDistance: number;
  totalFuel: number;
  totalCost: number;
  lastServiceDate?: string;
  nextServiceDate?: string;
  ownedVehicle?: OwnedVehicle;
  driver?: FleetDriver;
  createdAt: string;
}

export interface FleetDriver {
  id: string;
  fleetId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  licenseNumber: string;
  licenseExpiry: string;
  active: boolean;
  totalTrips: number;
  totalDistance: number;
  createdAt: string;
}

// Phase 5: Valuation
export interface VehicleValuation {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  province: string;
  district: string;
  estimatedValue: number;
  minValue: number;
  maxValue: number;
  confidenceLevel: number;
  factors?: any;
  comparableSales: number;
  marketTrend?: string;
  requestedBy?: string;
  source: string;
  createdAt: string;
}
