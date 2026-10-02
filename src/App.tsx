import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { PageSkeleton } from './components/Skeleton';

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
import { SellPage, InspectPage, FinancePage, InsurancePage, MessagesPage } from './pages/ServicePages';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
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
                
                {/* Service Routes */}
                <Route path="/sell" element={<SellPage />} />
                <Route path="/inspect" element={<InspectPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/finance/apply" element={<FinanceApplicationPage />} />
                <Route path="/insurance" element={<InsurancePage />} />
                <Route path="/insurance/apply" element={<InsuranceApplicationPage />} />
                <Route path="/transfer" element={<OwnershipTransferPage />} />
                
                {/* Authenticated User Routes */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/favorites" element={<RecentlyViewedPage />} />
                <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
                <Route path="/saved-searches" element={<SavedSearchesPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/report/:id" element={<ReportListingPage />} />
                <Route path="/test-drive/:id" element={<TestDrivePage />} />
                <Route path="/repair-quotes/:inspectionId" element={<RepairQuotesPage />} />
                <Route path="/history/:passportId" element={<VehicleHistoryPage />} />
                
                {/* Seller Routes */}
                <Route path="/seller" element={<DashboardPage />} />
                <Route path="/seller/analytics" element={<SellerAnalyticsPage />} />
                <Route path="/seller/listings" element={<DashboardPage />} />
                <Route path="/seller/offers" element={<OffersPage />} />
                
                {/* Buyer Routes */}
                <Route path="/buyer" element={<DashboardPage />} />
                <Route path="/buyer/favorites" element={<RecentlyViewedPage />} />
                <Route path="/buyer/offers" element={<OffersPage />} />
                <Route path="/buyer/reservations" element={<ReservationsPage />} />
                
                {/* Inspector Routes */}
                <Route path="/inspector" element={<DashboardPage />} />
                <Route path="/inspector/jobs" element={<DashboardPage />} />
                <Route path="/inspector/job/:id" element={<InspectorFormPage />} />
                
                {/* Dealer Routes */}
                <Route path="/dealer" element={<DashboardPage />} />
                <Route path="/dealer/inventory" element={<DealerInventoryPage />} />
                <Route path="/dealer/profile" element={<DealerProfilePage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<DashboardPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/listings" element={<AdminListingsPage />} />
                <Route path="/admin/inspections" element={<AdminInspectionsPage />} />
                <Route path="/admin/payments" element={<AdminPaymentsPage />} />
                <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
                <Route path="/admin/risk" element={<AdminRiskPage />} />
                
                {/* Catch-all */}
                <Route path="*" element={<HomePage />} />
              </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
