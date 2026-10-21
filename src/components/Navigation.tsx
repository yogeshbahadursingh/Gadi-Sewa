import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/listings', label: 'Buy' },
    { to: '/listings?category=electric', label: 'Electric' },
    { to: '/passport', label: 'Vehicle Passport' },
    { to: '/sell', label: 'Sell' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[var(--shadow-soft)] border-b border-[var(--color-border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-obsidian flex items-center justify-center group-hover:bg-emerald transition-colors duration-300">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gold rounded-full border-2 border-ivory" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold text-obsidian leading-tight tracking-tight">
                Gadi<span className="text-gold">-</span>Sewa
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-warm font-medium hidden sm:block">
                Nepal's Vehicle Trust
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-gold-animate ${
                  location.pathname === link.to
                    ? 'text-gold'
                    : 'text-obsidian/70 hover:text-obsidian'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium text-obsidian/70 hover:text-obsidian transition-colors flex items-center gap-1">
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/listings"
              className="p-2.5 rounded-full hover:bg-obsidian/5 transition-colors"
              aria-label="Search vehicles"
            >
              <Search className="w-5 h-5 text-obsidian/70" />
            </Link>
            <Link
              to="/sell"
              className="px-5 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors duration-300 shadow-[var(--shadow-soft)]"
            >
              List Your Vehicle
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-obsidian/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-t border-[var(--color-border-subtle)]"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    location.pathname === link.to
                      ? 'bg-obsidian/5 text-gold'
                      : 'text-obsidian/70 hover:bg-obsidian/5 hover:text-obsidian'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  to="/sell"
                  className="block w-full text-center px-5 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full"
                >
                  List Your Vehicle
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
