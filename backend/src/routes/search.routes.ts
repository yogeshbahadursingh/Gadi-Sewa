import { Router } from 'express';
import { searchController } from '../controllers/search.controller';

const router = Router();

// Public search routes
router.get('/', searchController.search);
router.get('/suggestions', searchController.getSuggestions);

export default router;
