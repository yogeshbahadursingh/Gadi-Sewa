import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Car, Wrench, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-pattern-nepal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-gold-dark">Nepal's Most Trusted Platform</span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-obsidian mb-6 leading-tight">
                Find Your Perfect
                <span className="block text-gradient-gold">Vehicle in Nepal</span>
              </h1>
              
              <p className="text-lg text-obsidian/70 mb-8 leading-relaxed">
                Buy, sell and verify vehicles with confidence. Independent inspections, 
                transparent histories, and the revolutionary Vehicle Passport system.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/listings"
                  className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-full shadow-gold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Browse Vehicles
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/sell"
                  className="px-8 py-4 border-2 border-obsidian text-obsidian font-semibold rounded-full hover:bg-obsidian hover:text-ivory transition-all"
                >
                  Sell Your Vehicle
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-obsidian/5 to-obsidian/10 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Car className="w-32 h-32 text-gold mx-auto mb-4" />
                  <p className="text-obsidian/60 text-sm">Premium Vehicle Marketplace</p>
                </div>
              </div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 right-8 bg-white rounded-2xl shadow-medium p-4"
              >
                <Shield className="w-8 h-8 text-emerald mb-2" />
                <p className="text-xs font-semibold text-obsidian">Verified</p>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-medium p-4"
              >
                <Wrench className="w-8 h-8 text-gold mb-2" />
                <p className="text-xs font-semibold text-obsidian">Inspected</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-obsidian mb-4">
              Why Choose Gadi-Sewa?
            </h2>
            <p className="text-lg text-obsidian/70 max-w-2xl mx-auto">
              We're not just a marketplace. We're building trust in Nepal's automotive industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Vehicle Passport',
                description: 'Independent inspections with verified history. Know exactly what you\'re buying.',
                color: 'text-emerald'
              },
              {
                icon: Wrench,
                title: 'Trusted Workshops',
                description: 'Connect with verified mechanics and service centers across Nepal.',
                color: 'text-gold'
              },
              {
                icon: TrendingUp,
                title: 'Smart Valuation',
                description: 'Get accurate vehicle valuations based on real market data.',
                color: 'text-gold-dark'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-ivory rounded-2xl p-8 card-premium"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="font-display text-xl font-bold text-obsidian mb-3">
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

      {/* How It Works */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-obsidian mb-4">
              How It Works
            </h2>
            <p className="text-lg text-obsidian/70">
              Simple, transparent, and secure vehicle transactions
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Browse', description: 'Explore thousands of verified vehicles' },
              { step: '02', title: 'Inspect', description: 'Request independent vehicle inspection' },
              { step: '03', title: 'Verify', description: 'Review Vehicle Passport with full history' },
              { step: '04', title: 'Buy', description: 'Purchase with confidence and transparency' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-gold">
                  <span className="font-display text-2xl font-bold text-obsidian">{item.step}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-obsidian mb-2">{item.title}</h3>
                <p className="text-obsidian/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-obsidian to-obsidian-light text-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-ivory/80 mb-8">
              Join thousands of satisfied buyers and sellers on Nepal's most trusted vehicle platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-full shadow-gold hover:shadow-lg transition-all"
              >
                Create Account
              </Link>
              <Link 
                to="/listings"
                className="px-8 py-4 border-2 border-ivory text-ivory font-semibold rounded-full hover:bg-ivory hover:text-obsidian transition-all"
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
