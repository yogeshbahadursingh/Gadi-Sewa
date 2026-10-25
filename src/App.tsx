import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ListingsPage from './pages/ListingsPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import SellPage from './pages/SellPage';
import ProfilePage from './pages/ProfilePage';
import FavouritesPage from './pages/FavouritesPage';
import EnquiriesPage from './pages/EnquiriesPage';
import MyGaragePage from './pages/MyGaragePage';
import AddVehicleToGaragePage from './pages/AddVehicleToGaragePage';
import OwnedVehicleDetailPage from './pages/OwnedVehicleDetailPage';
import WorkshopsPage from './pages/WorkshopsPage';
import WorkshopDetailPage from './pages/WorkshopDetailPage';
import FinancePage from './pages/FinancePage';
import PassportPage from './pages/PassportPage';
import InspectorDashboardPage from './pages/InspectorDashboardPage';
import InspectionBookingPage from './pages/InspectionBookingPage';
import InspectionHistoryPage from './pages/InspectionHistoryPage';
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
    <div className="min-h-screen flex flex-col bg-ivory">
      <ScrollToTop />
      <Navigation />
      <main id="main-content" className="flex-1" role="main" aria-label="Main content">
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
