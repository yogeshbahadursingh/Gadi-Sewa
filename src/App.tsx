import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import PassportPage from './pages/PassportPage';
import SellPage from './pages/SellPage';

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
          {/* Catch-all */}
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
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors">
          Return Home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}
