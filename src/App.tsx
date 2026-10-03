import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, AppProvider, useAuth } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { PageSkeleton } from './components/Skeleton';
import { Loader2 } from 'lucide-react';

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ListingDetailPage = lazy(() => import('./pages/ListingDetailPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const PassportPage = lazy(() => import('./pages/PassportPage'));
const VerifyPassportPage = lazy(() => import('./pages/VerifyPassportPage'));
const InspectionReportPage = lazy(() => import('./pages/InspectionReportPage'));
const InspectorFormPage = lazy(() => import('./pages/InspectorFormPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const ValuationPage = lazy(() => import('./pages/ValuationPage'));
const SavedSearchesPage = lazy(() => import('./pages/SavedSearchesPage'));
const PartnerDirectoryPage = lazy(() => import('./pages/PartnerDirectoryPage'));
const ReportListingPage = lazy(() => import('./pages/ReportListingPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const OwnershipTransferPage = lazy(() => import('./pages/OwnershipTransferPage'));
const AdminRiskPage = lazy(() => import('./pages/AdminRiskPage'));
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage'));
const AdminListingsPage = lazy(() => import('./pages/AdminListingsPage'));
const AdminInspectionsPage = lazy(() => import('./pages/AdminInspectionsPage'));
const AdminPaymentsPage = lazy(() => import('./pages/AdminPaymentsPage'));
const AdminAuditLogsPage = lazy(() => import('./pages/AdminAuditLogsPage'));
const DealerInventoryPage = lazy(() => import('./pages/DealerInventoryPage'));
const DealerProfilePage = lazy(() => import('./pages/DealerProfilePage'));
const ReservationsPage = lazy(() => import('./pages/ReservationsPage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const RecentlyViewedPage = lazy(() => import('./pages/RecentlyViewedPage'));
const SellerAnalyticsPage = lazy(() => import('./pages/SellerAnalyticsPage'));
const FinanceApplicationPage = lazy(() => import('./pages/FinanceApplicationPage'));
const InsuranceApplicationPage = lazy(() => import('./pages/InsuranceApplicationPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const TestDrivePage = lazy(() => import('./pages/TestDrivePage'));
const DealerApplicationPage = lazy(() => import('./pages/DealerApplicationPage'));
const VehicleHistoryPage = lazy(() => import('./pages/VehicleHistoryPage'));
const RepairQuotesPage = lazy(() => import('./pages/RepairQuotesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const SafetyTipsPage = lazy(() => import('./pages/SafetyTipsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));
import { SellPage, InspectPage, FinancePage, InsurancePage, MessagesPage } from './pages/ServicePages';

// Loading component while checking authentication
function AuthLoader({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AuthLoader>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<PageSkeleton />}>
                  <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/listing/:id" element={<ListingDetailPage />} />
                <Route path="/cars" element={<CategoryPage />} />
                <Route path="/motorcycles" element={<CategoryPage />} />
                <Route path="/electric-vehicles" element={<CategoryPage />} />
                <Route path="/passport/:passportId" element={<PassportPage />} />
                <Route path="/verify" element={<VerifyPassportPage />} />
                <Route path="/verify/:passportId" element={<VerifyPassportPage />} />
                <Route path="/inspection/:id" element={<InspectionReportPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/valuation" element={<ValuationPage />} />
                <Route path="/partners" element={<PartnerDirectoryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/safety" element={<SafetyTipsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/dealer-application" element={<DealerApplicationPage />} />
                
                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                
                {/* Service Routes */}
                <Route path="/sell" element={<SellPage />} />
                <Route path="/inspect" element={<InspectPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/finance/apply" element={<FinanceApplicationPage />} />
                <Route path="/insurance" element={<InsurancePage />} />
                <Route path="/insurance/apply" element={<InsuranceApplicationPage />} />
                <Route path="/transfer" element={<OwnershipTransferPage />} />
                
                {/* Protected User Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><RecentlyViewedPage /></ProtectedRoute>} />
                <Route path="/recently-viewed" element={<ProtectedRoute><RecentlyViewedPage /></ProtectedRoute>} />
                <Route path="/saved-searches" element={<ProtectedRoute><SavedSearchesPage /></ProtectedRoute>} />
                <Route path="/offers" element={<ProtectedRoute><OffersPage /></ProtectedRoute>} />
                <Route path="/reservations" element={<ProtectedRoute><ReservationsPage /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
                <Route path="/report/:id" element={<ProtectedRoute><ReportListingPage /></ProtectedRoute>} />
                <Route path="/test-drive/:id" element={<ProtectedRoute><TestDrivePage /></ProtectedRoute>} />
                <Route path="/repair-quotes/:inspectionId" element={<ProtectedRoute><RepairQuotesPage /></ProtectedRoute>} />
                <Route path="/history/:passportId" element={<ProtectedRoute><VehicleHistoryPage /></ProtectedRoute>} />
                
                {/* Seller Routes */}
                <Route path="/seller" element={<ProtectedRoute requiredRole="PRIVATE_SELLER"><DashboardPage /></ProtectedRoute>} />
                <Route path="/seller/analytics" element={<ProtectedRoute requiredRole="PRIVATE_SELLER"><SellerAnalyticsPage /></ProtectedRoute>} />
                <Route path="/seller/listings" element={<ProtectedRoute requiredRole="PRIVATE_SELLER"><DashboardPage /></ProtectedRoute>} />
                <Route path="/seller/offers" element={<ProtectedRoute requiredRole="PRIVATE_SELLER"><OffersPage /></ProtectedRoute>} />
                
                {/* Buyer Routes */}
                <Route path="/buyer" element={<ProtectedRoute requiredRole="BUYER"><DashboardPage /></ProtectedRoute>} />
                <Route path="/buyer/favorites" element={<ProtectedRoute requiredRole="BUYER"><RecentlyViewedPage /></ProtectedRoute>} />
                <Route path="/buyer/offers" element={<ProtectedRoute requiredRole="BUYER"><OffersPage /></ProtectedRoute>} />
                <Route path="/buyer/reservations" element={<ProtectedRoute requiredRole="BUYER"><ReservationsPage /></ProtectedRoute>} />
                
                {/* Inspector Routes */}
                <Route path="/inspector" element={<ProtectedRoute requiredRole="INSPECTOR"><DashboardPage /></ProtectedRoute>} />
                <Route path="/inspector/jobs" element={<ProtectedRoute requiredRole="INSPECTOR"><DashboardPage /></ProtectedRoute>} />
                <Route path="/inspector/job/:id" element={<ProtectedRoute requiredRole="INSPECTOR"><InspectorFormPage /></ProtectedRoute>} />
                
                {/* Dealer Routes */}
                <Route path="/dealer" element={<ProtectedRoute requiredRole={["DEALER_OWNER", "DEALER_MANAGER"]}><DashboardPage /></ProtectedRoute>} />
                <Route path="/dealer/inventory" element={<ProtectedRoute requiredRole={["DEALER_OWNER", "DEALER_MANAGER"]}><DealerInventoryPage /></ProtectedRoute>} />
                <Route path="/dealer/profile" element={<ProtectedRoute requiredRole={["DEALER_OWNER", "DEALER_MANAGER"]}><DealerProfilePage /></ProtectedRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute requiredRole={["SUPER_ADMIN", "ADMIN"]}><DashboardPage /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute requiredRole={["SUPER_ADMIN", "ADMIN"]}><AdminUsersPage /></ProtectedRoute>} />
                <Route path="/admin/listings" element={<ProtectedRoute requiredRole={["SUPER_ADMIN", "ADMIN"]}><AdminListingsPage /></ProtectedRoute>} />
                <Route path="/admin/inspections" element={<ProtectedRoute requiredRole={["SUPER_ADMIN", "ADMIN"]}><AdminInspectionsPage /></ProtectedRoute>} />
                <Route path="/admin/payments" element={<ProtectedRoute requiredRole={["SUPER_ADMIN", "ADMIN"]}><AdminPaymentsPage /></ProtectedRoute>} />
                <Route path="/admin/audit-logs" element={<ProtectedRoute requiredRole={["SUPER_ADMIN", "ADMIN"]}><AdminAuditLogsPage /></ProtectedRoute>} />
                <Route path="/admin/risk" element={<ProtectedRoute requiredRole={["SUPER_ADMIN", "ADMIN"]}><AdminRiskPage /></ProtectedRoute>} />
                
                {/* Catch-all */}
                <Route path="*" element={<HomePage />} />
              </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          </AuthLoader>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
