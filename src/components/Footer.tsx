import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GadiBazar</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Nepal's trusted vehicle marketplace. Buy, sell, and verify vehicles with complete transparency.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-sm hover:text-white transition-colors">
                  Buy Vehicles
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-sm hover:text-white transition-colors">
                  Sell Vehicle
                </Link>
              </li>
              <li>
                <Link to="/inspect" className="text-sm hover:text-white transition-colors">
                  Book Inspection
                </Link>
              </li>
              <li>
                <Link to="/valuation" className="text-sm hover:text-white transition-colors">
                  Vehicle Valuation
                </Link>
              </li>
              <li>
                <Link to="/finance" className="text-sm hover:text-white transition-colors">
                  Finance Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/verify" className="text-sm hover:text-white transition-colors">
                  Verify Passport
                </Link>
              </li>
              <li>
                <Link to="/transfer" className="text-sm hover:text-white transition-colors">
                  Ownership Transfer
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="text-sm hover:text-white transition-colors">
                  Insurance
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm hover:text-white transition-colors">
                  Service Partners
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-white transition-colors">
                  Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Pulchowk, Lalitpur<br />Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+9771234567890" className="text-sm hover:text-white transition-colors">
                  +977 1-234-5678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:support@gadibazar.com" className="text-sm hover:text-white transition-colors">
                  support@gadibazar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 GadiBazar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
