// Sample Data Seeder for Gadi-Sewa
import { Vehicle, Workshop, FinanceProvider, FinanceProduct } from '../types';

export const sampleVehicles: Vehicle[] = [
  {
    id: 'vehicle_1',
    sellerId: 'seller_1',
    status: 'PUBLISHED',
    category: 'car',
    make: 'Toyota',
    model: 'Fortuner',
    variant: 'Legender 4x4',
    year: 2022,
    price: 12500000,
    negotiable: true,
    mileage: 28000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCC: 2755,
    province: 'Bagmati',
    district: 'Kathmandu',
    city: 'Lalitpur',
    condition: 'Excellent',
    description: 'Immaculate Toyota Fortuner Legender in pearl white. Single owner, full service history at authorized service center. All maintenance records available.',
    images: [
      {
        id: 'img_1',
        url: 'https://images.unsplash.com/photo-1625231334401-4abc5e5466623?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: true,
    passportId: 'passport_1',
    views: 245,
    featured: true,
    createdAt: '2024-12-01T10:00:00.000Z',
    seller: {
      id: 'seller_1',
      firstName: 'Rajesh',
      lastName: 'Shrestha'
    }
  },
  {
    id: 'vehicle_2',
    sellerId: 'seller_2',
    status: 'PUBLISHED',
    category: 'suv',
    make: 'Hyundai',
    model: 'Creta',
    variant: 'SX (O)',
    year: 2023,
    price: 4200000,
    negotiable: true,
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCC: 1497,
    province: 'Bagmati',
    district: 'Kathmandu',
    city: 'Kathmandu',
    condition: 'Very Good',
    description: 'Well-maintained Hyundai Creta with panoramic sunroof and all service records. Perfect family SUV for Kathmandu roads.',
    images: [
      {
        id: 'img_2',
        url: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: false,
    views: 189,
    featured: false,
    createdAt: '2024-11-25T14:30:00.000Z',
    seller: {
      id: 'seller_2',
      firstName: 'Sunita',
      lastName: 'Maharjan'
    }
  },
  {
    id: 'vehicle_3',
    sellerId: 'seller_3',
    status: 'PUBLISHED',
    category: 'motorcycle',
    make: 'Honda',
    model: 'CB500X',
    variant: 'Adventure',
    year: 2023,
    price: 1250000,
    negotiable: false,
    mileage: 5200,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineCC: 471,
    province: 'Gandaki',
    district: 'Kaski',
    city: 'Pokhara',
    condition: 'Like New',
    description: 'Barely ridden Honda CB500X adventure motorcycle. Perfect for Nepal terrain with excellent suspension and reliability.',
    images: [
      {
        id: 'img_3',
        url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: true,
    passportId: 'passport_2',
    views: 156,
    featured: true,
    createdAt: '2024-11-28T09:15:00.000Z',
    seller: {
      id: 'seller_3',
      firstName: 'Bikram',
      lastName: 'Gurung'
    }
  },
  {
    id: 'vehicle_4',
    sellerId: 'seller_4',
    status: 'PUBLISHED',
    category: 'electric',
    make: 'Tata',
    model: 'Nexon EV',
    variant: 'Max XZ+',
    year: 2024,
    price: 5200000,
    negotiable: true,
    mileage: 8000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    province: 'Bagmati',
    district: 'Kathmandu',
    city: 'Kathmandu',
    condition: 'Excellent',
    description: 'Tata Nexon EV Max with 437km range. Battery health 98%. Includes fast charger and 3-year warranty.',
    images: [
      {
        id: 'img_4',
        url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: true,
    passportId: 'passport_3',
    views: 312,
    featured: true,
    createdAt: '2024-12-03T11:45:00.000Z',
    seller: {
      id: 'seller_4',
      firstName: 'Amit',
      lastName: 'Rai'
    }
  },
  {
    id: 'vehicle_5',
    sellerId: 'seller_5',
    status: 'PUBLISHED',
    category: 'scooter',
    make: 'Vespa',
    model: 'SXL',
    variant: '150 i-GET',
    year: 2023,
    price: 485000,
    negotiable: true,
    mileage: 4500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCC: 150,
    province: 'Bagmati',
    district: 'Kathmandu',
    city: 'Kathmandu',
    condition: 'Excellent',
    description: 'Beautiful Vespa SXL 150 in vintage blue. Meticulously maintained with all service records.',
    images: [
      {
        id: 'img_5',
        url: 'https://images.unsplash.com/photo-1558981285-6f0c5042e06c?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: true,
    passportId: 'passport_4',
    views: 98,
    featured: false,
    createdAt: '2024-11-30T16:20:00.000Z',
    seller: {
      id: 'seller_5',
      firstName: 'Priya',
      lastName: 'Maharjan'
    }
  },
  {
    id: 'vehicle_6',
    sellerId: 'seller_6',
    status: 'PUBLISHED',
    category: 'car',
    make: 'Mahindra',
    model: 'Scorpio-N',
    variant: 'Z8 L',
    year: 2023,
    price: 6800000,
    negotiable: true,
    mileage: 32000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCC: 2184,
    province: 'Koshi',
    district: 'Morang',
    city: 'Biratnagar',
    condition: 'Good',
    description: 'Mahindra Scorpio N Z8L with all premium features. Excellent for both city and off-road driving in Nepal.',
    images: [
      {
        id: 'img_6',
        url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: false,
    views: 145,
    featured: false,
    createdAt: '2024-11-20T13:00:00.000Z',
    seller: {
      id: 'seller_6',
      firstName: 'Deepak',
      lastName: 'Limbu'
    }
  },
  {
    id: 'vehicle_7',
    sellerId: 'seller_7',
    status: 'PUBLISHED',
    category: 'motorcycle',
    make: 'Yamaha',
    model: 'MT-15',
    variant: 'V2 ABS',
    year: 2024,
    price: 520000,
    negotiable: false,
    mileage: 2800,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineCC: 155,
    province: 'Lumbini',
    district: 'Rupandehi',
    city: 'Butwal',
    condition: 'Like New',
    description: 'Brand new Yamaha MT-15 V2 with ABS. Showroom condition with extended warranty.',
    images: [
      {
        id: 'img_7',
        url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: true,
    passportId: 'passport_5',
    views: 203,
    featured: false,
    createdAt: '2024-12-03T10:30:00.000Z',
    seller: {
      id: 'seller_7',
      firstName: 'Sagar',
      lastName: 'Thapa'
    }
  },
  {
    id: 'vehicle_8',
    sellerId: 'seller_8',
    status: 'PUBLISHED',
    category: 'scooter',
    make: 'Suzuki',
    model: 'Access',
    variant: '125 Special Edition',
    year: 2023,
    price: 265000,
    negotiable: true,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCC: 124,
    province: 'Madhesh',
    district: 'Parsa',
    city: 'Birgunj',
    condition: 'Good',
    description: 'Reliable Suzuki Access 125 for daily commute. Good condition with regular maintenance.',
    images: [
      {
        id: 'img_8',
        url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: false,
    views: 87,
    featured: false,
    createdAt: '2024-11-22T15:45:00.000Z',
    seller: {
      id: 'seller_8',
      firstName: 'Anil',
      lastName: 'Yadav'
    }
  },
  {
    id: 'vehicle_9',
    sellerId: 'seller_9',
    status: 'PUBLISHED',
    category: 'car',
    make: 'Kia',
    model: 'Seltos',
    variant: 'HTX+',
    year: 2023,
    price: 4500000,
    negotiable: true,
    mileage: 22000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCC: 1497,
    province: 'Gandaki',
    district: 'Kaski',
    city: 'Pokhara',
    condition: 'Very Good',
    description: 'Kia Seltos HTX+ with all premium features. Well maintained with complete service history.',
    images: [
      {
        id: 'img_9',
        url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: true,
    passportId: 'passport_6',
    views: 178,
    featured: false,
    createdAt: '2024-11-27T12:00:00.000Z',
    seller: {
      id: 'seller_9',
      firstName: 'Ramesh',
      lastName: 'Adhikari'
    }
  },
  {
    id: 'vehicle_10',
    sellerId: 'seller_10',
    status: 'PUBLISHED',
    category: 'motorcycle',
    make: 'Royal Enfield',
    model: 'Classic',
    variant: '350 Reborn',
    year: 2023,
    price: 480000,
    negotiable: true,
    mileage: 9500,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineCC: 349,
    province: 'Lumbini',
    district: 'Rupandehi',
    city: 'Bhairahawa',
    condition: 'Very Good',
    description: 'Royal Enfield Classic 350 Reborn in Halcyon Black. Well maintained with genuine accessories.',
    images: [
      {
        id: 'img_10',
        url: 'https://images.unsplash.com/photo-1558980394-da908570b3c3?w=800&q=80',
        order: 0,
        isPrimary: true
      }
    ],
    hasPassport: true,
    passportId: 'passport_7',
    views: 134,
    featured: false,
    createdAt: '2024-11-15T14:20:00.000Z',
    seller: {
      id: 'seller_10',
      firstName: 'Krishna',
      lastName: 'Poudel'
    }
  }
];

export const sampleWorkshops: Workshop[] = [
  {
    id: 'workshop_1',
    name: 'Himalayan Auto Care',
    description: 'Premium vehicle service center specializing in Japanese and Korean vehicles. Expert mechanics with 15+ years experience.',
    logo: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400&h=400&fit=crop',
    phone: '+977-1-4XXXXXX',
    email: 'info@himalayanautocare.com',
    website: 'https://himalayanautocare.com',
    province: 'Bagmati',
    district: 'Kathmandu',
    city: 'Kathmandu',
    address: 'Putalisadak, Kathmandu',
    services: ['Oil Change', 'Brake Service', 'Tire Rotation', 'Engine Diagnostics', 'AC Service', 'Battery Replacement'],
    specializations: ['Toyota', 'Honda', 'Hyundai', 'Kia'],
    openingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    verified: true,
    verifiedAt: '2024-01-15T00:00:00.000Z',
    averageRating: 4.7,
    totalReviews: 128,
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 'workshop_2',
    name: 'Kathmandu Motor Works',
    description: 'Full-service automotive repair shop. Specializing in European vehicles and advanced diagnostics.',
    logo: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop',
    phone: '+977-1-5XXXXXX',
    email: 'service@kathmandumotorworks.com',
    province: 'Bagmati',
    district: 'Kathmandu',
    city: 'Lalitpur',
    address: 'Pulchowk, Lalitpur',
    services: ['Engine Repair', 'Transmission Service', 'Electrical Diagnostics', 'Suspension Work', 'Wheel Alignment'],
    specializations: ['BMW', 'Mercedes', 'Audi', 'Volkswagen'],
    openingHours: {
      monday: '8:00 AM - 7:00 PM',
      tuesday: '8:00 AM - 7:00 PM',
      wednesday: '8:00 AM - 7:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 7:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    verified: true,
    verifiedAt: '2024-02-01T00:00:00.000Z',
    averageRating: 4.5,
    totalReviews: 95,
    createdAt: '2023-03-15T00:00:00.000Z'
  },
  {
    id: 'workshop_3',
    name: 'Pokhara Auto Service',
    description: 'Trusted automotive service center in Pokhara. Affordable prices and quality service for all vehicle types.',
    logo: 'https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?w=400&h=400&fit=crop',
    phone: '+977-61-XXXXXX',
    email: 'pokharaautoservice@gmail.com',
    province: 'Gandaki',
    district: 'Kaski',
    city: 'Pokhara',
    address: 'Lakeside Road, Pokhara',
    services: ['Oil Change', 'Brake Service', 'Tire Service', 'Battery Replacement', 'General Maintenance'],
    specializations: ['All Makes', 'Motorcycles', 'Scooters'],
    openingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '10:00 AM - 3:00 PM'
    },
    verified: true,
    verifiedAt: '2024-01-20T00:00:00.000Z',
    averageRating: 4.3,
    totalReviews: 67,
    createdAt: '2023-05-10T00:00:00.000Z'
  },
  {
    id: 'workshop_4',
    name: 'Biratnagar Garage Center',
    description: 'Leading automotive service provider in Eastern Nepal. Modern equipment and certified technicians.',
    logo: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da77?w=400&h=400&fit=crop',
    phone: '+977-21-XXXXXX',
    email: 'info@biratnagargarage.com',
    province: 'Koshi',
    district: 'Morang',
    city: 'Biratnagar',
    address: 'Main Road, Biratnagar',
    services: ['Engine Repair', 'AC Service', 'Electrical Work', 'Denting & Painting', 'Wheel Alignment'],
    specializations: ['Maruti Suzuki', 'Tata', 'Mahindra'],
    openingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    verified: true,
    verifiedAt: '2024-02-10T00:00:00.000Z',
    averageRating: 4.4,
    totalReviews: 52,
    createdAt: '2023-07-20T00:00:00.000Z'
  },
  {
    id: 'workshop_5',
    name: 'Butwal Auto Care',
    description: 'Professional automotive services in Butwal. Specialized in commercial vehicles and heavy machinery.',
    logo: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop',
    phone: '+977-71-XXXXXX',
    email: 'butwalautocare@gmail.com',
    province: 'Lumbini',
    district: 'Rupandehi',
    city: 'Butwal',
    address: 'Traffic Chowk, Butwal',
    services: ['Heavy Vehicle Repair', 'Truck Service', 'Bus Maintenance', 'Engine Overhaul', 'Hydraulic Systems'],
    specializations: ['Commercial Vehicles', 'Trucks', 'Buses', 'Tractors'],
    openingHours: {
      monday: '8:00 AM - 7:00 PM',
      tuesday: '8:00 AM - 7:00 PM',
      wednesday: '8:00 AM - 7:00 PM',
      thursday: '8:00 AM - 7:00 PM',
      friday: '8:00 AM - 7:00 PM',
      saturday: '8:00 AM - 6:00 PM',
      sunday: '9:00 AM - 3:00 PM'
    },
    verified: true,
    verifiedAt: '2024-01-25T00:00:00.000Z',
    averageRating: 4.6,
    totalReviews: 43,
    createdAt: '2023-09-05T00:00:00.000Z'
  },
  {
    id: 'workshop_6',
    name: 'Nepalgunj Motor Hub',
    description: 'Complete automotive solutions in Western Nepal. Expert in both two-wheelers and four-wheelers.',
    logo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=400&fit=crop',
    phone: '+977-81-XXXXXX',
    email: 'nepalgunjmotorhub@gmail.com',
    province: 'Lumbini',
    district: 'Banke',
    city: 'Nepalgunj',
    address: 'City Center, Nepalgunj',
    services: ['Motorcycle Service', 'Scooter Repair', 'Car Service', 'Tire Service', 'Battery Service'],
    specializations: ['Honda', 'Yamaha', 'Suzuki', 'Bajaj'],
    openingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    verified: false,
    averageRating: 4.2,
    totalReviews: 31,
    createdAt: '2023-11-12T00:00:00.000Z'
  }
];

export const sampleFinanceProviders: FinanceProvider[] = [
  {
    id: 'finance_1',
    name: 'Nabil Bank',
    type: 'BANK',
    description: 'Leading commercial bank in Nepal offering competitive vehicle loan rates and flexible tenure options.',
    logo: 'https://images.unsplash.com/photo-1541354329998-4d27e82626e6?w=200&h=200&fit=crop',
    licenseNumber: 'NRB-LICENSE-001',
    verified: true,
    verifiedAt: '2024-01-01T00:00:00.000Z',
    phone: '+977-1-4XXXXXX',
    email: 'loans@nabilbank.com',
    website: 'https://nabilbank.com',
    address: 'Nabil Bank Head Office, Kathmandu',
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 'finance_2',
    name: 'Himalayan General Insurance',
    type: 'INSURANCE_COMPANY',
    description: 'Comprehensive vehicle insurance solutions with quick claim settlement and nationwide coverage.',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop',
    licenseNumber: 'NIA-LICENSE-045',
    verified: true,
    verifiedAt: '2024-01-15T00:00:00.000Z',
    phone: '+977-1-5XXXXXX',
    email: 'info@hgi.com.np',
    website: 'https://hgi.com.np',
    address: 'Himalayan General Insurance, Kathmandu',
    createdAt: '2023-02-01T00:00:00.000Z'
  },
  {
    id: 'finance_3',
    name: 'Jyoti Bikas Bank',
    type: 'FINANCIAL_INSTITUTION',
    description: 'Specialized vehicle financing with competitive rates and quick approval process.',
    logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop',
    licenseNumber: 'NRB-LICENSE-023',
    verified: true,
    verifiedAt: '2024-02-01T00:00:00.000Z',
    phone: '+977-1-6XXXXXX',
    email: 'vehicle.loans@jbb.com.np',
    website: 'https://jbb.com.np',
    address: 'Jyoti Bikas Bank, Lalitpur',
    createdAt: '2023-03-01T00:00:00.000Z'
  }
];

export const sampleFinanceProducts: FinanceProduct[] = [
  {
    id: 'product_1',
    providerId: 'finance_1',
    type: 'VEHICLE_LOAN',
    name: 'Vehicle Loan - Premium',
    description: 'Competitive interest rates for new and used vehicle purchases with flexible repayment options.',
    minAmount: 500000,
    maxAmount: 10000000,
    minTenure: 12,
    maxTenure: 84,
    interestRateMin: 9.5,
    interestRateMax: 12.5,
    processingFee: 1.0,
    minIncome: 30000,
    minAge: 21,
    maxAge: 60,
    maxVehicleAge: 10,
    active: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'product_2',
    providerId: 'finance_2',
    type: 'INSURANCE',
    name: 'Comprehensive Vehicle Insurance',
    description: 'Full coverage insurance including accident, theft, natural disaster, and third-party liability.',
    minAmount: 25000,
    maxAmount: 500000,
    minTenure: 12,
    maxTenure: 36,
    active: true,
    createdAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'product_3',
    providerId: 'finance_3',
    type: 'VEHICLE_LOAN',
    name: 'Quick Vehicle Finance',
    description: 'Fast approval vehicle loans with minimal documentation and competitive rates.',
    minAmount: 300000,
    maxAmount: 8000000,
    minTenure: 12,
    maxTenure: 72,
    interestRateMin: 10.0,
    interestRateMax: 13.0,
    processingFee: 1.5,
    minIncome: 25000,
    minAge: 21,
    maxAge: 58,
    maxVehicleAge: 8,
    active: true,
    createdAt: '2024-02-01T00:00:00.000Z'
  }
];

export function initializeSampleData() {
  // Only initialize if data doesn't exist
  if (!localStorage.getItem('gadi_sewa_vehicles')) {
    localStorage.setItem('gadi_sewa_vehicles', JSON.stringify(sampleVehicles));
  }
  
  if (!localStorage.getItem('gadi_sewa_workshops')) {
    localStorage.setItem('gadi_sewa_workshops', JSON.stringify(sampleWorkshops));
  }
  
  if (!localStorage.getItem('gadi_sewa_finance_providers')) {
    localStorage.setItem('gadi_sewa_finance_providers', JSON.stringify(sampleFinanceProviders));
  }
  
  if (!localStorage.getItem('gadi_sewa_finance_products')) {
    localStorage.setItem('gadi_sewa_finance_products', JSON.stringify(sampleFinanceProducts));
  }
}
