import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler } from '../middleware/errorHandler';

class AuthController {
  // Register new user
  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, phone, fullName, password, role } = req.body;

    const result = await authService.register({
      email,
      phone,
      fullName,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });

  // Login user
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

  // Refresh token
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
      return;
    }

    const result = await authService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: result,
    });
  });

  // Get current user
  getMe = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const user = await authService.getMe(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  });

  // Logout user
  logout = asyncHandler(async (req: Request, res: Response) => {
    // In a real implementation, you might want to blacklist the token
    // For now, we just send a success response
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  });

  // Change password
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    const result = await authService.changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  });
}

export const authController = new AuthController();
