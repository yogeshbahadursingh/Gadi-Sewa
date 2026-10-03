# PROJECT SPECIFICATION - GadiBazar Nepal Vehicle Ecosystem

**Version:** 1.0.0  
**Last Updated:** 2026-01-15  
**Status:** Frontend Complete - Backend Integration Pending

---

## 📋 Project Overview

### Project Name
GadiBazar - Nepal's Trusted Vehicle Marketplace

### Project Type
Full-stack web application for vehicle marketplace and automotive services

### Target Market
- **Primary:** Nepal (Kathmandu Valley and major cities)
- **Secondary:** Nepali diaspora looking to buy/sell vehicles in Nepal

### Vehicle Types Supported
- Cars (petrol, diesel, hybrid, electric)
- Motorcycles
- Scooters
- Commercial vehicles (future)

### Target Users
1. **Buyers** - Individuals looking to purchase vehicles
2. **Sellers** - Private sellers and dealers
3. **Dealers** - Registered vehicle dealerships
4. **Inspectors** - Certified vehicle inspectors
5. **Admins** - Platform administrators
6. **Service Partners** - Garages, workshops, finance companies

---

## 🎯 Core Objectives

### Primary Goals
1. Provide a trusted platform for buying and selling vehicles in Nepal
2. Ensure transparency through verified vehicle history (Vehicle Passport)
3. Professional inspection services with detailed reports
4. Complete ecosystem: marketplace + inspections + finance + insurance + transfer
5. Mobile-first, responsive design for all devices

### Business Goals
1. Become the leading vehicle marketplace in Nepal
2. Generate revenue through:
   - Premium listings
   - Inspection services
   - Dealer subscriptions
   - Finance/insurance commissions
   - Reservation deposits

---

## 🏗️ Architecture

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Context API + Local Storage
- **SEO:** React Helmet Async with dynamic meta tags

### Backend (Planned)
- **Runtime:** Node.js with Express
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting
- **File Upload:** Multer + Cloudinary
- **Email:** Nodemailer
- **Caching:** Redis

### Deployment
- **Frontend:** Static hosting (cPanel, Netlify, Vercel)
- **Backend:** Node.js server (DigitalOcean, AWS, Heroku)
- **Database:** Managed PostgreSQL
- **CDN:** Cloudflare (planned)

---

## 📊 Data Models

### Core Entities

#### User
- id, email, phone, fullName, role
- emailVerified, phoneVerified, identityVerified
- createdAt, lastLogin

#### Vehicle
- id, passportId, type, make, model, variant
- year, fuelType, transmission, bodyStyle
- mileage, engineCC, color, vin, engineNumber
- registrationNumber, registrationDate, registeredDistrict
- ownerId, condition, isEV, isHybrid
- batterySOH, batteryCapacity (for EVs)

#### VehiclePassport
- id, passportId, vehicleId, status
- issuedDate, lastInspectionDate
- ownershipHistory[], odometerHistory[]
- inspectionHistory[], serviceHistory[]
- documentVerifications[], riskFlags[]
- qrCode

#### Listing
- id, vehicleId, sellerId
- title, description, price, negotiable
- location, district, images[]
- status, isFeatured, isInspected, hasPassport
- views, favourites, enquiries
- createdAt, updatedAt, expiresAt

#### Inspection
- id, vehicleId, inspectorId, listingId
- templateType, status
- scheduledDate, completedDate, location
- overallResult, sections[], photos[]
- notes, recommendation, supervisorReviewed

#### Offer
- id, listingId, buyerId, sellerId
- amount, message, status
- counterAmount, createdAt, updatedAt

#### Reservation
- id, listingId, buyerId
- depositAmount, status, expiresAt
- createdAt, updatedAt

#### Payment
- id, userId, amount, purpose
- status, provider, reference
- transactionId, createdAt, updatedAt

#### Dealer
- id, userId, companyName, logo
- description, address, phone, email, website
- verified, rating, totalListings, totalSold
- branches[]

---

## 🔐 User Roles & Permissions

### 16 User Roles

