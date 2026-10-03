# ARCHITECTURE.md - GadiBazar System Architecture

**Last Updated:** 2026-01-15  
**Version:** 1.0.0  
**Architecture Type:** Client-Side Single Page Application (SPA)

---

## 📐 System Overview

GadiBazar is a modern, client-side React application built with a focus on performance, SEO, and user experience. The architecture follows React best practices with component-based design, context-based state management, and code-splitting for optimal performance.

### Architecture Principles
1. **Component-Driven:** Reusable, isolated components
2. **Type-Safe:** Full TypeScript coverage
3. **Performance-First:** Code splitting, lazy loading, optimization
4. **SEO-Optimized:** Dynamic meta tags, structured data, semantic HTML
5. **Accessible:** ARIA labels, keyboard navigation, semantic markup
6. **Responsive:** Mobile-first design approach
7. **Maintainable:** Clear separation of concerns, documented code

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React UI   │  │  React Router │  │ React Helmet │     │
│  │  Components  │  │   (Routing)   │  │  (SEO Meta)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│           │                  │                  │           │
│           └──────────────────┼──────────────────┘           │
│                              │                              │
│  ┌───────────────────────────┼───────────────────────────┐ │
│  │                    Context Layer                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│ │
│  │  │ AuthContext  │  │ AppState     │  │ ToastContext ││ │
│  │  │ (Auth)       │  │ (Favorites,  │  │ (Notifs)     ││ │
│  │  │              │  │  Recent)     │  │              ││ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘│ │
│  └───────────────────────────────────────────────────────┘ │
│                              │                              │
│  ┌───────────────────────────┼───────────────────────────┐ │
│  │                    Data Layer                          │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │         Mock Data Store (src/store/data.ts)      │ │ │
│  │  │  • Users  • Vehicles  • Listings  • Inspections  │ │ │
│  │  │  • Passports  • Offers  • Payments  • etc.       │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Build Output    │
                    │  (dist/)         │
                    │  • HTML          │
                    │  • CSS           │
                    │  • JS Chunks     │
                    │  • Assets        │
                    └──────────────────┘
```

---

## 📦 Technology Stack Architecture

### Frontend Framework
```
React 18.2.0
├── React DOM (Rendering)
├── React Router DOM 6.8.0 (Routing)
├── React Helmet Async 3.0.0 (SEO)
└── TypeScript 5.7.0 (Type Safety)
```

### Build System
```
Vite 6.3.5
├── @vitejs/plugin-react (React support)
├── @tailwindcss/vite (CSS processing)
├── Code Splitting (Automatic)
├── Tree Shaking (Dead code elimination)
└── Minification (Production optimization)
```

### Styling
```
Tailwind CSS 4.1.7
├── Utility-first CSS
├── Responsive design
├── Dark mode support (ready)
└── Custom theme configuration
```

### State Management
```
React Context API
├── AuthContext (Authentication)
├── AppContext (App state)
└── ToastContext (Notifications)
```

### Additional Libraries
```
UI/UX:
├── lucide-react (Icons)
├── framer-motion (Animations)
└── @dnd-kit (Drag & Drop)

Data/Utils:
├── date-fns (Date formatting)
├── uuid (Unique IDs)
└── recharts (Charts)
```

---

## 🗂️ Application Architecture

### 1. Entry Point

**File:** `src/main.tsx`
```
main.tsx
├── Renders <App /> component
├── Mounts to #root element
└── Initializes React 18 features
```

### 2. Root Component

**File:** `src/App.tsx`
```
App.tsx
├── HelmetProvider (SEO context)
├── ErrorBoundary (Error handling)
├── ToastProvider (Notifications)
├── AuthProvider (Authentication)
├── AppProvider (App state)
├── BrowserRouter (Routing)
├── AuthModal (Login/Register)
├── Suspense (Loading states)
└── Routes (60+ routes)
```

### 3. Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   ├── Search Bar
│   │   ├── User Menu
│   │   └── Mobile Menu
│   ├── Main Content
│   │   └── Page Components (48 pages)
│   └── Footer
│       ├── Links
│       ├── Social
│       └── Copyright
├── AuthModal
│   ├── Login Form
│   └── Register Form
└── Toast Container
    └── Toast Notifications
```

---

## 🔄 Data Flow Architecture

### Current Implementation: Unidirectional Data Flow

```
User Action
    │
    ▼
Component Event Handler
    │
    ▼
Context Action (AuthContext/AppContext)
    │
    ▼
State Update (useState)
    │
    ▼
Re-render Affected Components
    │
    ▼
UI Update
```

### Data Sources

