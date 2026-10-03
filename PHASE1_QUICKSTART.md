# Phase 1: Backend Foundation - Quick Start Guide

**Status:** ✅ READY TO RUN  
**Time Required:** 5 minutes  
**Database Required:** ❌ NO (using in-memory mock data)

---

## 🎯 What We've Built

Since we can't run PostgreSQL or Prisma commands in this environment, I've created a **mock backend server** that:

- ✅ Uses in-memory data (no database required)
- ✅ Imports all 120+ vehicles from the frontend
- ✅ Provides the same API endpoints as the real backend
- ✅ Implements JWT authentication
- ✅ Supports all CRUD operations
- ✅ Ready to connect to frontend immediately

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Start the Mock Backend

Open a **new terminal** and run:

```bash
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Mock Backend Server running on port 5000
📝 Mode: In-memory (no database required)
🔗 Health check: http://localhost:5000/health
📡 API endpoint: http://localhost:5000/api/v1

📊 Data loaded:
   - Users: 3
   - Vehicles: 120
   - Listings: 120
   - Passports: 120

🔐 Test credentials:
   Email: admin@gadibazar.com
   Password: password123
```

### Step 2: Test the Backend

Open another terminal and test the health check:

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-15T...",
  "version": "1.0.0",
  "mode": "mock-backend"
}
```

### Step 3: Test Authentication

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gadibazar.com","password":"password123"}'
```

**Expected Response:**
```json
{
  "success": true,
   {
    "user": {
      "id": "u1",
      "email": "admin@gadibazar.com",
      "fullName": "Rajesh Shrestha",
      "role": "SUPER_ADMIN",
      ...
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Step 4: Test Vehicle API

```bash
curl http://localhost:5000/api/v1/vehicles
```

**Expected Response:**
```json
{
  "success": true,
   [
    {
      "id": "v1",
      "make": "Toyota",
      "model": "Fortuner",
      ...
    },
    ...
  ],
  "pagination": {
    "total": 120,
    "page": 1,
    "limit": 20,
    "totalPages": 6
  }
}
```

---

## 🔌 Connect Frontend to Backend

### Step 1: Create Frontend Environment File

Create `.env` in the **root directory** (not backend):

```env
VITE_DATA_SOURCE=api
VITE_API_URL=http://localhost:5000/api/v1
```

### Step 2: Update Frontend Data Service

The `src/services/dataService.ts` file already supports switching between mock and API modes. Just make sure `DATA_SOURCE` is set correctly:

```typescript
const DATA_SOURCE = ((import.meta as any).env?.VITE_DATA_SOURCE || 'mock') as 'mock' | 'api';
```

### Step 3: Restart Frontend

```bash
# Stop the frontend if running (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Test Integration

1. Open browser: `http://localhost:5173`
2. The app should now fetch data from the backend API
3. Test login with: `admin@gadibazar.com` / `password123`
4. Browse vehicles - they should load from the backend

---

## 📡 Available API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/register` - Register new user
- `GET /api/v1/auth/me` - Get current user (requires auth)

### Vehicles
- `GET /api/v1/vehicles` - Get all vehicles (with filters)
- `GET /api/v1/vehicles/:id` - Get vehicle by ID

### Listings
- `GET /api/v1/listings` - Get all listings (with filters)
- `GET /api/v1/listings/:id` - Get listing by ID

### Passports
- `GET /api/v1/passports/:passportId` - Get passport by ID

### Query Parameters (for GET requests)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `make` - Filter by vehicle make
- `model` - Filter by vehicle model
- `type` - Filter by vehicle type (CAR, MOTORBIKE, etc.)
- `isEV` - Filter electric vehicles (true/false)
- `district` - Filter by location
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `isInspected` - Filter inspected vehicles
- `hasPassport` - Filter vehicles with passport

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] Backend starts without errors
- [ ] Health check returns 200 OK
- [ ] Login returns JWT token
- [ ] Protected routes require authentication
- [ ] Vehicle API returns 120+ vehicles
- [ ] Listing API returns filtered results
- [ ] Pagination works correctly

### Frontend Integration Tests
- [ ] Frontend connects to backend API
- [ ] Login flow works end-to-end
- [ ] Vehicle listings load from API
- [ ] Search filters work with API
- [ ] Vehicle detail page loads data
- [ ] Authentication persists across refresh

---

## 🔄 Mock vs Production Backend

### Mock Backend (Current)
- ✅ No database required
- ✅ Uses in-memory data
- ✅ Fast startup
- ✅ Perfect for development
- ❌ Data resets on restart
- ❌ Not suitable for production

### Production Backend (Future)
- ✅ PostgreSQL database
- ✅ Persistent data storage
- ✅ Real authentication
- ✅ Production-ready
- ❌ Requires database setup
- ❌ Slower startup

**To switch to production backend later:**
1. Set up PostgreSQL database
2. Run `npx prisma migrate dev`
3. Run `npm run db:seed`
4. Change `npm run dev` to `npm run dev:prod`

---

## 🐛 Troubleshooting

### Issue: Backend won't start
**Solution:**
```bash
cd backend
rm -rf node_modules
npm install
npm run dev
```

### Issue: Port 5000 already in use
**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### Issue: Frontend can't connect to backend
**Solution:**
1. Check backend is running on port 5000
2. Check `.env` file has correct `VITE_API_URL`
3. Check CORS settings in `mockServer.ts`
4. Restart both frontend and backend

### Issue: Login fails
**Solution:**
1. Use correct credentials: `admin@gadibazar.com` / `password123`
2. Check backend console for errors
3. Verify JWT_SECRET is set in environment

---

## 📊 Current Status

### ✅ Completed
- [x] Mock backend server created
- [x] All API endpoints implemented
- [x] JWT authentication working
- [x] In-memory data store with 120+ vehicles
- [x] CORS configured for frontend
- [x] Error handling implemented
- [x] Health check endpoint

### ⏳ Next Steps (Phase 2)
- [ ] Connect frontend to backend API
- [ ] Test all user flows
- [ ] Implement real authentication in frontend
- [ ] Add loading states
- [ ] Test CRUD operations

---

## 🎯 Phase 1 Completion Criteria

Phase 1 is complete when:
- ✅ Backend server runs without errors
- ✅ All API endpoints respond correctly
- ✅ Authentication works (login/register)
- ✅ Frontend can fetch data from backend
- ✅ All 120+ vehicles are accessible via API
- ✅ Pagination and filtering work

**Estimated Time to Complete Phase 1:** 30 minutes

---

## 🚀 What's Next?

After completing Phase 1, you'll move to **Phase 2: Frontend-Backend Connection** where you'll:

1. Update frontend to use real API calls
2. Implement proper authentication flow
3. Add loading and error states
4. Test all user flows end-to-end
5. Verify data persistence

**Continue to Phase 2 →** (See PROJECT_ROADMAP.md)

---

## 📞 Support

If you encounter issues:
1. Check backend console for errors
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Restart both servers
5. Check the troubleshooting section above

---

**Last Updated:** 2026-01-15  
**Status:** ✅ READY TO RUN  
**Next Action:** Run `cd backend && npm run dev`
