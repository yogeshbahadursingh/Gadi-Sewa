import { Link } from 'react-router-dom';
import { MapPin, Gauge, Fuel, Calendar, Heart } from 'lucide-react';
import { Vehicle, formatPrice, formatMileage } from '../data/vehicles';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export default function VehicleCard({ vehicle, index = 0, variant = 'default' }: VehicleCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isFeatured = variant === 'featured' || vehicle.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative bg-white rounded-2xl overflow-hidden card-premium border border-obsidian/[0.04] ${
        isFeatured ? 'ring-1 ring-gold/20' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {vehicle.hasPassport && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald/95 text-ivory text-[11px] font-semibold rounded-full backdrop-blur-sm">
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0L10 5.5L16 6L11.5 10L13 16L8 12.5L3 16L4.5 10L0 6L6 5.5L8 0Z"/>
              </svg>
              Passport Verified
            </span>
          )}
          {isFeatured && (
            <span className="inline-flex items-center px-2.5 py-1 bg-gold/95 text-obsidian text-[11px] font-semibold rounded-full backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        {/* Favourite button */}
        <button
          onClick={(e) => { e.preventDefault(); setIsFavourite(!isFavourite); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavourite ? 'fill-red-500 text-red-500' : 'text-obsidian/50'}`} />
        </button>

        {/* Price overlay on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-medium drop-shadow-lg">
              View Details →
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <Link to={`/vehicle/${vehicle.id}`} className="block p-4 lg:p-5">
        {/* Title & Year */}
        <div className="mb-3">
          <h3 className="font-display text-lg font-semibold text-obsidian group-hover:text-emerald transition-colors duration-200 line-clamp-1">
            {vehicle.title}
          </h3>
          <p className="text-xs text-slate-warm mt-0.5">
            {vehicle.year} · {vehicle.variant}
          </p>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-xl font-bold text-obsidian">
            {formatPrice(vehicle.price)}
          </span>
          {vehicle.negotiable && (
            <span className="ml-2 text-xs text-emerald font-medium bg-emerald/10 px-2 py-0.5 rounded-full">
              Negotiable
            </span>
          )}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-slate-warm mb-3">
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" />
            {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {vehicle.year}
          </span>
        </div>

        {/* Location & Seller */}
        <div className="flex items-center justify-between pt-3 border-t border-obsidian/[0.04]">
          <span className="flex items-center gap-1 text-xs text-slate-warm">
            <MapPin className="w-3 h-3" />
            {vehicle.location.city}
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            vehicle.sellerType === 'dealer'
              ? 'bg-gold/10 text-gold-dark'
              : 'bg-obsidian/5 text-obsidian/60'
          }`}>
            {vehicle.sellerType === 'dealer' ? 'Dealer' : 'Private'}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
