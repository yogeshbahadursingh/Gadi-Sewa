import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, Search } from 'lucide-react';
import { api, Workshop } from '../services/api';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredWorkshops = workshops.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-obsidian mb-8">Find a Workshop</h1>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workshops by name or location..."
                className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              />
            </div>
          </div>

          {/* Workshops Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-obsidian/70">Loading workshops...</p>
            </div>
          ) : filteredWorkshops.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
              <Search className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-obsidian mb-2">No workshops found</h3>
              <p className="text-obsidian/70">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkshops.map((workshop) => (
                <Link
                  key={workshop.id}
                  to={`/workshops/${workshop.id}`}
                  className="block bg-white rounded-2xl shadow-soft overflow-hidden card-premium"
                >
                  <div className="aspect-[4/3] bg-ivory-dark">
                    {workshop.logo ? (
                      <img src={workshop.logo} alt={workshop.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                        <MapPin className="w-16 h-16" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display text-lg font-bold text-obsidian">{workshop.name}</h3>
                      {workshop.verified && (
                        <span className="px-2 py-0.5 bg-emerald/10 text-emerald text-xs font-medium rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-obsidian/70 line-clamp-2 mb-3">{workshop.description}</p>
                    <div className="flex items-center gap-2 text-sm text-obsidian/70 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{workshop.city}, {workshop.district}</span>
                    </div>
                    {workshop.averageRating && (
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 fill-gold text-gold" />
                        <span className="text-sm font-semibold text-obsidian">{workshop.averageRating.toFixed(1)}</span>
                        <span className="text-xs text-obsidian/70">({workshop.totalReviews} reviews)</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-obsidian/70">
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
