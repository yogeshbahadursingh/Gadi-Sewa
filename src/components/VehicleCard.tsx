import { Link } from 'react-router-dom';
import { MapPin, Gauge, Fuel, Heart, ShieldCheck, Calendar } from 'lucide-react';
import { Vehicle, formatPrice, formatMileage } from '../data/vehicles';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export default function VehicleCard({ vehicle, index = 0, variant = 'default' }: VehicleCardProps) {
  const { isAuthenticated } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTogglingFavourite, setIsTogglingFavourite] = useState(false);

  const isFeatured = variant === 'featured' || vehicle.featured;

  // Load favourite status on mount
  useEffect(() => {
    if (isAuthenticated) {
      api.isFavourite(vehicle.id).then(setIsFavourite);
    }
  }, [vehicle.id, isAuthenticated]);

  const handleFavouriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.hash = '/login';
      return;
    }

    if (isTogglingFavourite) return;
    
    setIsTogglingFavourite(true);
    try {
      if (isFavourite) {
        await api.removeFavourite(vehicle.id);
        setIsFavourite(false);
      } else {
        await api.addFavourite(vehicle.id);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
    } finally {
      setIsTogglingFavourite(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 border border-graphite/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-dark">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" aria-hidden="true" />
        )}
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {vehicle.hasPassport && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest text-ivory text-xs font-semibold rounded-sm shadow-medium">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Passport Verified
            </span>
          )}
          {isFeatured && !vehicle.hasPassport && (
            <span className="inline-flex items-center px-3 py-1.5 bg-champagne text-graphite text-xs font-semibold rounded-sm shadow-medium">
              Featured
            </span>
          )}
        </div>

        {/* Favourite Button */}
        <button
          onClick={handleFavouriteToggle}
          disabled={isTogglingFavourite}
          className="absolute top-4 right-4 p-2.5 rounded-sm bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-medium hover:shadow-strong active:scale-95 disabled:opacity-50"
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              isFavourite 
                ? 'fill-crimson text-crimson' 
                : 'text-graphite/40 hover:text-graphite'
            }`} 
          />
        </button>

        {/* Price Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-ivory/70 uppercase tracking-wider mb-1 font-medium">Price</p>
              <p className="text-3xl font-bold text-ivory leading-none">
                {formatPrice(vehicle.price)}
              </p>
              {vehicle.negotiable && (
                <p className="text-xs text-ivory/80 mt-1.5 font-medium">
                  ✓ Negotiable
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Link 
        to={`/vehicle/${vehicle.id}`} 
        className="block p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2"
      >
        {/* Title & Year */}
        <div className="mb-3">
          <h3 className="font-display text-xl font-normal text-graphite group-hover:text-champagne transition-colors duration-200 leading-tight mb-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          {vehicle.variant && (
            <p className="text-sm text-muted font-medium">
              {vehicle.variant}
            </p>
          )}
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {vehicle.mileage && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-graphite/5 rounded-sm flex items-center justify-center">
                <Gauge className="w-4 h-4 text-champagne" />
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Mileage</p>
                <p className="text-sm font-semibold text-graphite">{formatMileage(vehicle.mileage)}</p>
              </div>
            </div>
          )}
          {vehicle.fuelType && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-graphite/5 rounded-sm flex items-center justify-center">
                <Fuel className="w-4 h-4 text-champagne" />
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Fuel</p>
                <p className="text-sm font-semibold text-graphite">{vehicle.fuelType}</p>
              </div>
            </div>
          )}
        </div>

        {/* Location & Seller */}
        <div className="flex items-center justify-between pt-4 border-t border-graphite/5">
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {vehicle.location.city}, {vehicle.location.province}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-sm ${
            vehicle.sellerType === 'dealer'
              ? 'bg-champagne/10 text-champagne-dark'
              : 'bg-graphite/5 text-muted'
          }`}>
            {vehicle.sellerType === 'dealer' ? 'Dealer' : 'Private'}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
