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
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-mesh-luxury opacity-30"></div>
        
        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-emerald/10 rounded-full blur-3xl"
        />

        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 glass-gold rounded-full mb-8"
              >
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse-gold"></div>
                <span className="text-sm font-semibold text-ivory tracking-wide">
                  Nepal's Premier Automotive Platform
                </span>
              </motion.div>

              {/* Hero Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-6 leading-[1.1] tracking-tight"
              >
                Discover Your
                <span className="block text-gradient-gold mt-2">Perfect Vehicle</span>
              </motion.h1>

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

            {/* Right Content - Featured Vehicle Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {featuredVehicles.length > 0 && (
                <div className="relative">
                  {/* Main Featured Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="card-luxury bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-ultra"
                  >
                    <div className="aspect-[4/3] bg-obsidian/20 relative overflow-hidden">
                      {featuredVehicles[0].images?.[0]?.url ? (
                        <img 
                          src={featuredVehicles[0].images[0].url} 
                          alt={featuredVehicles[0].model}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car className="w-24 h-24 text-ivory/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent"></div>
                      
                      {/* Vehicle Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          {featuredVehicles[0].hasPassport && (
                            <span className="badge-luxury badge-emerald text-xs">
                              <Shield className="w-3 h-3" />
                              Passport Verified
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-ivory mb-1">
                          {featuredVehicles[0].year} {featuredVehicles[0].make} {featuredVehicles[0].model}
                        </h3>
                        <p className="text-ivory/70 text-sm mb-3">
                          {featuredVehicles[0].city}, {featuredVehicles[0].province}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-gradient-gold">
                            {formatPrice(featuredVehicles[0].price)}
                          </span>
                          <div className="flex items-center gap-2 text-ivory/60 text-sm">
                            <Eye className="w-4 h-4" />
                            <span>{featuredVehicles[0].views} views</span>
                          </div>
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
