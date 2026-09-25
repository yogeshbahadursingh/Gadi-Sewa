import { type ReactNode, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import InspectorFormPage from './pages/InspectorFormPage';
import VerifyPassportPage from './pages/VerifyPassportPage';
import NotificationsPage from './pages/NotificationsPage';
import OwnershipTransferPage from './pages/OwnershipTransferPage';
import ValuationPage from './pages/ValuationPage';
import SavedSearchesPage from './pages/SavedSearchesPage';
import PartnerDirectoryPage from './pages/PartnerDirectoryPage';
import ReportListingPage from './pages/ReportListingPage';
import SupportPage from './pages/SupportPage';
import TestDrivePage from './pages/TestDrivePage';
import DealerApplicationPage from './pages/DealerApplicationPage';
import VehicleHistoryPage from './pages/VehicleHistoryPage';
import RepairQuotesPage from './pages/RepairQuotesPage';
import AdminListingsPage from './pages/AdminListingsPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminUsersPage from './pages/AdminUsersPage';
import RecentlyViewedPage from './pages/RecentlyViewedPage';
import SellerAnalyticsPage from './pages/SellerAnalyticsPage';
import AdminInspectionsPage from './pages/AdminInspectionsPage';
import FinanceApplicationPage from './pages/FinanceApplicationPage';
import BlogPage from './pages/BlogPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import InsuranceApplicationPage from './pages/InsuranceApplicationPage';
import SafetyTipsPage from './pages/SafetyTipsPage';
import ReservationsPage from './pages/ReservationsPage';
import OffersPage from './pages/OffersPage';
import AdminPaymentsPage from './pages/AdminPaymentsPage';
import AdminAuditLogsPage from './pages/AdminAuditLogsPage';
import DealerInventoryPage from './pages/DealerInventoryPage';
import ButtonTestPage from './pages/ButtonTestPage';
import { AuthModal } from './components/AuthModal';
import { ToastProvider, useToast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const AppLayout = ({ children }: { children: ReactNode }) => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onLoginClick={() => setAuthModalOpen(true)} />
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

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ToastProvider>
          <AuthProvider>
            <AppProvider>
              <BrowserRouter>
                <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
                <Routes>
            <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
            <Route path="/search" element={<AppLayout><SearchPage /></AppLayout>} />
            <Route path="/listing/:id" element={<AppLayout><ListingDetailPage /></AppLayout>} />
            <Route path="/passport/:passportId" element={<AppLayout><PassportPage /></AppLayout>} />
            <Route path="/dashboard" element={<AppLayout><DashboardPage key="dashboard" /></AppLayout>} />
            <Route path="/admin" element={<AppLayout><DashboardPage key="admin" /></AppLayout>} />
            <Route path="/admin/risk" element={<AppLayout><AdminRiskPage /></AppLayout>} />
            <Route path="/admin/*" element={<AppLayout><DashboardPage key="admin-wildcard" /></AppLayout>} />
            <Route path="/seller" element={<AppLayout><DashboardPage key="seller" /></AppLayout>} />
            <Route path="/seller/*" element={<AppLayout><DashboardPage key="seller-wildcard" /></AppLayout>} />
            <Route path="/buyer" element={<AppLayout><DashboardPage key="buyer" /></AppLayout>} />
            <Route path="/buyer/*" element={<AppLayout><DashboardPage key="buyer-wildcard" /></AppLayout>} />
            <Route path="/inspector" element={<AppLayout><DashboardPage key="inspector" /></AppLayout>} />
            <Route path="/inspector/*" element={<AppLayout><DashboardPage key="inspector-wildcard" /></AppLayout>} />
            <Route path="/dealer" element={<AppLayout><DashboardPage key="dealer" /></AppLayout>} />
            <Route path="/dealer/*" element={<AppLayout><DashboardPage key="dealer-wildcard" /></AppLayout>} />
            <Route path="/sell" element={<AppLayout><SellPage /></AppLayout>} />
            <Route path="/inspect" element={<AppLayout><InspectPage /></AppLayout>} />
            <Route path="/finance" element={<AppLayout><FinancePage /></AppLayout>} />
            <Route path="/insurance" element={<AppLayout><InsurancePage /></AppLayout>} />
            <Route path="/messages" element={<AppLayout><MessagesPage /></AppLayout>} />
            <Route path="/favorites" element={<AppLayout><FavoritesPage /></AppLayout>} />
            <Route path="/compare" element={<AppLayout><ComparePage /></AppLayout>} />
            <Route path="/inspection/:id" element={<AppLayout><InspectionReportPage /></AppLayout>} />
            <Route path="/inspector/job/:id" element={<AppLayout><InspectorFormPage /></AppLayout>} />
            <Route path="/verify/:passportId?" element={<AppLayout><VerifyPassportPage /></AppLayout>} />
            <Route path="/notifications" element={<AppLayout><NotificationsPage /></AppLayout>} />
            <Route path="/transfer" element={<AppLayout><OwnershipTransferPage /></AppLayout>} />
            <Route path="/valuation" element={<AppLayout><ValuationPage /></AppLayout>} />
            <Route path="/saved-searches" element={<AppLayout><SavedSearchesPage /></AppLayout>} />
            <Route path="/partners" element={<AppLayout><PartnerDirectoryPage /></AppLayout>} />
            <Route path="/report/:id" element={<AppLayout><ReportListingPage /></AppLayout>} />
            <Route path="/support" element={<AppLayout><SupportPage /></AppLayout>} />
            <Route path="/test-drive/:id" element={<AppLayout><TestDrivePage /></AppLayout>} />
            <Route path="/dealer-application" element={<AppLayout><DealerApplicationPage /></AppLayout>} />
            <Route path="/history/:passportId" element={<AppLayout><VehicleHistoryPage /></AppLayout>} />
            <Route path="/repair-quotes/:inspectionId" element={<AppLayout><RepairQuotesPage /></AppLayout>} />
            <Route path="/admin/listings" element={<AppLayout><AdminListingsPage /></AppLayout>} />
            <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />
            <Route path="/terms" element={<AppLayout><TermsPage /></AppLayout>} />
            <Route path="/privacy" element={<AppLayout><PrivacyPage /></AppLayout>} />
            <Route path="/admin/users" element={<AppLayout><AdminUsersPage /></AppLayout>} />
            <Route path="/admin/inspections" element={<AppLayout><AdminInspectionsPage /></AppLayout>} />
            <Route path="/recently-viewed" element={<AppLayout><RecentlyViewedPage /></AppLayout>} />
            <Route path="/seller/analytics" element={<AppLayout><SellerAnalyticsPage /></AppLayout>} />
            <Route path="/finance/apply" element={<AppLayout><FinanceApplicationPage /></AppLayout>} />
            <Route path="/blog" element={<AppLayout><BlogPage /></AppLayout>} />
            <Route path="/payment" element={<AppLayout><PaymentPage /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
            <Route path="/insurance/apply" element={<AppLayout><InsuranceApplicationPage /></AppLayout>} />
            <Route path="/safety" element={<AppLayout><SafetyTipsPage /></AppLayout>} />
            <Route path="/reservations" element={<AppLayout><ReservationsPage /></AppLayout>} />
            <Route path="/offers" element={<AppLayout><OffersPage /></AppLayout>} />
            <Route path="/admin/payments" element={<AppLayout><AdminPaymentsPage /></AppLayout>} />
            <Route path="/admin/audit-logs" element={<AppLayout><AdminAuditLogsPage /></AppLayout>} />
            <Route path="/dealer/inventory" element={<AppLayout><DealerInventoryPage /></AppLayout>} />
            <Route path="/button-test" element={<AppLayout><ButtonTestPage /></AppLayout>} />
            <Route path="*" element={<AppLayout><NotFoundPage /></AppLayout>} />
                </Routes>
              </BrowserRouter>
            </AppProvider>
          </AuthProvider>
        </ToastProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

function FavoritesPage() {
  const { state, toggleFavorite } = useAppState();
  const { showToast } = useToast();
  const favListings = listings.filter(l => state.favorites.includes(l.id));

  const handleToggleFavorite = (listingId: string, vehicleName: string) => {
    const isCurrentlyFavorite = state.favorites.includes(listingId);
    toggleFavorite(listingId);
    
    if (isCurrentlyFavorite) {
      showToast({
        type: 'info',
        title: 'Removed from favorites',
        message: `${vehicleName} has been removed from your saved vehicles`,
      });
    } else {
      showToast({
        type: 'success',
        title: 'Added to favorites',
        message: `${vehicleName} has been saved to your favorites`,
      });
    }
  };

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
                  <button 
                    onClick={() => handleToggleFavorite(listing.id, `${vehicle.make} ${vehicle.model}`)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                  >
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
