import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';

interface SendMessageInput {
  conversationId: string;
  senderId: string;
  content: string;
}

class MessageService {
  // Get my conversations
  async getMyConversations(userId: string) {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                avatar: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    });

    return conversations;
  }

  // Get messages for a conversation
  async getMessages(conversationId: string, userId: string, params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    // Check if user is participant
    const participant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId,
      },
    });

    if (!participant) {
      throw new AppError('You are not a participant in this conversation', 403);
    }

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { conversationId },
        skip,
        take: limit,
        orderBy: { createdAt: 'asc' },
        include: {
          sender: {
            select: {
              id: true,
              fullName: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.message.count({ where: { conversationId } }),
    ]);

    // Update unread count
    await prisma.conversationParticipant.update({
      where: {
        conversationId_userId: {
          conversationId,
          userId,
        },
      },
      data: {
        unreadCount: 0,
      },
    });

    return {
      messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Send message
  async sendMessage(input: SendMessageInput) {
    // Check if conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: input.conversationId },
      include: {
        participants: true,
      },
    });

    if (!conversation) {
      throw new AppError('Conversation not found', 404);
    }

    // Check if sender is participant
    const isParticipant = conversation.participants.some(p => p.userId === input.senderId);
    if (!isParticipant) {
      throw new AppError('You are not a participant in this conversation', 403);
    }

    // Create message and update conversation
    const message = await prisma.$transaction(async (tx) => {
      // Create message
      const newMessage = await tx.message.create({
        data: {
          conversationId: input.conversationId,
          senderId: input.senderId,
          content: input.content,
        },
        include: {
          sender: {
            select: {
              id: true,
              fullName: true,
              avatar: true,
            },
          },
        },
      });

      // Update conversation
      await tx.conversation.update({
        where: { id: input.conversationId },
        data: {
          lastMessage: input.content,
          lastMessageAt: new Date(),
        },
      });

      // Update unread count for other participants
      await tx.conversationParticipant.updateMany({
        where: {
          conversationId: input.conversationId,
          userId: { not: input.senderId },
        },
        data: {
          unreadCount: { increment: 1 },
        },
      });

      return newMessage;
    });

    return message;
  }

  // Mark message as read
  async markAsRead(messageId: string, userId: string) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new AppError('Message not found', 404);
    }

    // Check if user is participant
    const participant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId: message.conversationId,
        userId,
      },
    });

    if (!participant) {
      throw new AppError('You are not a participant in this conversation', 403);
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { read: true },
    });

    return { message: 'Message marked as read' };
  }
}

export const messageService = new MessageService();
