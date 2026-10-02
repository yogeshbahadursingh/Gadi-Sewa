# Backend Integration Guide

## Current Status

### ✅ What's Complete
- Frontend: 120+ vehicles, 48 pages, all routes configured
- Backend code: All controllers, services, routes, middleware written
- Database schema: Complete Prisma schema with all models
- Environment configuration: .env file created

### ⏳ What Needs to Be Done
1. Install backend dependencies (currently blocked by npm conflicts)
2. Set up PostgreSQL database
3. Run Prisma migrations
4. Seed the database with initial data
5. Start backend server
6. Connect frontend to backend API
7. Test end-to-end functionality

---

## Step-by-Step Integration

### 1. Fix npm Dependencies

The backend dependencies need to be installed. There's currently a conflict with the picomatch package.

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### 2. Set Up PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (if not already installed)
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo service postgresql start

# Create database and user
sudo -u postgres psql
CREATE USER postgres WITH PASSWORD 'password';
CREATE DATABASE gadibazar;
GRANT ALL PRIVILEGES ON DATABASE gadibazar TO postgres;
\q
```

**Option B: Docker PostgreSQL**
```bash
docker run --name gadibazar-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=gadibazar \
  -p 5432:5432 \
  -d postgres:15
```

**Option C: Cloud Database**
- Use Supabase, Railway, or Neon for managed PostgreSQL
- Update DATABASE_URL in .env file

### 3. Initialize Database Schema

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Or push schema directly (for development)
npx prisma db push
```

### 4. Seed Database

```bash
# Run the seed script to populate initial data
npm run db:seed
```

This will create:
- 10 users (admin, sellers, buyers, dealers, inspectors)
- 120+ vehicles with complete data
- 120+ listings
- 120+ vehicle passports
- Sample inspections, offers, reservations, payments

### 5. Start Backend Server

```bash
# Development mode with hot reload
npm run dev

# Or production mode
npm run build
npm start
```

Server will start at: `http://localhost:5000`

### 6. Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Test authentication
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gadibazar.com","password":"password123"}'

