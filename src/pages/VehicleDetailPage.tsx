import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Gauge, Fuel, Shield, Heart, MessageCircle } from 'lucide-react';
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
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Images */}
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-6">
                <div className="aspect-[16/9] bg-ivory-dark">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <img
                      src={vehicle.images[0].url}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                      <Gauge className="w-24 h-24" />
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="bg-white rounded-2xl shadow-soft p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="font-display text-3xl font-bold text-obsidian mb-2">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h1>
                    {vehicle.variant && (
                      <p className="text-lg text-obsidian/70">{vehicle.variant}</p>
                    )}
                  </div>
                  <button
                    onClick={toggleFavourite}
                    className="p-3 rounded-full hover:bg-ivory transition-colors"
                  >
                    <Heart className={`w-6 h-6 ${isFavourite ? 'fill-red-500 text-red-500' : 'text-obsidian/40'}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {vehicle.mileage && (
                    <div className="bg-ivory rounded-xl p-4">
                      <Gauge className="w-5 h-5 text-gold mb-2" />
                      <p className="text-sm text-obsidian/70">Mileage</p>
                      <p className="font-semibold text-obsidian">{vehicle.mileage.toLocaleString()} km</p>
                    </div>
                  )}
                  {vehicle.fuelType && (
                    <div className="bg-ivory rounded-xl p-4">
                      <Fuel className="w-5 h-5 text-gold mb-2" />
                      <p className="text-sm text-obsidian/70">Fuel</p>
                      <p className="font-semibold text-obsidian">{vehicle.fuelType}</p>
                    </div>
                  )}
                  {vehicle.transmission && (
                    <div className="bg-ivory rounded-xl p-4">
                      <Calendar className="w-5 h-5 text-gold mb-2" />
                      <p className="text-sm text-obsidian/70">Transmission</p>
                      <p className="font-semibold text-obsidian">{vehicle.transmission}</p>
                    </div>
                  )}
                  <div className="bg-ivory rounded-xl p-4">
                    <MapPin className="w-5 h-5 text-gold mb-2" />
                    <p className="text-sm text-obsidian/70">Location</p>
                    <p className="font-semibold text-obsidian">{vehicle.city}</p>
                  </div>
                </div>

                {vehicle.description && (
                  <div className="mb-8">
                    <h2 className="font-display text-xl font-bold text-obsidian mb-3">Description</h2>
                    <p className="text-obsidian/70 leading-relaxed">{vehicle.description}</p>
                  </div>
                )}

                {/* Passport Badge */}
                {vehicle.hasPassport && (
                  <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-emerald flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-emerald mb-1">Vehicle Passport Verified</h3>
                        <p className="text-sm text-obsidian/70">
                          This vehicle has been independently inspected and verified.
                        </p>
                        <Link to={`/passport/${vehicle.passportId}`} className="text-sm text-emerald font-semibold hover:underline mt-2 inline-block">
                          View Full Passport →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                <p className="text-3xl font-bold text-obsidian mb-2">
                  {formatPrice(vehicle.price)}
                </p>
                {vehicle.negotiable && (
                  <p className="text-sm text-emerald mb-6">Negotiable</p>
                )}

                <div className="space-y-3">
                  <button className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Contact Seller
                  </button>
                  {!vehicle.hasPassport && (
                    <Link
                      to={`/inspect/booking?vehicleId=${vehicle.id}`}
                      className="w-full py-3 border-2 border-emerald text-emerald font-semibold rounded-xl hover:bg-emerald hover:text-ivory transition-all flex items-center justify-center gap-2"
                    >
                      <Shield className="w-5 h-5" />
                      Request Inspection
                    </Link>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-obsidian/5">
                  <p className="text-sm text-obsidian/70 mb-2">Seller</p>
                  <p className="font-semibold text-obsidian">
                    {vehicle.seller?.firstName} {vehicle.seller?.lastName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
