import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { userService } from '../services/user.service';
import { AppError } from '../middleware/errorHandler';

class UserController {
  // Get all users
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', role, search } = req.query;

    const result = await userService.getAllUsers({
      page: Number(page),
      limit: Number(limit),
      role: role as string,
      search: search as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get user by ID
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const requestingUserId = req.user!.id;
    const requestingUserRole = req.user!.role;

    // Users can only view their own profile unless they're admin
    if (id !== requestingUserId && !['SUPER_ADMIN', 'ADMIN'].includes(requestingUserRole)) {
      throw new AppError('You do not have permission to view this user', 403);
    }

    const user = await userService.getUserById(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  });

  // Update user profile
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const requestingUserId = req.user!.id;
    const requestingUserRole = req.user!.role;

    // Users can only update their own profile unless they're admin
    if (id !== requestingUserId && !['SUPER_ADMIN', 'ADMIN'].includes(requestingUserRole)) {
      throw new AppError('You do not have permission to update this user', 403);
    }

    const user = await userService.updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  });

  // Update user role
  updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    const user = await userService.updateUserRole(id, role);

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user,
    });
  });

  // Delete user
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await userService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  });
}

export const userController = new UserController();
