# GadiBazar Backend API

Complete RESTful API for the GadiBazar Nepal Vehicle Marketplace platform.

## 🚀 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Caching**: Redis

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Redis (optional, for caching)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Edit `.env` file with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/gadibazar"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database (optional)
npm run db:seed
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
# Build the application
npm run build

# Start the server
npm start
```

### Database Management
```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name migration_name
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Auth Routes
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh-token` - Refresh JWT token
- `GET /auth/me` - Get current user (protected)
- `POST /auth/logout` - Logout user (protected)
- `PUT /auth/change-password` - Change password (protected)

#### User Routes (Protected)
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile
- `PUT /users/:id/role` - Update user role (admin only)
- `DELETE /users/:id` - Delete user (admin only)

#### Vehicle Routes
- `GET /vehicles` - Get all vehicles (public)
- `GET /vehicles/:id` - Get vehicle by ID (public)
- `GET /vehicles/passport/:passportId` - Get vehicle by passport ID (public)
- `POST /vehicles` - Create vehicle (protected, seller/admin)
- `PUT /vehicles/:id` - Update vehicle (protected, owner/admin)
- `DELETE /vehicles/:id` - Delete vehicle (protected, owner/admin)

#### Listing Routes
- `GET /listings` - Get all listings (public)
- `GET /listings/:id` - Get listing by ID (public)
- `GET /listings/seller/my-listings` - Get my listings (protected)
- `POST /listings` - Create listing (protected, seller)
- `PUT /listings/:id` - Update listing (protected, owner/admin)
- `DELETE /listings/:id` - Delete listing (protected, owner/admin)
- `POST /listings/:id/sold` - Mark as sold (protected, owner/admin)

#### Inspection Routes (Protected)
- `GET /inspections` - Get all inspections
- `GET /inspections/:id` - Get inspection by ID
- `GET /inspections/inspector/my-inspections` - Get my inspections
- `POST /inspections` - Create inspection (inspector/admin)
- `PUT /inspections/:id` - Update inspection

#### Passport Routes
- `GET /passports/:passportId` - Get passport by ID (public)
- `GET /passports` - Get all passports (protected)
- `GET /passports/vehicle/:vehicleId` - Get passport by vehicle ID (protected)

#### Offer Routes (Protected)
- `GET /offers` - Get all offers
- `GET /offers/:id` - Get offer by ID
- `GET /offers/buyer/my-offers` - Get my offers as buyer
- `GET /offers/seller/received-offers` - Get received offers as seller
- `POST /offers` - Create offer
- `PUT /offers/:id` - Update offer

#### Reservation Routes (Protected)
- `GET /reservations` - Get all reservations
- `GET /reservations/:id` - Get reservation by ID
- `GET /reservations/buyer/my-reservations` - Get my reservations
- `POST /reservations` - Create reservation
- `PUT /reservations/:id` - Update reservation

#### Payment Routes (Protected)
- `GET /payments` - Get all payments (admin only)
- `GET /payments/:id` - Get payment by ID
- `GET /payments/user/my-payments` - Get my payments
- `POST /payments` - Create payment
- `POST /payments/webhook/:provider` - Payment webhook

#### Dealer Routes
- `GET /dealers` - Get all dealers (public)
- `GET /dealers/:id` - Get dealer by ID (public)
- `GET /dealers/:id/inventory` - Get dealer inventory (public)
- `POST /dealers` - Create dealer (admin only)
- `PUT /dealers/:id` - Update dealer (protected)

#### Message Routes (Protected)
- `GET /messages/conversations` - Get my conversations
- `GET /messages/conversations/:conversationId` - Get messages
- `POST /messages/send` - Send message
- `PUT /messages/messages/:id/read` - Mark as read

#### Notification Routes (Protected)
- `GET /notifications` - Get my notifications
- `PUT /notifications/:id/read` - Mark as read
- `PUT /notifications/mark-all-read` - Mark all as read
- `GET /notifications/unread-count` - Get unread count

#### Search Routes (Public)
- `GET /search` - Search vehicles and listings
- `GET /search/suggestions` - Get search suggestions

## 🗄️ Database Schema

The database includes the following main entities:

- **Users**: Authentication and user management
- **Vehicles**: Vehicle information and specifications
- **VehiclePassport**: Complete vehicle history and verification
- **Listings**: Vehicle listings for sale
- **Inspections**: Vehicle inspection reports
- **Offers**: Purchase offers and negotiations
- **Reservations**: Vehicle reservations
- **Payments**: Payment transactions
- **Dealers**: Dealer profiles and inventory
- **Messages**: User messaging system
- **Notifications**: User notifications
- **AuditLogs**: System audit trail

## 🔐 Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting on authentication endpoints
- Input validation with Zod
- SQL injection protection (Prisma ORM)
- XSS protection (Helmet)
- CORS configuration
- Password hashing with bcrypt

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage
```

## 📝 Environment Variables

See `.env.example` for all available environment variables.

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Run database migrations:
```bash
npx prisma migrate deploy
```

4. Start the server:
```bash
npm start
```

## 📄 License

MIT

## 👥 Authors

GadiBazar Development Team

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
