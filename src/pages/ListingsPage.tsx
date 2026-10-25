import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Heart, Eye, Car, Shield, Star, TrendingUp } from 'lucide-react';
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
          <div className="card-luxury p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-gold" />
              <h2 className="font-display text-xl font-bold text-obsidian">Filter Vehicles</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by make, model, or keyword..."
                  className="input-luxury w-full pl-12 pr-4 py-4 rounded-xl text-base"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-luxury px-4 py-4 rounded-xl text-base"
              >
                <option value="">All Categories</option>
                <option value="car">Cars</option>
                <option value="suv">SUVs</option>
                <option value="motorcycle">Motorcycles</option>
                <option value="scooter">Scooters</option>
                <option value="electric">Electric</option>
              </select>
              <button className="btn-luxury btn-obsidian px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filters
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
                <Link
                  key={vehicle.id}
                  to={`/vehicle/${vehicle.id}`}
                  className="block card-luxury overflow-hidden group"
                >
                  {/* Image Section */}
                  <div className="aspect-[4/3] bg-obsidian/5 relative overflow-hidden">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <img
                        src={vehicle.images[0].url}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                        <Car className="w-20 h-20" />
                      </div>
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {vehicle.hasPassport && (
                        <span className="badge-luxury badge-emerald text-xs">
                          <Shield className="w-3 h-3" />
                          Passport Verified
                        </span>
                      )}
                      {vehicle.featured && (
                        <span className="badge-luxury badge-gold text-xs">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-3xl font-bold text-ivory text-luxury">
                        {formatPrice(vehicle.price)}
                      </p>
                      {vehicle.negotiable && (
                        <p className="text-xs text-ivory/80 mt-1">Negotiable</p>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-obsidian mb-2 group-hover:text-gradient-gold transition-all duration-300">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    {vehicle.variant && (
                      <p className="text-sm text-obsidian/60 mb-3">{vehicle.variant}</p>
                    )}
                    
                    {/* Specs */}
                    <div className="flex items-center gap-4 text-sm text-obsidian/70 mb-4">
                      {vehicle.mileage && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {vehicle.mileage.toLocaleString()} km
                        </span>
                      )}
                      {vehicle.fuelType && (
                        <span>{vehicle.fuelType}</span>
                      )}
                    </div>

                    {/* Location & Views */}
                    <div className="flex items-center justify-between pt-4 border-t border-obsidian/5">
                      <span className="flex items-center gap-1.5 text-sm text-obsidian/60">
                        <MapPin className="w-4 h-4" />
                        {vehicle.city}, {vehicle.province}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-obsidian/60">
                        <Eye className="w-4 h-4" />
                        {vehicle.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
