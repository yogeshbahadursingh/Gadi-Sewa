import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Heart, Eye, Car, Shield, Star, TrendingUp, Fuel } from 'lucide-react';
import { api, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  useEffect(() => {
    loadVehicles();
  }, [category, search]);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (category) filters.category = category;
      if (search) filters.search = search;
      
      const data = await api.getAllVehicles(filters);
      setVehicles(data.vehicles);
    } catch (error) {
      console.error('Failed to load vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `रू ${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `रू ${(price / 100000).toFixed(2)} Lakh`;
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  return (
    <main className="min-h-screen bg-ivory">
      {/* Premium Header */}
      <section className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        <div className="container-luxury relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-luxury badge-gold mb-4 inline-flex">
              Vehicle Marketplace
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              Discover Your Perfect
              <span className="block text-gradient-gold mt-2">Vehicle</span>
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Browse {vehicles.length} verified vehicles across Nepal with independent inspections and transparent histories.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Premium Filter Section */}
          <div className="card-luxury p-6 md:p-8 mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-gold" />
              <h2 className="font-display text-xl font-bold text-obsidian">Filter Vehicles</h2>
            </div>
            
            {/* Mobile: Stacked, Desktop: Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search vehicles..."
                  className="input-luxury w-full pl-12 pr-4 py-3 md:py-4 rounded-xl text-sm md:text-base min-h-[44px]"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-luxury px-4 py-3 md:py-4 rounded-xl text-sm md:text-base min-h-[44px]"
              >
                <option value="">All Categories</option>
                <option value="car">Cars</option>
                <option value="suv">SUVs</option>
                <option value="motorcycle">Motorcycles</option>
                <option value="scooter">Scooters</option>
                <option value="electric">Electric</option>
              </select>
              <button className="btn-luxury btn-obsidian px-6 py-3 md:py-4 rounded-xl font-medium flex items-center justify-center gap-2 min-h-[44px]">
                <Filter className="w-5 h-5" />
                <span className="hidden md:inline">Advanced Filters</span>
                <span className="md:hidden">Filters</span>
              </button>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-obsidian mb-1">
                {vehicles.length} {vehicles.length === 1 ? 'Vehicle' : 'Vehicles'} Found
              </h2>
              <p className="text-obsidian/60 text-sm">
                {category && `Filtered by: ${category}`}
                {search && ` • Search: "${search}"`}
              </p>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-luxury overflow-hidden">
                  <div className="aspect-[4/3] skeleton"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 skeleton rounded"></div>
                    <div className="h-4 skeleton rounded w-2/3"></div>
                    <div className="h-8 skeleton rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="card-luxury p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-obsidian/20" />
              </div>
              <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No vehicles found</h3>
              <p className="text-obsidian/70 mb-6">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => { setSearch(''); setCategory(''); }}
                className="btn-luxury btn-gold px-6 py-3 rounded-full font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to={`/vehicle/${vehicle.id}`}
                    className="block group relative"
                  >
                    {/* Premium Card Container */}
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-ultra transition-all duration-500 border border-obsidian/5 group-hover:border-gold/20">
                      
                      {/* Image Section - Editorial Style */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-obsidian/5 to-obsidian/10">
                        {vehicle.images && vehicle.images.length > 0 ? (
                          <img
                            src={vehicle.images[0].url}
                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-obsidian/10 to-obsidian/20">
                            <Car className="w-20 h-20 text-obsidian/20" />
                          </div>
                        )}
                        
                        {/* Sophisticated Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent opacity-90"></div>
                        
                        {/* Premium Badges - Top Left */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {vehicle.hasPassport && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className="flex items-center gap-2 px-3 py-1.5 bg-emerald/95 backdrop-blur-md rounded-full border border-emerald-light/30 shadow-lg"
                            >
                              <Shield className="w-3.5 h-3.5 text-ivory" />
                              <span className="text-xs font-bold text-ivory tracking-wide">VERIFIED</span>
                            </motion.div>
                          )}
                          {vehicle.featured && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gold to-gold-dark rounded-full shadow-lg"
                            >
                              <Star className="w-3.5 h-3.5 text-obsidian" />
                              <span className="text-xs font-bold text-obsidian tracking-wide">FEATURED</span>
                            </motion.div>
                          )}
                        </div>

                        {/* Favourite Button - Top Right */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // TODO: Implement favourite toggle
                          }}
                          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:scale-110 transition-all duration-300 group/fav"
                        >
                          <Heart className="w-5 h-5 text-obsidian/40 group-hover/fav:text-red-500 transition-colors" />
                        </button>

                        {/* Price Section - Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-xs text-ivory/60 uppercase tracking-wider mb-1">Price</p>
                              <p className="text-3xl font-bold text-ivory leading-none">
                                {formatPrice(vehicle.price)}
                              </p>
                              {vehicle.negotiable && (
                                <p className="text-xs text-ivory/70 mt-1.5 font-medium">✓ Negotiable</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section - Refined Typography */}
                      <div className="p-6">
                        {/* Vehicle Title */}
                        <div className="mb-4">
                          <h3 className="font-display text-2xl font-bold text-obsidian mb-1 leading-tight group-hover:text-gradient-gold transition-all duration-300">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          {vehicle.variant && (
                            <p className="text-sm text-obsidian/60 font-medium">{vehicle.variant}</p>
                          )}
                        </div>
                        
                        {/* Specifications Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {vehicle.mileage && (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-obsidian/5 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-gold" />
                              </div>
                              <div>
                                <p className="text-xs text-obsidian/50 uppercase tracking-wider">Mileage</p>
                                <p className="text-sm font-semibold text-obsidian">{vehicle.mileage.toLocaleString()} km</p>
                              </div>
                            </div>
                          )}
                          {vehicle.fuelType && (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-obsidian/5 rounded-lg flex items-center justify-center">
                                <Fuel className="w-4 h-4 text-gold" />
                              </div>
                              <div>
                                <p className="text-xs text-obsidian/50 uppercase tracking-wider">Fuel</p>
                                <p className="text-sm font-semibold text-obsidian">{vehicle.fuelType}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Location & Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-obsidian/5">
                          <div className="flex items-center gap-2 text-obsidian/60">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">{vehicle.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-obsidian/50">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{vehicle.views} views</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-gold/0 group-hover:border-gold/20 transition-all duration-500 pointer-events-none"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
