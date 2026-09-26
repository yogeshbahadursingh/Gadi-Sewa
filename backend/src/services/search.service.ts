import { prisma } from '../server';

interface SearchParams {
  query?: string;
  make?: string;
  model?: string;
  year?: number;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  transmission?: string;
  district?: string;
  isEV?: boolean;
  isInspected?: boolean;
  hasPassport?: boolean;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

class SearchService {
  // Search vehicles and listings
  async search(params: SearchParams) {
    const {
      query,
      make,
      model,
      year,
      minPrice,
      maxPrice,
      fuelType,
      transmission,
      district,
      isEV,
      isInspected,
      hasPassport,
      page,
      limit,
      sortBy,
      sortOrder,
    } = params;

    const skip = (page - 1) * limit;

    const where: any = {
      status: 'ACTIVE',
    };

    // Text search
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { vehicle: { make: { contains: query, mode: 'insensitive' } } },
        { vehicle: { model: { contains: query, mode: 'insensitive' } } },
        { vehicle: { variant: { contains: query, mode: 'insensitive' } } },
      ];
    }

    // Filter by make
    if (make) {
      where.vehicle = {
        ...where.vehicle,
        make: { contains: make, mode: 'insensitive' },
      };
    }

    // Filter by model
    if (model) {
      where.vehicle = {
        ...where.vehicle,
        model: { contains: model, mode: 'insensitive' },
      };
    }

    // Filter by year
    if (year) {
      where.vehicle = {
        ...where.vehicle,
        year,
      };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = minPrice;
      }
      if (maxPrice) {
        where.price.lte = maxPrice;
      }
    }

    // Filter by fuel type
    if (fuelType) {
      where.vehicle = {
        ...where.vehicle,
        fuelType,
      };
    }

    // Filter by transmission
    if (transmission) {
      where.vehicle = {
        ...where.vehicle,
        transmission,
      };
    }

    // Filter by district
    if (district) {
      where.district = { contains: district, mode: 'insensitive' };
    }

    // Filter by EV
    if (isEV !== undefined) {
      where.vehicle = {
        ...where.vehicle,
        isEV,
      };
    }

    // Filter by inspected
    if (isInspected !== undefined) {
      where.isInspected = isInspected;
    }

    // Filter by passport
    if (hasPassport !== undefined) {
      where.hasPassport = hasPassport;
    }

    // Sort
    const orderBy: any = {};
    if (sortBy === 'price') {
      orderBy.price = sortOrder;
    } else if (sortBy === 'year') {
      orderBy.vehicle = { year: sortOrder };
    } else if (sortBy === 'mileage') {
      orderBy.vehicle = { mileage: sortOrder };
    } else {
      orderBy[sortBy] = sortOrder;
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          vehicle: {
            select: {
              id: true,
              make: true,
              model: true,
              variant: true,
              year: true,
              mileage: true,
              fuelType: true,
              transmission: true,
              isEV: true,
              batterySOH: true,
            },
          },
          seller: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      }),
      prisma.listing.count({ where }),
    ]);

    return {
      listings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get search suggestions
  async getSuggestions(query: string) {
    if (!query || query.length < 2) {
      return {
        makes: [],
        models: [],
        districts: [],
      };
    }

    const [makes, models, districts] = await Promise.all([
      prisma.vehicle.findMany({
        where: {
          make: { contains: query, mode: 'insensitive' },
        },
        select: {
          make: true,
        },
        distinct: ['make'],
        take: 5,
      }),
      prisma.vehicle.findMany({
        where: {
          model: { contains: query, mode: 'insensitive' },
        },
        select: {
          model: true,
        },
        distinct: ['model'],
        take: 5,
      }),
      prisma.listing.findMany({
        where: {
          district: { contains: query, mode: 'insensitive' },
        },
        select: {
          district: true,
        },
        distinct: ['district'],
        take: 5,
      }),
    ]);

    return {
      makes: makes.map((v) => v.make),
      models: models.map((v) => v.model),
      districts: districts.map((l) => l.district),
    };
  }
}

export const searchService = new SearchService();
