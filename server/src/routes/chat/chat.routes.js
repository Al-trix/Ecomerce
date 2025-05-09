import { Router } from 'express';
import {
  deleteMessage,
  deleteAllMessages,
  updateMessage,
} from '../../controllers/chat/chat.controllers.js';
import { checkAuthorizade } from '../../middleware/validateTokens.midleware.js';

const chatRouter = Router();
const routerChat = '/chat';

chatRouter.put(
  `${routerChat}/:id`,
  checkAuthorizade('user'),
  checkAuthorizade('seller'),
  updateMessage
);
chatRouter.delete(
  `${routerChat}/:id`,
  checkAuthorizade('user'),
  checkAuthorizade('seller'),
  deleteMessage
);
chatRouter.delete(
  `${routerChat}/:userId`,
  checkAuthorizade('user'),
  checkAuthorizade('seller'),
  deleteAllMessages
);
