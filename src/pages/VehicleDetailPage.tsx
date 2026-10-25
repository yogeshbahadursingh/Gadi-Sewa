import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Gauge, Fuel, Shield, Heart, MessageCircle, Star, ArrowRight, X, ChevronLeft, ChevronRight, Phone, Mail, Clock, Eye } from 'lucide-react';
import { api, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [similarVehicles, setSimilarVehicles] = useState<Vehicle[]>([]);

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
      
      // Load similar vehicles
      if (data) {
        const { vehicles } = await api.getAllVehicles({
          category: data.category,
          limit: 3
        });
        setSimilarVehicles(vehicles.filter((v: Vehicle) => v.id !== data.id).slice(0, 3));
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

  const nextImage = () => {
    if (vehicle?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const prevImage = () => {
    if (vehicle?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
    }
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
      {/* Cinematic Hero Section with Gallery */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden bg-obsidian">
        {vehicle.images && vehicle.images.length > 0 ? (
          <>
            {/* Main Image */}
            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={vehicle.images[selectedImageIndex].url}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setShowGallery(true)}
            />
            
            {/* Gallery Navigation */}
            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-ultra hover:scale-110 transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-obsidian" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-ultra hover:scale-110 transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-6 h-6 text-obsidian" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-24 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-medium z-10">
                  <span className="text-sm font-semibold text-obsidian">
                    {selectedImageIndex + 1} / {vehicle.images.length}
                  </span>
                </div>
                
                {/* Thumbnail Strip */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-2 overflow-x-auto pb-2 z-10">
                  {vehicle.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === index
                          ? 'border-gold shadow-gold scale-105'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-obsidian to-obsidian-light flex items-center justify-center">
            <Gauge className="w-32 h-32 text-ivory/10" />
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent pointer-events-none"></div>
        
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
          className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-ultra hover:scale-110 transition-all duration-300 z-20"
        >
          <Heart className={`w-6 h-6 ${isFavourite ? 'fill-red-500 text-red-500' : 'text-obsidian/40'}`} />
        </motion.button>
      </section>

      {/* Full-Screen Gallery Modal */}
      <AnimatePresence>
        {showGallery && vehicle?.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/95 z-50 flex items-center justify-center"
            onClick={() => setShowGallery(false)}
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-ivory" />
            </button>
            
            <div className="relative max-w-6xl max-h-[90vh] mx-6" onClick={(e) => e.stopPropagation()}>
              <img
                src={vehicle.images[selectedImageIndex].url}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-contain"
              />
              
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8 text-ivory" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-8 h-8 text-ivory" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Section */}
      <div className="container-luxury py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Specifications */}
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
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Year</p>
                    <p className="text-lg font-bold text-obsidian">{vehicle.year}</p>
                  </div>
                </div>
                
                {vehicle.mileage && (
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Gauge className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Mileage</p>
                      <p className="text-lg font-bold text-obsidian">{vehicle.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                )}
                
                {vehicle.fuelType && (
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Fuel className="w-6 h-6 text-emerald" />
                    </div>
                    <div>
                      <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Fuel Type</p>
                      <p className="text-lg font-bold text-obsidian">{vehicle.fuelType}</p>
                    </div>
                  </div>
                )}
                
                {vehicle.transmission && (
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-obsidian/10 to-obsidian/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-obsidian" />
                    </div>
                    <div>
                      <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Transmission</p>
                      <p className="text-lg font-bold text-obsidian">{vehicle.transmission}</p>
                    </div>
                  </div>
                )}
                
                {vehicle.engineCC && (
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Gauge className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Engine</p>
                      <p className="text-lg font-bold text-obsidian">{vehicle.engineCC} CC</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-lg font-bold text-obsidian">{vehicle.city}, {vehicle.province}</p>
                  </div>
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

          {/* Similar Vehicles Section */}
          {similarVehicles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="font-display text-3xl font-bold text-obsidian mb-8 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Similar Vehicles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarVehicles.map((similarVehicle) => (
                  <Link
                    key={similarVehicle.id}
                    to={`/vehicle/${similarVehicle.id}`}
                    className="group block"
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-ultra transition-all duration-500 border border-obsidian/5 group-hover:border-gold/20">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-obsidian/5 to-obsidian/10">
                        {similarVehicle.images && similarVehicle.images.length > 0 ? (
                          <img
                            src={similarVehicle.images[0].url}
                            alt={`${similarVehicle.year} ${similarVehicle.make} ${similarVehicle.model}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-obsidian/10 to-obsidian/20">
                            <Gauge className="w-16 h-16 text-obsidian/20" />
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent opacity-90"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {similarVehicle.hasPassport && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald/95 backdrop-blur-md rounded-full border border-emerald-light/30 shadow-lg">
                              <Shield className="w-3.5 h-3.5 text-ivory" />
                              <span className="text-xs font-bold text-ivory tracking-wide">VERIFIED</span>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="text-2xl font-bold text-ivory leading-none">
                            {formatPrice(similarVehicle.price)}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold text-obsidian mb-1 leading-tight group-hover:text-gradient-gold transition-all duration-300">
                          {similarVehicle.year} {similarVehicle.make} {similarVehicle.model}
                        </h3>
                        {similarVehicle.variant && (
                          <p className="text-sm text-obsidian/60 font-medium mb-3">{similarVehicle.variant}</p>
                        )}
                        
                        <div className="flex items-center justify-between pt-3 border-t border-obsidian/5">
                          <div className="flex items-center gap-2 text-obsidian/60">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">{similarVehicle.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-obsidian/50">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{similarVehicle.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-luxury p-8 sticky top-24"
            >
              {/* Price Card */}
              <div className="mb-8 pb-8 border-b border-obsidian/10">
                <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-2">Asking Price</p>
                <p className="text-4xl font-bold text-gradient-gold mb-2">
                  {formatPrice(vehicle.price)}
                </p>
                {vehicle.negotiable && (
                  <p className="text-sm text-emerald font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Price Negotiable
                  </p>
                )}
              </div>

              {/* Seller Info */}
              <div className="mb-8">
                <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-3">Seller Information</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-gold">
                    <span className="text-xl font-bold text-obsidian">
                      {vehicle.seller?.firstName?.[0]}{vehicle.seller?.lastName?.[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-obsidian text-lg">
                      {vehicle.seller?.firstName} {vehicle.seller?.lastName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield className="w-3.5 h-3.5 text-emerald" />
                      <p className="text-xs text-emerald font-semibold">Verified Seller</p>
                    </div>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-obsidian/5 rounded-xl p-3 text-center">
                    <p className="text-xs text-obsidian/60 mb-1">Response Time</p>
                    <p className="text-sm font-bold text-obsidian">~2 hours</p>
                  </div>
                  <div className="bg-obsidian/5 rounded-xl p-3 text-center">
                    <p className="text-xs text-obsidian/60 mb-1">Listings</p>
                    <p className="text-sm font-bold text-obsidian">12 active</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <button className="btn-luxury btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Contact Seller
                </button>
                <button className="w-full py-4 border-2 border-obsidian/10 text-obsidian font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-obsidian/5 transition-colors">
                  <Phone className="w-5 h-5" />
                  Call Seller
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

              {/* Vehicle Details */}
              <div className="pt-8 border-t border-obsidian/10 space-y-4">
                <p className="text-xs text-obsidian/60 uppercase tracking-wider">Vehicle Details</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-obsidian/60">
                    <Clock className="w-4 h-4" />
                    Listed
                  </span>
                  <span className="font-medium text-obsidian">
                    {new Date(vehicle.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-obsidian/60">
                    <Eye className="w-4 h-4" />
                    Views
                  </span>
                  <span className="font-medium text-obsidian">{vehicle.views}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-obsidian/60">
                    <Gauge className="w-4 h-4" />
                    Condition
                  </span>
                  <span className="font-medium text-obsidian">{vehicle.condition || 'Excellent'}</span>
                </div>
                
                {vehicle.hasPassport && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-obsidian/60">
                      <Shield className="w-4 h-4" />
                      Passport
                    </span>
                    <span className="font-medium text-emerald">Verified ✓</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
