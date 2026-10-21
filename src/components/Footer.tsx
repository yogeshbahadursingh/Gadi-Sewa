import { Link } from 'react-router-dom';
import { Shield, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Buy',
      links: [
        { label: 'All Vehicles', to: '/listings' },
        { label: 'Cars & SUVs', to: '/listings?category=car' },
        { label: 'Motorcycles', to: '/listings?category=motorcycle' },
        { label: 'Electric Vehicles', to: '/listings?category=electric' },
        { label: 'With Vehicle Passport', to: '/listings?passport=yes' },
        { label: 'Browse by Brand', to: '/listings' },
      ]
    },
    {
      title: 'Sell',
      links: [
        { label: 'List Your Vehicle', to: '/sell' },
        { label: 'Dealer Registration', to: '/dealer' },
        { label: 'Pricing Plans', to: '/pricing' },
        { label: 'Seller Guide', to: '/seller-guide' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Vehicle Passport', to: '/passport' },
        { label: 'Book Inspection', to: '/inspect' },
        { label: 'My Garage', to: '/garage' },
        { label: 'Find Workshops', to: '/workshops' },
        { label: 'Vehicle Valuation', to: '/valuation' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Gadi-Sewa', to: '/about' },
        { label: 'How It Works', to: '/how-it-works' },
        { label: 'Trust & Safety', to: '/trust' },
        { label: 'Careers', to: '/careers' },
        { label: 'Contact Us', to: '/contact' },
      ]
    }
  ];

  return (
    <footer className="bg-obsidian text-ivory/80">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-ivory/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-ivory">
                  Gadi<span className="text-gold">-</span>Sewa
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-ivory/60 mb-6 max-w-sm">
              Nepal's most trusted digital platform for buying, selling and verifying vehicles. 
              Every listing backed by transparency. Every inspection backed by evidence.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-ivory/50">
                <MapPin className="w-4 h-4 text-gold/70" />
                <span>Lalitpur, Bagmati Province, Nepal</span>
              </div>
              <div className="flex items-center gap-2 text-ivory/50">
                <Phone className="w-4 h-4 text-gold/70" />
                <span>+977-1-XXXXXXX</span>
              </div>
              <div className="flex items-center gap-2 text-ivory/50">
                <Mail className="w-4 h-4 text-gold/70" />
                <span>support@gadi-sewa.com</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-ivory uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-ivory/50 hover:text-gold transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-12 pt-8 border-t border-ivory/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-xs text-ivory/40">
              <span>© {currentYear} Gadi-Sewa. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-gold transition-colors">Cookie Policy</Link>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full hover:bg-ivory/10 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-ivory/50" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-ivory/10 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-ivory/50" />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-ivory/10 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-ivory/50" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
