import { PrismaClient, UserRole, VehicleType, FuelType, TransmissionType, BodyStyle, VehicleCondition } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.recentlyViewed.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.dealerBranch.deleteMany();
  await prisma.dealer.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.inspectionItemPhoto.deleteMany();
  await prisma.inspectionPhoto.deleteMany();
  await prisma.inspectionItem.deleteMany();
  await prisma.inspectionSection.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.riskFlag.deleteMany();
  await prisma.documentVerification.deleteMany();
  await prisma.serviceRecord.deleteMany();
  await prisma.odometerRecord.deleteMany();
  await prisma.ownershipRecord.deleteMany();
  await prisma.vehiclePassport.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create users
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
     {
      email: 'admin@gadibazar.com',
      phone: '9801000001',
      fullName: 'Rajesh Shrestha',
      passwordHash,
      role: 'SUPER_ADMIN',
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true,
      lastLogin: new Date(),
    },
  });

  const seller1 = await prisma.user.create({
     {
      email: 'ramesh@gmail.com',
      phone: '9841000002',
      fullName: 'Ramesh Thapa',
      passwordHash,
      role: 'PRIVATE_SELLER',
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true,
      lastLogin: new Date(),
    },
  });

  const buyer1 = await prisma.user.create({
     {
      email: 'sita@gmail.com',
      phone: '9851000003',
      fullName: 'Sita Maharjan',
      passwordHash,
      role: 'BUYER',
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true,
      lastLogin: new Date(),
    },
  });

  const dealer1 = await prisma.user.create({
     {
      email: 'biraj@sujalmotors.com',
      phone: '9801000004',
      fullName: 'Biraj Rajbhandari',
      passwordHash,
      role: 'DEALER_OWNER',
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true,
      lastLogin: new Date(),
    },
  });

  const inspector1 = await prisma.user.create({
     {
      email: 'inspector@gadibazar.com',
      phone: '9801000005',
      fullName: 'Anil Karki',
      passwordHash,
      role: 'INSPECTOR',
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true,
      lastLogin: new Date(),
    },
  });

  const seller2 = await prisma.user.create({
     {
      email: 'sunil@gmail.com',
      phone: '9851000007',
      fullName: 'Sunil Shakya',
      passwordHash,
      role: 'PRIVATE_SELLER',
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true,
      lastLogin: new Date(),
    },
  });

  console.log('✅ Created 6 users');

  // Create vehicles
  const vehicle1 = await prisma.vehicle.create({
     {
      passportId: 'NP-VP-00018427',
      type: 'CAR',
      make: 'Toyota',
      model: 'Fortuner',
      variant: '2.8 GD-6 4WD',
      year: 2022,
      fuelType: 'DIESEL',
      transmission: 'AUTOMATIC',
      bodyStyle: 'SUV',
      mileage: 42000,
      engineCC: 2755,
      color: 'White Pearl',
      vin: 'MR1234567890ABCDE',
      engineNumber: 'ENG-2GR-456789',
      registrationNumber: 'BA 23 PA 4567',
      registrationDate: new Date('2022-03-15'),
      registeredDistrict: 'Kathmandu',
      ownerId: seller1.id,
      condition: 'EXCELLENT',
      isEV: false,
      isHybrid: false,
    },
  });

  const vehicle2 = await prisma.vehicle.create({
     {
      passportId: 'NP-VP-00019234',
      type: 'CAR',
      make: 'Hyundai',
      model: 'Creta',
      variant: '1.5 CRDi Premium',
      year: 2023,
      fuelType: 'DIESEL',
      transmission: 'AUTOMATIC',
      bodyStyle: 'SUV',
      mileage: 18500,
      engineCC: 1493,
      color: 'Polar White',
      registrationNumber: 'BA 45 CH 8901',
      registrationDate: new Date('2023-01-10'),
      registeredDistrict: 'Lalitpur',
      ownerId: dealer1.id,
      condition: 'EXCELLENT',
      isEV: false,
      isHybrid: false,
    },
  });

  const vehicle3 = await prisma.vehicle.create({
     {
      passportId: 'NP-VP-00020156',
      type: 'CAR',
      make: 'BYD',
      model: 'Atto 3',
      variant: 'Extended Range',
      year: 2024,
      fuelType: 'ELECTRIC',
      transmission: 'AUTOMATIC',
      bodyStyle: 'SUV',
      mileage: 8200,
      color: 'Surf Blue',
      registrationNumber: 'GA 12 PA 3456',
      registrationDate: new Date('2024-02-20'),
      registeredDistrict: 'Kathmandu',
      ownerId: seller2.id,
      condition: 'EXCELLENT',
      isEV: true,
      isHybrid: false,
      batterySOH: 96,
      batteryCapacity: 60.48,
    },
  });

  console.log('✅ Created 3 vehicles');

  // Create vehicle passports
  const passport1 = await prisma.vehiclePassport.create({
     {
      passportId: vehicle1.passportId,
      vehicleId: vehicle1.id,
      status: 'ACTIVE',
      issuedDate: new Date('2024-06-25'),
      lastInspectionDate: new Date('2025-01-10'),
      qrCode: 'VP-00018427-QR',
    },
  });

  const passport2 = await prisma.vehiclePassport.create({
     {
      passportId: vehicle2.passportId,
      vehicleId: vehicle2.id,
      status: 'ACTIVE',
      issuedDate: new Date('2024-03-15'),
      qrCode: 'VP-00019234-QR',
    },
  });

  const passport3 = await prisma.vehiclePassport.create({
     {
      passportId: vehicle3.passportId,
      vehicleId: vehicle3.id,
      status: 'ACTIVE',
      issuedDate: new Date('2024-08-15'),
      lastInspectionDate: new Date('2025-01-05'),
      qrCode: 'VP-00020156-QR',
    },
  });

  console.log('✅ Created 3 vehicle passports');

  // Create listings
  const listing1 = await prisma.listing.create({
     {
      vehicleId: vehicle1.id,
      sellerId: seller1.id,
      title: 'Toyota Fortuner 2.8 GD-6 4WD - Single Owner, Full Service History',
      description: 'Well-maintained Toyota Fortuner with complete service history from authorized dealer. No accidents. All tyres new. Recently serviced. Perfect for family and off-road adventures.',
      price: 12500000,
      negotiable: true,
      location: 'Baneshwor, Kathmandu',
      district: 'Kathmandu',
      images: [
        'https://images.unsplash.com/photo-1625231334401-4abc05e17e38?w=800',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      ],
      status: 'ACTIVE',
      isFeatured: true,
      isInspected: true,
      hasPassport: true,
      views: 1245,
      favourites: 89,
      enquiries: 23,
      expiresAt: new Date('2026-03-01'),
    },
  });

  const listing2 = await prisma.listing.create({
     {
      vehicleId: vehicle2.id,
      sellerId: dealer1.id,
      title: 'Hyundai Creta 2023 - Top Variant, Diesel Auto',
      description: 'Brand new condition Hyundai Creta with only 18,500 km. Top variant with all features including panoramic sunroof, ventilated seats, and ADAS. Dealer maintained.',
      price: 7200000,
      negotiable: true,
      location: 'Pulchowk, Lalitpur',
      district: 'Lalitpur',
      images: [
        'https://images.unsplash.com/photo-1614200187524-dc4b010773ae?w=800',
        'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
      ],
      status: 'ACTIVE',
      isFeatured: true,
      isInspected: true,
      hasPassport: true,
      views: 2100,
      favourites: 156,
      enquiries: 45,
      expiresAt: new Date('2026-02-15'),
    },
  });

  const listing3 = await prisma.listing.create({
     {
      vehicleId: vehicle3.id,
      sellerId: seller2.id,
      title: 'BYD Atto 3 Extended Range - EV with 96% Battery Health',
      description: 'Electric SUV with verified battery SOH of 96%. Full charge range of 521 km. Includes home charger installation. Zero running cost. Future of driving in Nepal.',
      price: 5800000,
      negotiable: false,
      location: 'Jhamsikhel, Lalitpur',
      district: 'Lalitpur',
      images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
      ],
      status: 'ACTIVE',
      isFeatured: true,
      isInspected: true,
      hasPassport: true,
      views: 3450,
      favourites: 234,
      enquiries: 67,
      expiresAt: new Date('2026-01-20'),
    },
  });

  console.log('✅ Created 3 listings');

  // Create dealer
  const dealer = await prisma.dealer.create({
     {
      userId: dealer1.id,
      companyName: 'Sujal Motors Pvt. Ltd.',
      description: 'Leading multi-brand automobile dealer in Kathmandu Valley. Specializing in new and pre-owned vehicles with complete documentation support.',
      address: 'Pulchowk, Lalitpur',
      phone: '01-5551234',
      email: 'info@sujalmotors.com',
      website: 'www.sujalmotors.com',
      verified: true,
      rating: 4.7,
      totalListings: 45,
      totalSold: 234,
    },
  });

  console.log('✅ Created 1 dealer');

  // Create audit logs
  await prisma.auditLog.createMany({
     [
      {
        userId: admin.id,
        action: 'USER_LOGIN',
        resource: 'user',
        resourceId: admin.id,
        ipAddress: '192.168.1.100',
      },
      {
        userId: seller1.id,
        action: 'LISTING_CREATED',
        resource: 'listing',
        resourceId: listing1.id,
        ipAddress: '192.168.1.101',
      },
      {
        userId: inspector1.id,
        action: 'INSPECTION_COMPLETED',
        resource: 'inspection',
        resourceId: 'ins1',
        ipAddress: '192.168.1.102',
      },
    ],
  });

  console.log('✅ Created 3 audit logs');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: 6`);
  console.log(`   - Vehicles: 3`);
  console.log(`   - Passports: 3`);
  console.log(`   - Listings: 3`);
  console.log(`   - Dealers: 1`);
  console.log(`   - Audit Logs: 3`);
  console.log('\n🔐 Test Credentials:');
  console.log('   Email: admin@gadibazar.com');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