1. **SUPER_ADMIN** - Full system access
2. **ADMIN** - Platform management
3. **SUPPORT** - Customer support
4. **FRAUD_REVIEWER** - Risk management
5. **VERIFICATION_AGENT** - Document verification
6. **INSPECTION_MANAGER** - Inspection oversight
7. **INSPECTOR** - Conduct inspections
8. **DEALER_OWNER** - Dealer account owner
9. **DEALER_MANAGER** - Dealer staff manager
10. **DEALER_STAFF** - Dealer employee
11. **PRIVATE_SELLER** - Individual seller
12. **BUYER** - Vehicle buyer
13. **GARAGE_OWNER** - Service center owner
14. **GARAGE_STAFF** - Service center employee
15. **FINANCE_PARTNER** - Finance company
16. **INSURANCE_PARTNER** - Insurance company

---

## 🛣️ Key Features

### 1. Vehicle Marketplace
- Advanced search with filters
- Category browsing (cars, motorcycles, EVs)
- Vehicle detail pages with images
- Comparison tool
- Saved searches with alerts
- Recently viewed vehicles

### 2. Vehicle Passport System
- Permanent vehicle history record
- Ownership tracking
- Odometer history with verification
- Inspection history
- Service records
- Document verification
- Risk flagging
- QR code verification

### 3. Inspection Services
- Multi-point inspection (100+ checks)
- EV battery health testing
- OBD diagnostics
- Paint depth measurement
- Photo evidence
- Inspector mobile app
- Supervisor review
- Detailed reports

### 4. Financial Services
- Vehicle valuation tool
- Finance calculator
- Loan pre-approval
- Insurance quotes
- Payment processing (eSewa, Khalti)

### 5. Ownership Transfer
- Document checklist
- Step-by-step guidance
- Fee estimation
- Transport office locations
- Status tracking

### 6. Dealer Management
- Dealer dashboard
- Inventory management
- Staff management
- Analytics
- Lead tracking

### 7. Admin Panel
- User management
- Listing moderation
- Inspection oversight
- Payment tracking
- Audit logs
- Risk management

### 8. Communication
- In-app messaging
- Notifications (email, SMS, push)
- Support tickets
- Report suspicious listings

---

## 🎨 UI/UX Requirements

### Design Principles
- Mobile-first responsive design
- Clean, modern interface
- Fast loading times
- Intuitive navigation
- Accessibility compliant (WCAG 2.1)
- Nepal-specific localization

### Key Pages
1. **Homepage** - Hero, search, featured listings, trust signals
2. **Search Results** - Filters, grid/list view, pagination
3. **Vehicle Detail** - Images, specs, passport, inspection, contact
4. **Dashboard** - Role-specific analytics and management
5. **Inspection Form** - Mobile-friendly checklist
6. **Passport View** - Timeline, verification status

