import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Shield, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian-deep text-ivory mt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-luxury opacity-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald/5 rounded-full blur-3xl"></div>
      
      <div className="container-luxury relative z-10 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Premium Logo */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-xl flex items-center justify-center shadow-gold">
                    <Car className="w-8 h-8 text-obsidian" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full border-2 border-obsidian animate-pulse-gold"></div>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-tight">
                    Gadi<span className="text-gradient-gold">-</span>Sewa
                  </h3>
                  <p className="text-xs text-ivory/50 uppercase tracking-[0.2em] font-medium mt-1">
                    Nepal's Premier Automotive Platform
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-ivory/70 mb-6 leading-relaxed max-w-md">
                Experience Nepal's most trusted automotive marketplace. Independent inspections, 
                transparent histories, and the revolutionary Vehicle Passport system.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-ivory/60">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-sm">Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center gap-3 text-ivory/60">
                  <Phone className="w-4 h-4 text-gold" />
                  <span className="text-sm">+977-1-XXXXXXX</span>
                </div>
                <div className="flex items-center gap-3 text-ivory/60">
                  <Mail className="w-4 h-4 text-gold" />
                  <span className="text-sm">support@gadi-sewa.com</span>
                </div>
              </div>
              
              {/* Social Links - Enhanced */}
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 bg-ivory/5 border border-ivory/10 rounded-full flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-ivory/60 group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Marketplace Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-bold text-gold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
              Marketplace
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/listings', label: 'Browse Vehicles' },
                { to: '/sell', label: 'Sell Your Vehicle' },
                { to: '/passport', label: 'Vehicle Passport' },
                { to: '/finance', label: 'Finance Options' }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-ivory/70 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-bold text-gold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/garage', label: 'My Garage' },
                { to: '/workshops', label: 'Find Workshops' },
                { to: '/inspect/book', label: 'Book Inspection' },
                { to: '/inspect/history', label: 'Inspection History' }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-ivory/70 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-bold text-gold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us' },
                { label: 'Contact' },
                { label: 'Privacy Policy' },
                { label: 'Terms of Service' }
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href="#" 
                    className="text-ivory/70 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold group-hover:w-2 transition-all"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-ivory/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-ivory/60 text-center md:text-left">
              © {new Date().getFullYear()} Gadi-Sewa. All rights reserved.
            </p>
            
            {/* Trust Badge */}
            <div className="flex items-center gap-3 px-6 py-3 bg-ivory/5 border border-ivory/10 rounded-full backdrop-blur-sm">
              <Shield className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium text-ivory/80">Verified & Trusted Platform</span>
            </div>
            
            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm text-ivory/60">
              <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
              <a href="#" className="hover:text-gold transition-colors">Help</a>
              <a href="#" className="hover:text-gold transition-colors">Careers</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
