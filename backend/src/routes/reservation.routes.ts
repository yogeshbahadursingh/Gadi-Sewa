import { Router } from 'express';
import { reservationController } from '../controllers/reservation.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all reservations
router.get('/', reservationController.getAllReservations);

// Get reservation by ID
router.get('/:id', reservationController.getReservationById);

// Create reservation (buyer)
router.post('/', reservationController.createReservation);

// Update reservation
router.put('/:id', reservationController.updateReservation);

// Get buyer's reservations
router.get('/buyer/my-reservations', reservationController.getMyReservations);

export default router;
