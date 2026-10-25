import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Lazy load all page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ListingsPage = lazy(() => import('./pages/ListingsPage'));
const VehicleDetailPage = lazy(() => import('./pages/VehicleDetailPage'));
const SellPage = lazy(() => import('./pages/SellPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'));
const EnquiriesPage = lazy(() => import('./pages/EnquiriesPage'));
const MyGaragePage = lazy(() => import('./pages/MyGaragePage'));
const AddVehicleToGaragePage = lazy(() => import('./pages/AddVehicleToGaragePage'));
const OwnedVehicleDetailPage = lazy(() => import('./pages/OwnedVehicleDetailPage'));
const WorkshopsPage = lazy(() => import('./pages/WorkshopsPage'));
const WorkshopDetailPage = lazy(() => import('./pages/WorkshopDetailPage'));
const FinancePage = lazy(() => import('./pages/FinancePage'));
const PassportPage = lazy(() => import('./pages/PassportPage'));
const InspectorDashboardPage = lazy(() => import('./pages/InspectorDashboardPage'));
const InspectionBookingPage = lazy(() => import('./pages/InspectionBookingPage'));
const InspectionHistoryPage = lazy(() => import('./pages/InspectionHistoryPage'));
const PassportDetailPage = lazy(() => import('./pages/PassportDetailPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-obsidian/70">Loading...</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <ScrollToTop />
      <Navigation />
      <main id="main-content" className="flex-1" role="main" aria-label="Main content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/enquiries" element={<EnquiriesPage />} />
            <Route path="/garage" element={<MyGaragePage />} />
            <Route path="/garage/add" element={<AddVehicleToGaragePage />} />
            <Route path="/garage/vehicle/:id" element={<OwnedVehicleDetailPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/passport" element={<PassportPage />} />
            <Route path="/passport/:id" element={<PassportDetailPage />} />
            <Route path="/inspect/dashboard" element={<InspectorDashboardPage />} />
            <Route path="/inspect/book" element={<InspectionBookingPage />} />
            <Route path="/inspect/history" element={<InspectionHistoryPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
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
