import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, Eye, MapPin, Star, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Vehicle } from '../services/api';

export default function FavouritesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [favourites, setFavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadFavourites();
  }, [isAuthenticated]);

  const loadFavourites = async () => {
    try {
      const data = await api.getMyFavourites();
      setFavourites(data);
    } catch (error) {
      console.error('Failed to load favourites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (vehicleId: string) => {
    if (!confirm('Remove this vehicle from favourites?')) return;
    try {
      await api.removeFavourite(vehicleId);
      setFavourites(prev => prev.filter(v => v.id !== vehicleId));
    } catch (error) {
      alert('Failed to remove from favourites');
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `रू ${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `रू ${(price / 100000).toFixed(2)} Lakh`;
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  const stats = {
    total: favourites.length,
    totalValue: favourites.reduce((sum, v) => sum + (v.price || 0), 0),
    verified: favourites.filter(v => v.hasPassport).length,
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
              <Heart className="w-4 h-4" />
              Saved Vehicles
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              My Favourites
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Vehicles you've saved for later consideration
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
          {favourites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-gold" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.total}</p>
                <p className="text-sm text-obsidian/60">Saved Vehicles</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-2xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-emerald" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.verified}</p>
                <p className="text-sm text-obsidian/60">Passport Verified</p>
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
                <p className="text-3xl font-bold text-obsidian mb-1">{formatPrice(stats.totalValue)}</p>
                <p className="text-sm text-obsidian/60">Total Value</p>
              </motion.div>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="card-luxury p-12 text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-obsidian/70">Loading your favourites...</p>
            </div>
          ) : favourites.length === 0 ? (
            <div className="card-luxury p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-obsidian/20" />
              </div>
              <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No favourites yet</h3>
              <p className="text-obsidian/70 mb-6 max-w-md mx-auto">
                Start browsing vehicles and save the ones you're interested in. They'll appear here for easy access.
              </p>
              <Link
                to="/listings"
                className="btn-luxury btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
              >
                <span>Browse Vehicles</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-bold text-obsidian flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Saved Vehicles
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {favourites.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group"
                  >
                    <Link
                      to={`/vehicle/${vehicle.id}`}
                      className="block card-luxury overflow-hidden"
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
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-obsidian/10 to-obsidian/20">
                            <Heart className="w-16 h-16 text-obsidian/20" />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent"></div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {vehicle.hasPassport && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald/95 backdrop-blur-md rounded-full border border-emerald-light/30 shadow-lg">
                              <Shield className="w-3.5 h-3.5 text-ivory" />
                              <span className="text-xs font-bold text-ivory tracking-wide">VERIFIED</span>
                            </div>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemove(vehicle.id);
                          }}
                          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:scale-110 transition-all duration-300 group/remove"
                        >
                          <Trash2 className="w-5 h-5 text-obsidian/40 group-hover/remove:text-red-500 transition-colors" />
                        </button>

                        {/* Price */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-xs text-ivory/60 uppercase tracking-wider mb-1">Price</p>
                          <p className="text-3xl font-bold text-ivory leading-none">
                            {formatPrice(vehicle.price)}
                          </p>
                          {vehicle.negotiable && (
                            <p className="text-xs text-ivory/70 mt-1.5 font-medium">✓ Negotiable</p>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-obsidian mb-1 group-hover:text-gradient-gold transition-all duration-300">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        {vehicle.variant && (
                          <p className="text-sm text-obsidian/60 mb-3">{vehicle.variant}</p>
                        )}

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {vehicle.mileage && (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-obsidian/5 rounded-lg flex items-center justify-center">
                                <Eye className="w-4 h-4 text-gold" />
                              </div>
                              <div>
                                <p className="text-xs text-obsidian/60 uppercase tracking-wider">Mileage</p>
                                <p className="text-sm font-semibold text-obsidian">{vehicle.mileage.toLocaleString()} km</p>
                              </div>
                            </div>
                          )}
                          {vehicle.fuelType && (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-obsidian/5 rounded-lg flex items-center justify-center">
                                <Star className="w-4 h-4 text-gold" />
                              </div>
                              <div>
                                <p className="text-xs text-obsidian/60 uppercase tracking-wider">Fuel</p>
                                <p className="text-sm font-semibold text-obsidian">{vehicle.fuelType}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Location */}
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
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
