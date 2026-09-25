// Core entity types for the Nepal Vehicle Ecosystem

export type VerificationSource = 
  | 'SELLER_DECLARED' 
  | 'DOCUMENT_CHECKED' 
  | 'PHYSICALLY_VERIFIED' 
  | 'PARTNER_VERIFIED' 
  | 'GOVERNMENT_VERIFIED' 
  | 'SYSTEM_GENERATED' 
  | 'UNABLE_TO_VERIFY';

export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'SUPPORT' 
  | 'FRAUD_REVIEWER' 
  | 'VERIFICATION_AGENT' 
  | 'INSPECTION_MANAGER' 
  | 'INSPECTOR' 
  | 'DEALER_OWNER' 
  | 'DEALER_MANAGER' 
  | 'DEALER_STAFF' 
  | 'PRIVATE_SELLER' 
  | 'BUYER' 
  | 'GARAGE_OWNER' 
  | 'GARAGE_STAFF' 
  | 'FINANCE_PARTNER' 
  | 'INSURANCE_PARTNER';

export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'CNG' | 'LPG';
export type TransmissionType = 'MANUAL' | 'AUTOMATIC' | 'CVT' | 'DCT';
export type BodyStyle = 'SEDAN' | 'SUV' | 'HATCHBACK' | 'COUPE' | 'PICKUP' | 'VAN' | 'MINIBUS' | 'MOTORCYCLE' | 'SCOOTER' | 'MOPED';
export type VehicleCondition = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'NEEDS_REPAIR';
export type VehicleType = 'CAR' | 'MOTORBIKE' | 'SCOOTER' | 'COMMERCIAL';
export type InspectionResult = 'PASS' | 'ADVISORY' | 'FAIL' | 'NOT_APPLICABLE' | 'UNABLE_TO_INSPECT';
export type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COUNTERED' | 'WITHDRAWN';
export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
export type ListingStatus = 'ACTIVE' | 'SOLD' | 'WITHDRAWN' | 'PENDING_REVIEW' | 'REJECTED' | 'EXPIRED';
export type PassportStatus = 'ACTIVE' | 'SUSPENDED' | 'UNDER_REVIEW';
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'EXPIRED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  identityVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface Vehicle {
  id: string;
  passportId: string;
  type: VehicleType;
  make: string;
  model: string;
  variant: string;
  year: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyStyle: BodyStyle;
  mileage: number;
  engineCC?: number;
  color: string;
  vin?: string;
  engineNumber?: string;
  registrationNumber?: string;
  registrationDate?: string;
  registeredDistrict?: string;
  ownerId: string;
  condition: VehicleCondition;
  isEV: boolean;
  isHybrid: boolean;
  batterySOH?: number;
  batteryCapacity?: number;
  createdAt: string;
}

export interface VehiclePassport {
  id: string;
  passportId: string;
  vehicleId: string;
  status: PassportStatus;
  issuedDate: string;
  lastInspectionDate?: string;
  ownershipHistory: OwnershipRecord[];
  odometerHistory: OdometerRecord[];
  inspectionHistory: string[];
  serviceHistory: string[];
  documentVerifications: DocumentVerification[];
  riskFlags: RiskFlag[];
  qrCode: string;
}

export interface OwnershipRecord {
  id: string;
  ownerId: string;
  ownerName: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  verificationSource: VerificationSource;
}

export interface OdometerRecord {
  id: string;
  mileage: number;
  date: string;
  source: VerificationSource;
  verifier?: string;
  evidence?: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface DocumentVerification {
  id: string;
  documentType: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'EXPIRED';
  verificationSource: VerificationSource;
  verifiedBy?: string;
  verifiedDate?: string;
  expiryDate?: string;
}

export interface RiskFlag {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  createdAt: string;
  status: 'OPEN' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
}

export interface Listing {
  id: string;
  vehicleId: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  location: string;
  district: string;
  images: string[];
  status: ListingStatus;
  isFeatured: boolean;
  isInspected: boolean;
  hasPassport: boolean;
  inspectionId?: string;
  passportId?: string;
  views: number;
  favourites: number;
  enquiries: number;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface Inspection {
  id: string;
  vehicleId: string;
  inspectorId: string;
  templateType: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEWED' | 'REJECTED';
  scheduledDate: string;
  completedDate?: string;
  location: string;
  overallResult: InspectionResult;
  sections: InspectionSection[];
  photos: string[];
  notes: string;
  recommendation: string;
  supervisorReviewed: boolean;
}

export interface InspectionSection {
  id: string;
  name: string;
  category: string;
  items: InspectionItem[];
}

export interface InspectionItem {
  id: string;
  name: string;
  result: InspectionResult;
  severity?: 'MINOR' | 'MODERATE' | 'MAJOR';
  comment?: string;
  photos?: string[];
  measurement?: string;
}

export interface Offer {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  message?: string;
  status: OfferStatus;
  counterAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  listingId: string;
  buyerId: string;
  depositAmount: number;
  status: ReservationStatus;
  expiresAt: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  purpose: string;
  status: PaymentStatus;
  provider: 'ESEWA' | 'KHALTI' | 'BANK_TRANSFER';
  reference?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  listingId?: string;
  lastMessage?: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Dealer {
  id: string;
  userId: string;
  companyName: string;
  logo?: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  verified: boolean;
  rating: number;
  totalListings: number;
  totalSold: number;
  branches: DealerBranch[];
}

export interface DealerBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
  managerId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
  ipAddress?: string;
}

export interface SearchFilters {
  query?: string;
  vehicleType?: VehicleType;
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  bodyStyle?: BodyStyle;
  condition?: VehicleCondition;
  district?: string;
  isEV?: boolean;
  isHybrid?: boolean;
  isInspected?: boolean;
  hasPassport?: boolean;
  batterySOHMin?: number;
  sellerType?: 'private' | 'dealer';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
