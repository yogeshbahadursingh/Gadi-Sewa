import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Car, Shield, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-obsidian focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      
      <nav 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'glass-dark shadow-ultra border-b border-gold/10' 
            : 'glass border-b border-obsidian/5'
        }`}
        aria-label="Main navigation"
      >
        <div className="container-luxury">
          <div className="flex justify-between items-center h-20">
            {/* Luxury Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-lg"
              aria-label="Gadi-Sewa home page"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-xl flex items-center justify-center shadow-gold group-hover:shadow-gold-intense transition-all duration-500 group-hover:scale-110">
                  <Car className="w-7 h-7 text-obsidian" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full border-2 border-ivory animate-pulse-gold" aria-hidden="true"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display text-2xl font-bold text-obsidian tracking-tight">
                  Gadi<span className="text-gradient-gold" aria-hidden="true">-</span>Sewa
                </h1>
                <p className="text-[10px] text-obsidian/50 uppercase tracking-[0.2em] font-medium">
                  Nepal's Premier Automotive Platform
                </p>
              </div>
            </Link>

          {/* Desktop Navigation - Premium Style */}
          <div className="hidden lg:flex items-center gap-2">
            {[
              { path: '/listings', label: 'Browse Vehicles', icon: null },
              { path: '/garage', label: 'My Garage', icon: null },
              { path: '/workshops', label: 'Workshops', icon: null },
              { path: '/finance', label: 'Finance', icon: null },
              { path: '/passport', label: 'Vehicle Passport', icon: Shield }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                  isActive(item.path)
                    ? 'text-obsidian bg-gold/10'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-obsidian/5'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.icon && <item.icon className="w-4 h-4 inline mr-1.5" aria-hidden="true" />}
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-gold to-gold-dark rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Premium Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-obsidian/70 hover:text-obsidian transition-all duration-300 rounded-full hover:bg-obsidian/5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                  aria-label={`Dashboard for ${user?.firstName}`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center" aria-hidden="true">
                    <User className="w-4 h-4 text-obsidian" aria-hidden="true" />
                  </div>
                  <span>{user?.firstName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-5 py-2 text-sm font-medium text-obsidian/60 hover:text-obsidian transition-all duration-300 rounded-full hover:bg-obsidian/5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                  aria-label="Logout from your account"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-sm font-medium text-obsidian/70 hover:text-obsidian transition-all duration-300 rounded-full hover:bg-obsidian/5 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn-luxury btn-gold px-6 py-2.5 text-sm font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Luxury Style */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 text-obsidian hover:bg-obsidian/5 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass-dark border-t border-gold/10"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="container-luxury py-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-ivory/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center shadow-gold">
                    <Car className="w-6 h-6 text-obsidian" strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-ivory">Gadi-Sewa</h2>
                    <p className="text-[10px] text-ivory/50 uppercase tracking-wider">Navigation Menu</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-ivory/60 hover:text-ivory hover:bg-ivory/5 rounded-full transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <div className="space-y-2 mb-6">
                {[
                  { path: '/listings', label: 'Browse Vehicles', icon: Car },
                  { path: '/garage', label: 'My Garage', icon: Car },
                  { path: '/workshops', label: 'Workshops', icon: Car },
                  { path: '/finance', label: 'Finance', icon: Car },
                  { path: '/passport', label: 'Vehicle Passport', icon: Shield }
                ].map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={item.path} 
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-obsidian bg-gold/10 border-l-4 border-gold'
                          : 'text-ivory/80 hover:text-ivory hover:bg-ivory/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                      <span>{item.label}</span>
                      {isActive(item.path) && (
                        <span className="ml-auto w-2 h-2 bg-gold rounded-full" aria-hidden="true"></span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Auth Section */}
              <div className="pt-4 border-t border-ivory/10">
                {isAuthenticated ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mb-2"
                    >
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-ivory/80 hover:text-ivory hover:bg-ivory/5 rounded-xl transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center" aria-hidden="true">
                          <User className="w-4 h-4 text-obsidian" aria-hidden="true" />
                        </div>
                        <span>Dashboard</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button 
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-base font-medium text-ivory/80 hover:text-ivory hover:bg-ivory/5 rounded-xl transition-all duration-300"
                      >
                        <span className="w-5 h-5" aria-hidden="true"></span>
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mb-2"
                    >
                      <Link 
                        to="/login" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-ivory/80 hover:text-ivory hover:bg-ivory/5 rounded-xl transition-all duration-300"
                      >
                        <span className="w-5 h-5" aria-hidden="true"></span>
                        <span>Sign In</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link 
                        to="/register" 
                        onClick={() => setIsOpen(false)}
                        className="block mx-4 mt-2 px-6 py-3 btn-luxury btn-gold text-center text-sm font-semibold rounded-full"
                      >
                        Get Started
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile Menu Footer */}
              <div className="mt-6 pt-4 border-t border-ivory/10">
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-ivory/50">
                  <Shield className="w-4 h-4 text-gold" aria-hidden="true" />
                  <span>Nepal's Premier Automotive Platform</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}
