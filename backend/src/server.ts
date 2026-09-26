import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import vehicleRoutes from './routes/vehicle.routes';
import listingRoutes from './routes/listing.routes';
import inspectionRoutes from './routes/inspection.routes';
import passportRoutes from './routes/passport.routes';
import offerRoutes from './routes/offer.routes';
import reservationRoutes from './routes/reservation.routes';
import paymentRoutes from './routes/payment.routes';
import dealerRoutes from './routes/dealer.routes';
import messageRoutes from './routes/message.routes';
import notificationRoutes from './routes/notification.routes';
import searchRoutes from './routes/search.routes';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ============ MIDDLEWARE ============

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api', rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ============ API ROUTES ============

const API_VERSION = process.env.API_VERSION || 'v1';
const API_PREFIX = `/api/${API_VERSION}`;

// Auth routes
app.use(`${API_PREFIX}/auth`, authRoutes);

// User routes
app.use(`${API_PREFIX}/users`, userRoutes);

// Vehicle routes
app.use(`${API_PREFIX}/vehicles`, vehicleRoutes);

// Listing routes
app.use(`${API_PREFIX}/listings`, listingRoutes);

// Inspection routes
app.use(`${API_PREFIX}/inspections`, inspectionRoutes);

// Passport routes
app.use(`${API_PREFIX}/passports`, passportRoutes);

// Offer routes
app.use(`${API_PREFIX}/offers`, offerRoutes);

// Reservation routes
app.use(`${API_PREFIX}/reservations`, reservationRoutes);

// Payment routes
app.use(`${API_PREFIX}/payments`, paymentRoutes);

// Dealer routes
app.use(`${API_PREFIX}/dealers`, dealerRoutes);

// Message routes
app.use(`${API_PREFIX}/messages`, messageRoutes);

// Notification routes
app.use(`${API_PREFIX}/notifications`, notificationRoutes);

// Search routes
app.use(`${API_PREFIX}/search`, searchRoutes);

// ============ ERROR HANDLING ============

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// Global error handler
app.use(errorHandler);

// ============ SERVER STARTUP ============

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API Version: ${API_VERSION}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📡 API endpoint: http://localhost:${PORT}${API_PREFIX}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer();

export default app;
