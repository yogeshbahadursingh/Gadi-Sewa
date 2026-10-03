import { Router } from 'express';
import { messageController } from '../controllers/message.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all conversations
router.get('/conversations', messageController.getMyConversations);

// Get messages for a conversation
router.get('/conversations/:conversationId', messageController.getMessages);

// Send message
router.post('/send', messageController.sendMessage);

// Mark message as read
router.put('/messages/:id/read', messageController.markAsRead);

export default router;
