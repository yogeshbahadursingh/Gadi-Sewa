import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction, ShieldCheck, Wrench, Car, Users, Building2, Calculator, Heart, MapPin, Info, Phone } from 'lucide-react';

const pageMeta: Record<string, { title: string; description: string; icon: React.ReactNode; phase: string }> = {
  '/inspect': {
    title: 'Book an Inspection',
    description: 'Request an independent vehicle inspection from a certified Gadi-Sewa inspector. Available across all 7 provinces of Nepal.',
    icon: <Wrench className="w-6 h-6" />,
    phase: 'Phase C',
  },
  '/garage': {
    title: 'My Garage',
    description: 'Track your vehicles, maintenance schedules, service history and documents in one secure place.',
    icon: <Car className="w-6 h-6" />,
    phase: 'Phase D',
  },
  '/workshops': {
    title: 'Find Workshops',
    description: 'Discover trusted garages and service centres near you, with verified reviews and specialisations.',
    icon: <Building2 className="w-6 h-6" />,
    phase: 'Phase D',
  },
  '/valuation': {
    title: 'Vehicle Valuation',
    description: 'Evidence-informed market pricing for your vehicle, with transparent confidence levels.',
    icon: <Calculator className="w-6 h-6" />,
    phase: 'Phase E',
  },
  '/dealer': {
    title: 'Dealer Registration',
    description: 'Join Nepal\'s most trusted vehicle marketplace. Manage inventory, leads and performance from one dashboard.',
    icon: <Building2 className="w-6 h-6" />,
    phase: 'Phase B',
  },
  '/pricing': {
    title: 'Pricing Plans',
    description: 'Flexible listing plans for private sellers and dealers. Start free, upgrade when you need more.',
    icon: <Info className="w-6 h-6" />,
    phase: 'Phase B',
  },
  '/seller-guide': {
    title: 'Seller Guide',
    description: 'Everything you need to know about listing and selling your vehicle on Gadi-Sewa.',
    icon: <Info className="w-6 h-6" />,
    phase: 'Phase B',
  },
  '/about': {
    title: 'About Gadi-Sewa',
    description: 'Nepal\'s trusted digital home for every vehicle. Built on transparency, evidence and independence.',
    icon: <ShieldCheck className="w-6 h-6" />,
    phase: 'Phase A',
  },
  '/how-it-works': {
    title: 'How It Works',
    description: 'A simple guide to buying, selling and verifying vehicles on Gadi-Sewa.',
    icon: <Info className="w-6 h-6" />,
    phase: 'Phase A',
  },
  '/trust': {
    title: 'Trust & Safety',
    description: 'How we protect buyers and sellers, and what to watch out for when transacting.',
    icon: <ShieldCheck className="w-6 h-6" />,
    phase: 'Phase C',
  },
  '/careers': {
    title: 'Careers',
    description: 'Join our team building Nepal\'s most trusted automotive platform.',
    icon: <Users className="w-6 h-6" />,
    phase: 'Phase A',
  },
  '/contact': {
    title: 'Contact Us',
    description: 'Get in touch with the Gadi-Sewa team. We\'re here to help.',
    icon: <Phone className="w-6 h-6" />,
    phase: 'Phase A',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How we collect, use and protect your personal information.',
    icon: <ShieldCheck className="w-6 h-6" />,
    phase: 'Phase A',
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'The terms governing your use of the Gadi-Sewa platform.',
    icon: <Info className="w-6 h-6" />,
    phase: 'Phase A',
  },
  '/cookies': {
    title: 'Cookie Policy',
    description: 'How we use cookies and similar technologies on Gadi-Sewa.',
    icon: <Info className="w-6 h-6" />,
    phase: 'Phase A',
  },
};

export default function ComingSoonPage() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] || {
    title: 'Coming Soon',
    description: 'This section of Gadi-Sewa is being built. Check back soon.',
    icon: <Construction className="w-6 h-6" />,
    phase: 'Upcoming',
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-obsidian/[0.04] mb-8">
            <span className="text-gold">{meta.icon}</span>
          </div>

          {/* Phase badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold-dark text-xs font-medium mb-6">
            <Construction className="w-3 h-3" />
            {meta.phase} — In Development
          </span>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian mb-4">
            {meta.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-warm leading-relaxed max-w-xl mx-auto mb-10">
            {meta.description}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Return Home
            </Link>
            <Link
              to="/passport"
              className="inline-flex items-center gap-2 px-6 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-full hover:border-gold/30 transition-colors"
            >
              Explore Vehicle Passport
            </Link>
          </div>
        </motion.div>

        {/* Related links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-obsidian/[0.06]"
        >
          <h2 className="text-sm font-semibold text-obsidian/50 uppercase tracking-wider text-center mb-6">
            Available Now
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { to: '/listings', label: 'Browse Vehicles', desc: 'Search all listings' },
              { to: '/passport', label: 'Vehicle Passport', desc: 'Learn about verification' },
              { to: '/sell', label: 'Sell Your Vehicle', desc: 'Start a listing' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block p-4 bg-white rounded-xl border border-obsidian/[0.04] hover:border-gold/20 transition-colors text-center"
              >
                <p className="text-sm font-semibold text-obsidian">{link.label}</p>
                <p className="text-xs text-slate-warm mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
