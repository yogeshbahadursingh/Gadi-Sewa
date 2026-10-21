import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Gauge, Fuel, Calendar, Heart, Share2,
  Phone, MessageCircle, Shield, ShieldCheck, Camera, FileText,
  ChevronRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import { vehicles, formatPrice, formatMileage } from '../data/vehicles';
import PassportBadge from '../components/PassportBadge';
import VehicleCard from '../components/VehicleCard';
import { useState } from 'react';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-ivory pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Vehicle Not Found</h1>
          <p className="text-slate-warm mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
          <Link to="/listings" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Browse All Vehicles
          </Link>
        </div>
      </main>
    );
  }

  const similarVehicles = vehicles
    .filter(v => v.id !== vehicle.id && (v.category === vehicle.category || v.make === vehicle.make))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-obsidian/[0.04]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-warm" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-obsidian transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-obsidian/20" aria-hidden="true" />
            <Link to="/listings" className="hover:text-obsidian transition-colors">Vehicles</Link>
            <ChevronRight className="w-3 h-3 text-obsidian/20" aria-hidden="true" />
            <span className="text-obsidian font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">{vehicle.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden bg-obsidian/5 mb-6"
            >
              <div className="aspect-[16/9] lg:aspect-[16/8]">
                <img
                  src={vehicle.images[activeImage]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-obsidian/70 backdrop-blur-sm rounded-full">
                <Camera className="w-3.5 h-3.5 text-ivory/70" />
                <span className="text-xs text-ivory/70">{vehicle.images.length} photos</span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsFavourite(!isFavourite)}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm active:scale-95"
                  aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                  aria-pressed={isFavourite}
                >
                  <Heart className={`w-5 h-5 transition-colors ${isFavourite ? 'fill-red-500 text-red-500' : 'text-obsidian/50'}`} />
                </button>
                <button
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm active:scale-95"
                  aria-label="Share this listing"
                >
                  <Share2 className="w-5 h-5 text-obsidian/50" />
                </button>
              </div>
            </motion.div>

            {/* Title & Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl lg:text-3xl font-bold text-obsidian">
                    {vehicle.title}
                  </h1>
                  <p className="text-sm text-slate-warm mt-1">
                    {vehicle.year} · {vehicle.variant} · {vehicle.transmission}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl lg:text-3xl font-bold text-obsidian">
                    {formatPrice(vehicle.price)}
                  </p>
                  {vehicle.negotiable && (
                    <span className="text-xs text-emerald font-medium bg-emerald/10 px-2 py-0.5 rounded-full">
                      Negotiable
                    </span>
                  )}
                </div>
              </div>

              {/* Quick specs */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-warm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold" />
                  {vehicle.location.city}, {vehicle.location.district}
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-gold" />
                  {formatMileage(vehicle.mileage)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-gold" />
                  {vehicle.fuelType}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  {vehicle.year}
                </span>
              </div>
            </motion.div>

            {/* Vehicle Passport Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <PassportBadge
                hasPassport={vehicle.hasPassport}
                passportId={vehicle.passportId}
                passportDate={vehicle.passportDate}
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="font-display text-xl font-semibold text-obsidian mb-4">About This Vehicle</h2>
              <p className="text-sm text-obsidian/70 leading-relaxed">{vehicle.description}</p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mb-8"
            >
              <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Key Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vehicle.keyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-obsidian/[0.04]">
                    <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0" />
                    <span className="text-sm text-obsidian/70">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Specifications</h2>
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-obsidian/[0.04]">
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Make', value: vehicle.make },
                      { label: 'Model', value: vehicle.model },
                      { label: 'Year', value: vehicle.year.toString() },
                      { label: 'Transmission', value: vehicle.transmission },
                    ].map((spec) => (
                      <div key={spec.label} className="flex justify-between">
                        <span className="text-sm text-slate-warm">{spec.label}</span>
                        <span className="text-sm font-medium text-obsidian">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Fuel Type', value: vehicle.fuelType },
                      { label: 'Mileage', value: formatMileage(vehicle.mileage) },
                      { label: 'Condition', value: vehicle.condition },
                      ...(vehicle.engineCC ? [{ label: 'Engine', value: `${vehicle.engineCC}cc` }] : []),
                    ].map((spec) => (
                      <div key={spec.label} className="flex justify-between">
                        <span className="text-sm text-slate-warm">{spec.label}</span>
                        <span className="text-sm font-medium text-obsidian">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Seller Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl border border-obsidian/[0.04] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    vehicle.sellerType === 'dealer' ? 'bg-gold/10 text-gold-dark' : 'bg-obsidian/5 text-obsidian/60'
                  }`}>
                    {vehicle.sellerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-obsidian">{vehicle.sellerName}</p>
                    <p className="text-xs text-slate-warm">
                      {vehicle.sellerType === 'dealer' ? 'Verified Dealer' : 'Private Seller'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Seller
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gold/10 text-gold-dark text-sm font-semibold rounded-xl hover:bg-gold/20 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Send Message
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-obsidian/[0.04]">
                  <p className="text-xs text-slate-warm text-center">
                    Listed on {new Date(vehicle.postedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </motion.div>

              {/* Safety Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-ivory-warm rounded-2xl border border-obsidian/[0.04] p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-gold" />
                  <h3 className="text-sm font-semibold text-obsidian">Safety Tips</h3>
                </div>
                <ul className="space-y-2 text-xs text-obsidian/60">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-gold" />
                    Meet in a safe, public location
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-gold" />
                    Request a Vehicle Passport before buying
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-gold" />
                    Verify documents in person
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-gold" />
                    Never send money in advance
                  </li>
                </ul>
              </motion.div>

              {/* Inspection CTA */}
              {!vehicle.hasPassport && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-emerald/[0.04] border border-emerald/20 rounded-2xl p-6"
                >
                  <ShieldCheck className="w-8 h-8 text-emerald mb-3" />
                  <h3 className="font-semibold text-obsidian text-sm mb-2">Not Inspected Yet?</h3>
                  <p className="text-xs text-obsidian/60 mb-4">
                    Request an independent inspection before purchasing. Get a complete Vehicle Passport with evidence-backed findings.
                  </p>
                  <Link
                    to="/inspect"
                    className="block w-full text-center px-4 py-2.5 bg-emerald text-ivory text-sm font-medium rounded-xl hover:bg-emerald-light transition-colors"
                  >
                    Book Inspection
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-obsidian/[0.04]">
            <h2 className="font-display text-2xl font-bold text-obsidian mb-8">Similar Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarVehicles.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
