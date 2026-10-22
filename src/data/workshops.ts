import { Workshop, WorkshopReview } from '../services/api';

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
    latitude: 27.7007,
    longitude: 85.3001,
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
    latitude: 27.6767,
    longitude: 85.3157,
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
    latitude: 28.2096,
    longitude: 83.9856,
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
    email: 'info@biratnagar garage.com',
    province: 'Koshi',
    district: 'Morang',
    city: 'Biratnagar',
    address: 'Main Road, Biratnagar',
    latitude: 26.4525,
    longitude: 87.2718,
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
    email: 'butwala utocare@gmail.com',
    province: 'Lumbini',
    district: 'Rupandehi',
    city: 'Butwal',
    address: 'Traffic Chowk, Butwal',
    latitude: 27.7000,
    longitude: 83.4333,
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
    latitude: 28.0560,
    longitude: 81.6210,
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

export const sampleReviews: WorkshopReview[] = [
  {
    id: 'review_1',
    workshopId: 'workshop_1',
    userId: 'user_1',
    rating: 5,
    title: 'Excellent service!',
    comment: 'Very professional team. They fixed my car quickly and the price was reasonable. Highly recommended!',
    serviceType: 'Oil Change',
    serviceDate: '2024-10-15',
    verified: true,
    createdAt: '2024-10-16T00:00:00.000Z'
  },
  {
    id: 'review_2',
    workshopId: 'workshop_1',
    userId: 'user_2',
    rating: 4,
    title: 'Good experience',
    comment: 'Quality work but had to wait a bit longer than expected. Overall satisfied with the service.',
    serviceType: 'Brake Service',
    serviceDate: '2024-09-20',
    verified: true,
    createdAt: '2024-09-21T00:00:00.000Z'
  },
  {
    id: 'review_3',
    workshopId: 'workshop_2',
    userId: 'user_3',
    rating: 5,
    title: 'Best European car service in Kathmandu',
    comment: 'These guys really know their stuff. My BMW has never run better. Fair pricing for the quality of work.',
    serviceType: 'Engine Repair',
    serviceDate: '2024-11-01',
    verified: true,
    createdAt: '2024-11-02T00:00:00.000Z'
  },
  {
    id: 'review_4',
    workshopId: 'workshop_3',
    userId: 'user_4',
    rating: 4,
    title: 'Reliable service',
    comment: 'Been coming here for years. Always honest and fair. Good value for money.',
    serviceType: 'General Maintenance',
    serviceDate: '2024-10-05',
    verified: true,
    createdAt: '2024-10-06T00:00:00.000Z'
  },
  {
    id: 'review_5',
    workshopId: 'workshop_4',
    userId: 'user_5',
    rating: 5,
    title: 'Professional and efficient',
    comment: 'Great service! They diagnosed the problem quickly and fixed it at a reasonable price.',
    serviceType: 'Electrical Work',
    serviceDate: '2024-11-10',
    verified: true,
    createdAt: '2024-11-11T00:00:00.000Z'
  }
];

export function initializeSampleWorkshops() {
  const existingWorkshops = localStorage.getItem('gadi_sewa_workshops');
  if (!existingWorkshops) {
    localStorage.setItem('gadi_sewa_workshops', JSON.stringify(sampleWorkshops));
  }
  
  const existingReviews = localStorage.getItem('gadi_sewa_workshop_reviews');
  if (!existingReviews) {
    localStorage.setItem('gadi_sewa_workshop_reviews', JSON.stringify(sampleReviews));
  }
}
