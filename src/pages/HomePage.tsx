import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Shield, ArrowRight, Fuel, Gauge, Calendar } from 'lucide-react';
import { api } from '../services/api';
import { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
    type: '',
    make: '',
    minPrice: '',
    maxPrice: '',
    location: ''
  });

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const { vehicles } = await api.getAllVehicles({});
        setFeaturedVehicles(vehicles.slice(0, 6));
      } catch (error) {
        console.error('Failed to load featured vehicles:', error);
      }
    };
    loadFeatured();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchParams.type) params.set('category', searchParams.type);
    if (searchParams.make) params.set('make', searchParams.make);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams.location) params.set('city', searchParams.location);
    navigate(`/listings?${params.toString()}`);
  };

  const categories = [
    {
      id: 'car',
      name: 'Cars & SUVs',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      count: '1,200+'
    },
    {
      id: 'motorcycle',
      name: 'Motorcycles',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
      count: '800+'
    },
    {
      id: 'scooter',
      name: 'Scooters',
      image: 'https://images.unsplash.com/photo-1599495908260-bb1f7e0a tries?w=800&q=80',
      count: '600+'
    },
    {
      id: 'electric',
      name: 'Electric Vehicles',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
      count: '150+'
    },
    {
      id: 'van',
      name: 'Commercial',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      count: '300+'
    }
  ];

  const ecosystemServices = [
    {
      icon: Shield,
      title: 'Vehicle Passport',
      description: 'Independent inspections with verified history',
      link: '/passport',
      color: 'forest'
    },
    {
      icon: Gauge,
      title: 'My Garage',
      description: 'Track maintenance, expenses, and documents',
      link: '/garage',
      color: 'graphite'
    },
    {
      icon: Fuel,
      title: 'Workshops',
      description: 'Find trusted service centers near you',
      link: '/workshops',
      color: 'champagne'
    }
  ];

  return (
    <main className="min-h-screen bg-ivory">
      {/* Section A: Premium Navigation - handled by Navigation component */}

      {/* Section B: Cinematic Automotive Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-graphite">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85"
            alt="Premium vehicle"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full container-luxury flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal text-ivory leading-[1.1] mb-6 tracking-tight">
              Your Journey.
              <br />
              Your Vehicle.
              <br />
              <span className="text-champagne">Your Confidence.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-ivory/80 mb-10 leading-relaxed max-w-xl">
              Discover, inspect, buy, sell and care for your vehicle — all in one trusted automotive ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/listings"
                className="btn-primary px-8 py-4 text-base font-semibold rounded-sm flex items-center justify-center gap-2 group"
              >
                <span>Explore Vehicles</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sell"
                className="btn-secondary px-8 py-4 text-base font-semibold rounded-sm"
              >
                Sell Your Vehicle
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-ivory/50">
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-ivory/50 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Section C: Intelligent Vehicle Search */}
      <section className="relative -mt-20 z-10 container-luxury">
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-lg shadow-strong p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Vehicle Type
              </label>
              <select
                value={searchParams.type}
                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                className="input-field w-full"
              >
                <option value="">All Types</option>
                <option value="car">Cars & SUVs</option>
                <option value="motorcycle">Motorcycles</option>
                <option value="scooter">Scooters</option>
                <option value="electric">Electric</option>
                <option value="van">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Brand
              </label>
              <input
                type="text"
                value={searchParams.make}
                onChange={(e) => setSearchParams({ ...searchParams, make: e.target.value })}
                placeholder="Any make"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={searchParams.minPrice}
                  onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                  placeholder="Min"
                  className="input-field w-full"
                />
                <input
                  type="number"
                  value={searchParams.maxPrice}
                  onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                  placeholder="Max"
                  className="input-field w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                  placeholder="Any location"
                  className="input-field w-full pl-10"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </motion.form>
      </section>

      {/* Section D: Discover by Vehicle Category */}
      <section className="section-standard bg-ivory">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-normal text-graphite mb-3 tracking-tight">
              Discover by Category
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Find the perfect vehicle for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/listings?category=${category.id}`}
                  className="group block relative aspect-[3/4] rounded-lg overflow-hidden bg-graphite"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      // Fallback for broken images
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-xl md:text-2xl font-normal text-ivory mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-ivory/70">
                      {category.count} vehicles
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-champagne" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section E: Featured Vehicle Inventory */}
      <section className="section-standard bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-normal text-graphite mb-3 tracking-tight">
                Featured Vehicles
              </h2>
              <p className="text-lg text-muted">
                Handpicked selections from our marketplace
              </p>
            </div>
            <Link
              to="/listings"
              className="hidden md:flex items-center gap-2 text-graphite font-semibold hover:text-champagne transition-colors group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-lg">No featured vehicles available at the moment.</p>
              <Link to="/listings" className="btn-primary inline-flex items-center gap-2 mt-6">
                <span>Browse All Vehicles</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/listings" className="btn-primary inline-flex items-center gap-2">
              <span>View All Vehicles</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section F: Vehicle Passport Showcase */}
      <section className="section-standard bg-graphite text-ivory">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-champagne/10 border border-champagne/20 rounded-sm mb-6">
                <Shield className="w-4 h-4 text-champagne" />
                <span className="text-sm font-semibold text-champagne uppercase tracking-wider">
                  Verified & Trusted
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-normal mb-6 leading-tight tracking-tight">
                Vehicle Passport
              </h2>
              
              <p className="text-lg text-ivory/80 mb-8 leading-relaxed">
                Every Vehicle Passport includes a comprehensive 150-point inspection, 
                photographic evidence, and independent verification. Know exactly what you're buying 
                with complete transparency.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Independent mechanical inspection',
                  'Photographic condition report',
                  'Ownership history verification',
                  'Odometer validation',
                  'QR code authentication'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-champagne" />
                    </div>
                    <span className="text-ivory/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/passport"
                  className="btn-primary px-8 py-4 font-semibold inline-flex items-center justify-center gap-2"
                >
                  Learn More
                </Link>
                <Link
                  to="/listings?passport=true"
                  className="btn-secondary px-8 py-4 font-semibold inline-flex items-center justify-center"
                >
                  View Passport Vehicles
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-champagne/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-champagne" />
                  </div>
                  <div>
                    <p className="text-xs text-ivory/60 uppercase tracking-wider">Passport ID</p>
                    <p className="text-sm font-mono text-ivory">GS-PASS-2024-001</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-ivory/10">
                    <span className="text-ivory/70">Vehicle</span>
                    <span className="font-semibold">2022 Toyota Fortuner</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-ivory/10">
                    <span className="text-ivory/70">Inspection Date</span>
                    <span className="font-semibold">Dec 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-ivory/10">
                    <span className="text-ivory/70">Overall Condition</span>
                    <span className="font-semibold text-champagne">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-ivory/70">Verification Status</span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-forest/20 text-forest-light rounded-sm text-sm font-semibold">
                      <div className="w-2 h-2 rounded-full bg-forest-light" />
                      Verified
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-ivory/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-champagne">150+</p>
                      <p className="text-xs text-ivory/60 mt-1">Points Checked</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-champagne">42</p>
                      <p className="text-xs text-ivory/60 mt-1">Photos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-champagne">A+</p>
                      <p className="text-xs text-ivory/60 mt-1">Grade</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section G: Automotive Ecosystem */}
      <section className="section-standard bg-ivory">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-normal text-graphite mb-3 tracking-tight">
              Complete Automotive Ecosystem
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Everything you need to buy, sell, and maintain your vehicle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {ecosystemServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={service.link}
                  className="group block bg-white rounded-lg p-8 shadow-soft hover:shadow-strong transition-all duration-300 border border-graphite/5"
                >
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
                    service.color === 'forest' ? 'bg-forest/10' :
                    service.color === 'graphite' ? 'bg-graphite/10' :
                    'bg-champagne/10'
                  }`}>
                    <service.icon className={`w-7 h-7 ${
                      service.color === 'forest' ? 'text-forest' :
                      service.color === 'graphite' ? 'text-graphite' :
                      'text-champagne'
                    }`} />
                  </div>

                  <h3 className="font-display text-2xl font-normal text-graphite mb-3 group-hover:text-champagne transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-graphite font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section H: Editorial Trust Storytelling */}
      <section className="section-standard bg-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-normal text-graphite mb-6 leading-tight tracking-tight">
                Transparency You Can Trust
              </h2>
              
              <div className="space-y-6 text-lg text-muted leading-relaxed">
                <p>
                  Buying a vehicle is one of the most significant decisions you'll make. 
                  That's why Gadi-Sewa was built on a foundation of transparency and trust.
                </p>
                <p>
                  Every Vehicle Passport represents hours of independent inspection, 
                  documented evidence, and professional verification. We don't just list vehicles — 
                  we provide the information you need to make confident decisions.
                </p>
                <p>
                  From maintenance history to ownership records, from mechanical condition 
                  to market value, we ensure that what you see is what you get.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/passport"
                  className="btn-primary px-8 py-4 font-semibold inline-flex items-center justify-center gap-2"
                >
                  How It Works
                </Link>
                <Link
                  to="/listings"
                  className="btn-secondary px-8 py-4 font-semibold inline-flex items-center justify-center"
                >
                  Browse Vehicles
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-graphite">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=85"
                  alt="Vehicle inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-strong p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-semibold text-graphite text-sm">Independent Inspections</p>
                    <p className="text-xs text-muted">Certified professionals</p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Every inspection is conducted by certified professionals with no conflict of interest.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section I: Footer - handled by Footer component */}
    </main>
  );
}
