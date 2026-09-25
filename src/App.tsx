import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AppProvider, useAppState } from './context/AppContext';
import { Header, Footer, RoleSwitcher } from './components/Layout';
import { listings, getVehicleById, formatPrice, formatMileage } from './store/data';
import { Heart } from 'lucide-react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ListingDetailPage from './pages/ListingDetailPage';
import PassportPage from './pages/PassportPage';
import DashboardPage from './pages/DashboardPage';
import { SellPage, InspectPage, FinancePage, InsurancePage, MessagesPage } from './pages/ServicePages';
import ComparePage from './pages/ComparePage';
import AdminRiskPage from './pages/AdminRiskPage';
import InspectionReportPage from './pages/InspectionReportPage';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs text-gray-500">Demo Mode — Switch roles to explore different dashboards</p>
          <RoleSwitcher />
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
            <Route path="/search" element={<AppLayout><SearchPage /></AppLayout>} />
            <Route path="/listing/:id" element={<AppLayout><ListingDetailPage /></AppLayout>} />
            <Route path="/passport/:passportId" element={<AppLayout><PassportPage /></AppLayout>} />
            <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/admin" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/admin/risk" element={<AppLayout><AdminRiskPage /></AppLayout>} />
            <Route path="/admin/*" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/seller" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/seller/*" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/buyer" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/buyer/*" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/inspector" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/inspector/*" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/dealer" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/dealer/*" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/sell" element={<AppLayout><SellPage /></AppLayout>} />
            <Route path="/inspect" element={<AppLayout><InspectPage /></AppLayout>} />
            <Route path="/finance" element={<AppLayout><FinancePage /></AppLayout>} />
            <Route path="/insurance" element={<AppLayout><InsurancePage /></AppLayout>} />
            <Route path="/messages" element={<AppLayout><MessagesPage /></AppLayout>} />
            <Route path="/favorites" element={<AppLayout><FavoritesPage /></AppLayout>} />
            <Route path="/compare" element={<AppLayout><ComparePage /></AppLayout>} />
            <Route path="/inspection/:id" element={<AppLayout><InspectionReportPage /></AppLayout>} />
            <Route path="*" element={<AppLayout><NotFoundPage /></AppLayout>} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

function FavoritesPage() {
  const { state, toggleFavorite } = useAppState();
  const favListings = listings.filter(l => state.favorites.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Vehicles ({favListings.length})</h1>
      {favListings.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No saved vehicles yet</h3>
          <p className="text-sm text-gray-500 mt-1">Save vehicles you're interested in to compare them later</p>
          <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">Browse vehicles</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favListings.map(listing => {
            const vehicle = getVehicleById(listing.vehicleId);
            if (!vehicle) return null;
            return (
              <div key={listing.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/10] bg-gray-100">
                  <Link to={`/listing/${listing.id}`}>
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                  </Link>
                  <button onClick={() => toggleFavorite(listing.id)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{listing.title}</h3>
                  <p className="text-lg font-bold text-blue-600 mt-1">{formatPrice(listing.price)}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>{formatMileage(vehicle.mileage)}</span>
                    <span>•</span>
                    <span>{vehicle.year}</span>
                    <span>•</span>
                    <span>{vehicle.fuelType}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page not found</p>
      <a href="/" className="mt-6 inline-block text-blue-600 hover:text-blue-700 font-medium">Go to homepage</a>
    </div>
  );
}