**1. Mock Data Store** (`src/store/data.ts`)
```typescript
// Static data arrays
users: User[]
vehicles: Vehicle[]
listings: Listing[]
inspections: Inspection[]
vehiclePassports: VehiclePassport[]
offers: Offer[]
reservations: Reservation[]
payments: Payment[]
conversations: Conversation[]
messages: Message[]
notifications: Notification[]
auditLogs: AuditLog[]
dealers: Dealer[]

// Helper functions
getVehicleById(id: string): Vehicle
getListingById(id: string): Listing
getUserById(id: string): User
formatPrice(price: number): string
formatMileage(km: number): string
```

**2. Context State**
```typescript
// AuthContext
currentUser: User | null
login(email: string): boolean
logout(): void
switchRole(role: string): void
isAuthenticated: boolean

// AppContext
favorites: string[]
recentlyViewed: string[]
toggleFavorite(listingId: string): void
addRecentlyViewed(listingId: string): void
```

**3. Local Storage** (Future)
```typescript
// User preferences
theme: 'light' | 'dark'
language: 'en' | 'ne'
currency: 'NPR' | 'USD'
```

---

## 🛣️ Routing Architecture

### Route Structure

```
/ (Homepage)
├── /search (Search)
├── /cars (Category)
│   ├── /cars/:location (Location)
│   └── /cars/make/:make (Make)
├── /motorcycles (Category)
├── /electric-vehicles (Category)
├── /listing/:id (Vehicle Detail)
├── /passport/:passportId (Passport)
├── /dealers/:dealerId (Dealer)
├── /inspect (Inspection Booking)
├── /inspection/:id (Inspection Report)
├── /valuation (Valuation Tool)
├── /finance (Finance)
│   └── /finance/apply (Application)
├── /insurance (Insurance)
│   └── /insurance/apply (Application)
├── /transfer (Ownership Transfer)
├── /partners (Service Partners)
├── /verify (Passport Verification)
├── /compare (Vehicle Comparison)
├── /blog (Blog)
├── /about (About)
├── /contact (Contact)
├── /faq (FAQ)
├── /safety (Safety Tips)
├── /terms (Terms)
├── /privacy (Privacy)
│
├── /dashboard (User Dashboard)
├── /favorites (Saved Vehicles)
├── /offers (My Offers)
├── /reservations (My Reservations)
├── /messages (Messages)
├── /notifications (Notifications)
├── /profile (User Profile)
├── /recently-viewed (Recently Viewed)
├── /saved-searches (Saved Searches)
├── /test-drive/:id (Test Drive)
├── /repair-quotes/:inspectionId (Repair Quotes)
├── /payment (Payment)
│
├── /seller (Seller Dashboard)
│   └── /seller/analytics (Analytics)
├── /buyer (Buyer Dashboard)
├── /inspector (Inspector Dashboard)
│   └── /inspector/job/:id (Inspection Job)
├── /dealer (Dealer Dashboard)
│   └── /dealer/inventory (Inventory)
│   └── /dealer-application (Application)
│
├── /admin (Admin Dashboard)
│   ├── /admin/users (User Management)
│   ├── /admin/listings (Listings)
│   ├── /admin/inspections (Inspections)
│   ├── /admin/payments (Payments)
│   ├── /admin/audit-logs (Audit Logs)
│   └── /admin/risk (Risk Management)
│
└── * (404 Not Found)
```

### Route Protection (Future)

```typescript
// Public routes (no auth required)
/, /search, /cars, /listing/:id, /passport/:id, etc.

// Protected routes (auth required)
/dashboard, /favorites, /offers, /profile, etc.

// Role-based routes
/admin/* (ADMIN, SUPER_ADMIN)
/seller/* (PRIVATE_SELLER, DEALER_OWNER)
/inspector/* (INSPECTOR)
/dealer/* (DEALER_OWNER, DEALER_MANAGER)
```

---

## 🎨 Component Architecture

### Component Types

**1. Page Components (48)**
- Full page views
- Route-bound
- Lazy-loaded
- Self-contained logic

**2. Layout Components (3)**
- Header
- Footer
- Sidebar (dashboards)

**3. Shared Components (8)**
- AuthModal
- SEO
- Breadcrumb
- Pagination
- Toast
- Skeleton
- ErrorBoundary
- RoleSwitcher

**4. Feature Components (Inline)**
- VehicleCard
- SearchFilters
- InspectionForm
- PaymentForm
- etc.

### Component Design Patterns

**1. Functional Components**
```typescript
function ComponentName() {
  // Hooks
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleClick = () => {};
  
  // Render
  return <JSX />;
}
```

