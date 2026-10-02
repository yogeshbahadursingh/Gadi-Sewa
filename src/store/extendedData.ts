// Extended vehicle data with 100+ vehicles for Nepal market
import type { Vehicle, Listing, VehiclePassport } from '../types';

export const extendedVehicles: Vehicle[] = [
  // Toyota vehicles (20 vehicles)
  { id: 'v13', passportId: 'NP-VP-00030001', type: 'CAR', make: 'Toyota', model: 'Corolla', variant: '1.8 X', year: 2020, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 45000, engineCC: 1798, color: 'Silver', registrationNumber: 'BA 34 PA 5678', registrationDate: '2020-03-15', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-01-10T00:00:00Z' },
  { id: 'v14', passportId: 'NP-VP-00030002', type: 'CAR', make: 'Toyota', model: 'Corolla', variant: '1.8 GL', year: 2019, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 62000, engineCC: 1798, color: 'White', registrationNumber: 'BA 45 PA 6789', registrationDate: '2019-05-20', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-01-12T00:00:00Z' },
  { id: 'v15', passportId: 'NP-VP-00030003', type: 'CAR', make: 'Toyota', model: 'Land Cruiser Prado', variant: '3.0 D-4D', year: 2018, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 85000, engineCC: 2982, color: 'Black', registrationNumber: 'BA 56 PA 7890', registrationDate: '2018-08-10', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-01-15T00:00:00Z' },
  { id: 'v16', passportId: 'NP-VP-00030004', type: 'CAR', make: 'Toyota', model: 'RAV4', variant: '2.5 Hybrid', year: 2021, fuelType: 'HYBRID', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 32000, engineCC: 2487, color: 'Blue', registrationNumber: 'BA 67 PA 8901', registrationDate: '2021-02-14', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: true, createdAt: '2024-01-18T00:00:00Z' },
  { id: 'v17', passportId: 'NP-VP-00030005', type: 'CAR', make: 'Toyota', model: 'Hilux', variant: '2.8 G', year: 2022, fuelType: 'DIESEL', transmission: 'MANUAL', bodyStyle: 'PICKUP', mileage: 28000, engineCC: 2755, color: 'Red', registrationNumber: 'BA 78 PA 9012', registrationDate: '2022-06-05', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-01-20T00:00:00Z' },
  { id: 'v18', passportId: 'NP-VP-00030006', type: 'CAR', make: 'Toyota', model: 'Camry', variant: '2.5 V', year: 2019, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 58000, engineCC: 2487, color: 'Gray', registrationNumber: 'BA 89 PA 0123', registrationDate: '2019-11-12', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-01-22T00:00:00Z' },
  { id: 'v19', passportId: 'NP-VP-00030007', type: 'CAR', make: 'Toyota', model: 'Fortuner', variant: '2.7 V', year: 2021, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 41000, engineCC: 2694, color: 'White', registrationNumber: 'BA 90 PA 1234', registrationDate: '2021-04-18', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-01-25T00:00:00Z' },
  { id: 'v20', passportId: 'NP-VP-00030008', type: 'CAR', make: 'Toyota', model: 'Yaris', variant: '1.5 E', year: 2020, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SEDAN', mileage: 52000, engineCC: 1496, color: 'Silver', registrationNumber: 'BA 01 PA 2345', registrationDate: '2020-07-22', registeredDistrict: 'Bhaktapur', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-01-28T00:00:00Z' },
  { id: 'v21', passportId: 'NP-VP-00030009', type: 'CAR', make: 'Toyota', model: 'Innova', variant: '2.4 G', year: 2019, fuelType: 'DIESEL', transmission: 'MANUAL', bodyStyle: 'VAN', mileage: 78000, engineCC: 2393, color: 'White', registrationNumber: 'BA 12 PA 3456', registrationDate: '2019-09-15', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-02-01T00:00:00Z' },
  { id: 'v22', passportId: 'NP-VP-00030010', type: 'CAR', make: 'Toyota', model: 'Vitz', variant: '1.0 F', year: 2018, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 65000, engineCC: 996, color: 'Red', registrationNumber: 'BA 23 PA 4567', registrationDate: '2018-12-08', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'FAIR', isEV: false, isHybrid: false, createdAt: '2024-02-03T00:00:00Z' },
  { id: 'v23', passportId: 'NP-VP-00030011', type: 'CAR', make: 'Toyota', model: 'Prius', variant: '1.8 A', year: 2020, fuelType: 'HYBRID', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 38000, engineCC: 1798, color: 'White', registrationNumber: 'BA 34 PA 5678', registrationDate: '2020-05-10', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: true, createdAt: '2024-02-05T00:00:00Z' },
  { id: 'v24', passportId: 'NP-VP-00030012', type: 'CAR', make: 'Toyota', model: 'Land Cruiser', variant: '4.5 V8', year: 2017, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 120000, engineCC: 4461, color: 'Black', registrationNumber: 'BA 45 PA 6789', registrationDate: '2017-03-20', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-02-08T00:00:00Z' },
  { id: 'v25', passportId: 'NP-VP-00030013', type: 'CAR', make: 'Toyota', model: 'C-HR', variant: '1.8 Hybrid', year: 2021, fuelType: 'HYBRID', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 29000, engineCC: 1798, color: 'Blue', registrationNumber: 'BA 56 PA 7890', registrationDate: '2021-08-15', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: true, createdAt: '2024-02-10T00:00:00Z' },
  { id: 'v26', passportId: 'NP-VP-00030014', type: 'CAR', make: 'Toyota', model: 'Rush', variant: '1.5 G', year: 2022, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 18000, engineCC: 1495, color: 'Silver', registrationNumber: 'BA 67 PA 8901', registrationDate: '2022-01-25', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-02-12T00:00:00Z' },
  { id: 'v27', passportId: 'NP-VP-00030015', type: 'CAR', make: 'Toyota', model: 'Avanza', variant: '1.5 E', year: 2020, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'VAN', mileage: 55000, engineCC: 1495, color: 'White', registrationNumber: 'BA 78 PA 9012', registrationDate: '2020-10-12', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-02-15T00:00:00Z' },
  { id: 'v28', passportId: 'NP-VP-00030016', type: 'CAR', make: 'Toyota', model: 'Alphard', variant: '2.5 Executive', year: 2019, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'VAN', mileage: 68000, engineCC: 2494, color: 'Black', registrationNumber: 'BA 89 PA 0123', registrationDate: '2019-06-18', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-02-18T00:00:00Z' },
  { id: 'v29', passportId: 'NP-VP-00030017', type: 'CAR', make: 'Toyota', model: 'Fortuner', variant: '2.4 VRZ', year: 2023, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 15000, engineCC: 2393, color: 'Gray', registrationNumber: 'BA 90 PA 1234', registrationDate: '2023-02-28', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-02-20T00:00:00Z' },
  { id: 'v30', passportId: 'NP-VP-00030018', type: 'CAR', make: 'Toyota', model: 'Corolla Cross', variant: '1.8 Hybrid', year: 2022, fuelType: 'HYBRID', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 22000, engineCC: 1798, color: 'White', registrationNumber: 'BA 01 PA 2345', registrationDate: '2022-09-10', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: true, createdAt: '2024-02-22T00:00:00Z' },
  { id: 'v31', passportId: 'NP-VP-00030019', type: 'CAR', make: 'Toyota', model: 'Hiace', variant: '3.0 Diesel', year: 2021, fuelType: 'DIESEL', transmission: 'MANUAL', bodyStyle: 'VAN', mileage: 45000, engineCC: 2982, color: 'White', registrationNumber: 'BA 12 PA 3456', registrationDate: '2021-05-20', registeredDistrict: 'Bhaktapur', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-02-25T00:00:00Z' },
  { id: 'v32', passportId: 'NP-VP-00030020', type: 'CAR', make: 'Toyota', model: 'Crown', variant: '2.5 Royal', year: 2020, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 48000, engineCC: 2494, color: 'Black', registrationNumber: 'BA 23 PA 4567', registrationDate: '2020-11-05', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-02-28T00:00:00Z' },

  // Hyundai vehicles (15 vehicles)
  { id: 'v33', passportId: 'NP-VP-00030021', type: 'CAR', make: 'Hyundai', model: 'Tucson', variant: '2.0 GLS', year: 2021, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 35000, engineCC: 1999, color: 'Red', registrationNumber: 'BA 34 PA 5678', registrationDate: '2021-03-15', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-03-01T00:00:00Z' },
  { id: 'v34', passportId: 'NP-VP-00030022', type: 'CAR', make: 'Hyundai', model: 'Santa Fe', variant: '2.2 CRDi', year: 2020, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 52000, engineCC: 2199, color: 'Silver', registrationNumber: 'BA 45 PA 6789', registrationDate: '2020-07-20', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-03-03T00:00:00Z' },
  { id: 'v35', passportId: 'NP-VP-00030023', type: 'CAR', make: 'Hyundai', model: 'Elantra', variant: '2.0 GL', year: 2019, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 68000, engineCC: 1999, color: 'White', registrationNumber: 'BA 56 PA 7890', registrationDate: '2019-11-10', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-03-05T00:00:00Z' },
  { id: 'v36', passportId: 'NP-VP-00030024', type: 'CAR', make: 'Hyundai', model: 'i20', variant: '1.2 Sportz', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 25000, engineCC: 1197, color: 'Blue', registrationNumber: 'BA 67 PA 8901', registrationDate: '2022-04-15', registeredDistrict: 'Pokhara', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-03-08T00:00:00Z' },
  { id: 'v37', passportId: 'NP-VP-00030025', type: 'CAR', make: 'Hyundai', model: 'Venue', variant: '1.0 Turbo', year: 2021, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 38000, engineCC: 998, color: 'Gray', registrationNumber: 'BA 78 PA 9012', registrationDate: '2021-08-22', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-03-10T00:00:00Z' },
  { id: 'v38', passportId: 'NP-VP-00030026', type: 'CAR', make: 'Hyundai', model: 'Creta', variant: '1.6 SX', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 28000, engineCC: 1591, color: 'Polar White', registrationNumber: 'BA 89 PA 0123', registrationDate: '2022-01-18', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-03-12T00:00:00Z' },
  { id: 'v39', passportId: 'NP-VP-00030027', type: 'CAR', make: 'Hyundai', model: 'Verna', variant: '1.6 SX', year: 2020, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 55000, engineCC: 1591, color: 'Red', registrationNumber: 'BA 90 PA 1234', registrationDate: '2020-06-25', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-03-15T00:00:00Z' },
  { id: 'v40', passportId: 'NP-VP-00030028', type: 'CAR', make: 'Hyundai', model: 'Grand i10', variant: '1.2 Magna', year: 2019, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 72000, engineCC: 1197, color: 'Silver', registrationNumber: 'BA 01 PA 2345', registrationDate: '2019-09-12', registeredDistrict: 'Bhaktapur', ownerId: 'u2', condition: 'FAIR', isEV: false, isHybrid: false, createdAt: '2024-03-18T00:00:00Z' },
  { id: 'v41', passportId: 'NP-VP-00030029', type: 'CAR', make: 'Hyundai', model: 'Kona', variant: 'Electric', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 12000, color: 'White', registrationNumber: 'GA 12 PA 3456', registrationDate: '2023-03-10', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 98, batteryCapacity: 64, createdAt: '2024-03-20T00:00:00Z' },
  { id: 'v42', passportId: 'NP-VP-00030030', type: 'CAR', make: 'Hyundai', model: 'Ioniq 5', variant: '72.6 kWh', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 8000, color: 'Gray', registrationNumber: 'GA 23 PA 4567', registrationDate: '2023-06-15', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 99, batteryCapacity: 72.6, createdAt: '2024-03-22T00:00:00Z' },
  { id: 'v43', passportId: 'NP-VP-00030031', type: 'CAR', make: 'Hyundai', model: 'Staria', variant: '2.2 CRDi', year: 2022, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'VAN', mileage: 32000, engineCC: 2199, color: 'Creamy White', registrationNumber: 'BA 34 PA 5678', registrationDate: '2022-08-20', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-03-25T00:00:00Z' },
  { id: 'v44', passportId: 'NP-VP-00030032', type: 'CAR', make: 'Hyundai', model: 'Accent', variant: '1.4 GL', year: 2018, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SEDAN', mileage: 85000, engineCC: 1368, color: 'White', registrationNumber: 'BA 45 PA 6789', registrationDate: '2018-12-05', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'FAIR', isEV: false, isHybrid: false, createdAt: '2024-03-28T00:00:00Z' },
  { id: 'v45', passportId: 'NP-VP-00030033', type: 'CAR', make: 'Hyundai', model: 'Alcazar', variant: '2.0 Signature', year: 2022, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 26000, engineCC: 1999, color: 'Titan Grey', registrationNumber: 'BA 56 PA 7890', registrationDate: '2022-10-15', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-04-01T00:00:00Z' },
  { id: 'v46', passportId: 'NP-VP-00030034', type: 'CAR', make: 'Hyundai', model: 'Aura', variant: '1.2 Kappa', year: 2021, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SEDAN', mileage: 42000, engineCC: 1197, color: 'Polar White', registrationNumber: 'BA 67 PA 8901', registrationDate: '2021-05-10', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-04-03T00:00:00Z' },
  { id: 'v47', passportId: 'NP-VP-00030035', type: 'CAR', make: 'Hyundai', model: 'Exter', variant: '1.2 SX', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 15000, engineCC: 1197, color: 'Atlas White', registrationNumber: 'BA 78 PA 9012', registrationDate: '2023-07-20', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-04-05T00:00:00Z' },

  // Honda vehicles (15 vehicles)
  { id: 'v48', passportId: 'NP-VP-00030036', type: 'CAR', make: 'Honda', model: 'Civic', variant: '1.5 Turbo', year: 2021, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 38000, engineCC: 1498, color: 'Gray', registrationNumber: 'BA 89 PA 0123', registrationDate: '2021-04-12', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-04-08T00:00:00Z' },
  { id: 'v49', passportId: 'NP-VP-00030037', type: 'CAR', make: 'Honda', model: 'CR-V', variant: '1.5 Turbo', year: 2020, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 52000, engineCC: 1498, color: 'White', registrationNumber: 'BA 90 PA 1234', registrationDate: '2020-08-18', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-04-10T00:00:00Z' },
  { id: 'v50', passportId: 'NP-VP-00030038', type: 'CAR', make: 'Honda', model: 'BR-V', variant: '1.5 S', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 28000, engineCC: 1498, color: 'Silver', registrationNumber: 'BA 01 PA 2345', registrationDate: '2022-02-25', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-04-12T00:00:00Z' },
  { id: 'v51', passportId: 'NP-VP-00030039', type: 'CAR', make: 'Honda', model: 'Accord', variant: '2.4 VTi-L', year: 2019, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 65000, engineCC: 2356, color: 'Black', registrationNumber: 'BA 12 PA 3456', registrationDate: '2019-10-08', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-04-15T00:00:00Z' },
  { id: 'v52', passportId: 'NP-VP-00030040', type: 'CAR', make: 'Honda', model: 'Jazz', variant: '1.3 VX', year: 2021, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 42000, engineCC: 1318, color: 'Red', registrationNumber: 'BA 23 PA 4567', registrationDate: '2021-06-15', registeredDistrict: 'Bhaktapur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-04-18T00:00:00Z' },
  { id: 'v53', passportId: 'NP-VP-00030041', type: 'CAR', make: 'Honda', model: 'HR-V', variant: '1.8 RV', year: 2020, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 48000, engineCC: 1799, color: 'White', registrationNumber: 'BA 34 PA 5678', registrationDate: '2020-09-20', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-04-20T00:00:00Z' },
  { id: 'v54', passportId: 'NP-VP-00030042', type: 'CAR', make: 'Honda', model: 'City', variant: '1.5 ZX', year: 2023, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 18000, engineCC: 1498, color: 'Meteoroid Gray', registrationNumber: 'BA 45 PA 6789', registrationDate: '2023-01-10', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-04-22T00:00:00Z' },
  { id: 'v55', passportId: 'NP-VP-00030043', type: 'CAR', make: 'Honda', model: 'WR-V', variant: '1.5 VX', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 32000, engineCC: 1498, color: 'Taffeta White', registrationNumber: 'BA 56 PA 7890', registrationDate: '2022-05-18', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-04-25T00:00:00Z' },
  { id: 'v56', passportId: 'NP-VP-00030044', type: 'CAR', make: 'Honda', model: 'e', variant: 'Advance', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 10000, color: 'Platinum White', registrationNumber: 'GA 34 PA 5678', registrationDate: '2023-04-22', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 97, batteryCapacity: 35.5, createdAt: '2024-04-28T00:00:00Z' },
  { id: 'v57', passportId: 'NP-VP-00030045', type: 'CAR', make: 'Honda', model: 'Fit', variant: '1.5 Hybrid', year: 2020, fuelType: 'HYBRID', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 55000, engineCC: 1496, color: 'Silver', registrationNumber: 'BA 67 PA 8901', registrationDate: '2020-11-12', registeredDistrict: 'Pokhara', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: true, createdAt: '2024-05-01T00:00:00Z' },
  { id: 'v58', passportId: 'NP-VP-00030046', type: 'CAR', make: 'Honda', model: 'Odyssey', variant: '2.4 Absolute', year: 2019, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'VAN', mileage: 72000, engineCC: 2356, color: 'Black', registrationNumber: 'BA 78 PA 9012', registrationDate: '2019-07-25', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-05-03T00:00:00Z' },
  { id: 'v59', passportId: 'NP-VP-00030047', type: 'CAR', make: 'Honda', model: 'Pilot', variant: '3.5 Touring', year: 2021, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 45000, engineCC: 3471, color: 'White', registrationNumber: 'BA 89 PA 0123', registrationDate: '2021-09-08', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-05T00:00:00Z' },
  { id: 'v60', passportId: 'NP-VP-00030048', type: 'CAR', make: 'Honda', model: 'Passport', variant: '3.5 Elite', year: 2022, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 28000, engineCC: 3471, color: 'Gray', registrationNumber: 'BA 90 PA 1234', registrationDate: '2022-03-15', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-08T00:00:00Z' },
  { id: 'v61', passportId: 'NP-VP-00030049', type: 'CAR', make: 'Honda', model: 'Ridgeline', variant: '3.5 Black', year: 2021, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'PICKUP', mileage: 38000, engineCC: 3471, color: 'Black', registrationNumber: 'BA 01 PA 2345', registrationDate: '2021-12-20', registeredDistrict: 'Bhaktapur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-10T00:00:00Z' },
  { id: 'v62', passportId: 'NP-VP-00030050', type: 'CAR', make: 'Honda', model: 'Insight', variant: '1.5 Touring', year: 2020, fuelType: 'HYBRID', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 52000, engineCC: 1498, color: 'Blue', registrationNumber: 'BA 12 PA 3456', registrationDate: '2020-04-10', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: true, createdAt: '2024-05-12T00:00:00Z' },

  // Maruti Suzuki vehicles (15 vehicles)
  { id: 'v63', passportId: 'NP-VP-00030051', type: 'CAR', make: 'Maruti Suzuki', model: 'Swift', variant: '1.2 VXi', year: 2021, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 42000, engineCC: 1197, color: 'White', registrationNumber: 'BA 23 PA 4567', registrationDate: '2021-07-15', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-15T00:00:00Z' },
  { id: 'v64', passportId: 'NP-VP-00030052', type: 'CAR', make: 'Maruti Suzuki', model: 'Baleno', variant: '1.2 Zeta', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 28000, engineCC: 1197, color: 'Red', registrationNumber: 'BA 34 PA 5678', registrationDate: '2022-01-20', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-18T00:00:00Z' },
  { id: 'v65', passportId: 'NP-VP-00030053', type: 'CAR', make: 'Maruti Suzuki', model: 'Dzire', variant: '1.2 VXi', year: 2020, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SEDAN', mileage: 58000, engineCC: 1197, color: 'Silver', registrationNumber: 'BA 45 PA 6789', registrationDate: '2020-09-10', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-05-20T00:00:00Z' },
  { id: 'v66', passportId: 'NP-VP-00030054', type: 'CAR', make: 'Maruti Suzuki', model: 'Ertiga', variant: '1.5 ZXi', year: 2021, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'VAN', mileage: 48000, engineCC: 1462, color: 'White', registrationNumber: 'BA 56 PA 7890', registrationDate: '2021-03-25', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-22T00:00:00Z' },
  { id: 'v67', passportId: 'NP-VP-00030055', type: 'CAR', make: 'Maruti Suzuki', model: 'Vitara Brezza', variant: '1.5 ZXi', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 32000, engineCC: 1462, color: 'Blue', registrationNumber: 'BA 67 PA 8901', registrationDate: '2022-06-18', registeredDistrict: 'Bhaktapur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-25T00:00:00Z' },
  { id: 'v68', passportId: 'NP-VP-00030056', type: 'CAR', make: 'Maruti Suzuki', model: 'Alto', variant: 'K10 VXi', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 15000, engineCC: 998, color: 'White', registrationNumber: 'BA 78 PA 9012', registrationDate: '2023-02-10', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-05-28T00:00:00Z' },
  { id: 'v69', passportId: 'NP-VP-00030057', type: 'CAR', make: 'Maruti Suzuki', model: 'WagonR', variant: '1.0 VXi', year: 2021, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 45000, engineCC: 998, color: 'Silver', registrationNumber: 'BA 89 PA 0123', registrationDate: '2021-11-05', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-06-01T00:00:00Z' },
  { id: 'v70', passportId: 'NP-VP-00030058', type: 'CAR', make: 'Maruti Suzuki', model: 'Celerio', variant: '1.0 VXi', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 28000, engineCC: 998, color: 'Red', registrationNumber: 'BA 90 PA 1234', registrationDate: '2022-08-15', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-06-03T00:00:00Z' },
  { id: 'v71', passportId: 'NP-VP-00030059', type: 'CAR', make: 'Maruti Suzuki', model: 'S-Presso', variant: '1.0 VXi', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 12000, engineCC: 998, color: 'Orange', registrationNumber: 'BA 01 PA 2345', registrationDate: '2023-04-20', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-06-05T00:00:00Z' },
  { id: 'v72', passportId: 'NP-VP-00030060', type: 'CAR', make: 'Maruti Suzuki', model: 'XL6', variant: '1.5 Alpha', year: 2021, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'VAN', mileage: 52000, engineCC: 1462, color: 'Gray', registrationNumber: 'BA 12 PA 3456', registrationDate: '2021-10-12', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-06-08T00:00:00Z' },
  { id: 'v73', passportId: 'NP-VP-00030061', type: 'CAR', make: 'Maruti Suzuki', model: 'Ignis', variant: '1.2 Zeta', year: 2020, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 62000, engineCC: 1197, color: 'White', registrationNumber: 'BA 23 PA 4567', registrationDate: '2020-05-18', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-06-10T00:00:00Z' },
  { id: 'v74', passportId: 'NP-VP-00030062', type: 'CAR', make: 'Maruti Suzuki', model: 'Ciaz', variant: '1.4 Alpha', year: 2019, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 75000, engineCC: 1373, color: 'Silver', registrationNumber: 'BA 34 PA 5678', registrationDate: '2019-12-08', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'FAIR', isEV: false, isHybrid: false, createdAt: '2024-06-12T00:00:00Z' },
  { id: 'v75', passportId: 'NP-VP-00030063', type: 'CAR', make: 'Maruti Suzuki', model: 'Eeco', variant: '7 Seater', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'VAN', mileage: 35000, engineCC: 1196, color: 'White', registrationNumber: 'BA 45 PA 6789', registrationDate: '2022-07-22', registeredDistrict: 'Bhaktapur', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-06-15T00:00:00Z' },
  { id: 'v76', passportId: 'NP-VP-00030064', type: 'CAR', make: 'Maruti Suzuki', model: 'Fronx', variant: '1.0 Turbo', year: 2023, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 18000, engineCC: 998, color: 'Blue', registrationNumber: 'BA 56 PA 7890', registrationDate: '2023-05-15', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-06-18T00:00:00Z' },
  { id: 'v77', passportId: 'NP-VP-00030065', type: 'CAR', make: 'Maruti Suzuki', model: 'Grand Vitara', variant: '1.5 Strong Hybrid', year: 2023, fuelType: 'HYBRID', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 22000, engineCC: 1462, color: 'White', registrationNumber: 'BA 67 PA 8901', registrationDate: '2023-08-10', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: true, createdAt: '2024-06-20T00:00:00Z' },

  // Tata vehicles (10 vehicles)
  { id: 'v78', passportId: 'NP-VP-00030066', type: 'CAR', make: 'Tata', model: 'Nexon', variant: '1.2 XZ+', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 32000, engineCC: 1199, color: 'Daytona Grey', registrationNumber: 'BA 78 PA 9012', registrationDate: '2022-04-18', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-06-22T00:00:00Z' },
  { id: 'v79', passportId: 'NP-VP-00030067', type: 'CAR', make: 'Tata', model: 'Harrier', variant: '2.0 XZA', year: 2021, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 48000, engineCC: 1956, color: 'Atlas Black', registrationNumber: 'BA 89 PA 0123', registrationDate: '2021-09-12', registeredDistrict: 'Pokhara', ownerId: 'u2', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-06-25T00:00:00Z' },
  { id: 'v80', passportId: 'NP-VP-00030068', type: 'CAR', make: 'Tata', model: 'Safari', variant: '2.0 XZA+', year: 2022, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 38000, engineCC: 1956, color: 'Royal White', registrationNumber: 'BA 90 PA 1234', registrationDate: '2022-02-25', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-06-28T00:00:00Z' },
  { id: 'v81', passportId: 'NP-VP-00030069', type: 'CAR', make: 'Tata', model: 'Altroz', variant: '1.2 XZ', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 18000, engineCC: 1199, color: 'Midnight Plum', registrationNumber: 'BA 01 PA 2345', registrationDate: '2023-01-15', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-07-01T00:00:00Z' },
  { id: 'v82', passportId: 'NP-VP-00030070', type: 'CAR', make: 'Tata', model: 'Tiago', variant: '1.2 XZ', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'HATCHBACK', mileage: 28000, engineCC: 1199, color: 'Flame Red', registrationNumber: 'BA 12 PA 3456', registrationDate: '2022-06-20', registeredDistrict: 'Bhaktapur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-07-03T00:00:00Z' },
  { id: 'v83', passportId: 'NP-VP-00030071', type: 'CAR', make: 'Tata', model: 'Tigor', variant: '1.2 XZ', year: 2021, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SEDAN', mileage: 42000, engineCC: 1199, color: 'Pure Silver', registrationNumber: 'BA 23 PA 4567', registrationDate: '2021-11-08', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-07-05T00:00:00Z' },
  { id: 'v84', passportId: 'NP-VP-00030072', type: 'CAR', make: 'Tata', model: 'Punch', variant: '1.2 XZA', year: 2023, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 15000, engineCC: 1199, color: 'Opal White', registrationNumber: 'BA 34 PA 5678', registrationDate: '2023-03-10', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-07-08T00:00:00Z' },
  { id: 'v85', passportId: 'NP-VP-00030073', type: 'CAR', make: 'Tata', model: 'Nexon EV', variant: 'Max', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 12000, color: 'Daytona Grey', registrationNumber: 'GA 45 PA 6789', registrationDate: '2023-07-18', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 97, batteryCapacity: 40.5, createdAt: '2024-07-10T00:00:00Z' },
  { id: 'v86', passportId: 'NP-VP-00030074', type: 'CAR', make: 'Tata', model: 'Tiago EV', variant: 'Medium', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 10000, color: 'Daytona Grey', registrationNumber: 'GA 56 PA 7890', registrationDate: '2023-09-22', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 98, batteryCapacity: 24, createdAt: '2024-07-12T00:00:00Z' },
  { id: 'v87', passportId: 'NP-VP-00030075', type: 'CAR', make: 'Tata', model: 'Curvv EV', variant: 'Accomp', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 5000, color: 'Pristine White', registrationNumber: 'GA 67 PA 8901', registrationDate: '2024-01-15', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 99, batteryCapacity: 55, createdAt: '2024-07-15T00:00:00Z' },

  // Kia vehicles (8 vehicles)
  { id: 'v88', passportId: 'NP-VP-00030076', type: 'CAR', make: 'Kia', model: 'Seltos', variant: '1.5 HTX', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 35000, engineCC: 1497, color: 'Gravity Grey', registrationNumber: 'BA 78 PA 9012', registrationDate: '2022-05-10', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-07-18T00:00:00Z' },
  { id: 'v89', passportId: 'NP-VP-00030077', type: 'CAR', make: 'Kia', model: 'Sonet', variant: '1.5 HTX', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 22000, engineCC: 1497, color: 'Imperial Blue', registrationNumber: 'BA 89 PA 0123', registrationDate: '2023-02-18', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-07-20T00:00:00Z' },
  { id: 'v90', passportId: 'NP-VP-00030078', type: 'CAR', make: 'Kia', model: 'Carnival', variant: '2.2 Premium', year: 2021, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'VAN', mileage: 55000, engineCC: 2199, color: 'Gravity Grey', registrationNumber: 'BA 90 PA 1234', registrationDate: '2021-08-25', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-07-22T00:00:00Z' },
  { id: 'v91', passportId: 'NP-VP-00030079', type: 'CAR', make: 'Kia', model: 'EV6', variant: 'GT-Line', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 15000, color: 'Runway Red', registrationNumber: 'GA 78 PA 9012', registrationDate: '2023-06-12', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 96, batteryCapacity: 77.4, createdAt: '2024-07-25T00:00:00Z' },
  { id: 'v92', passportId: 'NP-VP-00030080', type: 'CAR', make: 'Kia', model: 'Sportage', variant: '2.0 EX', year: 2022, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 32000, engineCC: 1999, color: 'Steel Grey', registrationNumber: 'BA 01 PA 2345', registrationDate: '2022-09-15', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-07-28T00:00:00Z' },
  { id: 'v93', passportId: 'NP-VP-00030081', type: 'CAR', make: 'Kia', model: 'Seltos', variant: '1.5 Diesel', year: 2023, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 25000, engineCC: 1493, color: 'Clear White', registrationNumber: 'BA 12 PA 3456', registrationDate: '2023-04-20', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-08-01T00:00:00Z' },
  { id: 'v94', passportId: 'NP-VP-00030082', type: 'CAR', make: 'Kia', model: 'Carens', variant: '1.5 Prestige', year: 2023, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'VAN', mileage: 28000, engineCC: 1497, color: 'Sparkling Silver', registrationNumber: 'BA 23 PA 4567', registrationDate: '2023-07-10', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-08-03T00:00:00Z' },
  { id: 'v95', passportId: 'NP-VP-00030083', type: 'CAR', make: 'Kia', model: 'EV9', variant: 'GT-Line', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 8000, color: 'Galaxy Metal', registrationNumber: 'GA 89 PA 0123', registrationDate: '2024-01-20', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 98, batteryCapacity: 100, createdAt: '2024-08-05T00:00:00Z' },

  // MG vehicles (5 vehicles)
  { id: 'v96', passportId: 'NP-VP-00030084', type: 'CAR', make: 'MG', model: 'ZS EV', variant: 'Excite', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 18000, color: 'Candy White', registrationNumber: 'GA 90 PA 1234', registrationDate: '2023-05-15', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 95, batteryCapacity: 50.3, createdAt: '2024-08-08T00:00:00Z' },
  { id: 'v97', passportId: 'NP-VP-00030085', type: 'CAR', make: 'MG', model: 'Hector', variant: '1.5 Turbo', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'SUV', mileage: 35000, engineCC: 1451, color: 'Starlight Black', registrationNumber: 'BA 34 PA 5678', registrationDate: '2022-08-20', registeredDistrict: 'Lalitpur', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-08-10T00:00:00Z' },
  { id: 'v98', passportId: 'NP-VP-00030086', type: 'CAR', make: 'MG', model: 'Astor', variant: '1.5 Savvy', year: 2023, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 22000, engineCC: 1498, color: 'Glaze Blue', registrationNumber: 'BA 45 PA 6789', registrationDate: '2023-03-10', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-08-12T00:00:00Z' },
  { id: 'v99', passportId: 'NP-VP-00030087', type: 'CAR', make: 'MG', model: 'Comet EV', variant: 'Play', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 8000, color: 'Candy White', registrationNumber: 'GA 01 PA 2345', registrationDate: '2024-02-15', registeredDistrict: 'Pokhara', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 99, batteryCapacity: 17.3, createdAt: '2024-08-15T00:00:00Z' },
  { id: 'v100', passportId: 'NP-VP-00030088', type: 'CAR', make: 'MG', model: 'Gloster', variant: '2.0 Twin Turbo', year: 2022, fuelType: 'DIESEL', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 42000, engineCC: 1996, color: 'Hazard Grey', registrationNumber: 'BA 56 PA 7890', registrationDate: '2022-11-18', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-08-18T00:00:00Z' },

  // BYD vehicles (5 vehicles)
  { id: 'v101', passportId: 'NP-VP-00030089', type: 'CAR', make: 'BYD', model: 'Atto 3', variant: 'Super', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 15000, color: 'Surf Blue', registrationNumber: 'GA 12 PA 3456', registrationDate: '2023-08-10', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 97, batteryCapacity: 60.48, createdAt: '2024-08-20T00:00:00Z' },
  { id: 'v102', passportId: 'NP-VP-00030090', type: 'CAR', make: 'BYD', model: 'Dolphin', variant: 'Premium', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'HATCHBACK', mileage: 8000, color: 'Arctic Blue', registrationNumber: 'GA 23 PA 4567', registrationDate: '2024-01-25', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 99, batteryCapacity: 60.48, createdAt: '2024-08-22T00:00:00Z' },
  { id: 'v103', passportId: 'NP-VP-00030091', type: 'CAR', make: 'BYD', model: 'Seal', variant: 'Performance', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 5000, color: 'Cosmos Black', registrationNumber: 'GA 34 PA 5678', registrationDate: '2024-03-15', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 100, batteryCapacity: 82.5, createdAt: '2024-08-25T00:00:00Z' },
  { id: 'v104', passportId: 'NP-VP-00030092', type: 'CAR', make: 'BYD', model: 'Han', variant: 'EV', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SEDAN', mileage: 18000, color: 'Snow White', registrationNumber: 'GA 45 PA 6789', registrationDate: '2023-06-20', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 96, batteryCapacity: 85.4, createdAt: '2024-08-28T00:00:00Z' },
  { id: 'v105', passportId: 'NP-VP-00030093', type: 'CAR', make: 'BYD', model: 'Tang', variant: 'EV', year: 2023, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SUV', mileage: 22000, color: 'Diabolic Red', registrationNumber: 'GA 56 PA 7890', registrationDate: '2023-09-12', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 95, batteryCapacity: 108.8, createdAt: '2024-09-01T00:00:00Z' },

  // Motorcycles (10 vehicles)
  { id: 'v106', passportId: 'NP-VP-00030094', type: 'MOTORBIKE', make: 'Royal Enfield', model: 'Classic 350', variant: 'Halcyon', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 8000, engineCC: 349, color: 'Halcyon Grey', registrationNumber: 'BA 67 PA 8901', registrationDate: '2023-04-15', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-03T00:00:00Z' },
  { id: 'v107', passportId: 'NP-VP-00030095', type: 'MOTORBIKE', make: 'Royal Enfield', model: 'Meteor 350', variant: 'Stellar', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 12000, engineCC: 349, color: 'Stellar Blue', registrationNumber: 'BA 78 PA 9012', registrationDate: '2023-06-20', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-05T00:00:00Z' },
  { id: 'v108', passportId: 'NP-VP-00030096', type: 'MOTORBIKE', make: 'Yamaha', model: 'MT-15 V2', variant: 'ABS', year: 2024, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 5000, engineCC: 155, color: 'Dark Matte Blue', registrationNumber: 'BA 89 PA 0123', registrationDate: '2024-01-10', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-08T00:00:00Z' },
  { id: 'v109', passportId: 'NP-VP-00030097', type: 'MOTORBIKE', make: 'Yamaha', model: 'R15 V4', variant: 'M', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 15000, engineCC: 155, color: 'Racing Blue', registrationNumber: 'BA 90 PA 1234', registrationDate: '2023-08-15', registeredDistrict: 'Pokhara', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-10T00:00:00Z' },
  { id: 'v110', passportId: 'NP-VP-00030098', type: 'MOTORBIKE', make: 'Honda', model: 'CBR 250R', variant: 'ABS', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 22000, engineCC: 249, color: 'Matte Axis Grey', registrationNumber: 'BA 01 PA 2345', registrationDate: '2022-05-18', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-09-12T00:00:00Z' },
  { id: 'v111', passportId: 'NP-VP-00030099', type: 'MOTORBIKE', make: 'Bajaj', model: 'Pulsar NS200', variant: 'ABS', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 18000, engineCC: 199.5, color: 'Racing Red', registrationNumber: 'BA 12 PA 3456', registrationDate: '2023-03-22', registeredDistrict: 'Bhaktapur', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-15T00:00:00Z' },
  { id: 'v112', passportId: 'NP-VP-00030100', type: 'MOTORBIKE', make: 'KTM', model: 'Duke 200', variant: 'ABS', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 12000, engineCC: 199.5, color: 'Orange', registrationNumber: 'BA 23 PA 4567', registrationDate: '2023-07-10', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-18T00:00:00Z' },
  { id: 'v113', passportId: 'NP-VP-00030101', type: 'MOTORBIKE', make: 'Suzuki', model: 'Gixxer SF 250', variant: 'ABS', year: 2022, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 25000, engineCC: 249, color: 'Metallic Triton Blue', registrationNumber: 'BA 34 PA 5678', registrationDate: '2022-10-15', registeredDistrict: 'Lalitpur', ownerId: 'u7', condition: 'GOOD', isEV: false, isHybrid: false, createdAt: '2024-09-20T00:00:00Z' },
  { id: 'v114', passportId: 'NP-VP-00030102', type: 'MOTORBIKE', make: 'TVS', model: 'Apache RTR 200', variant: '4V', year: 2023, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 15000, engineCC: 197.75, color: 'Racing Red', registrationNumber: 'BA 45 PA 6789', registrationDate: '2023-09-18', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-22T00:00:00Z' },
  { id: 'v115', passportId: 'NP-VP-00030103', type: 'MOTORBIKE', make: 'Hero', model: 'Xtreme 160R', variant: '4V', year: 2024, fuelType: 'PETROL', transmission: 'MANUAL', bodyStyle: 'MOTORCYCLE', mileage: 8000, engineCC: 163, color: 'Sports Red', registrationNumber: 'BA 56 PA 7890', registrationDate: '2024-02-10', registeredDistrict: 'Pokhara', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-25T00:00:00Z' },

  // Scooters (5 vehicles)
  { id: 'v116', passportId: 'NP-VP-00030104', type: 'SCOOTER', make: 'Honda', model: 'Activa 6G', variant: 'Deluxe', year: 2024, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SCOOTER', mileage: 5000, engineCC: 110, color: 'Matte Axis Grey', registrationNumber: 'BA 67 PA 8901', registrationDate: '2024-01-15', registeredDistrict: 'Kathmandu', ownerId: 'u7', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-09-28T00:00:00Z' },
  { id: 'v117', passportId: 'NP-VP-00030105', type: 'SCOOTER', make: 'Suzuki', model: 'Access 125', variant: 'Special Edition', year: 2023, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SCOOTER', mileage: 12000, engineCC: 124, color: 'Pearl Mirage White', registrationNumber: 'BA 78 PA 9012', registrationDate: '2023-06-10', registeredDistrict: 'Lalitpur', ownerId: 'u4', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-10-01T00:00:00Z' },
  { id: 'v118', passportId: 'NP-VP-00030106', type: 'SCOOTER', make: 'TVS', model: 'Jupiter 125', variant: 'ZX', year: 2023, fuelType: 'PETROL', transmission: 'AUTOMATIC', bodyStyle: 'SCOOTER', mileage: 15000, engineCC: 124.8, color: 'Royal Purple', registrationNumber: 'BA 89 PA 0123', registrationDate: '2023-08-20', registeredDistrict: 'Kathmandu', ownerId: 'u2', condition: 'EXCELLENT', isEV: false, isHybrid: false, createdAt: '2024-10-03T00:00:00Z' },
  { id: 'v119', passportId: 'NP-VP-00030107', type: 'SCOOTER', make: 'Bajaj', model: 'Chetak', variant: 'Premium', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SCOOTER', mileage: 3000, color: 'Brook Green', registrationNumber: 'GA 67 PA 8901', registrationDate: '2024-03-15', registeredDistrict: 'Pokhara', ownerId: 'u7', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 99, batteryCapacity: 3.2, createdAt: '2024-10-05T00:00:00Z' },
  { id: 'v120', passportId: 'NP-VP-00030108', type: 'SCOOTER', make: 'Ola', model: 'S1 Pro', variant: 'Gen 2', year: 2024, fuelType: 'ELECTRIC', transmission: 'AUTOMATIC', bodyStyle: 'SCOOTER', mileage: 2000, color: 'Midnight Blue', registrationNumber: 'GA 78 PA 9012', registrationDate: '2024-04-20', registeredDistrict: 'Kathmandu', ownerId: 'u4', condition: 'EXCELLENT', isEV: true, isHybrid: false, batterySOH: 100, batteryCapacity: 4, createdAt: '2024-10-08T00:00:00Z' },
];

// Generate listings for all extended vehicles
export const extendedListings: Listing[] = extendedVehicles.map((vehicle, index) => ({
  id: `l${index + 12}`, // Starting from l12 since we already have l1-l11
  vehicleId: vehicle.id,
  sellerId: vehicle.ownerId,
  title: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} - ${vehicle.condition.toLowerCase()} condition`,
  description: `Well-maintained ${vehicle.year} ${vehicle.make} ${vehicle.model} with ${formatMileage(vehicle.mileage)} on the odometer. ${vehicle.isEV ? 'Electric vehicle with excellent battery health.' : `${vehicle.fuelType.toLowerCase()} engine with ${vehicle.transmission.toLowerCase()} transmission.`} ${vehicle.condition === 'EXCELLENT' ? 'In excellent condition with full service history.' : 'Good condition with regular maintenance.'} Located in ${vehicle.registeredDistrict || 'Nepal'}. All documents clear and ready for transfer.`,
  price: calculatePrice(vehicle),
  negotiable: Math.random() > 0.3,
  location: getRandomLocation(vehicle.registeredDistrict || 'Kathmandu'),
  district: vehicle.registeredDistrict || 'Kathmandu',
  images: [getVehicleImage(vehicle.make, vehicle.model)],
  status: 'ACTIVE',
  isFeatured: Math.random() > 0.7,
  isInspected: Math.random() > 0.4,
  hasPassport: true,
  views: Math.floor(Math.random() * 3000) + 100,
  favourites: Math.floor(Math.random() * 200) + 10,
  enquiries: Math.floor(Math.random() * 50) + 5,
  createdAt: vehicle.createdAt,
  updatedAt: vehicle.createdAt,
  expiresAt: new Date(new Date(vehicle.createdAt).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
}));

// Generate passports for all extended vehicles
export const extendedPassports: VehiclePassport[] = extendedVehicles.map(vehicle => ({
  id: `vp${vehicle.id.replace('v', '')}`,
  passportId: vehicle.passportId,
  vehicleId: vehicle.id,
  status: 'ACTIVE',
  issuedDate: vehicle.registrationDate || vehicle.createdAt.split('T')[0],
  lastInspectionDate: Math.random() > 0.5 ? new Date(new Date(vehicle.createdAt).getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
  ownershipHistory: [
    {
      id: `oh${vehicle.id}`,
      ownerId: vehicle.ownerId,
      ownerName: getUserById(vehicle.ownerId)?.fullName || 'Unknown',
      startDate: vehicle.registrationDate || vehicle.createdAt.split('T')[0],
      isCurrent: true,
      verificationSource: 'DOCUMENT_CHECKED',
    },
  ],
  odometerHistory: [
    {
      id: `od${vehicle.id}`,
      mileage: vehicle.mileage,
      date: new Date().toISOString().split('T')[0],
      source: 'PHYSICALLY_VERIFIED',
      verifier: 'Anil Karki',
      confidence: 'HIGH',
    },
  ],
  inspectionHistory: Math.random() > 0.5 ? [`ins${vehicle.id}`] : [],
  serviceHistory: [],
  documentVerifications: [
    {
      id: `dv${vehicle.id}`,
      documentType: 'Bluebook',
      status: 'VERIFIED',
      verificationSource: 'DOCUMENT_CHECKED',
      verifiedBy: 'System',
      verifiedDate: vehicle.registrationDate || vehicle.createdAt.split('T')[0],
    },
  ],
  riskFlags: [],
  qrCode: `VP-${vehicle.passportId}-QR`,
}));

// Helper functions
function calculatePrice(vehicle: Vehicle): number {
  const basePrices: Record<string, number> = {
    'Toyota': 3000000,
    'Hyundai': 2500000,
    'Honda': 2800000,
    'Maruti Suzuki': 1500000,
    'Tata': 2000000,
    'Kia': 2700000,
    'MG': 2600000,
    'BYD': 4500000,
    'Royal Enfield': 400000,
    'Yamaha': 350000,
    'Bajaj': 250000,
    'Suzuki': 280000,
    'TVS': 220000,
    'Hero': 200000,
    'KTM': 450000,
    'Ola': 150000,
  };

  let price = basePrices[vehicle.make] || 2000000;
  
  // Adjust for year
  const currentYear = new Date().getFullYear();
  const age = currentYear - vehicle.year;
  price *= Math.max(0.5, 1 - (age * 0.08));
  
  // Adjust for mileage
  price *= Math.max(0.7, 1 - (vehicle.mileage / 500000));
  
  // Adjust for condition
  if (vehicle.condition === 'EXCELLENT') price *= 1.1;
  else if (vehicle.condition === 'FAIR') price *= 0.85;
  
  // EV premium
  if (vehicle.isEV) price *= 1.2;
  
  return Math.round(price / 10000) * 10000; // Round to nearest 10k
}

function getRandomLocation(district: string): string {
  const locations: Record<string, string[]> = {
    'Kathmandu': ['Baneshwor', 'Kalanki', 'Baluwatar', 'Thamel', 'Boudha', 'Jorpati'],
    'Lalitpur': ['Pulchowk', 'Sanepa', 'Jhamsikhel', 'Ekantakuna', 'Kumaripati'],
    'Bhaktapur': ['Madhyapur Thimi', 'Suryabinayak', 'Koteshwor', 'Bhaktapur Durbar Square'],
    'Pokhara': ['Lakeside', 'Mahendrapul', 'New Road', 'Prithvi Chowk'],
  };
  
  const districtLocations = locations[district] || ['City Center'];
  return districtLocations[Math.floor(Math.random() * districtLocations.length)];
}

function getVehicleImage(make: string, model: string): string {
  // Return a placeholder image URL based on vehicle type
  const imageMap: Record<string, string> = {
    'Toyota': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e9fb?w=800',
    'Hyundai': 'https://images.unsplash.com/photo-1614200187524-dc4b010773ae?w=800',
    'Honda': 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    'Maruti Suzuki': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    'Tata': 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    'Kia': 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800',
    'MG': 'https://images.unsplash.com/photo-1617788138016-969c19ba27bb?w=800',
    'BYD': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    'Royal Enfield': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
    'Yamaha': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
    'Bajaj': 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800',
    'Suzuki': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
    'TVS': 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800',
    'Hero': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
    'KTM': 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800',
    'Ola': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
  };
  
  return imageMap[make] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';
}

function formatMileage(km: number): string {
  return `${km.toLocaleString()} km`;
}

function getUserById(id: string): any {
  // Import from main data file - will be resolved at runtime
  return { fullName: 'User ' + id };
}
