import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Gauge, Fuel, Shield, Heart, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { api, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (id) loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    try {
      const data = await api.getVehicleById(id!);
      setVehicle(data);
      if (isAuthenticated) {
        const isFav = await api.isFavourite(id!);
        setIsFavourite(isFav);
      }
    } catch (error) {
      console.error('Failed to load vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to save favourites');
      return;
    }
    try {
      if (isFavourite) {
        await api.removeFavourite(id!);
        setIsFavourite(false);
      } else {
        await api.addFavourite(id!);
        setIsFavourite(true);
      }
    } catch (error) {
      alert('Failed to update favourite');
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `रू ${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `रू ${(price / 100000).toFixed(2)} Lakh`;
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <p className="text-obsidian/70">Loading vehicle...</p>
      </main>
    );
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Vehicle Not Found</h1>
          <Link to="/listings" className="px-6 py-3 bg-obsidian text-ivory rounded-full">
            Back to Listings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory">
      {/* Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {vehicle.images && vehicle.images.length > 0 ? (
          <img
            src={vehicle.images[0].url}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-obsidian to-obsidian-light flex items-center justify-center">
            <Gauge className="w-32 h-32 text-ivory/10" />
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 container-luxury pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              {vehicle.hasPassport && (
                <span className="badge-luxury badge-emerald">
                  <Shield className="w-4 h-4" />
                  Passport Verified
                </span>
              )}
              {vehicle.featured && (
                <span className="badge-luxury badge-gold">
                  <Star className="w-4 h-4" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-2 tracking-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            {vehicle.variant && (
              <p className="text-xl text-ivory/80 mb-4">{vehicle.variant}</p>
            )}

            {/* Price & Location */}
            <div className="flex flex-wrap items-center gap-6 text-ivory">
              <div>
                <p className="text-4xl font-bold text-gradient-gold">
                  {formatPrice(vehicle.price)}
                </p>
                {vehicle.negotiable && (
                  <p className="text-sm text-ivory/70 mt-1">Negotiable</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-ivory/70">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{vehicle.city}, {vehicle.province}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Favourite Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={toggleFavourite}
          className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-ultra hover:scale-110 transition-all duration-300"
        >
          <Heart className={`w-6 h-6 ${isFavourite ? 'fill-red-500 text-red-500' : 'text-obsidian/40'}`} />
        </motion.button>
      </section>

      {/* Content Section */}
      <div className="container-luxury py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-luxury p-8"
            >
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Vehicle Specifications
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {vehicle.mileage && (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                      <Gauge className="w-8 h-8 text-gold" />
                    </div>
                    <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Mileage</p>
                    <p className="text-lg font-bold text-obsidian">{vehicle.mileage.toLocaleString()} km</p>
                  </div>
                )}
                {vehicle.fuelType && (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-2xl flex items-center justify-center">
                      <Fuel className="w-8 h-8 text-emerald" />
                    </div>
                    <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Fuel Type</p>
                    <p className="text-lg font-bold text-obsidian">{vehicle.fuelType}</p>
                  </div>
                )}
                {vehicle.transmission && (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-obsidian/10 to-obsidian/5 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-obsidian" />
                    </div>
                    <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Transmission</p>
                    <p className="text-lg font-bold text-obsidian">{vehicle.transmission}</p>
                  </div>
                )}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gold" />
                  </div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-lg font-bold text-obsidian">{vehicle.city}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            {vehicle.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-luxury p-8"
              >
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  About This Vehicle
                </h2>
                <p className="text-obsidian/70 leading-relaxed text-lg">{vehicle.description}</p>
              </motion.div>
            )}

            {/* Vehicle Passport */}
            {vehicle.hasPassport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-obsidian p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald to-emerald-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-emerald">
                    <Shield className="w-8 h-8 text-ivory" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-ivory mb-2">
                      Vehicle Passport Verified
                    </h3>
                    <p className="text-ivory/70 mb-4 leading-relaxed">
                      This vehicle has been independently inspected and verified by our certified inspectors. 
                      View the complete passport for detailed inspection reports, photographic evidence, and vehicle history.
                    </p>
                    <Link 
                      to={`/passport/${vehicle.passportId}`} 
                      className="btn-luxury btn-gold px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2"
                    >
                      View Full Passport
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-luxury p-8 sticky top-24"
            >
              {/* Seller Info */}
              <div className="mb-8">
                <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-2">Seller</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-obsidian">
                      {vehicle.seller?.firstName?.[0]}{vehicle.seller?.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-obsidian">
                      {vehicle.seller?.firstName} {vehicle.seller?.lastName}
                    </p>
                    <p className="text-sm text-obsidian/60">Verified Seller</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="btn-luxury btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Seller
                </button>
                {!vehicle.hasPassport && (
                  <Link
                    to={`/inspect/booking?vehicleId=${vehicle.id}`}
                    className="btn-luxury btn-obsidian w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Request Inspection
                  </Link>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-obsidian/10 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-obsidian/60">Listed</span>
                  <span className="font-medium text-obsidian">
                    {new Date(vehicle.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-obsidian/60">Views</span>
                  <span className="font-medium text-obsidian">{vehicle.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-obsidian/60">Condition</span>
                  <span className="font-medium text-obsidian">{vehicle.condition || 'Excellent'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
