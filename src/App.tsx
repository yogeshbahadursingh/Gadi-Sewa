import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import PassportPage from './pages/PassportPage';
import SellPage from './pages/SellPage';
import ComingSoonPage from './pages/ComingSoonPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import FavouritesPage from './pages/FavouritesPage';
import EnquiriesPage from './pages/EnquiriesPage';
import EditVehiclePage from './pages/EditVehiclePage';
import InspectionBookingPage from './pages/InspectionBookingPage';
import InspectorDashboardPage from './pages/InspectorDashboardPage';
import CompleteInspectionPage from './pages/CompleteInspectionPage';
import PassportDetailPage from './pages/PassportDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/enquiries" element={<EnquiriesPage />} />
          <Route path="/vehicle/:id/edit" element={<EditVehiclePage />} />
          <Route path="/inspect/booking" element={<InspectionBookingPage />} />
          <Route path="/inspect/dashboard" element={<InspectorDashboardPage />} />
          <Route path="/inspect/complete/:id" element={<CompleteInspectionPage />} />
          <Route path="/passport/:id" element={<PassportDetailPage />} />
          {/* Coming Soon pages */}
          <Route path="/inspect" element={<ComingSoonPage />} />
          <Route path="/garage" element={<ComingSoonPage />} />
          <Route path="/workshops" element={<ComingSoonPage />} />
          <Route path="/valuation" element={<ComingSoonPage />} />
          <Route path="/dealer" element={<ComingSoonPage />} />
          <Route path="/pricing" element={<ComingSoonPage />} />
          <Route path="/seller-guide" element={<ComingSoonPage />} />
          <Route path="/about" element={<ComingSoonPage />} />
          <Route path="/how-it-works" element={<ComingSoonPage />} />
          <Route path="/trust" element={<ComingSoonPage />} />
          <Route path="/careers" element={<ComingSoonPage />} />
          <Route path="/contact" element={<ComingSoonPage />} />
          <Route path="/privacy" element={<ComingSoonPage />} />
          <Route path="/terms" element={<ComingSoonPage />} />
          <Route path="/cookies" element={<ComingSoonPage />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen bg-ivory pt-24 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="font-display text-6xl font-bold text-obsidian/10 mb-4">404</p>
        <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Page Not Found</h1>
        <p className="text-slate-warm mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors">
          Return Home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </HashRouter>
  );
}
