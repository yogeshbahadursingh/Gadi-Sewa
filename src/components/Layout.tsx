import { useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { Search, Menu, X, Bell, Heart, User, ChevronDown, Shield, Car, Gauge, Wrench, Building2, Settings, BarChart3, Users, FileCheck, MessageSquare, AlertTriangle } from 'lucide-react';
import { notifications } from '../store/data';

export function Header({ onLoginClick }: { onLoginClick?: () => void } = {}) {
  const { currentUser, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const unreadCount = currentUser ? notifications.filter(n => n.userId === currentUser.id && !n.read).length : 0;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Gadi<span className="text-blue-600">Bazar</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Buy</Link>
            <Link to="/sell" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Sell</Link>
            <Link to="/inspect" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Inspect</Link>
            <Link to="/compare" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Compare</Link>
            <Link to="/finance" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Finance</Link>
            <Link to="/insurance" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Insurance</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                <Link to="/notifications" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{unreadCount}</span>}
                </Link>
                <Link to="/favorites" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </Link>
              </>
            )}
            
            {/* User menu */}
            {isAuthenticated && currentUser ? (
              <div className="hidden md:flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">{currentUser.fullName.charAt(0)}</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{currentUser.fullName.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500">{currentUser.role.replace(/_/g, ' ')}</p>
                </div>
              </div>
            ) : (
              <button onClick={onLoginClick} className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            )}

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/search" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Buy a Vehicle</Link>
            <Link to="/sell" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Sell a Vehicle</Link>
            <Link to="/inspect" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Book Inspection</Link>
            <Link to="/finance" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Finance</Link>
            <Link to="/insurance" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Insurance</Link>
            <hr className="my-2" />
            {currentUser && (
              <>
                <Link to="/dashboard" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/messages" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Messages</Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Notification dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-16 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          {currentUser && notifications.filter(n => n.userId === currentUser.id).slice(0, 5).map(n => (
            <Link key={n.id} to={n.link || '#'} className="block p-3 hover:bg-gray-50 border-b border-gray-50" onClick={() => setShowNotifications(false)}>
              <p className={`text-sm ${!n.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search" className="hover:text-white transition-colors">Buy a Car</Link></li>
              <li><Link to="/search?type=motorbike" className="hover:text-white transition-colors">Buy a Bike</Link></li>
              <li><Link to="/search?ev=true" className="hover:text-white transition-colors">Electric Vehicles</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell Your Vehicle</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/inspect" className="hover:text-white transition-colors">Vehicle Inspection</Link></li>
              <li><Link to="/verify" className="hover:text-white transition-colors">Verify Passport</Link></li>
              <li><Link to="/transfer" className="hover:text-white transition-colors">Ownership Transfer</Link></li>
              <li><Link to="/finance" className="hover:text-white transition-colors">Vehicle Finance</Link></li>
              <li><Link to="/insurance" className="hover:text-white transition-colors">Insurance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 GadiBazar. All rights reserved. Nepal's trusted vehicle ecosystem.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">🇳🇵 Made in Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Sidebar() {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  const adminLinks = [
    { to: '/admin', icon: BarChart3, label: 'Overview' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/vehicles', icon: Car, label: 'Vehicles' },
    { to: '/admin/listings', icon: FileCheck, label: 'Listings' },
    { to: '/admin/inspections', icon: Gauge, label: 'Inspections' },
    { to: '/admin/payments', icon: Shield, label: 'Payments' },
    { to: '/admin/risk', icon: AlertTriangle, label: 'Risk & Fraud' },
    { to: '/admin/audit', icon: Settings, label: 'Audit Logs' },
  ];

  const sellerLinks = [
    { to: '/seller', icon: BarChart3, label: 'Dashboard' },
    { to: '/seller/listings', icon: Car, label: 'My Listings' },
    { to: '/seller/vehicles', icon: FileCheck, label: 'My Vehicles' },
    { to: '/seller/offers', icon: MessageSquare, label: 'Offers' },
    { to: '/seller/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const buyerLinks = [
    { to: '/buyer', icon: BarChart3, label: 'Dashboard' },
    { to: '/buyer/favorites', icon: Heart, label: 'Favorites' },
    { to: '/buyer/offers', icon: MessageSquare, label: 'My Offers' },
    { to: '/buyer/reservations', icon: FileCheck, label: 'Reservations' },
  ];

  const inspectorLinks = [
    { to: '/inspector', icon: BarChart3, label: 'Dashboard' },
    { to: '/inspector/jobs', icon: Gauge, label: 'My Jobs' },
    { to: '/inspector/schedule', icon: FileCheck, label: 'Schedule' },
  ];

  const dealerLinks = [
    { to: '/dealer', icon: BarChart3, label: 'Dashboard' },
    { to: '/dealer/inventory', icon: Car, label: 'Inventory' },
    { to: '/dealer/leads', icon: Users, label: 'Leads' },
    { to: '/dealer/staff', icon: Users, label: 'Staff' },
    { to: '/dealer/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  let links = buyerLinks;
  if (currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN') links = adminLinks;
  else if (currentUser?.role === 'PRIVATE_SELLER') links = sellerLinks;
  else if (currentUser?.role === 'INSPECTOR') links = inspectorLinks;
  else if (currentUser?.role === 'DEALER_OWNER' || currentUser?.role === 'DEALER_MANAGER') links = dealerLinks;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] hidden lg:block">
      <nav className="p-4 space-y-1">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === link.to
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}

export function StatCard({ title, value, change, icon: Icon, color = 'blue' }: { title: string; value: string | number; change?: string; icon: any; color?: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && <p className="text-xs text-green-600 mt-1">{change}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileCheck className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function RoleSwitcher() {
  const { switchRole, currentUser } = useAuth();
  const roles = [
    { role: 'SUPER_ADMIN', label: 'Admin' },
    { role: 'PRIVATE_SELLER', label: 'Seller' },
    { role: 'BUYER', label: 'Buyer' },
    { role: 'INSPECTOR', label: 'Inspector' },
    { role: 'DEALER_OWNER', label: 'Dealer' },
  ];

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      {roles.map(r => (
        <button
          key={r.role}
          onClick={() => switchRole(r.role)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            currentUser?.role === r.role ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
