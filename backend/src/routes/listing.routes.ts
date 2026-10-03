import { Router } from 'express';
import { listingController } from '../controllers/listing.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', listingController.getAllListings);
router.get('/:id', listingController.getListingById);

// Protected routes
router.use(authenticate);

// Create listing (sellers and dealers)
router.post('/', authorize('PRIVATE_SELLER', 'DEALER_OWNER', 'DEALER_MANAGER'), listingController.createListing);

// Update listing (seller or admin)
router.put('/:id', listingController.updateListing);

// Delete listing (seller or admin)
router.delete('/:id', listingController.deleteListing);

// Get seller's listings
router.get('/seller/my-listings', listingController.getMyListings);

// Mark as sold
router.post('/:id/sold', listingController.markAsSold);

export default router;
