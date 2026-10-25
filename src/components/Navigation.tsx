import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Car, Shield, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-obsidian/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center shadow-gold group-hover:shadow-lg transition-shadow">
              <Car className="w-6 h-6 text-obsidian" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-obsidian">Gadi-Sewa</h1>
              <p className="text-xs text-obsidian/60 -mt-1">Nepal's Trusted Marketplace</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/listings" 
              className={`text-sm font-medium transition-colors ${
                isActive('/listings') ? 'text-gold' : 'text-obsidian/70 hover:text-obsidian'
              }`}
            >
              Browse Vehicles
            </Link>
            <Link 
              to="/garage" 
              className={`text-sm font-medium transition-colors ${
                isActive('/garage') ? 'text-gold' : 'text-obsidian/70 hover:text-obsidian'
              }`}
            >
              My Garage
            </Link>
            <Link 
              to="/workshops" 
              className={`text-sm font-medium transition-colors ${
                isActive('/workshops') ? 'text-gold' : 'text-obsidian/70 hover:text-obsidian'
              }`}
            >
              Workshops
            </Link>
            <Link 
              to="/finance" 
              className={`text-sm font-medium transition-colors ${
                isActive('/finance') ? 'text-gold' : 'text-obsidian/70 hover:text-obsidian'
              }`}
            >
              Finance
            </Link>
            <Link 
              to="/passport" 
              className={`text-sm font-medium transition-colors ${
                isActive('/passport') ? 'text-gold' : 'text-obsidian/70 hover:text-obsidian'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-1" />
              Vehicle Passport
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-obsidian/70 hover:text-obsidian transition-colors">
                  <User className="w-4 h-4" />
                  {user?.firstName}
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-obsidian/70 hover:text-obsidian transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-obsidian/70 hover:text-obsidian transition-colors">
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-obsidian text-sm font-semibold rounded-full shadow-gold hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-obsidian"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-obsidian/5 bg-ivory"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/listings" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian">
                Browse Vehicles
              </Link>
              <Link to="/garage" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian">
                My Garage
              </Link>
              <Link to="/workshops" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian">
                Workshops
              </Link>
              <Link to="/finance" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian">
                Finance
              </Link>
              <Link to="/passport" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian">
                Vehicle Passport
              </Link>
              <div className="pt-4 border-t border-obsidian/5">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian mb-2">
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-obsidian/70 hover:text-obsidian mb-2">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-gold">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
