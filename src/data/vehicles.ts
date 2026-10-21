export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  category: 'car' | 'suv' | 'motorcycle' | 'scooter' | 'electric' | 'van' | 'truck' | 'bus';
  price: number;
  negotiable: boolean;
  location: { province: string; district: string; city: string };
  mileage: number;
  fuelType: string;
  transmission: string;
  engineCC?: number;
  condition: string;
  sellerType: 'individual' | 'dealer';
  sellerName: string;
  images: string[];
  hasPassport: boolean;
  passportId?: string;
  passportDate?: string;
  postedDate: string;
  featured: boolean;
  description: string;
  keyFeatures: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: 'v001',
    title: 'Toyota Fortuner Legender',
    make: 'Toyota',
    model: 'Fortuner',
    variant: 'Legender 4x4',
    year: 2022,
    category: 'suv',
    price: 12500000,
    negotiable: true,
    location: { province: 'Bagmati', district: 'Kathmandu', city: 'Lalitpur' },
    mileage: 28000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCC: 2755,
    condition: 'Excellent',
    sellerType: 'dealer',
    sellerName: 'Himalayan Motors',
    images: ['https://images.unsplash.com/photo-1625231334401-4abc5e546623?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-00847',
    passportDate: '2024-11-15',
    postedDate: '2024-12-01',
    featured: true,
    description: 'Immaculate Toyota Fortuner Legender in pearl white. Single owner, full service history at authorized service center. All maintenance records available.',
    keyFeatures: ['4x4', 'Leather Interior', 'Sunroof', '360° Camera', 'Adaptive Cruise']
  },
  {
    id: 'v002',
    title: 'Honda CB500X',
    make: 'Honda',
    model: 'CB500X',
    variant: 'Adventure',
    year: 2023,
    category: 'motorcycle',
    price: 1250000,
    negotiable: false,
    location: { province: 'Gandaki', district: 'Kaski', city: 'Pokhara' },
    mileage: 5200,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineCC: 471,
    condition: 'Like New',
    sellerType: 'individual',
    sellerName: 'Rajesh Thapa',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-01203',
    passportDate: '2024-10-28',
    postedDate: '2024-11-28',
    featured: true,
    description: 'Barely ridden Honda CB500X adventure motorcycle. Perfect for Nepal terrain with excellent suspension and reliability.',
    keyFeatures: ['ABS', 'LED Headlight', 'Adventure Ready', 'Low Mileage']
  },
  {
    id: 'v003',
    title: 'Tesla Model 3',
    make: 'Tesla',
    model: 'Model 3',
    variant: 'Long Range AWD',
    year: 2023,
    category: 'electric',
    price: 9800000,
    negotiable: true,
    location: { province: 'Bagmati', district: 'Kathmandu', city: 'Kathmandu' },
    mileage: 15000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'Excellent',
    sellerType: 'dealer',
    sellerName: 'EV Nepal',
    images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-00956',
    passportDate: '2024-11-20',
    postedDate: '2024-12-02',
    featured: true,
    description: 'Tesla Model 3 Long Range with autopilot. Battery health at 97%. Complete with home charger installation.',
    keyFeatures: ['Autopilot', 'Long Range', 'Premium Interior', 'OTA Updates', 'Battery 97%']
  },
  {
    id: 'v004',
    title: 'Hyundai Creta',
    make: 'Hyundai',
    model: 'Creta',
    variant: 'SX (O)',
    year: 2023,
    category: 'suv',
    price: 4200000,
    negotiable: true,
    location: { province: 'Bagmati', district: 'Kathmandu', city: 'Bhaktapur' },
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCC: 1497,
    condition: 'Very Good',
    sellerType: 'individual',
    sellerName: 'Sunita Shrestha',
    images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80'],
    hasPassport: false,
    postedDate: '2024-11-25',
    featured: false,
    description: 'Well-maintained Hyundai Creta with panoramic sunroof and all service records. Perfect family SUV for Kathmandu roads.',
    keyFeatures: ['Panoramic Sunroof', 'Wireless Charging', 'Ventilated Seats', 'Bose Audio']
  },
  {
    id: 'v005',
    title: 'Yamaha MT-15 V2',
    make: 'Yamaha',
    model: 'MT-15',
    variant: 'V2 ABS',
    year: 2024,
    category: 'motorcycle',
    price: 520000,
    negotiable: false,
    location: { province: 'Lumbini', district: 'Rupandehi', city: 'Butwal' },
    mileage: 2800,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineCC: 155,
    condition: 'Like New',
    sellerType: 'dealer',
    sellerName: 'Yamaha Plaza Butwal',
    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-01340',
    passportDate: '2024-12-01',
    postedDate: '2024-12-03',
    featured: false,
    description: 'Brand new Yamaha MT-15 V2 with ABS. Showroom condition with extended warranty.',
    keyFeatures: ['ABS', 'LED Projector', 'Slipper Clutch', 'Variable Valve']
  },
  {
    id: 'v006',
    title: 'Mahindra Scorpio N',
    make: 'Mahindra',
    model: 'Scorpio-N',
    variant: 'Z8 L',
    year: 2023,
    category: 'suv',
    price: 6800000,
    negotiable: true,
    location: { province: 'Koshi', district: 'Morang', city: 'Biratnagar' },
    mileage: 32000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCC: 2184,
    condition: 'Good',
    sellerType: 'individual',
    sellerName: 'Bikram Rai',
    images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80'],
    hasPassport: false,
    postedDate: '2024-11-20',
    featured: false,
    description: 'Mahindra Scorpio N Z8L with all premium features. Excellent for both city and off-road driving in Nepal.',
    keyFeatures: ['4x4', 'Panoramic Sunroof', 'ADAS', '12.3" Display', 'Sony Audio']
  },
  {
    id: 'v007',
    title: 'Vespa SXL 150',
    make: 'Vespa',
    model: 'SXL',
    variant: '150 i-GET',
    year: 2023,
    category: 'scooter',
    price: 485000,
    negotiable: true,
    location: { province: 'Bagmati', district: 'Kathmandu', city: 'Kathmandu' },
    mileage: 4500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCC: 150,
    condition: 'Excellent',
    sellerType: 'individual',
    sellerName: 'Priya Maharjan',
    images: ['https://images.unsplash.com/photo-1558981285-6f0c5042e06c?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-01102',
    passportDate: '2024-11-10',
    postedDate: '2024-11-30',
    featured: false,
    description: 'Beautiful Vespa SXL 150 in vintage blue. Meticulously maintained with all service records.',
    keyFeatures: ['ABS', 'LED Lighting', 'Bluetooth', 'USB Charger']
  },
  {
    id: 'v008',
    title: 'Tata Nexon EV Max',
    make: 'Tata',
    model: 'Nexon EV',
    variant: 'Max XZ+',
    year: 2024,
    category: 'electric',
    price: 5200000,
    negotiable: true,
    location: { province: 'Bagmati', district: 'Kathmandu', city: 'Kathmandu' },
    mileage: 8000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'Excellent',
    sellerType: 'dealer',
    sellerName: 'Sipradi Trading',
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-01455',
    passportDate: '2024-12-02',
    postedDate: '2024-12-03',
    featured: true,
    description: 'Tata Nexon EV Max with 437km range. Battery health 98%. Includes fast charger and 3-year warranty.',
    keyFeatures: ['437km Range', 'Fast Charging', 'Sunroof', 'JBL Audio', 'Battery 98%']
  },
  {
    id: 'v009',
    title: 'Suzuki Access 125',
    make: 'Suzuki',
    model: 'Access',
    variant: '125 Special Edition',
    year: 2023,
    category: 'scooter',
    price: 265000,
    negotiable: true,
    location: { province: 'Madhesh', district: 'Parsa', city: 'Birgunj' },
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCC: 124,
    condition: 'Good',
    sellerType: 'individual',
    sellerName: 'Anil Kumar Yadav',
    images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80'],
    hasPassport: false,
    postedDate: '2024-11-22',
    featured: false,
    description: 'Reliable Suzuki Access 125 for daily commute. Good condition with regular maintenance.',
    keyFeatures: ['Fuel Efficient', 'LED Headlamp', 'Mobile Charging', 'External Fuel Lid']
  },
  {
    id: 'v010',
    title: 'KTM 390 Duke',
    make: 'KTM',
    model: '390 Duke',
    variant: '2024 Model',
    year: 2024,
    category: 'motorcycle',
    price: 920000,
    negotiable: false,
    location: { province: 'Bagmati', district: 'Kathmandu', city: 'Kathmandu' },
    mileage: 1500,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineCC: 373,
    condition: 'Like New',
    sellerType: 'dealer',
    sellerName: 'MotoCorp Nepal',
    images: ['https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-01501',
    passportDate: '2024-12-03',
    postedDate: '2024-12-03',
    featured: true,
    description: 'Brand new generation KTM 390 Duke. The ultimate streetfighter for Kathmandu roads. TFT display, ride-by-wire.',
    keyFeatures: ['TFT Display', 'Cornering ABS', 'Ride-by-Wire', 'Quick Shifter', 'WP Suspension']
  },
  {
    id: 'v011',
    title: 'Isuzu D-Max V-Cross',
    make: 'Isuzu',
    model: 'D-Max',
    variant: 'V-Cross 4x4',
    year: 2022,
    category: 'van',
    price: 7500000,
    negotiable: true,
    location: { province: 'Gandaki', district: 'Kaski', city: 'Pokhara' },
    mileage: 42000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCC: 1900,
    condition: 'Good',
    sellerType: 'individual',
    sellerName: 'Deepak Gurung',
    images: ['https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80'],
    hasPassport: false,
    postedDate: '2024-11-18',
    featured: false,
    description: 'Isuzu D-Max V-Cross 4x4 pickup. Perfect for both family use and light commercial work in hilly terrain.',
    keyFeatures: ['4x4', 'Diff Lock', 'Leather Seats', 'Touchscreen', 'Hill Descent Control']
  },
  {
    id: 'v012',
    title: 'Royal Enfield Classic 350',
    make: 'Royal Enfield',
    model: 'Classic',
    variant: '350 Reborn',
    year: 2023,
    category: 'motorcycle',
    price: 480000,
    negotiable: true,
    location: { province: 'Lumbini', district: 'Rupandehi', city: 'Bhairahawa' },
    mileage: 9500,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineCC: 349,
    condition: 'Very Good',
    sellerType: 'individual',
    sellerName: 'Sagar Poudel',
    images: ['https://images.unsplash.com/photo-1558980394-da908570b3c3?w=800&q=80'],
    hasPassport: true,
    passportId: 'GS-VP-2024-00892',
    passportDate: '2024-10-15',
    postedDate: '2024-11-15',
    featured: false,
    description: 'Royal Enfield Classic 350 Reborn in Halcyon Black. Well maintained with genuine accessories.',
    keyFeatures: ['Dual Channel ABS', 'Tripper Dash', 'Genuine Accessories', 'Low Seat Height']
  }
];

export const brands = [
  'Toyota', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Yamaha',
  'Suzuki', 'KTM', 'Royal Enfield', 'Vespa', 'Tesla', 'Isuzu',
  'Maruti Suzuki', 'Bajaj', 'Kia', 'MG', 'BYD'
];

export const provinces = [
  'Bagmati', 'Gandaki', 'Lumbini', 'Koshi', 'Madhesh',
  'Sudurpashchim', 'Karnali'
];

export const categories = [
  { id: 'car', label: 'Cars', icon: 'car' },
  { id: 'suv', label: 'SUVs', icon: 'truck' },
  { id: 'motorcycle', label: 'Motorcycles', icon: 'bike' },
  { id: 'scooter', label: 'Scooters', icon: 'scooter' },
  { id: 'electric', label: 'Electric', icon: 'zap' },
  { id: 'van', label: 'Pickups & Vans', icon: 'package' },
  { id: 'truck', label: 'Trucks', icon: 'truck' },
  { id: 'bus', label: 'Buses', icon: 'bus' },
];

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `रू ${(price / 10000000).toFixed(2)} Crore`;
  }
  if (price >= 100000) {
    return `रू ${(price / 100000).toFixed(2)} Lakh`;
  }
  return `रू ${price.toLocaleString('en-NP')}`;
}

export function formatMileage(km: number): string {
  return `${km.toLocaleString('en-NP')} km`;
}