**2. Custom Hooks**
```typescript
// useAuth() - Authentication
// useAppState() - App state
// useToast() - Notifications
// useSEO() - SEO meta tags
```

**3. Context Consumers**
```typescript
const { currentUser, login } = useAuth();
const { state, toggleFavorite } = useAppState();
```

---

## 🔐 Security Architecture

### Current Implementation

**1. Frontend Security**
```
✅ No hardcoded secrets
✅ No exposed API keys
✅ Input validation on forms
✅ Error boundaries
✅ XSS protection (React default)
✅ Private pages NOINDEX
```

**2. Authentication (Mock)**
```
AuthContext
├── currentUser state
├── login() function
├── logout() function
├── switchRole() function
└── isAuthenticated flag
```

**3. Authorization (Mock)**
```
Role-based access control
├── 16 user roles defined
├── Role switcher for demo
└── UI-based role checking
```

### Future Security Architecture

**1. Backend Authentication**
```
JWT-based authentication
├── Access tokens (short-lived)
├── Refresh tokens (long-lived)
├── Token rotation
└── Secure storage (httpOnly cookies)
```

**2. API Security**
```
├── Rate limiting
├── CORS configuration
├── Input sanitization
├── SQL injection prevention
├── XSS prevention
├── CSRF protection
└── Request validation
```

**3. Data Security**
```
├── Encryption at rest
├── Encryption in transit (HTTPS)
├── Secure password hashing (bcrypt)
├── File upload validation
├── Document access control
└── Audit logging
```

---

## ⚡ Performance Architecture

### Optimization Strategies

**1. Code Splitting**
```typescript
// Lazy loading all pages
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
// ... 60+ lazy-loaded components
```

**2. Bundle Optimization**
```
Main Bundle: 298 KB (gzipped: 86 KB)
CSS Bundle: 54 KB (gzipped: 10 KB)
Chunks: 76 (3-18 KB each)
Total: ~358 KB (gzipped: ~98 KB)
```

**3. Asset Optimization**
```
✅ Image lazy loading
✅ SVG favicon
✅ Font preloading
✅ CSS purging (Tailwind)
✅ JavaScript minification
✅ Tree shaking
```

**4. Runtime Performance**
```
Estimated Metrics:
├── FCP: < 1.5s
├── LCP: < 2.5s
├── TTI: < 3.5s
├── CLS: < 0.1
└── TBT: < 200ms
```

### Caching Strategy (Future)

**1. Browser Caching**
```
Static assets: 1 year
HTML: No cache
API responses: 5 minutes
```

**2. CDN Caching**
```
Edge locations: Global
Cache invalidation: On deploy
Compression: Gzip/Brotli
```

**3. Application Caching**
```
React Query / SWR
├── Query caching
├── Background refetching
├── Stale-while-revalidate
└── Optimistic updates
```

---

## 📊 State Management Architecture

### Current Implementation

**1. Authentication State**
```typescript
AuthContext
├── currentUser: User | null
├── login(email: string): boolean
├── logout(): void
├── switchRole(role: string): void
└── isAuthenticated: boolean
```

**2. Application State**
```typescript
AppContext
├── favorites: string[]
├── recentlyViewed: string[]
├── toggleFavorite(listingId: string): void
└── addRecentlyViewed(listingId: string): void
```

**3. Component State**
```typescript
Local state with useState
├── Form inputs
├── UI toggles
├── Filters
├── Modals
└── Loading states
```

### Future State Management

**1. Global State (Redux Toolkit / Zustand)**
```typescript
store/
├── authSlice (Authentication)
├── userSlice (User data)
├── listingsSlice (Vehicle listings)
├── searchSlice (Search filters)
├── uiSlice (UI state)
└── apiSlice (API state)
```

**2. Server State (React Query)**
```typescript
Queries:
├── useVehicles()
├── useVehicle(id)
├── useListings(filters)
├── useInspections()
└── useUser()

Mutations:
├── useCreateListing()
├── useUpdateListing()
├── useDeleteListing()
└── useMakeOffer()
```

**3. Form State (React Hook Form)**
```typescript
Forms:
├── LoginForm
├── RegisterForm
├── ListingForm
├── InspectionForm
├── PaymentForm
└── SearchForm
```

---

## 🎯 SEO Architecture

### Implementation

**1. Dynamic Meta Tags**
```typescript
SEO Component
├── title: string
├── description: string
├── keywords: string
├── canonical: string
├── ogImage: string
├── ogType: string
├── noindex: boolean
├── nofollow: boolean
└── structuredData: object
```

