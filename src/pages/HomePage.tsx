import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Car, Wrench, TrendingUp, CheckCircle, ArrowRight, Star, MapPin, Eye } from 'lucide-react';
import { api } from '../services/api';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);

  useEffect(() => {
    const loadFeatured = async () => {
      const { vehicles } = await api.getAllVehicles({});
      setFeaturedVehicles(vehicles.slice(0, 3));
    };
    loadFeatured();
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `रू ${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `रू ${(price / 100000).toFixed(2)} Lakh`;
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  return (
    <main className="min-h-screen bg-ivory">
      {/* Cinematic Hero Section - Editorial Asymmetric Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">
        {/* Sophisticated Background with Depth */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian-deep"></div>
          <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
          
          {/* Architectural Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(198, 165, 107, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(198, 165, 107, 0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Sophisticated Light Effects */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-gold/8 via-gold/4 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald/10 via-emerald/5 to-transparent rounded-full blur-3xl"
        />

        <div className="container-luxury relative z-10 py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content - Editorial Typography */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              {/* Premium Badge with Refined Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-full mb-10 backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-gold rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm font-semibold text-ivory tracking-wider uppercase">
                  Nepal's Premier Automotive Platform
                </span>
              </motion.div>

              {/* Hero Headline - Editorial Style */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-ivory leading-[0.95] tracking-tight mb-2">
                  Discover
                </h1>
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-2">
                  <span className="text-gradient-gold">Your Perfect</span>
                </h1>
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-ivory leading-[0.95] tracking-tight">
                  Vehicle
                </h1>
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-ivory/70 mb-10 leading-relaxed max-w-lg"
              >
                Experience Nepal's most trusted automotive marketplace. 
                Independent inspections, transparent histories, and the revolutionary 
                Vehicle Passport system.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link 
                  to="/listings"
                  className="btn-luxury btn-gold px-8 py-4 text-base font-semibold rounded-full flex items-center justify-center gap-3 group"
                >
                  <span>Browse Vehicles</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/sell"
                  className="px-8 py-4 border-2 border-ivory/30 text-ivory text-base font-semibold rounded-full hover:bg-ivory/10 hover:border-ivory/50 transition-all duration-300 backdrop-blur-sm"
                >
                  Sell Your Vehicle
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center gap-8 text-ivory/60"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald" />
                  <span className="text-sm font-medium">Verified Listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium">Independent Inspections</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Vehicle Showcase - Editorial Style */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block lg:col-span-5"
            >
              {featuredVehicles.length > 0 && (
                <div className="relative">
                  {/* Main Featured Card - Premium Presentation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                  >
                    {/* Sophisticated Frame */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-gold/5 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    
                    <div className="relative card-luxury bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-ultra">
                      <div className="aspect-[4/3] bg-obsidian/20 relative overflow-hidden">
                        {featuredVehicles[0].images?.[0]?.url ? (
                          <img 
                            src={featuredVehicles[0].images[0].url} 
                            alt={featuredVehicles[0].model}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-obsidian-light to-obsidian">
                            <Car className="w-24 h-24 text-ivory/20" />
                          </div>
                        )}
                        
                        {/* Sophisticated Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
                        
                        {/* Premium Badge - Top Right */}
                        <div className="absolute top-6 right-6">
                          {featuredVehicles[0].hasPassport && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 }}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald/90 backdrop-blur-md rounded-full border border-emerald-light/30 shadow-lg"
                            >
                              <Shield className="w-4 h-4 text-ivory" />
                              <span className="text-xs font-bold text-ivory tracking-wide uppercase">Verified</span>
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Vehicle Info Overlay - Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                          >
                            <h3 className="font-display text-3xl font-bold text-ivory mb-2 leading-tight">
                              {featuredVehicles[0].year} {featuredVehicles[0].make} {featuredVehicles[0].model}
                            </h3>
                            {featuredVehicles[0].variant && (
                              <p className="text-ivory/60 text-sm mb-3 font-medium">
                                {featuredVehicles[0].variant}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-ivory/70 text-sm mb-4">
                              <MapPin className="w-4 h-4" />
                              <span>{featuredVehicles[0].city}, {featuredVehicles[0].province}</span>
                            </div>
                            
                            {/* Price and Stats */}
                            <div className="flex items-end justify-between pt-4 border-t border-white/10">
                              <div>
                                <p className="text-xs text-ivory/50 uppercase tracking-wider mb-1">Starting from</p>
                                <p className="text-4xl font-bold text-gradient-gold leading-none">
                                  {formatPrice(featuredVehicles[0].price)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-ivory/60 text-sm">
                                <Eye className="w-4 h-4" />
                                <span className="font-medium">{featuredVehicles[0].views}</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Stats Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="absolute -bottom-8 -left-8 card-luxury bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-ultra"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald to-emerald-light rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-ivory" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-obsidian">70%</p>
                        <p className="text-xs text-obsidian/60">Vehicles Verified</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -top-6 -right-6 card-luxury bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-ultra"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6 text-obsidian" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-obsidian">4.8★</p>
                        <p className="text-xs text-obsidian/60">User Rating</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-ivory/40"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-ivory/40 to-transparent"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Editorial Category Discovery Section */}
      <section className="section-luxury bg-ivory relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(11, 17, 25, 0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 block">
                  Explore by Category
                </span>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-obsidian tracking-tight leading-[0.95]">
                  Find Your
                  <span className="block text-gradient-gold mt-2">Perfect Match</span>
                </h2>
              </div>
              <Link 
                to="/listings"
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-obsidian hover:text-gold transition-colors group"
              >
                <span>View All Vehicles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Editorial Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Large Feature - Cars & SUVs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-12 lg:col-span-8"
            >
              <Link to="/listings?category=car" className="group block relative aspect-[16/9] rounded-3xl overflow-hidden card-luxury">
                <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian-deep"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent"></div>
                
                {/* Decorative Element */}
                <div className="absolute top-8 right-8 w-32 h-32 border border-gold/20 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute top-12 right-12 w-24 h-24 border border-gold/30 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="relative h-full p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center shadow-gold">
                      <Car className="w-6 h-6 text-obsidian" />
                    </div>
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">Premium Selection</span>
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-ivory mb-3 leading-tight group-hover:text-gradient-gold transition-all duration-500">
                    Cars & SUVs
                  </h3>
                  <p className="text-ivory/70 text-lg mb-6 max-w-md">
                    Discover luxury sedans, powerful SUVs, and family vehicles from Nepal's trusted sellers.
                  </p>
                  <div className="flex items-center gap-2 text-ivory font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Small Feature - Motorcycles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <Link to="/listings?category=motorcycle" className="group block relative aspect-[4/5] rounded-3xl overflow-hidden card-luxury">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald via-emerald-light to-emerald-deep"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent"></div>
                
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <TrendingUp className="w-6 h-6 text-ivory" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-ivory mb-2 group-hover:text-gradient-gold transition-all duration-500">
                    Motorcycles
                  </h3>
                  <p className="text-ivory/70 text-sm mb-4">
                    Adventure bikes, commuters, and premium motorcycles.
                  </p>
                  <div className="flex items-center gap-2 text-ivory text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Small Feature - Electric Vehicles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <Link to="/listings?category=electric" className="group block relative aspect-[4/5] rounded-3xl overflow-hidden card-luxury">
                <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold-dark to-obsidian"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent"></div>
                
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20">
                    <Star className="w-6 h-6 text-ivory" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-ivory mb-2 group-hover:text-gradient-gold transition-all duration-500">
                    Electric Vehicles
                  </h3>
                  <p className="text-ivory/70 text-sm mb-4">
                    The future of mobility. Zero emissions, maximum performance.
                  </p>
                  <div className="flex items-center gap-2 text-ivory text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Go Electric</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Wide Feature - Scooters & Commercial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-12 lg:col-span-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/listings?category=scooter" className="group block relative aspect-[16/10] rounded-3xl overflow-hidden card-luxury">
                  <div className="absolute inset-0 bg-gradient-to-br from-platinum via-platinum-light to-ivory-dark"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent"></div>
                  
                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <h3 className="font-display text-2xl font-bold text-ivory mb-2 group-hover:text-gradient-gold transition-all duration-500">
                      Scooters
                    </h3>
                    <p className="text-ivory/70 text-sm mb-3">
                      Urban mobility solutions for city life.
                    </p>
                    <div className="flex items-center gap-2 text-ivory text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Browse</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                <Link to="/listings?category=van" className="group block relative aspect-[16/10] rounded-3xl overflow-hidden card-luxury">
                  <div className="absolute inset-0 bg-gradient-to-br from-obsidian-light via-obsidian to-obsidian-deep"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent"></div>
                  
                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <h3 className="font-display text-2xl font-bold text-ivory mb-2 group-hover:text-gradient-gold transition-all duration-500">
                      Commercial
                    </h3>
                    <p className="text-ivory/70 text-sm mb-3">
                      Vans, trucks, and business vehicles.
                    </p>
                    <div className="flex items-center gap-2 text-ivory text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="section-luxury bg-ivory-warm">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge-luxury badge-gold mb-4 inline-flex">
              Why Choose Gadi-Sewa
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-obsidian mb-4 tracking-tight">
              The Future of Automotive
              <span className="block text-gradient-gold mt-2">Commerce in Nepal</span>
            </h2>
            <p className="text-lg text-obsidian/70 max-w-2xl mx-auto">
              We're not just a marketplace. We're building trust in Nepal's automotive industry 
              through transparency, verification, and premium service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Vehicle Passport',
                description: 'Independent inspections with verified history. Know exactly what you\'re buying with our revolutionary passport system.',
                color: 'from-emerald to-emerald-light',
                delay: 0
              },
              {
                icon: Wrench,
                title: 'Trusted Workshops',
                description: 'Connect with verified mechanics and service centers across Nepal. Quality service guaranteed.',
                color: 'from-gold to-gold-dark',
                delay: 0.1
              },
              {
                icon: TrendingUp,
                title: 'Smart Valuation',
                description: 'Get accurate vehicle valuations based on real market data. Make informed decisions.',
                color: 'from-obsidian to-obsidian-light',
                delay: 0.2
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="card-luxury p-8 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 text-ivory" />
                </div>
                <h3 className="font-display text-2xl font-bold text-obsidian mb-3 group-hover:text-gradient-gold transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-obsidian/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Premium Steps */}
      <section className="section-luxury bg-gradient-to-b from-ivory to-ivory-warm">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-luxury badge-obsidian mb-4 inline-flex">
              Simple Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-obsidian mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-obsidian/70">
              Simple, transparent, and secure vehicle transactions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Browse', description: 'Explore thousands of verified vehicles', icon: Eye },
              { step: '02', title: 'Inspect', description: 'Request independent vehicle inspection', icon: Shield },
              { step: '03', title: 'Verify', description: 'Review Vehicle Passport with full history', icon: CheckCircle },
              { step: '04', title: 'Buy', description: 'Purchase with confidence and transparency', icon: Car }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="card-luxury p-8 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-gold">
                    <span className="font-display text-3xl font-bold text-obsidian">{item.step}</span>
                  </div>
                  <item.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-obsidian mb-2">{item.title}</h3>
                  <p className="text-obsidian/70 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gold to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Luxury Dark */}
      <section className="section-luxury bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        
        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory mb-6 tracking-tight">
              Ready to Experience
              <span className="block text-gradient-gold mt-2">The Future?</span>
            </h2>
            <p className="text-xl text-ivory/70 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied buyers and sellers on Nepal's most trusted vehicle platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="btn-luxury btn-gold px-10 py-4 text-base font-semibold rounded-full"
              >
                Create Account
              </Link>
              <Link 
                to="/listings"
                className="px-10 py-4 border-2 border-ivory/30 text-ivory text-base font-semibold rounded-full hover:bg-ivory/10 hover:border-ivory/50 transition-all duration-300 backdrop-blur-sm"
              >
                Browse Vehicles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
