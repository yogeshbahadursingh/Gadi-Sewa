import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Heart, Eye } from 'lucide-react';
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
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-obsidian mb-8">Browse Vehicles</h1>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search vehicles..."
                  className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              >
                <option value="">All Categories</option>
                <option value="car">Cars</option>
                <option value="suv">SUVs</option>
                <option value="motorcycle">Motorcycles</option>
                <option value="scooter">Scooters</option>
                <option value="electric">Electric</option>
              </select>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-obsidian text-ivory font-medium rounded-xl hover:bg-obsidian-light transition-colors">
                <Filter className="w-5 h-5" />
                More Filters
              </button>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-obsidian/70">Loading vehicles...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
              <Search className="w-16 h-16 text-obsidian/20 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-obsidian mb-2">No vehicles found</h3>
              <p className="text-obsidian/70">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/vehicle/${vehicle.id}`}
                    className="block bg-white rounded-2xl shadow-soft overflow-hidden card-premium"
                  >
                    <div className="aspect-[4/3] bg-ivory-dark relative">
                      {vehicle.images && vehicle.images.length > 0 ? (
                        <img
                          src={vehicle.images[0].url}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                          <Eye className="w-16 h-16" />
                        </div>
                      )}
                      {vehicle.hasPassport && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-emerald text-ivory text-xs font-semibold rounded-full">
                          ✓ Passport Verified
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-obsidian mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.variant && (
                        <p className="text-sm text-obsidian/70 mb-2">{vehicle.variant}</p>
                      )}
                      <p className="text-2xl font-bold text-obsidian mb-3">
                        {formatPrice(vehicle.price)}
                      </p>
                      <div className="flex items-center justify-between text-sm text-obsidian/70">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {vehicle.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {vehicle.views}
                        </span>
                      </div>
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
