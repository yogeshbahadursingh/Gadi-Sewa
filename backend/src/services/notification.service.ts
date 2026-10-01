import { prisma } from '../server';
import { NotificationType } from '@prisma/client';

class NotificationService {
  // Get my notifications
  async getMyNotifications(userId: string, params: { page: number; limit: number; unreadOnly?: boolean }) {
    const { page, limit, unreadOnly } = params;
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (unreadOnly) {
      where.read = false;
    }

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Mark notification as read
  async markAsRead(id: string, userId: string) {
    await prisma.notification.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        read: true,
      },
    });

    return { message: 'Notification marked as read' };
  }

  // Mark all notifications as read
  async markAllAsRead(userId: string) {
    await prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return { message: 'All notifications marked as read' };
  }

  // Get unread count
  async getUnreadCount(userId: string) {
    const count = await prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });

    return count;
  }

  // Create notification
  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    link?: string
  ) {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
      },
    });

    return notification;
  }
}

export const notificationService = new NotificationService();
