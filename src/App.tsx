import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ListingDetailPage from './pages/ListingDetailPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/seller/*" element={<DashboardPage />} />
            <Route path="/buyer/*" element={<DashboardPage />} />
            <Route path="/inspector/*" element={<DashboardPage />} />
            <Route path="/dealer/*" element={<DashboardPage />} />
            <Route path="/admin/*" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
