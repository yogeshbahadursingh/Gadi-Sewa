import { Link } from 'react-router-dom';
import { Car, Shield, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian text-ivory mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-obsidian" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Gadi-Sewa</h3>
                <p className="text-xs text-ivory/60">Nepal's Trusted Marketplace</p>
              </div>
            </div>
            <p className="text-sm text-ivory/70 mb-4">
              Buy, sell and verify vehicles with confidence. Independent inspections and transparent histories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-ivory/60 hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-ivory/60 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-ivory/60 hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/listings" className="text-ivory/70 hover:text-gold transition-colors">Browse Vehicles</Link></li>
              <li><Link to="/sell" className="text-ivory/70 hover:text-gold transition-colors">Sell Your Vehicle</Link></li>
              <li><Link to="/passport" className="text-ivory/70 hover:text-gold transition-colors">Vehicle Passport</Link></li>
              <li><Link to="/finance" className="text-ivory/70 hover:text-gold transition-colors">Finance Options</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/garage" className="text-ivory/70 hover:text-gold transition-colors">My Garage</Link></li>
              <li><Link to="/workshops" className="text-ivory/70 hover:text-gold transition-colors">Find Workshops</Link></li>
              <li><a href="#" className="text-ivory/70 hover:text-gold transition-colors">Roadside Assistance</a></li>
              <li><a href="#" className="text-ivory/70 hover:text-gold transition-colors">Vehicle Valuation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-ivory/70 hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#" className="text-ivory/70 hover:text-gold transition-colors">Contact</a></li>
              <li><a href="#" className="text-ivory/70 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-ivory/70 hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ivory/60">
            © {new Date().getFullYear()} Gadi-Sewa. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-ivory/60">
            <Shield className="w-4 h-4 text-gold" />
            <span>Verified & Trusted Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
