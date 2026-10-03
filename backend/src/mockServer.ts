// Mock Backend Server - In-memory implementation for development
// This server provides the same API endpoints but uses in-memory data instead of PostgreSQL

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'gadibazar-super-secret-jwt-key-2026-change-in-production-min-32-chars';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============ IN-MEMORY DATA STORE ============
// This simulates the database - in production, this would be PostgreSQL

let users = [
  {
    id: 'u1',
    email: 'admin@gadibazar.com',
    phone: '9801000001',
    fullName: 'Rajesh Shrestha',
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'SUPER_ADMIN',
    emailVerified: true,
    phoneVerified: true,
    identityVerified: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
  },
  {
    id: 'u2',
    email: 'ramesh@gmail.com',
    phone: '9841000002',
    fullName: 'Ramesh Thapa',
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'PRIVATE_SELLER',
    emailVerified: true,
    phoneVerified: true,
    identityVerified: true,
    createdAt: new Date('2024-06-15'),
    lastLogin: new Date(),
  },
  {
    id: 'u3',
    email: 'sita@gmail.com',
    phone: '9851000003',
    fullName: 'Sita Maharjan',
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'BUYER',
    emailVerified: true,
    phoneVerified: true,
    identityVerified: true,
    createdAt: new Date('2024-08-20'),
    lastLogin: new Date(),
  },
];

// Import vehicle data from frontend
import { vehicles as mockVehicles, listings as mockListings, vehiclePassports as mockPassports } from '../../src/store/data';

let vehicles = [...mockVehicles];
let listings = [...mockListings];
let passports = [...mockPassports];

// ============ AUTHENTICATION MIDDLEWARE ============

const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// ============ API ROUTES ============

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    mode: 'mock-backend'
  });
});

// Auth routes
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
       {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          emailVerified: user.emailVerified,
          phoneVerified: user.phoneVerified,
          identityVerified: user.identityVerified,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { email, phone, fullName, password, role } = req.body;

    // Check if user exists
    if (users.find(u => u.email === email || u.phone === phone)) {
      return res.status(409).json({ success: false, error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      id: `u${users.length + 1}`,
      email,
      phone,
      fullName,
      passwordHash,
      role: role || 'BUYER',
      emailVerified: false,
      phoneVerified: false,
      identityVerified: false,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
       {
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

app.get('/api/v1/auth/me', authenticate, (req: any, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  res.json({
    success: true,
     {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      identityVerified: user.identityVerified,
    },
  });
});

// Vehicle routes
app.get('/api/v1/vehicles', (req, res) => {
  const { make, model, type, isEV, page = 1, limit = 20 } = req.query;
  
  let filteredVehicles = [...vehicles];

  if (make) {
    filteredVehicles = filteredVehicles.filter(v => 
      v.make.toLowerCase().includes((make as string).toLowerCase())
    );
  }

  if (model) {
    filteredVehicles = filteredVehicles.filter(v => 
      v.model.toLowerCase().includes((model as string).toLowerCase())
    );
  }

  if (type) {
    filteredVehicles = filteredVehicles.filter(v => v.type === type);
  }

  if (isEV !== undefined) {
    filteredVehicles = filteredVehicles.filter(v => v.isEV === (isEV === 'true'));
  }

  const total = filteredVehicles.length;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const paginatedVehicles = filteredVehicles.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum
  );

  res.json({
    success: true,
     paginatedVehicles,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

app.get('/api/v1/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  
  if (!vehicle) {
    return res.status(404).json({ success: false, error: 'Vehicle not found' });
  }

  res.json({ success: true,  vehicle });
});

// Listing routes
app.get('/api/v1/listings', (req, res) => {
  const { query, make, district, minPrice, maxPrice, isEV, isInspected, hasPassport, page = 1, limit = 20 } = req.query;
  
  let filteredListings = listings.filter(l => l.status === 'ACTIVE');

  if (query) {
    const q = (query as string).toLowerCase();
    filteredListings = filteredListings.filter(l => {
      const vehicle = vehicles.find(v => v.id === l.vehicleId);
      return l.title.toLowerCase().includes(q) ||
             vehicle?.make.toLowerCase().includes(q) ||
             vehicle?.model.toLowerCase().includes(q);
    });
  }

  if (make) {
    filteredListings = filteredListings.filter(l => {
      const vehicle = vehicles.find(v => v.id === l.vehicleId);
      return vehicle?.make.toLowerCase() === (make as string).toLowerCase();
    });
  }

  if (district) {
    filteredListings = filteredListings.filter(l => 
      l.district.toLowerCase() === (district as string).toLowerCase()
    );
  }

  if (minPrice) {
    filteredListings = filteredListings.filter(l => l.price >= Number(minPrice));
  }

  if (maxPrice) {
    filteredListings = filteredListings.filter(l => l.price <= Number(maxPrice));
  }

  if (isEV !== undefined) {
    filteredListings = filteredListings.filter(l => {
      const vehicle = vehicles.find(v => v.id === l.vehicleId);
      return vehicle?.isEV === (isEV === 'true');
    });
  }

  if (isInspected !== undefined) {
    filteredListings = filteredListings.filter(l => l.isInspected === (isInspected === 'true'));
  }

  if (hasPassport !== undefined) {
    filteredListings = filteredListings.filter(l => l.hasPassport === (hasPassport === 'true'));
  }

  const total = filteredListings.length;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const paginatedListings = filteredListings.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum
  );

  res.json({
    success: true,
     paginatedListings,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

app.get('/api/v1/listings/:id', (req, res) => {
  const listing = listings.find(l => l.id === req.params.id);
  
  if (!listing) {
    return res.status(404).json({ success: false, error: 'Listing not found' });
  }

  // Increment view count
  listing.views += 1;

  res.json({ success: true,  listing });
});

// Passport routes
app.get('/api/v1/passports/:passportId', (req, res) => {
  const passport = passports.find(p => p.passportId === req.params.passportId);
  
  if (!passport) {
    return res.status(404).json({ success: false, error: 'Passport not found' });
  }

  res.json({ success: true,  passport });
});

// ============ ERROR HANDLING ============

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// ============ START SERVER ============

app.listen(PORT, () => {
  console.log(`🚀 Mock Backend Server running on port ${PORT}`);
  console.log(`📝 Mode: In-memory (no database required)`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/v1`);
  console.log(`\n📊 Data loaded:`);
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Vehicles: ${vehicles.length}`);
  console.log(`   - Listings: ${listings.length}`);
  console.log(`   - Passports: ${passports.length}`);
  console.log(`\n🔐 Test credentials:`);
  console.log(`   Email: admin@gadibazar.com`);
  console.log(`   Password: password123`);
});

export default app;
