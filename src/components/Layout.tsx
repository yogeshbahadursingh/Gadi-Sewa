import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import type { ReactNode } from 'react';

// Main Layout Component
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Dashboard Layout for admin/seller/buyer/inspector/dealer pages
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}

// Badge Component
export function Badge({ 
  children, 
  variant = 'default' 
}: { 
  children: ReactNode; 
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

// Stat Card Component
export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  change,
  color = 'blue'
}: { 
  title: string; 
  value: string | number; 
  icon: any;
  change?: string;
  color?: string;
}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && <p className="text-xs text-green-600 mt-1">{change}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
