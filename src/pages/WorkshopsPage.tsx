import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Phone, Filter, X } from 'lucide-react';
import { api, Workshop } from '../services/api';
import { initializeSampleWorkshops } from '../data/workshops';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    initializeSampleWorkshops();
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    try {
      const data = await api.getWorkshops({
        province: selectedProvince || undefined,
        service: selectedService || undefined,
        search: searchQuery || undefined
      });
      setWorkshops(data);
    } catch (error) {
      console.error('Failed to load workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, [selectedProvince, selectedService, searchQuery]);

  const provinces = ['Bagmati', 'Gandaki', 'Lumbini', 'Koshi', 'Madhesh', 'Karnali', 'Sudurpashchim'];
  const services = ['Oil Change', 'Brake Service', 'Tire Service', 'Engine Repair', 'AC Service', 'Electrical Work', 'Battery Replacement', 'General Maintenance'];

  const clearFilters = () => {
    setSelectedProvince('');
    setSelectedService('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedProvince || selectedService || searchQuery;

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-obsidian">Find a Workshop</h1>
          <p className="text-slate-warm mt-2">Discover trusted automotive service centers across Nepal</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-warm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workshops by name or location..."
                className="w-full pl-12 pr-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-emerald transition-colors lg:hidden"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2">Province</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                >
                  <option value="">All Provinces</option>
                  {provinces.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2">Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                >
                  <option value="">All Services</option>
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-sm text-slate-warm">
            {loading ? 'Loading...' : `${workshops.length} workshop${workshops.length !== 1 ? 's' : ''} found`}
          </p>
        </motion.div>

        {/* Workshops Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-obsidian/[0.04] overflow-hidden">
                <div className="h-48 bg-ivory-dark animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-ivory-dark rounded animate-pulse" />
                  <div className="h-4 bg-ivory-dark rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-ivory-dark rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : workshops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center"
          >
            <Search className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No workshops found</h3>
            <p className="text-slate-warm mb-6">Try adjusting your filters or search terms</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/workshops/${workshop.id}`}
                  className="block bg-white rounded-2xl border border-obsidian/[0.04] overflow-hidden hover:shadow-[var(--shadow-elevated)] transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="h-48 bg-ivory-dark overflow-hidden">
                    {workshop.logo ? (
                      <img
                        src={workshop.logo}
                        alt={workshop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                        <MapPin className="w-16 h-16" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display text-lg font-semibold text-obsidian group-hover:text-emerald transition-colors line-clamp-1">
                        {workshop.name}
                      </h3>
                      {workshop.verified && (
                        <span className="px-2 py-0.5 bg-emerald/10 text-emerald text-xs font-medium rounded-full flex-shrink-0">
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-warm line-clamp-2 mb-3">
                      {workshop.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-slate-warm mb-3">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{workshop.city}, {workshop.district}</span>
                    </div>

                    {/* Rating */}
                    {workshop.averageRating && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-gold text-gold" />
                          <span className="text-sm font-semibold text-obsidian">
                            {workshop.averageRating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-xs text-slate-warm">
                          ({workshop.totalReviews} review{workshop.totalReviews !== 1 ? 's' : ''})
                        </span>
                      </div>
                    )}

                    {/* Services */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {workshop.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="px-2 py-0.5 bg-ivory-dark text-obsidian/70 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {workshop.services.length > 3 && (
                        <span className="px-2 py-0.5 text-obsidian/50 text-xs">
                          +{workshop.services.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-2 text-sm text-obsidian/70 pt-3 border-t border-obsidian/[0.04]">
                      <Phone className="w-4 h-4" />
                      <span>{workshop.phone}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
