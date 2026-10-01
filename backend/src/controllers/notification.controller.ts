import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { notificationService } from '../services/notification.service';

class NotificationController {
  // Get my notifications
  getMyNotifications = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { page = '1', limit = '20', unreadOnly } = req.query;

    const result = await notificationService.getMyNotifications(userId, {
      page: Number(page),
      limit: Number(limit),
      unreadOnly: unreadOnly === 'true',
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Mark notification as read
  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    await notificationService.markAsRead(id, userId);

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
    });
  });

  // Mark all notifications as read
  markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    await notificationService.markAllAsRead(userId);

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
    });
  });

  // Get unread count
  getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const count = await notificationService.getUnreadCount(userId);

    res.status(200).json({
      success: true,
      data: { count },
    });
  });
}

export const notificationController = new NotificationController();