### Color Scheme
- Primary: Blue (#2563eb)
- Secondary: Indigo (#4f46e5)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)

---

## 🔍 SEO Requirements

### Technical SEO
- Dynamic meta tags for all pages
- Structured data (JSON-LD)
- Canonical URLs
- XML sitemap
- robots.txt
- Open Graph tags
- Twitter Cards
- Breadcrumb navigation

### Content SEO
- Unique titles and descriptions
- Keyword optimization
- Internal linking
- Image alt text
- Mobile optimization
- Fast page load

### Target Keywords
- Primary: "used cars Nepal", "cars for sale Nepal"
- Secondary: "vehicle inspection Nepal", "car valuation Nepal"
- Long-tail: "Toyota Fortuner price Nepal", "EV battery check Nepal"

---

## 🔒 Security Requirements

### Authentication
- JWT-based authentication
- Refresh tokens
- Password hashing (bcrypt)
- Session management
- Two-factor authentication (planned)

### Authorization
- Role-based access control
- Resource-level permissions
- API endpoint protection
- Rate limiting

### Data Protection
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure file uploads
- Encrypted sensitive data

### Privacy
- GDPR compliance (planned)
- Data encryption at rest
- Secure document storage
- Audit logging
- Privacy policy

---

## 📱 Responsive Design

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Mobile Features
- Touch-friendly interface
- Swipe gestures
- Mobile navigation menu
- Optimized images
- Fast loading

---

## 🌐 Internationalization

### Current
- English (primary)

### Future
- Nepali language support
- Currency formatting (NPR)
- Date/time formatting
- Number formatting

---

## 📊 Analytics & Tracking

### Metrics to Track
- Page views
- User sessions
- Conversion rates
- Search queries
- Popular vehicles
- Inspection bookings
- Payment completions

### Tools
- Google Analytics 4
- Google Search Console
- Custom event tracking

---

## 🚀 Performance Targets

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Bundle Size
- Initial load: < 200 kB (gzipped)
- Total bundle: < 700 kB (current: 695.91 kB)

### Optimization
- Code splitting
- Lazy loading
- Image optimization
- Caching strategy
- CDN integration

---

## 🧪 Testing Requirements

### Unit Tests
- Component tests
- Service tests
- Utility function tests

### Integration Tests
- API endpoint tests
- Database query tests
- Authentication flow tests

### E2E Tests
- User journey tests
- Critical path tests
- Cross-browser tests

### Tools
- Jest (unit tests)
- React Testing Library
- Cypress (E2E)

---

## 📝 Documentation Requirements

### Code Documentation
- TypeScript type definitions
- Component prop documentation
- API endpoint documentation
- Function JSDoc comments

### User Documentation
- Help center
- FAQ section
- Video tutorials
- User guides

### Developer Documentation
- API documentation
- Database schema
- Deployment guide
- Contributing guide

---

## 🔄 Development Phases

### Phase 1: Foundation ✅ COMPLETE
- [x] Project setup
- [x] Type definitions
- [x] Data store
- [x] Context providers
- [x] Routing structure

### Phase 2: Core Pages ✅ COMPLETE
- [x] Homepage
- [x] Search page
- [x] Listing detail
- [x] Dashboard pages
- [x] All 48 pages

### Phase 3: Components ✅ COMPLETE
- [x] Header & Footer
- [x] Auth modal
- [x] SEO component
- [x] Breadcrumbs
- [x] Pagination
- [x] Toast notifications
- [x] Loading skeletons
- [x] Error boundary

### Phase 4: Services ✅ COMPLETE
- [x] API client
- [x] Storage service
- [x] Validation service
- [x] Error handler

### Phase 5: SEO ✅ COMPLETE
- [x] Meta tags
- [x] Structured data
- [x] Sitemap
- [x] robots.txt
- [x] Canonical URLs

### Phase 6: Backend Integration ⏳ PENDING
- [ ] Connect to backend API
- [ ] Initialize database
- [ ] Implement real authentication
- [ ] Migrate from mock data

### Phase 7: External Services ⏳ PENDING
- [ ] Payment gateway integration
- [ ] Email service integration
- [ ] SMS service integration
- [ ] Image upload system

### Phase 8: Optimization ⏳ PENDING
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Performance tuning

### Phase 9: Testing ⏳ PENDING
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance tests

### Phase 10: Deployment ⏳ PENDING
- [ ] Production deployment
- [ ] SSL certificate
- [ ] Domain setup
- [ ] Monitoring setup

---

## 📦 Deliverables

### Current Deliverables
- ✅ Complete frontend application
- ✅ 48 fully functional pages
- ✅ 60+ routes
- ✅ Mock data store
- ✅ Backend API (not connected)
- ✅ Database schema
- ✅ SEO optimization
- ✅ Production build

### Future Deliverables
- ⏳ Connected backend
- ⏳ Real database
- ⏳ Payment integration
- ⏳ Email/SMS system
- ⏳ Image upload system
- ⏳ Test suite
- ⏳ Documentation

---

## 🎯 Success Criteria

### Technical
- ✅ Zero TypeScript errors
- ✅ Successful production build
- ✅ All routes functional
- ✅ Responsive design
- ✅ SEO optimized

### Business
- ⏳ Backend connected
- ⏳ Real users registered
- ⏳ Vehicles listed
- ⏳ Transactions completed
- ⏳ Positive user feedback

---

## 📞 Support & Maintenance

### Ongoing Tasks
- Bug fixes
- Security updates
- Performance optimization
- Feature enhancements
- User support

### Monitoring
- Error tracking
- Performance monitoring
- User analytics
- Security audits

---

## 📚 References

### Similar Platforms
- AutoTrader (UK)
- Cars.com (USA)
- Hamrobazar (Nepal)
- Facebook Marketplace

### Technologies
- React Documentation
- TypeScript Handbook
- Tailwind CSS Docs
- Prisma Documentation

---

**Document Status:** ✅ COMPLETE  
**Next Review:** After backend integration
