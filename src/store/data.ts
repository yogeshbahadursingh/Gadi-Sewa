import { User, Vehicle, VehiclePassport, Listing, Inspection, Offer, Dealer, Conversation, Message, Notification, Payment, Reservation, AuditLog } from '../types';

// ============ USERS ============
export const users: User[] = [
  { id: 'u1', email: 'admin@gadibazar.com', phone: '9801000001', fullName: 'Rajesh Shrestha', role: 'SUPER_ADMIN', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-01-01', lastLogin: '2026-01-15' },
  { id: 'u2', email: 'ramesh@gmail.com', phone: '9841000002', fullName: 'Ramesh Thapa', role: 'PRIVATE_SELLER', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-06-15', lastLogin: '2026-01-14' },
  { id: 'u3', email: 'sita@gmail.com', phone: '9851000003', fullName: 'Sita Maharjan', role: 'BUYER', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-08-20', lastLogin: '2026-01-15' },
  { id: 'u4', email: 'biraj@sujalmotors.com', phone: '9801000004', fullName: 'Biraj Rajbhandari', role: 'DEALER_OWNER', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-03-10', lastLogin: '2026-01-15' },
  { id: 'u5', email: 'inspector@gadibazar.com', phone: '9801000005', fullName: 'Anil Karki', role: 'INSPECTOR', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-04-01', lastLogin: '2026-01-15' },
  { id: 'u6', email: 'priya@gmail.com', phone: '9841000006', fullName: 'Priya Joshi', role: 'BUYER', emailVerified: true, phoneVerified: true, identityVerified: false, createdAt: '2025-01-10', lastLogin: '2026-01-13' },
  { id: 'u7', email: 'sunil@gmail.com', phone: '9851000007', fullName: 'Sunil Shakya', role: 'PRIVATE_SELLER', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2025-03-05', lastLogin: '2026-01-14' },
  { id: 'u8', email: 'manager@sujalmotors.com', phone: '9801000008', fullName: 'Kiran Rai', role: 'DEALER_STAFF', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-05-20', lastLogin: '2026-01-15' },
  { id: 'u9', email: 'garage@everest.com', phone: '9841000009', fullName: 'Everest Auto Workshop', role: 'GARAGE_OWNER', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-07-15', lastLogin: '2026-01-12' },
  { id: 'u10', email: 'fraud@gadibazar.com', phone: '9801000010', fullName: 'Nabin Pandey', role: 'FRAUD_REVIEWER', emailVerified: true, phoneVerified: true, identityVerified: true, createdAt: '2024-02-01', lastLogin: '2026-01-15' },
];

// ============ VEHICLES ============
export const vehicles: Vehicle[] = [
  { id: 'v1', passportId: 'NP-VP-00018427', type: 'CAR', make: 'Toyota', model: 'Fortuner', variant: '2.8 GD-6 4WD', year: 2022, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 42000, engineCC: 2755, color: 'White Pearl', vin: 'MR1234567890ABCDE', engineNumber: 'ENG-2GR-456789', registrationNumber: 'BA 23 PA 4567', registrationDate: '2022-03-15', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-06-20' },
  { id: 'v2', passportId: 'NP-VP-00019234', type: 'CAR', make: 'Hyundai', model: 'Creta', variant: '1.5 CRDi Premium', year: 2023, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 18500, engineCC: 1493, color: 'Polar White', registrationNumber: 'BA 45 CH 8901', registrationDate: '2023-01-10', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-03-15' },
  { id: 'v3', passportId: 'NP-VP-00020156', type: 'CAR', make: 'BYD', model: 'Atto 3', variant: 'Extended Range', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 8200, engineCC: 0, color: 'Surf Blue', registrationNumber: 'GA 12 PA 3456', registrationDate: '2024-02-20', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 96, batteryCapacity: 60.48, createdAt: '2024-08-10' },
  { id: 'v4', passportId: 'NP-VP-00021089', type: 'CAR', make: 'Honda', model: 'City', variant: '1.5 V CVT', year: 2021, fuelType: 'PETROL', transmission: 'CVT', bodyStyle: 'SEDAN', mileage: 55000, engineCC: 1498, color: 'Meteoroid Gray', registrationNumber: 'BA 67 PA 2345', registrationDate: '2021-06-01', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2025-01-05' },
  { id: 'v5', passportId: 'NP-VP-00022345', type: 'MOTORBIKE', make: 'Royal Enfield', model: 'Classic 350', variant: 'Halcyon', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 12000, engineCC: 349, color: 'Stealth Black', registrationNumber: 'BA 89 BA 5678', registrationDate: '2023-04-15', registeredDistrict: 'Kathmandu', ownerId: 'u6', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2025-03-10' },
  { id: 'v6', passportId: 'NP-VP-00023456', type: 'CAR', make: 'Tata', model: 'Nexon EV', variant: 'Max', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 5400, engineCC: 0, color: 'Daytona Grey', registrationNumber: 'GA 34 PA 7890', registrationDate: '2024-05-01', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 98, batteryCapacity: 40.5, createdAt: '2024-09-20' },
  { id: 'v7', passportId: 'NP-VP-00024567', type: 'CAR', make: 'Maruti Suzuki', model: 'Swift', variant: 'ZXi+', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 35000, engineCC: 1197, color: 'Pearl Arctic White', registrationNumber: 'BA 12 CH 3456', registrationDate: '2022-08-20', registeredDistrict: 'Bhaktapur', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2025-02-15' },
  { id: 'v8', passportId: 'NP-VP-00025678', type: 'SCOOTER', make: 'Honda', model: 'Activa 6G', variant: 'Deluxe', year: 2024, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SCOOTER', mileage: 3200, engineCC: 110, color: 'Matte Axis Grey', registrationNumber: 'BA 56 BA 9012', registrationDate: '2024-01-15', registeredDistrict: 'Kathmandu', ownerId: 'u6', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2025-04-01' },
  { id: 'v9', passportId: 'NP-VP-00026789', type: 'CAR', make: 'Kia', model: 'Seltos', variant: 'HTK+ 1.5 Diesel', year: 2023, fuelType: 'DIESEL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 28000, engineCC: 1493, color: 'Gravity Grey', registrationNumber: 'BA 78 PA 4567', registrationDate: '2023-07-10', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2025-05-20' },
  { id: 'v10', passportId: 'NP-VP-00027890', type: 'CAR', make: 'MG', model: 'ZS EV', variant: 'Excite', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 11000, engineCC: 0, color: 'Candy White', registrationNumber: 'GA 56 PA 2345', registrationDate: '2024-03-20', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 94, batteryCapacity: 50.3, createdAt: '2024-10-15' },
  { id: 'v11', passportId: 'NP-VP-00028901', type: 'MOTORBIKE', make: 'Yamaha', model: 'MT-15 V2', variant: 'ABS', year: 2024, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 6500, engineCC: 155, color: 'Dark Matte Blue', registrationNumber: 'BA 34 BA 6789', registrationDate: '2024-06-01', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2025-06-10' },
  { id: 'v12', passportId: 'NP-VP-00029012', type: 'CAR', make: 'Toyota', model: 'Innova Crysta', variant: '2.4 GX AT', year: 2021, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'VAN', mileage: 78000, engineCC: 2393, color: 'Super White', registrationNumber: 'BA 90 PA 1234', registrationDate: '2021-02-15', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2025-07-01' },
];

// ============ VEHICLE PASSPORTS ============
export const vehiclePassports: VehiclePassport[] = [
  {
    id: 'vp1', passportId: 'NP-VP-00018427', vehicleId: 'v1', status: 'ACTIVE', issuedDate: '2024-06-25', lastInspectionDate: '2025-01-10',
    ownershipHistory: [
      { id: 'oh1', ownerId: 'u2', ownerName: 'Ramesh Thapa', startDate: '2022-03-15', isCurrent: true, verificationSource: 'DOCUMENT_CHECKED' },
    ],
    odometerHistory: [
      { id: 'od1', mileage: 15000, date: '2023-06-01', source: 'DOCUMENT_CHECKED', confidence: 'HIGH' },
      { id: 'od2', mileage: 32000, date: '2024-06-15', source: 'PHYSICALLY_VERIFIED', verifier: 'Anil Karki', confidence: 'HIGH' },
      { id: 'od3', mileage: 42000, date: '2025-01-10', source: 'PHYSICALLY_VERIFIED', verifier: 'Anil Karki', confidence: 'HIGH' },
    ],
    inspectionHistory: ['ins1'],
    serviceHistory: ['sr1', 'sr2'],
    documentVerifications: [
      { id: 'dv1', documentType: 'Bluebook', status: 'VERIFIED', verificationSource: 'DOCUMENT_CHECKED', verifiedBy: 'System', verifiedDate: '2024-06-25' },
      { id: 'dv2', documentType: 'Insurance', status: 'VERIFIED', verificationSource: 'DOCUMENT_CHECKED', verifiedBy: 'System', verifiedDate: '2024-06-25', expiryDate: '2026-03-15' },
    ],
    riskFlags: [],
    qrCode: 'VP-00018427-QR',
  },
  {
    id: 'vp3', passportId: 'NP-VP-00020156', vehicleId: 'v3', status: 'ACTIVE', issuedDate: '2024-08-15', lastInspectionDate: '2025-01-05',
    ownershipHistory: [
      { id: 'oh3', ownerId: 'u7', ownerName: 'Sunil Shakya', startDate: '2024-02-20', isCurrent: true, verificationSource: 'DOCUMENT_CHECKED' },
    ],
    odometerHistory: [
      { id: 'od4', mileage: 3200, date: '2024-08-15', source: 'PHYSICALLY_VERIFIED', verifier: 'Anil Karki', confidence: 'HIGH' },
      { id: 'od5', mileage: 8200, date: '2025-01-05', source: 'PHYSICALLY_VERIFIED', verifier: 'Anil Karki', confidence: 'HIGH' },
    ],
    inspectionHistory: ['ins2'],
    serviceHistory: ['sr3'],
    documentVerifications: [
      { id: 'dv3', documentType: 'Bluebook', status: 'VERIFIED', verificationSource: 'DOCUMENT_CHECKED', verifiedBy: 'System', verifiedDate: '2024-08-15' },
      { id: 'dv4', documentType: 'Insurance', status: 'VERIFIED', verificationSource: 'DOCUMENT_CHECKED', verifiedBy: 'System', verifiedDate: '2024-08-15', expiryDate: '2027-02-20' },
    ],
    riskFlags: [],
    qrCode: 'VP-00020156-QR',
  },
];

// ============ LISTINGS ============
export const listings: Listing[] = [
  { id: 'l1', vehicleId: 'v1', sellerId: 'u2', title: 'Toyota Fortuner 2.8 GD-6 4WD - Single Owner, Full Service History', description: 'Well-maintained Toyota Fortuner with complete service history from authorized dealer. No accidents. All tyres new. Recently serviced. Perfect for family and off-road adventures.', price: 12500000, negotiable: true, location: 'Baneshwor, Kathmandu', district: 'Kathmandu', images: ['https://images.unsplash.com/photo-1625231334401-4abc05e17e38?w=800', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'], status: 'ACTIVE', isFeatured: true, isInspected: true, hasPassport: true, inspectionId: 'ins1', passportId: 'NP-VP-00018427', views: 1245, favourites: 89, enquiries: 23, createdAt: '2025-12-01', updatedAt: '2026-01-10', expiresAt: '2026-03-01' },
  { id: 'l2', vehicleId: 'v2', sellerId: 'u4', title: 'Hyundai Creta 2023 - Top Variant, Diesel Auto', description: 'Brand new condition Hyundai Creta with only 18,500 km. Top variant with all features including panoramic sunroof, ventilated seats, and ADAS. Dealer maintained.', price: 7200000, negotiable: true, location: 'Pulchowk, Lalitpur', district: 'Lalitpur', images: ['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'], status: 'ACTIVE', isFeatured: true, isInspected: true, hasPassport: true, passportId: 'NP-VP-00019234', views: 2100, favourites: 156, enquiries: 45, createdAt: '2025-11-15', updatedAt: '2026-01-12', expiresAt: '2026-02-15' },
  { id: 'l3', vehicleId: 'v3', sellerId: 'u7', title: 'BYD Atto 3 Extended Range - EV with 96% Battery Health', description: 'Electric SUV with verified battery SOH of 96%. Full charge range of 521 km. Includes home charger installation. Zero running cost. Future of driving in Nepal.', price: 5800000, negotiable: false, location: 'Jhamsikhel, Lalitpur', district: 'Lalitpur', images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800'], status: 'ACTIVE', isFeatured: true, isInspected: true, hasPassport: true, inspectionId: 'ins2', passportId: 'NP-VP-00020156', views: 3450, favourites: 234, enquiries: 67, createdAt: '2025-10-20', updatedAt: '2026-01-08', expiresAt: '2026-01-20' },
  { id: 'l4', vehicleId: 'v4', sellerId: 'u2', title: 'Honda City 1.5V CVT - Reliable Sedan, Well Maintained', description: 'Honda City in excellent running condition. Regular service done. New battery. AC cooling perfectly. Ideal city car with great fuel economy.', price: 3800000, negotiable: true, location: 'Kalanki, Kathmandu', district: 'Kathmandu', images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800'], status: 'ACTIVE', isFeatured: false, isInspected: true, hasPassport: true, passportId: 'NP-VP-00021089', views: 890, favourites: 45, enquiries: 12, createdAt: '2025-12-15', updatedAt: '2026-01-05', expiresAt: '2026-03-15' },
  { id: 'l5', vehicleId: 'v5', sellerId: 'u6', title: 'Royal Enfield Classic 350 - Low Km, Perfect Condition', description: 'Classic 350 Halcyon variant with very low running. All papers clear. Single owner. Perfect for touring and daily commute.', price: 480000, negotiable: true, location: 'Thamel, Kathmandu', district: 'Kathmandu', images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'], status: 'ACTIVE', isFeatured: false, isInspected: false, hasPassport: true, passportId: 'NP-VP-00022345', views: 567, favourites: 34, enquiries: 8, createdAt: '2026-01-01', updatedAt: '2026-01-10', expiresAt: '2026-04-01' },
  { id: 'l6', vehicleId: 'v6', sellerId: 'u4', title: 'Tata Nexon EV Max - 98% Battery SOH, Top Electric SUV', description: 'Premium electric SUV with exceptional battery health. 437 km range. Fast charging capable. Zero maintenance cost. Includes 3 years warranty remaining.', price: 4500000, negotiable: true, location: 'Sanepa, Lalitpur', district: 'Lalitpur', images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', 'https://images.unsplash.com/photo-1620891549027-942fdc98d383?w=800'], status: 'ACTIVE', isFeatured: true, isInspected: true, hasPassport: true, passportId: 'NP-VP-00023456', views: 1890, favourites: 178, enquiries: 34, createdAt: '2025-11-01', updatedAt: '2026-01-14', expiresAt: '2026-02-01' },
  { id: 'l7', vehicleId: 'v7', sellerId: 'u7', title: 'Maruti Suzuki Swift ZXi+ - Fun to Drive Hatchback', description: 'Swift top variant with all features. Great mileage of 22 km/l. Perfect first car. New tyres. Insurance valid.', price: 1850000, negotiable: true, location: 'Madhyapur Thimi, Bhaktapur', district: 'Bhaktapur', images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'], status: 'ACTIVE', isFeatured: false, isInspected: false, hasPassport: true, passportId: 'NP-VP-00024567', views: 445, favourites: 28, enquiries: 6, createdAt: '2026-01-05', updatedAt: '2026-01-10', expiresAt: '2026-04-05' },
  { id: 'l8', vehicleId: 'v9', sellerId: 'u2', title: 'Kia Seltos HTK+ Diesel - Feature Loaded SUV', description: 'Kia Seltos diesel with manual transmission. Great mileage and power. All service done at authorized center. Sunroof, cruise control, wireless charging.', price: 5200000, negotiable: true, location: 'Balkhu, Kathmandu', district: 'Kathmandu', images: ['https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800'], status: 'ACTIVE', isFeatured: false, isInspected: true, hasPassport: true, passportId: 'NP-VP-00026789', views: 678, favourites: 52, enquiries: 15, createdAt: '2025-12-20', updatedAt: '2026-01-08', expiresAt: '2026-03-20' },
  { id: 'l9', vehicleId: 'v10', sellerId: 'u4', title: 'MG ZS EV - Premium Electric SUV, Low Mileage', description: 'British-designed electric SUV with 461 km range. Premium interior with 360 camera, panoramic sunroof. Battery SOH verified at 94%.', price: 4200000, negotiable: true, location: 'Ekantakuna, Lalitpur', district: 'Lalitpur', images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800'], status: 'ACTIVE', isFeatured: true, isInspected: true, hasPassport: true, passportId: 'NP-VP-00027890', views: 1560, favourites: 123, enquiries: 29, createdAt: '2025-11-20', updatedAt: '2026-01-11', expiresAt: '2026-02-20' },
  { id: 'l10', vehicleId: 'v11', sellerId: 'u7', title: 'Yamaha MT-15 V2 ABS - Sporty Naked Bike', description: 'Latest MT-15 with ABS. Only 6,500 km. Perfect condition. All service done at Yamaha showroom. Great for city and highway.', price: 520000, negotiable: false, location: 'Boudha, Kathmandu', district: 'Kathmandu', images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'], status: 'ACTIVE', isFeatured: false, isInspected: false, hasPassport: true, passportId: 'NP-VP-00028901', views: 389, favourites: 41, enquiries: 11, createdAt: '2026-01-08', updatedAt: '2026-01-12', expiresAt: '2026-04-08' },
  { id: 'l11', vehicleId: 'v12', sellerId: 'u2', title: 'Toyota Innova Crysta GX AT - 7 Seater Family Vehicle', description: 'Toyota Innova Crysta automatic diesel. Perfect for family and commercial use. High roof variant. Well maintained with complete service records.', price: 6800000, negotiable: true, location: 'Baluwatar, Kathmandu', district: 'Kathmandu', images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800'], status: 'ACTIVE', isFeatured: false, isInspected: true, hasPassport: true, passportId: 'NP-VP-00029012', views: 534, favourites: 38, enquiries: 9, createdAt: '2025-12-25', updatedAt: '2026-01-06', expiresAt: '2026-03-25' },
];

// ============ INSPECTIONS ============
export const inspections: Inspection[] = [
  {
    id: 'ins1', vehicleId: 'v1', inspectorId: 'u5', templateType: 'DIESEL_SUV', status: 'REVIEWED',
    scheduledDate: '2025-01-08', completedDate: '2025-01-10', location: 'Baneshwor, Kathmandu',
    overallResult: 'PASS',
    sections: [
      { id: 's1', name: 'Vehicle Identity', category: 'identity', items: [
        { id: 'i1', name: 'Chassis Number Match', result: 'PASS', comment: 'Matches bluebook' },
        { id: 'i2', name: 'Engine Number Match', result: 'PASS', comment: 'Matches bluebook' },
        { id: 'i3', name: 'Registration Plate', result: 'PASS', comment: 'Valid and readable' },
      ]},
      { id: 's2', name: 'Exterior', category: 'exterior', items: [
        { id: 'i4', name: 'Body Panels', result: 'PASS', comment: 'No dents or misalignment' },
        { id: 'i5', name: 'Paint Condition', result: 'ADVISORY', severity: 'MINOR', comment: 'Minor scratches on rear bumper' },
        { id: 'i6', name: 'Glass/Windows', result: 'PASS', comment: 'No chips or cracks' },
      ]},
      { id: 's3', name: 'Mechanical', category: 'mechanical', items: [
        { id: 'i7', name: 'Engine Start', result: 'PASS', comment: 'Starts immediately, no smoke' },
        { id: 'i8', name: 'Transmission', result: 'PASS', comment: 'Smooth shifts, no grinding' },
        { id: 'i9', name: 'Brakes', result: 'PASS', comment: 'Good pedal feel, no noise' },
        { id: 'i10', name: 'Suspension', result: 'PASS', comment: 'No knocking, good damping' },
      ]},
      { id: 's4', name: 'Tyres', category: 'tyres', items: [
        { id: 'i11', name: 'Front Tyres', result: 'PASS', measurement: '6mm tread', comment: 'Recently replaced' },
        { id: 'i12', name: 'Rear Tyres', result: 'PASS', measurement: '5.5mm tread', comment: 'Good condition' },
        { id: 'i13', name: 'Spare Tyre', result: 'PASS', comment: 'Unused spare present' },
      ]},
      { id: 's5', name: 'Interior', category: 'interior', items: [
        { id: 'i14', name: 'Seats', result: 'PASS', comment: 'No tears or excessive wear' },
        { id: 'i15', name: 'Dashboard/Controls', result: 'PASS', comment: 'All functions working' },
        { id: 'i16', name: 'AC', result: 'PASS', comment: 'Cold within 2 minutes' },
      ]},
      { id: 's6', name: 'Diagnostics', category: 'diagnostics', items: [
        { id: 'i17', name: 'OBD Scan', result: 'PASS', comment: 'No fault codes' },
        { id: 'i18', name: 'Battery', result: 'PASS', measurement: '12.6V', comment: 'Healthy' },
      ]},
      { id: 's7', name: 'Road Test', category: 'roadtest', items: [
        { id: 'i19', name: 'Steering', result: 'PASS', comment: 'No pull, good feedback' },
        { id: 'i20', name: 'Braking', result: 'PASS', comment: 'Straight and firm' },
        { id: 'i21', name: 'Noise/Vibration', result: 'PASS', comment: 'No unusual sounds' },
      ]},
    ],
    photos: [],
    notes: 'Vehicle in excellent condition. Minor cosmetic advisory on rear bumper. Mechanically sound.',
    recommendation: 'Recommended for purchase. Minor cosmetic touch-up suggested for rear bumper.',
    supervisorReviewed: true,
  },
  {
    id: 'ins2', vehicleId: 'v3', inspectorId: 'u5', templateType: 'ELECTRIC_SUV', status: 'REVIEWED',
    scheduledDate: '2025-01-03', completedDate: '2025-01-05', location: 'Jhamsikhel, Lalitpur',
    overallResult: 'PASS',
    sections: [
      { id: 'es1', name: 'Vehicle Identity', category: 'identity', items: [
        { id: 'ei1', name: 'Chassis Number Match', result: 'PASS' },
        { id: 'ei2', name: 'Registration Match', result: 'PASS' },
      ]},
      { id: 'es2', name: 'Battery & Electrical', category: 'ev_battery', items: [
        { id: 'ei3', name: 'Battery SOH', result: 'PASS', measurement: '96%', comment: 'Excellent health' },
        { id: 'ei4', name: 'BMS Scan', result: 'PASS', comment: 'No faults, balanced cells' },
        { id: 'ei5', name: 'Charging Test - AC', result: 'PASS', measurement: '7.2 kW', comment: 'Normal charging rate' },
        { id: 'ei6', name: 'Charging Test - DC', result: 'PASS', measurement: '70 kW peak', comment: 'Fast charging working' },
        { id: 'ei7', name: 'Battery Enclosure', result: 'PASS', comment: 'No damage or corrosion' },
      ]},
      { id: 'es3', name: 'Motor & Drivetrain', category: 'ev_motor', items: [
        { id: 'ei8', name: 'Motor Operation', result: 'PASS', comment: 'Smooth, no noise' },
        { id: 'ei9', name: 'Inverter', result: 'PASS', comment: 'No fault codes' },
        { id: 'ei10', name: 'Regenerative Braking', result: 'PASS', comment: 'All levels working' },
      ]},
      { id: 'es4', name: 'Exterior & Interior', category: 'general', items: [
        { id: 'ei11', name: 'Body Condition', result: 'PASS', comment: 'Excellent' },
        { id: 'ei12', name: 'Interior', result: 'PASS', comment: 'Like new condition' },
        { id: 'ei13', name: 'Tyres', result: 'PASS', measurement: '7mm tread', comment: 'Good condition' },
      ]},
    ],
    photos: [],
    notes: 'EV in outstanding condition. Battery health is excellent at 96% SOH. All systems functioning perfectly.',
    recommendation: 'Highly recommended. One of the best condition EVs inspected. Battery health well above average for age.',
    supervisorReviewed: true,
  },
];

// ============ DEALERS ============
export const dealers: Dealer[] = [
  {
    id: 'd1', userId: 'u4', companyName: 'Sujal Motors Pvt. Ltd.', description: 'Leading multi-brand automobile dealer in Kathmandu Valley. Specializing in new and pre-owned vehicles with complete documentation support.',
    address: 'Pulchowk, Lalitpur', phone: '01-5551234', email: 'info@sujalmotors.com', website: 'www.sujalmotors.com', verified: true, rating: 4.7, totalListings: 45, totalSold: 234,
    branches: [
      { id: 'b1', name: 'Pulchowk Branch', address: 'Pulchowk, Lalitpur', phone: '01-5551234', managerId: 'u8' },
      { id: 'b2', name: 'Baneshwor Branch', address: 'Baneshwor, Kathmandu', phone: '01-4445678' },
    ],
  },
];

// ============ OFFERS ============
export const offers: Offer[] = [
  { id: 'o1', listingId: 'l1', buyerId: 'u3', sellerId: 'u2', amount: 11800000, message: 'Would you consider this price? I can pay immediately.', status: 'PENDING', createdAt: '2026-01-12', updatedAt: '2026-01-12' },
  { id: 'o2', listingId: 'l3', buyerId: 'u3', sellerId: 'u7', amount: 5500000, message: 'Great EV! Can you do this price?', status: 'COUNTERED', counterAmount: 5700000, createdAt: '2026-01-10', updatedAt: '2026-01-11' },
  { id: 'o3', listingId: 'l2', buyerId: 'u6', sellerId: 'u4', amount: 6800000, status: 'REJECTED', createdAt: '2026-01-08', updatedAt: '2026-01-09' },
];

// ============ RESERVATIONS ============
export const reservations: Reservation[] = [
  { id: 'r1', listingId: 'l4', buyerId: 'u3', depositAmount: 50000, status: 'CONFIRMED', expiresAt: '2026-01-20', createdAt: '2026-01-10' },
];

// ============ PAYMENTS ============
export const payments: Payment[] = [
  { id: 'p1', userId: 'u3', amount: 50000, purpose: 'reservation_deposit', status: 'SUCCEEDED', provider: 'ESEWA', reference: 'ESW-2026-001234', createdAt: '2026-01-10' },
  { id: 'p2', userId: 'u2', amount: 5000, purpose: 'premium_listing', status: 'SUCCEEDED', provider: 'KHALTI', reference: 'KLT-2026-005678', createdAt: '2025-12-01' },
  { id: 'p3', userId: 'u7', amount: 3500, purpose: 'inspection_booking', status: 'SUCCEEDED', provider: 'ESEWA', reference: 'ESW-2025-009012', createdAt: '2025-01-03' },
];

// ============ CONVERSATIONS ============
export const conversations: Conversation[] = [
  { id: 'c1', participants: ['u3', 'u2'], listingId: 'l1', lastMessage: 'Thank you for the offer. Let me check and get back to you.', lastMessageAt: '2026-01-12T14:30:00', unreadCount: 1 },
  { id: 'c2', participants: ['u3', 'u7'], listingId: 'l3', lastMessage: 'I can do 57 lakh as a final price.', lastMessageAt: '2026-01-11T10:15:00', unreadCount: 0 },
  { id: 'c3', participants: ['u6', 'u4'], listingId: 'l2', lastMessage: 'The price is fixed at 72 lakh for this condition.', lastMessageAt: '2026-01-09T16:45:00', unreadCount: 0 },
];

export const messages: Message[] = [
  { id: 'm1', conversationId: 'c1', senderId: 'u3', receiverId: 'u2', content: 'Hi, is the Fortuner still available? I am very interested.', read: true, createdAt: '2026-01-12T10:00:00' },
  { id: 'm2', conversationId: 'c1', senderId: 'u2', receiverId: 'u3', content: 'Yes, it is available. Would you like to schedule a viewing?', read: true, createdAt: '2026-01-12T11:30:00' },
  { id: 'm3', conversationId: 'c1', senderId: 'u3', receiverId: 'u2', content: 'I have made an offer of Rs. 1,18,00,000. Please consider.', read: true, createdAt: '2026-01-12T14:00:00' },
  { id: 'm4', conversationId: 'c1', senderId: 'u2', receiverId: 'u3', content: 'Thank you for the offer. Let me check and get back to you.', read: false, createdAt: '2026-01-12T14:30:00' },
  { id: 'm5', conversationId: 'c2', senderId: 'u3', receiverId: 'u7', content: 'Is the price negotiable for the BYD Atto 3?', read: true, createdAt: '2026-01-10T09:00:00' },
  { id: 'm6', conversationId: 'c2', senderId: 'u7', receiverId: 'u3', content: 'I can do 57 lakh as a final price.', read: true, createdAt: '2026-01-11T10:15:00' },
];

// ============ NOTIFICATIONS ============
export const notifications: Notification[] = [
  { id: 'n1', userId: 'u2', type: 'offer_received', title: 'New Offer Received', message: 'Sita Maharjan has offered Rs. 1,18,00,000 for your Toyota Fortuner', read: false, link: '/seller/offers', createdAt: '2026-01-12T14:00:00' },
  { id: 'n2', userId: 'u3', type: 'offer_countered', title: 'Offer Countered', message: 'Sunil Shakya countered your offer with Rs. 57,00,000', read: false, link: '/buyer/offers', createdAt: '2026-01-11T10:15:00' },
  { id: 'n3', userId: 'u3', type: 'reservation_confirmed', title: 'Reservation Confirmed', message: 'Your reservation for Honda City has been confirmed', read: true, link: '/buyer/reservations', createdAt: '2026-01-10T12:00:00' },
  { id: 'n4', userId: 'u5', type: 'inspection_scheduled', title: 'New Inspection Assigned', message: 'New inspection scheduled for Toyota Fortuner at Baneshwor', read: true, link: '/inspector/jobs', createdAt: '2026-01-07T09:00:00' },
  { id: 'n5', userId: 'u2', type: 'listing_views', title: 'Listing Milestone', message: 'Your Toyota Fortuner listing has reached 1,000 views!', read: true, link: '/seller/listings', createdAt: '2026-01-05T18:00:00' },
];

// ============ AUDIT LOGS ============
export const auditLogs: AuditLog[] = [
  { id: 'a1', userId: 'u5', action: 'INSPECTION_COMPLETED', resource: 'inspection', resourceId: 'ins1', timestamp: '2025-01-10T16:30:00' },
  { id: 'a2', userId: 'u2', action: 'LISTING_CREATED', resource: 'listing', resourceId: 'l1', timestamp: '2025-12-01T10:00:00' },
  { id: 'a3', userId: 'u3', action: 'OFFER_MADE', resource: 'offer', resourceId: 'o1', newValue: '11800000', timestamp: '2026-01-12T14:00:00' },
  { id: 'a4', userId: 'u7', action: 'OFFER_COUNTERED', resource: 'offer', resourceId: 'o2', oldValue: '5500000', newValue: '5700000', timestamp: '2026-01-11T10:15:00' },
  { id: 'a5', userId: 'u1', action: 'PASSPORT_ISSUED', resource: 'vehicle_passport', resourceId: 'vp1', timestamp: '2024-06-25T09:00:00' },
];

// ============ HELPER FUNCTIONS ============
export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find(v => v.id === id);
}

export function getListingById(id: string): Listing | undefined {
  return listings.find(l => l.id === id);
}

export function getVehicleByPassportId(passportId: string): Vehicle | undefined {
  return vehicles.find(v => v.passportId === passportId);
}

export function getPassportByVehicleId(vehicleId: string): VehiclePassport | undefined {
  return vehiclePassports.find(vp => vp.vehicleId === vehicleId);
}

export function getInspectionByListingId(listingId: string): Inspection | undefined {
  const listing = getListingById(listingId);
  if (!listing?.inspectionId) return undefined;
  return inspections.find(i => i.id === listing.inspectionId);
}

export function getListingsBySeller(sellerId: string): Listing[] {
  return listings.filter(l => l.sellerId === sellerId);
}

export function getOffersByUser(userId: string): Offer[] {
  return offers.filter(o => o.buyerId === userId || o.sellerId === userId);
}

export function getNotificationsByUser(userId: string): Notification[] {
  return notifications.filter(n => n.userId === userId);
}

export function getConversationsByUser(userId: string): Conversation[] {
  return conversations.filter(c => c.participants.includes(userId));
}

export function getMessagesByConversation(conversationId: string): Message[] {
  return messages.filter(m => m.conversationId === conversationId);
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  }
  if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(2)} Lakh`;
  }
  return `Rs. ${price.toLocaleString('en-NP')}`;
}

export function formatMileage(km: number): string {
  return `${km.toLocaleString('en-NP')} km`;
}

export const districts = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Birgunj', 'Biratnagar', 'Butwal', 'Nepalgunj', 'Dharan', 'Hetauda', 'Janakpur'];

export const makes = ['Toyota', 'Hyundai', 'Honda', 'Maruti Suzuki', 'Tata', 'Kia', 'MG', 'BYD', 'Mahindra', 'Royal Enfield', 'Yamaha', 'Bajaj', 'Suzuki', 'Nissan', 'Ford'];
