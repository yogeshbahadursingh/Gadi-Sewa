import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all payments (admin only)
router.get('/', authorize('SUPER_ADMIN', 'ADMIN'), paymentController.getAllPayments);

// Get payment by ID
router.get('/:id', paymentController.getPaymentById);

// Create payment
router.post('/', paymentController.createPayment);

// Get user's payments
router.get('/user/my-payments', paymentController.getMyPayments);

// Payment webhook (eSewa/Khalti)
router.post('/webhook/:provider', paymentController.handleWebhook);

export default router;
