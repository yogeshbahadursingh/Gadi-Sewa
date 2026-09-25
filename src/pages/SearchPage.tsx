import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Heart, CheckCircle2, Zap, X, ChevronDown, Grid3X3, List } from 'lucide-react';
import { listings, vehicles, formatPrice, formatMileage, getVehicleById, districts, makes } from '../store/data';
import { SearchFilters } from '../types';
import { useAppState } from '../context/AppContext';
import { Badge } from '../components/Layout';
import { ListingCardSkeleton } from '../components/Skeleton';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, toggleFavorite } = useAppState();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    vehicleType: searchParams.get('type') as any || undefined,
    isEV: searchParams.get('ev') === 'true' ? true : undefined,
    district: '',
    make: '',
    priceMin: undefined,
    priceMax: undefined,
    yearMin: undefined,
    yearMax: undefined,
    fuelType: undefined,
    transmission: undefined,
    sortBy: 'newest',
  });

  const filteredListings = useMemo(() => {
    let results = listings.filter(l => l.status === 'ACTIVE');

    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        if (!v) return false;
        return l.title.toLowerCase().includes(q) ||
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.variant.toLowerCase().includes(q);
      });
    }

    if (filters.vehicleType) {
      const typeMap: Record<string, string> = { car: 'CAR', motorbike: 'MOTORBIKE', scooter: 'SCOOTER', ev: 'CAR' };
      const vType = filters.vehicleType as string;
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        if (!v) return false;
        if (vType === 'ev') return v.isEV;
        return v.type === typeMap[vType];
      });
    }

    if (filters.isEV) {
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        return v?.isEV;
      });
    }

    if (filters.district) {
      results = results.filter(l => l.district === filters.district);
    }

    if (filters.make) {
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        return v?.make === filters.make;
      });
    }

    if (filters.priceMin) {
      results = results.filter(l => l.price >= filters.priceMin!);
    }
    if (filters.priceMax) {
      results = results.filter(l => l.price <= filters.priceMax!);
    }

    if (filters.yearMin) {
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        return v && v.year >= filters.yearMin!;
      });
    }
    if (filters.yearMax) {
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        return v && v.year <= filters.yearMax!;
      });
    }

    if (filters.fuelType) {
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        return v?.fuelType === filters.fuelType;
      });
    }

    if (filters.transmission) {
      results = results.filter(l => {
        const v = getVehicleById(l.vehicleId);
        return v?.transmission === filters.transmission;
      });
    }

    if (filters.isInspected) {
      results = results.filter(l => l.isInspected);
    }

    if (filters.hasPassport) {
      results = results.filter(l => l.hasPassport);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price_asc': results.sort((a, b) => a.price - b.price); break;
      case 'price_desc': results.sort((a, b) => b.price - a.price); break;
      case 'year_desc': results.sort((a, b) => {
        const va = getVehicleById(a.vehicleId); const vb = getVehicleById(b.vehicleId);
        return (vb?.year || 0) - (va?.year || 0);
      }); break;
      case 'mileage_asc': results.sort((a, b) => {
        const va = getVehicleById(a.vehicleId); const vb = getVehicleById(b.vehicleId);
        return (va?.mileage || 0) - (vb?.mileage || 0);
      }); break;
      case 'newest': default: results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }

    return results;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredListings.slice(startIndex, endIndex);
  }, [filteredListings, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const updateFilter = (key: string, value: any) => {
    setFilters((prev: SearchFilters) => ({ ...prev, [key]: value || undefined }));
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'newest' });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined && v !== '' && v !== 'newest').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <SEO
        title="Search Vehicles in Nepal"
        description="Search thousands of verified cars, motorcycles, and electric vehicles in Nepal. Filter by make, model, price, location, and more. Find your perfect vehicle on GadiBazar."
        keywords="search cars Nepal, find vehicles Nepal, car search, vehicle finder, used cars search"
        canonical="https://gadibazar.com/search"
        noindex={true}
        nofollow={true}
      />
      {/* Search header */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={filters.query || ''}
            onChange={e => updateFilter('query', e.target.value)}
            className="w-full py-3 text-gray-900 placeholder-gray-400 outline-none text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
        </button>
        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={e => updateFilter('sortBy', e.target.value)}
            className="py-3 px-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="year_desc">Year: Newest</option>
            <option value="mileage_asc">Mileage: Lowest</option>
          </select>
          <div className="hidden md:flex border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-3 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}><Grid3X3 className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-3 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700">Clear all</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Location</label>
              <select value={filters.district || ''} onChange={e => updateFilter('district', e.target.value)} className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none">
                <option value="">All Districts</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Make</label>
              <select value={filters.make || ''} onChange={e => updateFilter('make', e.target.value)} className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none">
                <option value="">All Makes</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Min Price (Rs.)</label>
              <input type="number" placeholder="0" value={filters.priceMin || ''} onChange={e => updateFilter('priceMin', Number(e.target.value))} className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Max Price (Rs.)</label>
              <input type="number" placeholder="Any" value={filters.priceMax || ''} onChange={e => updateFilter('priceMax', Number(e.target.value))} className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Fuel Type</label>
              <select value={filters.fuelType || ''} onChange={e => updateFilter('fuelType', e.target.value || undefined)} className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none">
                <option value="">All</option>
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Year</label>
              <div className="flex gap-1">
                <input type="number" placeholder="From" value={filters.yearMin || ''} onChange={e => updateFilter('yearMin', Number(e.target.value))} className="w-full py-2 px-2 border border-gray-200 rounded-lg text-sm outline-none" />
                <input type="number" placeholder="To" value={filters.yearMax || ''} onChange={e => updateFilter('yearMax', Number(e.target.value))} className="w-full py-2 px-2 border border-gray-200 rounded-lg text-sm outline-none" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={filters.isEV || false} onChange={e => updateFilter('isEV', e.target.checked || undefined)} className="rounded border-gray-300 text-blue-600" />
              Electric Only
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={filters.isInspected || false} onChange={e => updateFilter('isInspected', e.target.checked || undefined)} className="rounded border-gray-300 text-blue-600" />
              Inspected Only
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={filters.hasPassport || false} onChange={e => updateFilter('hasPassport', e.target.checked || undefined)} className="rounded border-gray-300 text-blue-600" />
              Has Passport
            </label>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {isLoading ? 'Loading...' : `${filteredListings.length} vehicles found`}
        </p>
        {!isLoading && (
          <Link to="/saved-searches" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            Save this search
          </Link>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No vehicles found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms</p>
          <button onClick={clearFilters} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">Clear all filters</button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedListings.map(listing => {
            const vehicle = getVehicleById(listing.vehicleId);
            if (!vehicle) return null;
            const isFav = state.favorites.includes(listing.id);
            return (
              <div key={listing.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Link to={`/listing/${listing.id}`}>
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <button onClick={() => toggleFavorite(listing.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {listing.isInspected && <span className="bg-green-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5"><CheckCircle2 className="w-2.5 h-2.5" /> Inspected</span>}
                    {vehicle.isEV && <span className="bg-emerald-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5"><Zap className="w-2.5 h-2.5" /> EV</span>}
                  </div>
                </div>
                <Link to={`/listing/${listing.id}`} className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 text-sm">{listing.title}</h3>
                  <p className="text-lg font-bold text-blue-600 mt-1.5">{formatPrice(listing.price)}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{listing.district}</span>
                    <span>•</span>
                    <span>{formatMileage(vehicle.mileage)}</span>
                    <span>•</span>
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Badge>{vehicle.fuelType}</Badge>
                    <Badge>{vehicle.transmission}</Badge>
                    {vehicle.batterySOH && <Badge variant="success">SOH {vehicle.batterySOH}%</Badge>}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedListings.map(listing => {
            const vehicle = getVehicleById(listing.vehicleId);
            if (!vehicle) return null;
            const isFav = state.favorites.includes(listing.id);
            return (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="flex bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="w-48 md:w-64 aspect-[16/10] md:aspect-auto bg-gray-100 flex-shrink-0">
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{listing.title}</h3>
                      <button onClick={(e) => { e.preventDefault(); toggleFavorite(listing.id); }} className="ml-2">
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <p className="text-lg font-bold text-blue-600 mt-1">{formatPrice(listing.price)}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.district}</span>
                      <span>{formatMileage(vehicle.mileage)}</span>
                      <span>{vehicle.year}</span>
                      <span>{vehicle.fuelType}</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {listing.isInspected && <Badge variant="success">Inspected</Badge>}
                    {listing.hasPassport && <Badge variant="info">Passport</Badge>}
                    {vehicle.batterySOH && <Badge variant="success">SOH {vehicle.batterySOH}%</Badge>}
                    {listing.negotiable && <Badge variant="warning">Negotiable</Badge>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && filteredListings.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
