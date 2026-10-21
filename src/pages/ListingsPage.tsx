import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, X, ArrowUpDown, ShieldCheck, Grid3X3, List
} from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import { vehicles as mockVehicles, brands, provinces, categories, Vehicle as MockVehicle } from '../data/vehicles';
import { api, Vehicle as ApiVehicle } from '../services/api';

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [userVehicles, setUserVehicles] = useState<ApiVehicle[]>([]);
  const [loadingUserVehicles, setLoadingUserVehicles] = useState(true);

  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    province: '',
    brand: '',
    priceMin: '',
    priceMax: '',
    fuelType: '',
    transmission: '',
    passport: searchParams.get('passport') || '',
  });

  // Load user-created vehicles
  useEffect(() => {
    const loadUserVehicles = async () => {
      setLoadingUserVehicles(true);
      try {
        const data = await api.getAllVehicles({});
        setUserVehicles(data.vehicles || []);
      } catch (error) {
        console.error('Failed to load user vehicles:', error);
      } finally {
        setLoadingUserVehicles(false);
      }
    };
    loadUserVehicles();
  }, []);

  // Load passport data from localStorage
  const [passportData, setPassportData] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load passports from localStorage
    const passports = JSON.parse(localStorage.getItem('gadi_sewa_passports') || '[]');
    const passportMap: Record<string, boolean> = {};
    passports.forEach((p: any) => {
      if (p.status === 'PUBLISHED') {
        passportMap[p.vehicleId] = true;
      }
    });
    setPassportData(passportMap);
  }, []);

  // Combine mock data with user vehicles
  const allVehicles = useMemo(() => {
    // Convert user vehicles to match mock vehicle format
    const convertedUserVehicles: MockVehicle[] = userVehicles.map(v => ({
      id: v.id,
      title: `${v.year} ${v.make} ${v.model}`,
      make: v.make,
      model: v.model,
      variant: v.variant || '',
      year: v.year,
      category: v.category.toLowerCase() as any,
      price: v.price,
      negotiable: v.negotiable,
      location: {
        province: v.province,
        district: v.district,
        city: v.city
      },
      mileage: v.mileage || 0,
      fuelType: v.fuelType || 'PETROL',
      transmission: v.transmission || 'MANUAL',
      engineCC: v.engineCC,
      condition: v.condition || 'GOOD',
      sellerType: 'individual' as const,
      sellerName: v.seller ? `${v.seller.firstName} ${v.seller.lastName}` : 'Unknown',
      images: v.images.length > 0 ? v.images.map((img: any) => img.url) : ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'],
      hasPassport: passportData[v.id] || false,
      passportId: passportData[v.id] ? `passport_${v.id}` : undefined,
      postedDate: v.createdAt,
      featured: v.featured,
      description: v.description || '',
      keyFeatures: []
    }));
    
    // Override mock vehicle passport status with computed data (without mutating original)
    const updatedMockVehicles = mockVehicles.map(v => {
      const computedPassport = passportData[v.id];
      if (computedPassport !== undefined) {
        return { ...v, hasPassport: computedPassport };
      }
      return v;
    });
    
    return [...updatedMockVehicles, ...convertedUserVehicles];
  }, [userVehicles, passportData]);

  const filteredVehicles = useMemo(() => {
    let result = [...allVehicles];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
      );
    }
    if (filters.category) result = result.filter(v => v.category === filters.category);
    if (filters.province) result = result.filter(v => v.location.province === filters.province);
    if (filters.brand) result = result.filter(v => v.make === filters.brand);
    if (filters.fuelType) result = result.filter(v => v.fuelType.toLowerCase() === filters.fuelType.toLowerCase());
    if (filters.transmission) result = result.filter(v => v.transmission.toLowerCase() === filters.transmission.toLowerCase());
    if (filters.priceMin) result = result.filter(v => v.price >= Number(filters.priceMin));
    if (filters.priceMax) result = result.filter(v => v.price <= Number(filters.priceMax));
    if (filters.passport === 'yes') result = result.filter(v => v.hasPassport);
    else if (filters.passport === 'no') result = result.filter(v => !v.hasPassport);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()); break;
      case 'mileage': result.sort((a, b) => a.mileage - b.mileage); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'search') {
      if (value) searchParams.set('q', value);
      else searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '', category: '', province: '', brand: '',
      priceMin: '', priceMax: '', fuelType: '', transmission: '', passport: ''
    });
    setSearchParams({});
  };

  // Shared filter content for desktop sidebar and mobile drawer
  const FilterContent = ({ onClose }: { onClose?: () => void }) => (
    <div className={onClose ? "p-6" : "sticky top-28 bg-white rounded-2xl border border-obsidian/[0.04] p-6"}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-obsidian text-base">Filters</h3>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-gold hover:text-gold-dark font-medium">
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-obsidian/5" aria-label="Close filters">
              <X className="w-5 h-5 text-obsidian/50" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Province */}
        <div>
          <label className="text-xs font-medium text-obsidian/50 uppercase tracking-wider mb-2 block">Province</label>
          <select
            value={filters.province}
            onChange={(e) => updateFilter('province', e.target.value)}
            className="w-full px-3 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-lg text-sm outline-none focus:border-gold/40 transition-colors"
          >
            <option value="">All Provinces</option>
            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-xs font-medium text-obsidian/50 uppercase tracking-wider mb-2 block">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => updateFilter('brand', e.target.value)}
            className="w-full px-3 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-lg text-sm outline-none focus:border-gold/40 transition-colors"
          >
            <option value="">All Brands</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-xs font-medium text-obsidian/50 uppercase tracking-wider mb-2 block">Price Range (NPR)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => updateFilter('priceMin', e.target.value)}
              className="w-1/2 px-3 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-lg text-sm outline-none focus:border-gold/40 transition-colors"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => updateFilter('priceMax', e.target.value)}
              className="w-1/2 px-3 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-lg text-sm outline-none focus:border-gold/40 transition-colors"
            />
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-xs font-medium text-obsidian/50 uppercase tracking-wider mb-2 block">Fuel Type</label>
          <div className="flex flex-wrap gap-2">
            {['Petrol', 'Diesel', 'Electric'].map(fuel => (
              <button
                key={fuel}
                onClick={() => updateFilter('fuelType', filters.fuelType === fuel ? '' : fuel)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  filters.fuelType === fuel
                    ? 'bg-obsidian text-ivory'
                    : 'bg-ivory-dark text-obsidian/60 hover:bg-obsidian/5'
                }`}
              >
                {fuel}
              </button>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="text-xs font-medium text-obsidian/50 uppercase tracking-wider mb-2 block">Transmission</label>
          <div className="flex flex-wrap gap-2">
            {['Automatic', 'Manual'].map(trans => (
              <button
                key={trans}
                onClick={() => updateFilter('transmission', filters.transmission === trans ? '' : trans)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  filters.transmission === trans
                    ? 'bg-obsidian text-ivory'
                    : 'bg-ivory-dark text-obsidian/60 hover:bg-obsidian/5'
                }`}
              >
                {trans}
              </button>
            ))}
          </div>
        </div>

        {/* Passport */}
        <div>
          <label className="text-xs font-medium text-obsidian/50 uppercase tracking-wider mb-2 block">Vehicle Passport</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateFilter('passport', filters.passport === 'yes' ? '' : 'yes')}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center gap-1 ${
                filters.passport === 'yes'
                  ? 'bg-emerald text-ivory'
                  : 'bg-ivory-dark text-obsidian/60 hover:bg-obsidian/5'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              Yes
            </button>
            <button
              onClick={() => updateFilter('passport', filters.passport === 'no' ? '' : 'no')}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                filters.passport === 'no'
                  ? 'bg-obsidian text-ivory'
                  : 'bg-ivory-dark text-obsidian/60 hover:bg-obsidian/5'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-white border-b border-obsidian/[0.04]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-obsidian">
                {filters.category
                  ? categories.find(c => c.id === filters.category)?.label || 'Vehicles'
                  : 'All Vehicles'}
              </h1>
              <p className="text-sm text-slate-warm mt-1">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} found
                {filters.passport === 'yes' && ' · Passport Verified'}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <div className="flex-1 lg:w-80 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-warm pointer-events-none" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search vehicles..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                  aria-label="Search vehicles"
                />
              </div>

              {/* Filter toggle — only visible on mobile/tablet */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className={`lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeFilterCount > 0
                    ? 'bg-obsidian text-ivory'
                    : 'bg-ivory border border-obsidian/[0.06] text-obsidian hover:border-gold/30'
                }`}
                aria-label="Open filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gold text-obsidian text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-3 pr-8 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none cursor-pointer"
                  aria-label="Sort vehicles"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low–High</option>
                  <option value="price-high">Price: High–Low</option>
                  <option value="newest">Newest First</option>
                  <option value="mileage">Lowest Mileage</option>
                </select>
                <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-warm pointer-events-none" aria-hidden="true" />
              </div>

              {/* View toggle */}
              <div className="hidden lg:flex items-center bg-ivory border border-obsidian/[0.06] rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-obsidian text-ivory' : 'text-slate-warm hover:text-obsidian'}`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-obsidian text-ivory' : 'text-slate-warm hover:text-obsidian'}`}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick category pills */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => updateFilter('category', '')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                !filters.category ? 'bg-obsidian text-ivory' : 'bg-ivory-dark text-obsidian/60 hover:bg-obsidian/5'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateFilter('category', cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  filters.category === cat.id ? 'bg-obsidian text-ivory' : 'bg-ivory-dark text-obsidian/60 hover:bg-obsidian/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={() => updateFilter('passport', filters.passport === 'yes' ? '' : 'yes')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors flex items-center gap-1 ${
                filters.passport === 'yes' ? 'bg-emerald text-ivory' : 'bg-emerald/10 text-emerald hover:bg-emerald/20'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              Passport Only
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar — always visible on lg+ */}
          <aside className="hidden lg:block flex-shrink-0 w-[280px]" aria-label="Filter options">
            <FilterContent />
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {filteredVehicles.length > 0 ? (
              <div className={`grid gap-5 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredVehicles.map((vehicle, i) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-obsidian/5 flex items-center justify-center">
                  <Search className="w-7 h-7 text-obsidian/20" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No vehicles found</h3>
                <p className="text-sm text-slate-warm mb-6 max-w-sm mx-auto">Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className="absolute inset-0 bg-obsidian/50" onClick={() => setShowMobileFilters(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto"
            >
              <FilterContent onClose={() => setShowMobileFilters(false)} />
              <div className="p-6 pt-0 flex gap-3">
                <button onClick={clearFilters} className="flex-1 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors">
                  Clear All
                </button>
                <button onClick={() => setShowMobileFilters(false)} className="flex-1 py-3 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-emerald transition-colors">
                  Show {filteredVehicles.length} Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
