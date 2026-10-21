import { Link } from 'react-router-dom';
import { MapPin, Gauge, Fuel, Heart, ShieldCheck } from 'lucide-react';
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
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className={`group relative bg-white rounded-2xl overflow-hidden card-premium border border-obsidian/[0.04] ${
        isFeatured ? 'ring-1 ring-gold/20 shadow-[var(--shadow-soft)]' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" aria-hidden="true" />
        )}
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay gradient — always visible at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent pointer-events-none" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {vehicle.hasPassport && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald text-ivory text-[11px] font-semibold rounded-full shadow-sm">
              <ShieldCheck className="w-3 h-3" aria-hidden="true" />
              Passport Verified
            </span>
          )}
          {isFeatured && !vehicle.hasPassport && (
            <span className="inline-flex items-center px-2.5 py-1 bg-gold text-obsidian text-[11px] font-semibold rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Favourite button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFavourite(!isFavourite); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart className={`w-4 h-4 transition-colors duration-200 ${isFavourite ? 'fill-red-500 text-red-500' : 'text-obsidian/40'}`} />
        </button>
      </div>

      {/* Content */}
      <Link to={`/vehicle/${vehicle.id}`} className="block p-4 lg:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-b-2xl">
        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-obsidian group-hover:text-emerald transition-colors duration-200 line-clamp-1 leading-snug">
          {vehicle.title}
        </h3>
        <p className="text-xs text-slate-warm mt-1">
          {vehicle.year} · {vehicle.variant}
        </p>

        {/* Price */}
        <div className="mt-3 mb-3 flex items-baseline gap-2 flex-wrap">
          <span className="text-xl font-bold text-obsidian tracking-tight">
            {formatPrice(vehicle.price)}
          </span>
          {vehicle.negotiable && (
            <span className="text-[11px] text-emerald font-medium bg-emerald/8 px-2 py-0.5 rounded-full">
              Negotiable
            </span>
          )}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-slate-warm">
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-obsidian/30" aria-hidden="true" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="w-px h-3 bg-obsidian/10" aria-hidden="true" />
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5 text-obsidian/30" aria-hidden="true" />
            {vehicle.fuelType}
          </span>
        </div>

        {/* Location & Seller */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-obsidian/[0.04]">
          <span className="flex items-center gap-1 text-xs text-slate-warm">
            <MapPin className="w-3 h-3 text-obsidian/25" aria-hidden="true" />
            {vehicle.location.city}, {vehicle.location.province}
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            vehicle.sellerType === 'dealer'
              ? 'bg-gold/10 text-gold-dark'
              : 'bg-obsidian/[0.04] text-obsidian/50'
          }`}>
            {vehicle.sellerType === 'dealer' ? 'Dealer' : 'Private'}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
