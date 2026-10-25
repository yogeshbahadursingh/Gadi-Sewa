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
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-dark shadow-ultra border-b border-gold/10' 
        : 'glass border-b border-obsidian/5'
    }`}>
      <div className="container-luxury">
        <div className="flex justify-between items-center h-20">
          {/* Luxury Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-xl flex items-center justify-center shadow-gold group-hover:shadow-gold-intense transition-all duration-500 group-hover:scale-110">
                <Car className="w-7 h-7 text-obsidian" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full border-2 border-ivory animate-pulse-gold"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-2xl font-bold text-obsidian tracking-tight">
                Gadi<span className="text-gradient-gold">-</span>Sewa
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
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-obsidian bg-gold/10'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-obsidian/5'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 inline mr-1.5" />}
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-gold to-gold-dark rounded-full"
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-obsidian/70 hover:text-obsidian transition-all duration-300 rounded-full hover:bg-obsidian/5"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-obsidian" />
                  </div>
                  <span>{user?.firstName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-5 py-2 text-sm font-medium text-obsidian/60 hover:text-obsidian transition-all duration-300 rounded-full hover:bg-obsidian/5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-sm font-medium text-obsidian/70 hover:text-obsidian transition-all duration-300 rounded-full hover:bg-obsidian/5"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn-luxury btn-gold px-6 py-2.5 text-sm font-semibold rounded-full"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Luxury Style */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 text-obsidian hover:bg-obsidian/5 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass-dark border-t border-gold/10"
          >
            <div className="container-luxury py-6 space-y-2">
              {[
                { path: '/listings', label: 'Browse Vehicles' },
                { path: '/garage', label: 'My Garage' },
                { path: '/workshops', label: 'Workshops' },
                { path: '/finance', label: 'Finance' },
                { path: '/passport', label: 'Vehicle Passport' }
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
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-obsidian bg-gold/10'
                        : 'text-ivory/80 hover:text-ivory hover:bg-ivory/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-ivory/10">
                {isAuthenticated ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-ivory/80 hover:text-ivory hover:bg-ivory/5 rounded-xl transition-all duration-300"
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button 
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="block w-full text-left px-4 py-3 text-base font-medium text-ivory/80 hover:text-ivory hover:bg-ivory/5 rounded-xl transition-all duration-300"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Link 
                        to="/login" 
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-ivory/80 hover:text-ivory hover:bg-ivory/5 rounded-xl transition-all duration-300"
                      >
                        Sign In
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
