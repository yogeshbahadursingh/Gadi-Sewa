import { Router } from 'express';
import { offerController } from '../controllers/offer.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all offers
router.get('/', offerController.getAllOffers);

// Get offer by ID
router.get('/:id', offerController.getOfferById);

// Create offer (buyer)
router.post('/', offerController.createOffer);

// Update offer
router.put('/:id', offerController.updateOffer);

// Get buyer's offers
router.get('/buyer/my-offers', offerController.getMyOffersAsBuyer);

// Get seller's received offers
router.get('/seller/received-offers', offerController.getReceivedOffersAsSeller);

export default router;