# Test vehicle listing
curl http://localhost:5000/api/v1/vehicles
```

### 7. Connect Frontend to Backend

Update `src/services/apiClient.ts`:

```typescript
// Change from mock to real API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
```

Update `src/context/AppContext.tsx` to use real authentication:

```typescript
const login = async (email: string, password: string) => {
  try {
    const response = await api.auth.login(email, password);
    if (response.success) {
      apiClient.setToken(response.data.token);
      setCurrentUser(response.data.user);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};
```

### 8. Update Frontend Data Layer

Replace mock data with API calls:

```typescript
// Instead of importing from store/data.ts
// Use API calls:
const vehicles = await api.vehicles.getAll();
const listings = await api.listings.getAll();
```

---

## Testing Checklist

### Backend API Tests
- [ ] Health check endpoint works
- [ ] User registration works
- [ ] User login works
- [ ] JWT token generation works
- [ ] Protected routes require authentication
- [ ] Vehicle CRUD operations work
- [ ] Listing CRUD operations work
- [ ] Inspection creation works
- [ ] Offer creation works
- [ ] Reservation creation works
- [ ] Payment processing works

### Frontend Integration Tests
- [ ] Frontend can connect to backend
- [ ] Login flow works end-to-end
- [ ] Vehicle listings load from API
- [ ] Search filters work with API
- [ ] Vehicle detail page loads data
- [ ] Create listing form submits to API
- [ ] Message sending works
- [ ] Offer submission works
- [ ] Payment flow works

### End-to-End Tests
- [ ] User can register and login
- [ ] User can browse vehicles
- [ ] User can view vehicle details
- [ ] User can contact seller
- [ ] User can make an offer
- [ ] Seller can receive and respond to offers
- [ ] User can book inspection
- [ ] Inspector can complete inspection
- [ ] User can make reservation
- [ ] User can complete payment
- [ ] Admin can manage users
- [ ] Admin can moderate listings

---

## Deployment Steps

### 1. Backend Deployment

**Option A: DigitalOcean App Platform**
```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Connect to DigitalOcean
# Select backend folder
# Set environment variables
# Deploy
```

**Option B: AWS EC2**
```bash
# SSH into server
ssh -i key.pem ubuntu@your-server-ip

# Install Node.js and PostgreSQL
sudo apt update
sudo apt install nodejs postgresql

# Clone repository
git clone your-repo-url
cd gadibazar/backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
nano .env  # Update with production values

# Run migrations
npx prisma migrate deploy

# Start with PM2
npm install -g pm2
pm2 start npm --name "gadibazar-api" -- start
pm2 save
pm2 startup
```

**Option C: Railway/Render**
- Connect GitHub repository
- Set environment variables
- Add PostgreSQL database
- Deploy automatically

### 2. Frontend Deployment

**Option A: Vercel**
```bash
npm install -g vercel
vercel
```

**Option B: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Option C: cPanel**
```bash
# Build frontend
npm run build

# Upload dist/ folder to public_html
# Configure .htaccess for React Router
```

### 3. Database Deployment

**Option A: Supabase**
- Create new project
- Get connection string
- Update DATABASE_URL in backend .env
- Run migrations

**Option B: Railway**
- Add PostgreSQL service
- Get connection string
- Update DATABASE_URL
- Run migrations

**Option C: Self-hosted**
- Install PostgreSQL on server
- Create database
- Update DATABASE_URL
- Run migrations

---

## Environment Variables for Production

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DATABASE_URL="postgresql://user:password@host:5432/gadibazar"
JWT_SECRET="production-secret-key-min-32-chars"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="https://yourdomain.com"
```

### Frontend (.env)
```env
VITE_API_URL="https://api.yourdomain.com/api/v1"
```

---

## Monitoring & Logging

### Backend Monitoring
- Use Winston for structured logging
- Set up error tracking with Sentry
- Monitor API performance with New Relic
- Track database queries with Prisma Studio

### Frontend Monitoring
- Set up Google Analytics 4
- Track user interactions
- Monitor Core Web Vitals
- Set up error tracking

---

## Security Checklist

### Backend Security
- [ ] JWT tokens have proper expiration
- [ ] Passwords are hashed with bcrypt
- [ ] Rate limiting is enabled
- [ ] CORS is properly configured
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (Helmet middleware)
- [ ] File upload validation
- [ ] Environment variables are secure
- [ ] Database credentials are not in code

### Frontend Security
- [ ] No sensitive data in localStorage
- [ ] API tokens are stored securely
- [ ] XSS protection in place
- [ ] CSRF protection for forms
- [ ] Input sanitization
- [ ] Secure cookie settings

---

## Performance Optimization

### Backend
- [ ] Database indexing on frequently queried fields
- [ ] Redis caching for frequently accessed data
- [ ] API response compression
- [ ] Connection pooling
- [ ] Query optimization

### Frontend
- [ ] Code splitting (already implemented)
- [ ] Image optimization
- [ ] Lazy loading (already implemented)
- [ ] Service worker for offline support
- [ ] CDN for static assets

---

## Next Steps Priority

### High Priority (Week 1)
1. ✅ Fix npm dependency conflicts
2. ✅ Set up PostgreSQL database
3. ✅ Run Prisma migrations
4. ✅ Seed database with initial data
5. ✅ Start backend server
6. ✅ Test all API endpoints

### Medium Priority (Week 2)
7. Connect frontend to backend API
8. Implement real authentication
9. Test user flows end-to-end
10. Fix any integration issues

### Low Priority (Week 3-4)
11. Deploy to production
12. Set up monitoring
13. Performance optimization
14. Security audit

---

## Troubleshooting

### Issue: npm install fails
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Database connection fails
**Solution:**
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify DATABASE_URL in .env
- Check database exists: `psql -U postgres -l`

### Issue: Prisma migration fails
**Solution:**
```bash
# Reset database
npx prisma migrate reset

# Or delete migrations folder and start fresh
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

### Issue: Backend won't start
**Solution:**
- Check all environment variables are set
- Verify database is accessible
- Check port 5000 is not in use
- Look at error logs for specific issues

---

## Success Criteria

The backend integration is complete when:
- ✅ Backend server runs without errors
- ✅ All API endpoints respond correctly
- ✅ Database is populated with seed data
- ✅ Frontend can authenticate users
- ✅ Frontend can fetch data from API
- ✅ Frontend can create/update/delete data
- ✅ End-to-end user flows work
- ✅ No TypeScript errors
- ✅ No runtime errors in console

---

**Current Status:** 🟡 In Progress - Dependencies installation blocked  
**Next Action:** Fix npm conflicts and install backend dependencies  
**Estimated Time:** 2-3 hours for full integration
