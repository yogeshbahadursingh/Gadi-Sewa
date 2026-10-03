import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { messageService } from '../services/message.service';

class MessageController {
  // Get my conversations
  getMyConversations = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const result = await messageService.getMyConversations(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get messages for a conversation
  getMessages = asyncHandler(async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const userId = req.user!.id;
    const { page = '1', limit = '50' } = req.query;

    const result = await messageService.getMessages(conversationId, userId, {
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Send message
  sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const senderId = req.user!.id;
    const { conversationId, content } = req.body;

    const message = await messageService.sendMessage({
      conversationId,
      senderId,
      content,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message,
    });
  });

  // Mark message as read
  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    await messageService.markAsRead(id, userId);

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
    });
  });
}

export const messageController = new MessageController();