**2. Structured Data (JSON-LD)**
```typescript
Schema Types:
├── Organization (Homepage, About)
├── Vehicle (Listing pages)
├── BreadcrumbList (All pages)
├── LocalBusiness (Dealer pages)
└── FAQPage (FAQ page)
```

**3. Sitemap**
```xml
sitemap.xml
├── Static pages (30+)
├── Vehicle listings
├── Passports
├── Inspections
├── Categories
├── Locations
└── Makes
```

**4. Robots.txt**
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /seller/*
Disallow: /buyer/*
Disallow: /inspector/*
Disallow: /dealer/*
Disallow: /search?*
Sitemap: https://gadibazar.com/sitemap.xml
```

---

## 🚀 Deployment Architecture

### Current Architecture

```
Development
├── npm run dev (Vite dev server)
├── Hot Module Replacement
└── Local development

Build
├── npm run build (Vite build)
├── Code splitting
├── Minification
├── Optimization
└── Output: dist/

Deployment
├── Upload dist/ to server
├── Configure .htaccess
├── Setup domain & SSL
└── Serve static files
```

### Future Architecture

```
Development
├── Frontend: React + Vite
├── Backend: Node.js + Express
├── Database: PostgreSQL
└── Cache: Redis

Build
├── Frontend: Vite build
├── Backend: TypeScript compile
└── Docker containers

Deployment
├── Frontend: CDN (Cloudflare)
├── Backend: Cloud server (AWS/DigitalOcean)
├── Database: Managed PostgreSQL
├── Cache: Managed Redis
└── CI/CD: GitHub Actions
```

---

## 🔄 Future Architecture: Full-Stack Integration

### Proposed Backend Architecture

```
Backend API (Node.js + Express)
├── Authentication
│   ├── JWT tokens
│   ├── OAuth (Google, Facebook)
│   └── Password reset
│
├── User Management
│   ├── CRUD operations
│   ├── Role management
│   └── Profile management
│
├── Vehicle Management
│   ├── Listings CRUD
│   ├── Images upload
│   └── Search & filter
│
├── Inspection System
│   ├── Booking
│   ├── Scheduling
│   └── Reports
│
├── Payment Processing
│   ├── eSewa integration
│   ├── Khalti integration
│   └── Bank transfer
│
├── Notification System
│   ├── Email (SendGrid)
│   ├── SMS (Twilio)
│   └── Push notifications
│
└── Admin Panel
    ├── User management
    ├── Content moderation
    └── Analytics
```

### Database Schema (PostgreSQL)

```sql
-- Users
users (id, email, password_hash, role, ...)

-- Vehicles
vehicles (id, make, model, year, ...)
listings (id, vehicle_id, seller_id, price, ...)

-- Inspections
inspections (id, vehicle_id, inspector_id, ...)
inspection_items (id, inspection_id, ...)

-- Passports
vehicle_passports (id, vehicle_id, ...)
ownership_history (id, passport_id, ...)
odometer_history (id, passport_id, ...)

-- Transactions
offers (id, listing_id, buyer_id, ...)
reservations (id, listing_id, buyer_id, ...)
payments (id, user_id, amount, ...)

-- Messages
conversations (id, ...)
messages (id, conversation_id, ...)

-- Notifications
notifications (id, user_id, ...)

-- Audit
audit_logs (id, user_id, action, ...)
```

### API Endpoints

```
Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh

Users
GET    /api/users/me
PUT    /api/users/me
GET    /api/users/:id

Vehicles
GET    /api/vehicles
GET    /api/vehicles/:id
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id

Listings
GET    /api/listings
GET    /api/listings/:id
POST   /api/listings
PUT    /api/listings/:id
DELETE /api/listings/:id

Inspections
GET    /api/inspections
GET    /api/inspections/:id
POST   /api/inspections
PUT    /api/inspections/:id

Passports
GET    /api/passports/:id
POST   /api/passports

Payments
POST   /api/payments/create
GET    /api/payments/:id
POST   /api/payments/:id/webhook

Search
GET    /api/search?q=...&filters=...
```

---

## 📈 Scalability Considerations

### Current Limitations
1. **No Database:** In-memory data only
2. **No Backend:** Frontend-only application
3. **No Caching:** No server-side caching
4. **No CDN:** Static files only
5. **No Load Balancing:** Single server

### Future Scalability
1. **Database Optimization**
   - Indexing
   - Query optimization
   - Connection pooling

2. **Caching Layer**
   - Redis for session storage
   - CDN for static assets
   - API response caching

3. **Horizontal Scaling**
   - Load balancer
   - Multiple app servers
   - Database replication

4. **Performance Monitoring**
   - Application Performance Monitoring (APM)
   - Error tracking
   - Analytics

---

## 🔧 Development Workflow

### Current Workflow

```
1. Development
   └── npm run dev (localhost:3000)

2. Testing
   └── Manual testing
   └── Browser testing

3. Building
   └── npm run build
   └── Output: dist/

4. Deployment
   └── Upload dist/ to server
   └── Configure .htaccess
```

### Future Workflow

```
1. Development
   └── npm run dev
   └── Hot reload
   └── TypeScript checking

2. Testing
   └── Unit tests (Jest)
   └── Integration tests
   └── E2E tests (Cypress)

3. Code Quality
   └── ESLint
   └── Prettier
   └── Husky (pre-commit hooks)

4. CI/CD
   └── GitHub Actions
   └── Automated testing
   └── Automated deployment

5. Monitoring
   └── Error tracking (Sentry)
   └── Performance monitoring
   └── Analytics (GA4)
```

---

## 📚 Architecture Decision Records

### ADR-001: React 18
**Decision:** Use React 18 with concurrent features  
**Reason:** Modern features, better performance, future-proof  
**Trade-offs:** Larger bundle size, learning curve

### ADR-002: TypeScript
**Decision:** Use TypeScript with strict mode  
**Reason:** Type safety, better IDE support, fewer bugs  
**Trade-offs:** More verbose, compilation step

### ADR-003: Vite
**Decision:** Use Vite instead of Webpack  
**Reason:** Faster builds, better DX, modern  
**Trade-offs:** Smaller ecosystem, fewer plugins

### ADR-004: Tailwind CSS
**Decision:** Use Tailwind CSS for styling  
**Reason:** Utility-first, rapid development, consistent  
**Trade-offs:** Large CSS file, learning curve

### ADR-005: React Context
**Decision:** Use React Context for state management  
**Reason:** Simple, built-in, no extra dependencies  
**Trade-offs:** Not suitable for complex state, performance issues at scale

### ADR-006: Code Splitting
**Decision:** Lazy load all page components  
**Reason:** Better performance, faster initial load  
**Trade-offs:** More HTTP requests, complexity

### ADR-007: Mock Data
**Decision:** Use in-memory mock data  
**Reason:** Fast development, no backend dependency  
**Trade-offs:** No persistence, not production-ready

---

## ✅ Architecture Quality Checklist

### Code Quality
- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Consistent code style
- ✅ Component documentation
- ✅ Type definitions

### Performance
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Tree shaking
- ✅ Minification
- ✅ Image optimization

### Security
- ✅ No hardcoded secrets
- ✅ Input validation
- ✅ Error boundaries
- ✅ XSS protection
- ⚠️ Authentication (mock only)

### SEO
- ✅ Dynamic meta tags
- ✅ Structured data
- ✅ Sitemap
- ✅ robots.txt
- ✅ Canonical URLs

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast
- ✅ Focus management

### Maintainability
- ✅ Clear file structure
- ✅ Component separation
- ✅ Reusable components
- ✅ Documentation
- ✅ Type safety

---

## 🎯 Future Architecture Roadmap

### Phase 1: Backend Integration (Month 1-2)
- [ ] Setup Node.js/Express backend
- [ ] Implement PostgreSQL database
- [ ] Create API endpoints
- [ ] Migrate from mock data
- [ ] Implement JWT authentication

### Phase 2: Enhanced Features (Month 3-4)
- [ ] Real payment integration
- [ ] Image upload system
- [ ] Email/SMS notifications
- [ ] Advanced search (Elasticsearch)
- [ ] Caching layer (Redis)

### Phase 3: Scalability (Month 5-6)
- [ ] CDN implementation
- [ ] Load balancing
- [ ] Database optimization
- [ ] Monitoring & analytics
- [ ] CI/CD pipeline

### Phase 4: Advanced Features (Month 7-12)
- [ ] Real-time features (WebSockets)
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] AI/ML features
- [ ] Mobile app (React Native)

---

## 📞 Architecture Support

### Documentation
- **ARCHITECTURE.md** - This file
- **PROJECT_STATUS.md** - Project status
- **DEPLOYMENT_CHECKLIST.md** - Deployment guide
- **BLOCKERS.md** - Known limitations

### For Architecture Questions
1. Review this document
2. Check PROJECT_STATUS.md
3. Review code in src/
4. Check component documentation
5. Review ADRs (Architecture Decision Records)

---

**Architecture Version:** 1.0.0  
**Last Reviewed:** 2026-01-15  
**Next Review:** Before backend integration

---

*This document provides a comprehensive overview of the GadiBazar system architecture. For implementation details, refer to the source code and component documentation.*
