import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { searchService } from '../services/search.service';

class SearchController {
  // Search vehicles and listings
  search = asyncHandler(async (req: Request, res: Response) => {
    const {
      q,
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
      page = '1',
      limit = '10',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const result = await searchService.search({
      query: q as string,
      make: make as string,
      model: model as string,
      year: year ? Number(year) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      fuelType: fuelType as string,
      transmission: transmission as string,
      district: district as string,
      isEV: isEV === 'true',
      isInspected: isInspected === 'true',
      hasPassport: hasPassport === 'true',
      page: Number(page),
      limit: Number(limit),
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get search suggestions
  getSuggestions = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;

    const suggestions = await searchService.getSuggestions(q as string);

    res.status(200).json({
      success: true,
      data: suggestions,
    });
  });
}

export const searchController = new SearchController();
