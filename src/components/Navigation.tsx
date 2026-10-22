import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Shield, ChevronDown, Car, Bike, Zap, Wrench, ShieldCheck, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isHomePage = location.pathname === '/';
  const isDark = isHomePage && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/listings') {
      return location.pathname === '/listings';
    }
    return location.pathname === path;
  };

  const textColor = isDark ? 'text-ivory/90' : 'text-obsidian/70';
  const textColorHover = isDark ? 'hover:text-ivory' : 'hover:text-obsidian';
  const logoColor = isDark ? 'text-ivory' : 'text-obsidian';
  const logoSubColor = isDark ? 'text-ivory/50' : 'text-slate-warm';

  const moreLinks = [
    { to: '/listings?category=motorcycle', label: 'Motorcycles', icon: <Bike className="w-4 h-4" /> },
    { to: '/listings?category=scooter', label: 'Scooters', icon: <Bike className="w-4 h-4" /> },
    { to: '/listings?category=van', label: 'Commercial', icon: <Car className="w-4 h-4" /> },
    { to: '/passport', label: 'Vehicle Passport', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHomePage
          ? 'glass shadow-[var(--shadow-soft)] border-b border-[var(--color-border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Gadi-Sewa Home">
            <div className="relative">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                isDark ? 'bg-ivory/10 group-hover:bg-ivory/20' : 'bg-obsidian group-hover:bg-emerald'
              }`}>
                <Shield className="w-5 h-5 text-gold" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-lg font-semibold leading-tight tracking-tight transition-colors duration-300 ${logoColor}`}>
                Gadi<span className="text-gold">-</span>Sewa
              </span>
              <span className={`text-[9px] uppercase tracking-[0.2em] font-medium hidden sm:block transition-colors duration-300 ${logoSubColor}`}>
                Nepal's Vehicle Trust
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link
              to="/listings"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${textColor} ${textColorHover} ${
                isActive('/listings') ? 'text-gold' : ''
              }`}
            >
              Buy
            </Link>
            <Link
              to="/listings?category=electric"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${textColor} ${textColorHover}`}
            >
              Electric
            </Link>
            <Link
              to="/passport"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${textColor} ${textColorHover} ${
                isActive('/passport') ? 'text-gold' : ''
              }`}
            >
              Vehicle Passport
            </Link>
            <Link
              to="/sell"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${textColor} ${textColorHover} ${
                isActive('/sell') ? 'text-gold' : ''
              }`}
            >
              Sell
            </Link>

            {/* More dropdown — now functional */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${textColor} ${textColorHover}`}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-[var(--shadow-elevated)] border border-obsidian/[0.06] py-2 overflow-hidden"
                    role="menu"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-obsidian/70 hover:text-obsidian hover:bg-ivory transition-colors"
                        role="menuitem"
                      >
                        <span className="text-gold/60">{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-obsidian/[0.04] mt-1 pt-1">
                      <Link
                        to="/listings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-obsidian/70 hover:text-obsidian hover:bg-ivory transition-colors"
                        role="menuitem"
                      >
                        <span className="text-gold/60"><Wrench className="w-4 h-4" /></span>
                        Workshops
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/listings"
              className={`p-2.5 rounded-full transition-colors ${isDark ? 'hover:bg-ivory/10' : 'hover:bg-obsidian/5'}`}
              aria-label="Search vehicles"
            >
              <Search className={`w-5 h-5 transition-colors ${isDark ? 'text-ivory/70' : 'text-obsidian/60'}`} />
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors ${isDark ? 'hover:bg-ivory/10 text-ivory/90' : 'hover:bg-obsidian/5 text-obsidian/70'}`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.firstName}</span>
                </Link>
                <Link
                  to="/favourites"
                  className={`p-2.5 rounded-full transition-colors ${isDark ? 'hover:bg-ivory/10' : 'hover:bg-obsidian/5'}`}
                  aria-label="My favourites"
                >
                  <Heart className={`w-5 h-5 transition-colors ${isDark ? 'text-ivory/70' : 'text-obsidian/60'}`} />
                </Link>
                <button
                  onClick={logout}
                  className="px-5 py-2.5 bg-gold text-obsidian text-sm font-semibold rounded-full hover:bg-gold-light transition-colors duration-300 shadow-[var(--shadow-gold)]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-5 py-2.5 rounded-full transition-colors text-sm font-medium ${isDark ? 'text-ivory/90 hover:bg-ivory/10' : 'text-obsidian/70 hover:bg-obsidian/5'}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/sell"
                  className="px-5 py-2.5 bg-gold text-obsidian text-sm font-semibold rounded-full hover:bg-gold-light transition-colors duration-300 shadow-[var(--shadow-gold)]"
                >
                  List Your Vehicle
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-ivory/10' : 'hover:bg-obsidian/5'}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isDark ? 'text-ivory' : 'text-obsidian'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isDark ? 'text-ivory' : 'text-obsidian'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation — Full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 bg-ivory z-40 overflow-y-auto"
          >
            <div className="px-5 py-8">
              <nav className="space-y-1" aria-label="Mobile navigation">
                {[
                  { to: '/listings', label: 'Buy a Vehicle' },
                  { to: '/listings?category=electric', label: 'Electric Vehicles' },
                  { to: '/passport', label: 'Vehicle Passport' },
                  { to: '/sell', label: 'Sell Your Vehicle' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-4 text-lg font-medium rounded-xl transition-colors ${
                      isActive(link.to.split('?')[0])
                        ? 'bg-obsidian/5 text-gold'
                        : 'text-obsidian/80 hover:bg-obsidian/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-obsidian/[0.06] space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block w-full text-center px-5 py-4 bg-obsidian text-ivory text-base font-semibold rounded-2xl"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to="/favourites"
                      className="block w-full text-center px-5 py-4 border border-obsidian/10 text-obsidian text-base font-medium rounded-2xl"
                    >
                      My Favourites
                    </Link>
                    <Link
                      to="/enquiries"
                      className="block w-full text-center px-5 py-4 border border-obsidian/10 text-obsidian text-base font-medium rounded-2xl"
                    >
                      My Enquiries
                    </Link>
                    <Link
                      to="/profile"
                      className="block w-full text-center px-5 py-4 border border-obsidian/10 text-obsidian text-base font-medium rounded-2xl"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-center px-5 py-4 border border-obsidian/10 text-obsidian text-base font-medium rounded-2xl"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full text-center px-5 py-4 bg-obsidian text-ivory text-base font-semibold rounded-2xl"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sell"
                      className="block w-full text-center px-5 py-4 border border-obsidian/10 text-obsidian text-base font-medium rounded-2xl"
                    >
                      List Your Vehicle
                    </Link>
                  </>
                )}
                <p className="text-center text-xs text-slate-warm mt-4">
                  Nepal's trusted vehicle marketplace
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
