import { z } from 'zod';

export const createVehicleSchema = z.object({
  category: z.enum(['CAR', 'SUV', 'MOTORCYCLE', 'SCOOTER', 'ELECTRIC_CAR', 'ELECTRIC_BIKE', 'ELECTRIC_SCOOTER', 'VAN', 'TRUCK', 'BUS']),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  variant: z.string().optional(),
  year: z.number().int().min(1900).max(2030),
  price: z.number().int().min(0, 'Price must be positive'),
  negotiable: z.boolean().default(false),
  mileage: z.number().int().min(0).optional(),
  fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'CNG', 'LPG']).optional(),
  transmission: z.enum(['MANUAL', 'AUTOMATIC', 'CVT']).optional(),
  engineCC: z.number().int().min(0).optional(),
  province: z.string().min(1, 'Province is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  description: z.string().optional(),
  condition: z.enum(['NEW', 'LIKE_NEW', 'EXCELLENT', 'VERY_GOOD', 'GOOD', 'FAIR', 'POOR']).optional(),
  images: z.array(z.object({
    url: z.string().url(),
    order: z.number().int().default(0),
    isPrimary: z.boolean().default(false)
  })).optional()
});

export const updateVehicleSchema = createVehicleSchema.partial();

export const vehicleFilterSchema = z.object({
  category: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  minPrice: z.number().int().optional(),
  maxPrice: z.number().int().optional(),
  minYear: z.number().int().optional(),
  maxYear: z.number().int().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  condition: z.string().optional(),
  hasPassport: z.boolean().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['newest', 'price_asc', 'price_desc', 'year_desc', 'mileage_asc']).default('newest'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20)
});
