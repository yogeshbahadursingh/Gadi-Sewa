import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all users (admin only)
router.get('/', authorize('SUPER_ADMIN', 'ADMIN'), userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user profile
router.put('/:id', userController.updateUser);

// Update user role (admin only)
router.put('/:id/role', authorize('SUPER_ADMIN', 'ADMIN'), userController.updateUserRole);

// Delete user (admin only)
router.delete('/:id', authorize('SUPER_ADMIN', 'ADMIN'), userController.deleteUser);

export default router;
