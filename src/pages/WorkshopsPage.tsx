import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, Search, Wrench, Award, ArrowRight, Filter } from 'lucide-react';
import { api, Workshop } from '../services/api';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    try {
      const data = await api.getWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error('Failed to load workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkshops = workshops.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
                         w.city.toLowerCase().includes(search.toLowerCase()) ||
                         w.description?.toLowerCase().includes(search.toLowerCase());
    const matchesProvince = !selectedProvince || w.province === selectedProvince;
    const matchesService = !selectedService || w.services.includes(selectedService);
    return matchesSearch && matchesProvince && matchesService;
  });

  const provinces = [...new Set(workshops.map(w => w.province))].sort();
  const services = [...new Set(workshops.flatMap(w => w.services))].sort();

  const stats = {
    total: workshops.length,
    verified: workshops.filter(w => w.verified).length,
    avgRating: workshops.reduce((sum, w) => sum + (w.averageRating || 0), 0) / workshops.length || 0,
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
              <Wrench className="w-4 h-4" />
              Trusted Service Centers
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              Find a Workshop
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Discover verified automotive service centers across Nepal with professional mechanics and quality service
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
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-luxury p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-gold" />
                </div>
                <ArrowRight className="w-5 h-5 text-obsidian/20" />
              </div>
              <p className="text-3xl font-bold text-obsidian mb-1">{stats.total}</p>
              <p className="text-sm text-obsidian/60">Total Workshops</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-luxury p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-2xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-emerald" />
                </div>
                <ArrowRight className="w-5 h-5 text-obsidian/20" />
              </div>
              <p className="text-3xl font-bold text-obsidian mb-1">{stats.verified}</p>
              <p className="text-sm text-obsidian/60">Verified Workshops</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-luxury p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                  <Star className="w-7 h-7 text-gold" />
                </div>
                <ArrowRight className="w-5 h-5 text-obsidian/20" />
              </div>
              <p className="text-3xl font-bold text-obsidian mb-1">{stats.avgRating.toFixed(1)}</p>
              <p className="text-sm text-obsidian/60">Average Rating</p>
            </motion.div>
          </div>

          {/* Premium Filter Section */}
          <div className="card-luxury p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-gold" />
              <h2 className="font-display text-xl font-bold text-obsidian">Filter Workshops</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or location..."
                  className="input-luxury w-full pl-12 pr-4 py-4 rounded-xl text-base"
                />
              </div>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="input-luxury px-4 py-4 rounded-xl text-base"
              >
                <option value="">All Provinces</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="input-luxury px-4 py-4 rounded-xl text-base"
              >
                <option value="">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-obsidian">
              {filteredWorkshops.length} {filteredWorkshops.length === 1 ? 'Workshop' : 'Workshops'} Found
            </h2>
          </div>

          {/* Workshops Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-luxury overflow-hidden">
                  <div className="aspect-[4/3] skeleton"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 skeleton rounded"></div>
                    <div className="h-4 skeleton rounded w-2/3"></div>
                    <div className="h-4 skeleton rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredWorkshops.length === 0 ? (
            <div className="card-luxury p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-obsidian/20" />
              </div>
              <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No workshops found</h3>
              <p className="text-obsidian/70 mb-6">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => { setSearch(''); setSelectedProvince(''); setSelectedService(''); }}
                className="btn-luxury btn-gold px-6 py-3 rounded-full font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {filteredWorkshops.map((workshop) => (
                <Link
                  key={workshop.id}
                  to={`/workshops/${workshop.id}`}
                  className="block card-luxury overflow-hidden group"
                >
                  {/* Image Section */}
                  <div className="aspect-[4/3] bg-obsidian/5 relative overflow-hidden">
                    {workshop.logo ? (
                      <img
                        src={workshop.logo}
                        alt={workshop.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-obsidian/10 to-obsidian/20">
                        <Wrench className="w-20 h-20 text-obsidian/20" />
                      </div>
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {workshop.verified && (
                        <span className="badge-luxury badge-emerald text-xs">
                          <Award className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Rating Overlay */}
                    {workshop.averageRating && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-medium">
                          <Star className="w-5 h-5 fill-gold text-gold" />
                          <span className="text-lg font-bold text-obsidian">{workshop.averageRating.toFixed(1)}</span>
                          <span className="text-sm text-obsidian/60">({workshop.totalReviews} reviews)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-obsidian mb-2 group-hover:text-gradient-gold transition-all duration-300">
                      {workshop.name}
                    </h3>
                    
                    <p className="text-sm text-obsidian/70 line-clamp-2 mb-4">{workshop.description}</p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-obsidian/70 mb-4">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span>{workshop.city}, {workshop.province}</span>
                    </div>

                    {/* Services Preview */}
                    {workshop.services && workshop.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {workshop.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-obsidian/5 text-obsidian/70 text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                        {workshop.services.length > 3 && (
                          <span className="px-2 py-1 text-obsidian/50 text-xs">
                            +{workshop.services.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Contact */}
                    <div className="flex items-center gap-2 text-sm text-obsidian/70 pt-4 border-t border-obsidian/5">
                      <Phone className="w-4 h-4" />
                      <span>{workshop.phone}</span>
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
