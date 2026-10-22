import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import {
  Search, ShieldCheck, ArrowRight, Car, Bike, Zap, Truck,
  MapPin, CheckCircle2, Eye, Users, Award
} from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import { vehicles, categories } from '../data/vehicles';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.08 }
};

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredVehicles = vehicles.filter(v => v.featured).slice(0, 6);
  const passportVehicles = vehicles.filter(v => v.hasPassport).slice(0, 4);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/listings');
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://image.qwenlm.ai/generated-images/09cf6cff-cd74-47a5-957f-14def3d8d6bd/_result.png"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/75 to-obsidian/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 lg:py-40">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ivory/10 border border-ivory/15 rounded-full text-ivory/80 text-xs font-medium mb-8 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                Independent Inspections · Evidence-Backed Reports
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-bold text-ivory leading-[1.05] mb-6"
            >
              Nepal's trusted
              <br />
              <span className="text-gradient-gold">vehicle marketplace</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg text-ivory/60 max-w-lg mb-10 leading-relaxed"
            >
              Buy, sell and verify vehicles with confidence. Every Vehicle Passport is backed by 
              independent inspection, professional review and photographic evidence.
            </motion.p>

            {/* Search Bar — now functional */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-ivory/10 backdrop-blur-xl border border-ivory/10 rounded-2xl p-1.5 max-w-xl"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-ivory/40 flex-shrink-0" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search by make, model or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-ivory placeholder:text-ivory/35 outline-none text-sm"
                    aria-label="Search vehicles"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gold text-obsidian text-sm font-semibold rounded-xl hover:bg-gold-light transition-colors flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </motion.form>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-2 mt-8"
            >
              <span className="text-xs text-ivory/35 mr-1">Popular:</span>
              {[
                { label: 'SUVs', href: '/listings?category=suv' },
                { label: 'Electric', href: '/listings?category=electric' },
                { label: 'Motorcycles', href: '/listings?category=motorcycle' },
                { label: 'Passport Verified', href: '/listings?passport=yes' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3 py-1.5 text-xs text-ivory/50 border border-ivory/10 rounded-full hover:border-gold/30 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          aria-hidden="true"
        >
          <div className="w-5 h-9 border border-ivory/15 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Category Discovery */}
      <section className="py-20 lg:py-28 bg-ivory pattern-nepal">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 lg:mb-16">
            <span className="text-xs font-semibold text-gold uppercase tracking-[0.15em]">Explore</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-obsidian mt-3">
              Browse by Category
            </h2>
            <p className="text-slate-warm mt-3 max-w-md mx-auto text-sm sm:text-base">
              From city scooters to mountain-ready SUVs — find exactly what suits your journey.
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/listings?category=${cat.id}`}
                  className="group block p-5 sm:p-6 lg:p-8 bg-white rounded-2xl border border-obsidian/[0.04] hover:border-gold/20 hover:shadow-[var(--shadow-gold)] transition-all duration-300 text-center"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-obsidian/[0.03] group-hover:bg-gold/10 flex items-center justify-center transition-colors duration-300">
                    {cat.id === 'car' && <Car className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                    {cat.id === 'suv' && <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                    {cat.id === 'motorcycle' && <Bike className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                    {cat.id === 'scooter' && <Bike className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                    {cat.id === 'electric' && <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                    {cat.id === 'van' && <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                    {cat.id === 'truck' && <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                    {cat.id === 'bus' && <Car className="w-5 h-5 sm:w-6 sm:h-6 text-obsidian/40 group-hover:text-gold transition-colors" />}
                  </div>
                  <h3 className="font-semibold text-obsidian text-sm sm:text-base group-hover:text-emerald transition-colors">
                    {cat.label}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vehicle Passport Showcase */}
      <section className="py-20 lg:py-28 bg-obsidian relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald/15 border border-emerald/20 rounded-full text-emerald-light text-xs font-medium mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Flagship Trust Product
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight mb-6">
                The Vehicle
                <br />
                <span className="text-gradient-gold">Passport</span>
              </h2>
              <p className="text-ivory/55 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Nepal's first independent digital vehicle verification system. Every passport is backed by 
                evidence-based inspection, professional quality review, and tamper-evident records.
              </p>

              <div className="space-y-3.5 mb-10">
                {[
                  '150+ point professional inspection checklist',
                  'Chassis & engine identity verification',
                  'Odometer & service history analysis',
                  'Condition-graded photographic evidence',
                  'Independent quality review before publication',
                  'QR-code based instant verification',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-light" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-ivory/65">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/passport"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian text-sm font-semibold rounded-full hover:bg-gold-light transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/passport"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-ivory/15 text-ivory/80 text-sm font-medium rounded-full hover:border-gold/30 hover:text-gold transition-colors"
                >
                  Book an Inspection
                </Link>
              </div>
            </motion.div>

            {/* Passport Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-obsidian-light border border-ivory/[0.08] rounded-3xl p-6 lg:p-8 shadow-2xl">
                {/* Passport Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald/15 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-light" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ivory">Vehicle Passport</p>
                      <p className="text-xs text-ivory/35 font-mono">GS-VP-2024-00847</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald/15 text-emerald-light text-xs font-semibold rounded-full">
                    Verified
                  </span>
                </div>

                {/* Vehicle Info */}
                <div className="bg-obsidian-dark/40 rounded-2xl p-4 mb-4">
                  <p className="text-[11px] text-ivory/30 uppercase tracking-wider mb-1">Vehicle</p>
                  <p className="text-lg font-display font-semibold text-ivory">Toyota Fortuner Legender</p>
                  <p className="text-sm text-ivory/50 mt-0.5">2022 · 28,000 km · Diesel · Automatic</p>
                </div>

                {/* Inspection Scores */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    { label: 'Engine', score: 'A' },
                    { label: 'Body', score: 'A−' },
                    { label: 'Interior', score: 'A' }
                  ].map((item) => (
                    <div key={item.label} className="bg-obsidian-dark/40 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-gold">{item.score}</p>
                      <p className="text-[10px] text-ivory/35 mt-0.5 uppercase tracking-wider">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Evidence */}
                <div className="flex items-center justify-between pt-4 border-t border-ivory/[0.06]">
                  <div className="flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-ivory/25" aria-hidden="true" />
                    <span className="text-xs text-ivory/35">42 evidence photographs</span>
                  </div>
                  <span className="text-xs text-ivory/25">15 Nov 2024</span>
                </div>

                {/* QR Code — deterministic pattern */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-ivory rounded-xl flex items-center justify-center shadow-lg" aria-label="Verification QR code">
                  <div className="w-12 h-12 grid grid-cols-5 grid-rows-5 gap-[2px] p-1">
                    {/* Deterministic QR-like pattern */}
                    {[1,1,1,0,1, 1,0,1,1,0, 1,1,0,1,1, 0,1,1,0,1, 1,0,1,1,1].map((v, i) => (
                      <div key={i} className={`rounded-[1px] ${v ? 'bg-obsidian/80' : 'bg-transparent'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex items-end justify-between mb-10 lg:mb-14">
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-[0.15em]">Curated Selection</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-obsidian mt-3">
                Featured Vehicles
              </h2>
              <p className="text-slate-warm mt-2 text-sm sm:text-base">Hand-picked listings with verified documentation.</p>
            </div>
            <Link
              to="/listings"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-obsidian hover:text-gold transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featuredVehicles.map((vehicle, i) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} variant="featured" />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full"
            >
              View All Vehicles <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Passport Verified Listings */}
      <section className="py-20 lg:py-28 bg-ivory-warm border-t border-obsidian/[0.03]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald/10 rounded-full text-emerald text-xs font-medium mb-4">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Independently Verified
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-obsidian mt-2">
              Vehicles with Passport
            </h2>
            <p className="text-slate-warm mt-3 max-w-lg mx-auto text-sm sm:text-base">
              These vehicles have been independently inspected and verified by certified Gadi-Sewa inspectors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {passportVehicles.map((vehicle, i) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/listings?passport=yes"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald text-emerald text-sm font-semibold rounded-full hover:bg-emerald hover:text-ivory transition-colors duration-300"
            >
              Browse All Verified Vehicles <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14 lg:mb-20">
            <span className="text-xs font-semibold text-gold uppercase tracking-[0.15em]">Simple Process</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-obsidian mt-3">
              How Gadi-Sewa Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
            {[
              {
                step: '01',
                title: 'Discover',
                description: 'Browse listings by category, location, price and Vehicle Passport status. Save favourites and compare vehicles side by side.',
                icon: <Search className="w-6 h-6" />
              },
              {
                step: '02',
                title: 'Verify',
                description: 'Check the Vehicle Passport for evidence-backed condition reports. Or request an independent inspection before you buy.',
                icon: <ShieldCheck className="w-6 h-6" />
              },
              {
                step: '03',
                title: 'Connect',
                description: 'Contact sellers directly, negotiate with confidence, and complete your purchase knowing you have transparent information.',
                icon: <Users className="w-6 h-6" />
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center lg:text-left"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-obsidian/[0.03] mb-6">
                  <span className="text-gold">{item.icon}</span>
                </div>
                <span className="absolute top-0 left-12 lg:left-16 text-6xl font-display font-bold text-obsidian/[0.03] select-none pointer-events-none" aria-hidden="true">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-obsidian mb-3">{item.title}</h3>
                <p className="text-sm text-slate-warm leading-relaxed max-w-xs mx-auto lg:mx-0">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Principles — replaces fabricated stats */}
      <section className="py-16 lg:py-20 bg-obsidian">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-ivory">
              Built on Trust, Not Assumptions
            </h2>
            <p className="text-ivory/50 mt-3 max-w-lg mx-auto text-sm sm:text-base">
              Every claim on Gadi-Sewa is backed by evidence. Here's what that means.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, title: 'Independent Inspection', desc: 'Certified inspectors with no conflict of interest examine every vehicle.' },
              { icon: <Eye className="w-5 h-5" />, title: 'Quality Review', desc: 'Reports are independently reviewed before publication — inspectors cannot self-approve.' },
              { icon: <Award className="w-5 h-5" />, title: 'Photographic Evidence', desc: 'Every finding is supported by timestamped photographs and documentation.' },
              { icon: <MapPin className="w-5 h-5" />, title: 'All 7 Provinces', desc: 'Inspector network covering every province of Nepal for local, accessible service.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gold/10 text-gold mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-ivory text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-ivory/45 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-ivory pattern-nepal">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="relative bg-obsidian rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16"
          >
            <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
              <img
                src="https://image.qwenlm.ai/generated-images/6e537840-46dd-4194-8741-e7f9972d4744/_result.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/95 to-obsidian/80" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-ivory leading-tight mb-4">
                  Ready to sell your vehicle?
                </h2>
                <p className="text-ivory/55 text-base sm:text-lg mb-8 max-w-md">
                  List on Nepal's most trusted platform. Reach genuine buyers and sell with transparency.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/sell"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-obsidian text-sm font-bold rounded-full hover:bg-gold-light transition-colors"
                  >
                    Start Selling <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/passport"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-ivory/15 text-ivory/80 text-sm font-medium rounded-full hover:border-gold/30 transition-colors"
                  >
                    How It Works
                  </Link>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-3">
                {[
                  { label: 'Free Basic Listing', desc: 'No cost to start' },
                  { label: 'Genuine Enquiries', desc: 'Verified buyer interest' },
                  { label: 'Passport Boost', desc: 'Verified listings get priority' },
                  { label: 'Dealer Tools', desc: 'Manage your inventory' },
                ].map((item) => (
                  <div key={item.label} className="bg-ivory/[0.04] border border-ivory/[0.06] rounded-xl p-4">
                    <p className="text-sm font-semibold text-ivory">{item.label}</p>
                    <p className="text-xs text-ivory/35 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
